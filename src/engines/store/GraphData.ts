import {
  applyEdgeChanges,
  applyNodeChanges,
  type Edge,
  type EdgeChange,
  type NodeChange,
  type Connection,
  addEdge,
  updateEdge,
} from 'reactflow'
import type { StoreApi } from 'zustand'
import type { DataInEngine, EngineNode } from '../types'
import type { FlowDataState } from './types'
import {
  makeChangesMap,
  applyCustomChange,
  type CustomChange,
} from './update-tools'
import { extractNodeTypesList } from './utils'

type Getter = StoreApi<FlowDataState>['getState']
type Setter = StoreApi<FlowDataState>['setState']

type Api = {
  get: Getter
  set: Setter
}

/**
 * 主要是维护 nodes 和 edges 的数据结构
 * 更新 edge 时也要更新到 node 里面的数据
 *
 * 所有 node 与 edge 相关的更新都收集到此处
 */
export class GraphData {
  private _nodes: EngineNode[]
  private _edges: Edge[]
  private _idMap: Map<string, EngineNode>
  private _nodeTypes: string[]

  constructor(public api: Api) {
    this._nodes = []
    this._edges = []
    this._idMap = new Map()
    this._nodeTypes = []
  }

  destroy() {
    this._nodes = []
    this._edges = []
    this._idMap.clear()
    // @ts-ignore
    this.api = null
  }

  get nodes(): EngineNode[] {
    return this._nodes
  }

  get edges(): Edge[] {
    return this._edges
  }

  get nodeTypes(): string[] {
    return this._nodeTypes
  }

  getNodeById(id: string): EngineNode | null {
    return this._idMap.get(id) ?? null
  }

  protected updateIdMap() {
    this._idMap.clear()
    this._nodes.forEach((node) => {
      this._idMap.set(node.id, node)
    })
  }

  protected updateFlowState(
    target: Partial<{
      nodes: boolean
      edges: boolean
      nodeTypes: boolean
    }>,
  ) {
    const update: Partial<FlowDataState> = {}
    if (target.nodes) {
      this.updateIdMap()
      update.nodes = this.nodes
    }
    if (target.edges) {
      update.edges = this.edges
    }
    if (target.nodeTypes) {
      update.nodeTypesList = extractNodeTypesList(this.nodes)
    }
    this.api.set(update)
  }

  ////////

  initFlowState(initialData: { nodes: EngineNode[]; edges: Edge[] }) {
    const changes: CustomChange[] = []
    this._edges = initialData.edges.map((edge) => {
      changes.push({
        type: 'update-edge',
        id: edge.target,
        data: {
          target: edge.target,
          source: edge.source,
          targetHandle: edge.targetHandle!,
          sourceHandle: edge.sourceHandle!,
        },
      })
      return edge
    })

    const changesMap = makeChangesMap(changes)
    this._nodes = initialData.nodes.map((node) => {
      if (node.id in changesMap) {
        return changesMap[node.id].reduce(applyCustomChange, node)
      }
      return node
    })

    this._nodeTypes = extractNodeTypesList(this.nodes)
  }

  updateNodeData(id: string, data: Partial<DataInEngine>) {
    // 更新 data 数据
    const change: CustomChange = { type: 'update-node-data', id, data }
    this._nodes = this._nodes.map((node) => {
      if (node.id === change.id) {
        return applyCustomChange(node, change)
      }
      return node
    })
    // 更新 state
    this.updateFlowState({ nodes: true })
  }

  updateNodesByChanges(changes: NodeChange[]) {
    const updatedNodes = applyNodeChanges(changes, this._nodes)
    this._nodes = updatedNodes
    this.updateFlowState({ nodes: true })
  }

  updateEdgesByChanges(changes: EdgeChange[]) {
    const updatedEdges = applyEdgeChanges(changes, this._edges)
    this._edges = updatedEdges
    this.updateFlowState({ edges: true })
  }

  /**
   * 更新连接
   * 1. 合并 onConnection 与 onEdgeUpdate 处理
   * 2. 使用 api 更新 edge 数据后，更新 node 数据
   */
  updateConnection(
    oldEdge: Edge | null,
    newConnection: Edge | Connection,
  ): void {
    let updatedEdges: Edge[] = this._edges
    // 更新数据
    if (!oldEdge) {
      updatedEdges = addEdge(newConnection, this._edges)
    } else {
      updatedEdges = updateEdge(
        oldEdge,
        newConnection as Connection,
        this._edges,
      )
    }

    // 更新节点内连接数据
    const change: CustomChange = {
      type: 'update-edge',
      id: newConnection.target!,
      data: newConnection as Connection,
    }
    const newNodes = this._nodes.map((node) => {
      if (node.id === change.id) {
        return applyCustomChange(node, change)
      }
      return node
    })

    // 更新 state
    this._edges = updatedEdges
    this._nodes = newNodes
    this.updateFlowState({ nodes: true, edges: true })
  }

  /**
   * 移除节点
   * 1. 更新 edges 去除被移除节点关联的所有边 并记录被移除的边
   * 2. 更新 nodes 如果节点的边是与被移除相关 则更新节点数据
   */
  removeNode(id: string) {
    const changes: CustomChange[] = []

    // 移除关联的边
    this._edges = this._edges.filter((edge) => {
      if (edge.source === id) {
        // 更新被连接的节点的数据
        changes.push({
          type: 'remove-edge',
          id: edge.target,
          data: edge,
        })
      }
      return edge.source !== id && edge.target !== id
    })

    // 更新关联节点，以及移除对应节点
    const changesMap = makeChangesMap(changes)
    this._nodes = this._nodes
      .filter((node) => {
        return node.id !== id
      })
      .map((node) => {
        if (node.id in changesMap[node.id]) {
          return changesMap[node.id].reduce(applyCustomChange, node)
        }
        return node
      })

    // 更新 state
    this.updateFlowState({ nodes: true, edges: true })
  }

  /**
   * 移除连接
   */
  removeEdge(edge: Edge) {
    // 移除数据
    const newEdges = this._edges.filter((e) => e.id === edge.id)

    // 更新节点 data
    const change: CustomChange = {
      type: 'remove-edge',
      id: edge.target,
      data: edge,
    }
    const newNodes = this._nodes.map((node) => {
      if (node.id === change.id) {
        return applyCustomChange(node, change)
      }
      return node
    })

    // 更新 state
    this._edges = newEdges
    this._nodes = newNodes
    this.updateFlowState({ nodes: true, edges: true })
  }
}

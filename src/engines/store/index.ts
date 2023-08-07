import { useEffect, useMemo } from 'react'
import type { Node, Edge } from 'reactflow'
import { type StoreApi, createStore } from 'zustand'
import type { DataInEngine, EngineNode } from '../types'
import { EngineCore } from '../core/EngineCore'
import { extractNodeTypesList, nodeMapToEdges, nodeMapToNodes } from './utils'
import type { StoreNode } from './types'

export { useGetFlow, FlowStoreProvider } from './context'

export interface FlowDataState {
  // states
  nodeMap: Record<string, StoreNode>
  nodes: Node<DataInEngine>[]
  nodeTypesList: string[]
  edges: Edge[]
  systemRunning: boolean
  // actions
  updateNode: (id: string, node: EngineNode) => void
  updateNodeData: (id: string, data: any) => void
  reducer: (
    fn: (
      set: StoreApi<FlowDataState>['setState'],
      get: StoreApi<FlowDataState>['getState'],
    ) => void,
  ) => void
  // engine related
  startRun: (nodeId: string) => void
}

/**
 * 初始化 flow data
 */
export function useInitialFlow({
  nodeMap: initialNodeMap,
}: Pick<FlowDataState, 'nodeMap'>) {
  const engine = useMemo(() => {
    return new EngineCore()
  }, [])

  const store = useMemo(() => {
    const _store = createStore<FlowDataState>((set, get) => {
      const _states: FlowDataState = {
        // states
        nodeMap: initialNodeMap,
        nodes: nodeMapToNodes(initialNodeMap),
        edges: nodeMapToEdges(initialNodeMap),
        nodeTypesList: extractNodeTypesList(nodeMapToNodes(initialNodeMap)),
        systemRunning: false,
        // actions
        updateNode: (id: string, node: EngineNode) => {
          const nodeMap = { ...get().nodeMap }
          const storeNode = get().nodeMap[id]
          if (!storeNode) {
            nodeMap[id] = { node, paramsEdges: {} }
          } else {
            nodeMap[id] = { ...storeNode, node }
          }
          set({ nodeMap, nodes: nodeMapToNodes(nodeMap) })
        },
        updateNodeData: (id, data: any) => {
          const storeNode = get().nodeMap[id]
          if (!storeNode) {
            throw new Error(`unknown node id: ${id}`)
          }
          const newNode = {
            ...storeNode.node,
            data: { ...storeNode.node.data, ...data },
          }
          _states.updateNode(id, newNode)
        },
        reducer: (fn) => {
          fn(set, get)
        },
        // engine related
        startRun: (nodeId) => {
          set({ systemRunning: true })
          engine.startRun(nodeId)
        },
      }

      return _states
    })

    engine.setStore(_store)
    return _store
  }, [engine])

  /**
   * 销毁 engine
   */
  useEffect(() => {
    engine.setStore(store)
    return () => {
      engine.destroy()
    }
  }, [engine, store])

  return store
}

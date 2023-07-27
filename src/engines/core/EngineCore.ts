import { type StoreApi } from 'zustand'
import { type FlowDataState } from '../store'
import { Task } from './Task'
import { TaskStack } from './TaskStack'
import { type EngineNode } from '../types'
import { AbortError } from './tools'

class EngineCore {
  public store!: StoreApi<FlowDataState>

  setStore(store: StoreApi<FlowDataState>) {
    this.store = store
  }

  async startRun(nodeId: string) {
    const { nodes, edges } = this.store.getState()
    const node = nodes.find((node) => node.id === nodeId)
    if (!node) {
      throw new Error(`node not found: ${nodeId}`)
    }

    // 清空所有节点的 output
    this.store.setState({
      nodes: nodes.map((node) => ({
        ...node,
        selected: false,
        data: { ...node.data, output: undefined },
      })),
    })

    const taskStack = this.makeTaskStack(node, { nodes, edges })

    while (taskStack.isNotEmpty) {
      const task = taskStack.pop()!
      try {
        await task.exec(this.store)
      } catch (e) {
        if (e instanceof AbortError) {
          break
        } else {
          throw e
        }
      }
    }

    this.store.setState({ systemRunning: false })
  }

  makeTaskStack(
    entryNode: EngineNode,
    { nodes, edges }: Pick<FlowDataState, 'nodes' | 'edges'>,
  ) {
    const stack = new TaskStack()
    const checked: Record<string, boolean> = {}

    /**
     * 搜索最终节点
     */
    let finalNodeId = entryNode.id
    while (true) {
      const nextEdge = edges.find((edge) => edge.source === finalNodeId)
      if (!nextEdge) {
        break
      }
      finalNodeId = nextEdge.target
    }

    const finalNode = nodes.find((node) => node.id === finalNodeId)!
    const waiting = [finalNode]
    /**
     * 搜索依赖的节点
     * 1. 往上搜索依赖的节点
     * 2. 保持最上的依赖在 stack 的最上面
     */
    while (waiting.length > 0) {
      const node = waiting.shift()!
      if (checked[node.id]) {
        continue
      }

      const depEdges = edges.filter((edge) => edge.target === node.id)
      const depNodes = depEdges
        .map((edge) => nodes.find((node) => node.id === edge.source))
        .filter((node) => node && !checked[node.id]) as EngineNode[]
      const task = new Task(node, depEdges)
      stack.push(task)
      waiting.push(...depNodes)

      checked[node.id] = true
    }

    return stack
  }

  destroy() {
    // @ts-ignore
    this.store = null
  }
}

export { EngineCore }

import { createContext, useContext, useEffect, useMemo } from 'react'
import type { Node, Edge } from 'reactflow'
import { type StoreApi, createStore, useStore } from 'zustand'
import { shallow } from 'zustand/shallow'
import type { DataInEngine } from './types'
import { EngineCore } from './core/EngineCore'

export interface FlowDataState {
  // states
  nodes: Node<DataInEngine>[]
  nodeTypesList: string[]
  edges: Edge[]
  systemRunning: boolean
  // actions
  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[]) => void
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

export const IndividualFlowContext = createContext<StoreApi<FlowDataState>>(
  null as any,
)

function extractNodeTypesList(nodes: Node[]) {
  return Array.from(new Set(nodes.map((node) => node.type!))).sort()
}

/**
 * 初始化 flow data
 */
export function useInitialFlow(
  initialValue: Pick<FlowDataState, 'nodes' | 'edges'>,
) {
  const engine = useMemo(() => {
    return new EngineCore()
  }, [])

  const store = useMemo(() => {
    const _store = createStore<FlowDataState>((set, get) => {
      return {
        // states
        ...initialValue,
        nodeTypesList: extractNodeTypesList(initialValue.nodes),
        systemRunning: false,
        // actions
        setNodes: (nodes) => {
          set({ nodes, nodeTypesList: extractNodeTypesList(nodes) })
        },
        setEdges: (edges) => {
          set({ edges })
        },
        updateNodeData: (id, data: any) => {
          const nodes = get().nodes
          const nodeIdx = nodes.findIndex((node) => node.id === id)
          if (nodeIdx > -1) {
            const newNodes = [...nodes]
            const node = newNodes[nodeIdx]
            newNodes[nodeIdx] = {
              ...node,
              data: { ...node.data, ...data },
            }
            set({ nodes: newNodes })
          }
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

/**
 * 获取当前 flow data 的内容
 */
export function useGetFlow<U>(selector: (state: FlowDataState) => U) {
  const store = useContext(IndividualFlowContext)
  return useStore(store, selector, compare)
}

function compare<T>(objA: T, objB: T): boolean {
  if (typeof objA === 'function' || typeof objB === 'function') {
    return Object.is(objA, objB)
  }

  if (Array.isArray(objA) || Array.isArray(objB)) {
    return Object.is(objA, objB)
  }

  if (
    typeof objA === 'string' ||
    typeof objA === 'number' ||
    typeof objA === 'boolean'
  ) {
    return objA === objB
  }

  return shallow(objA, objB)
}

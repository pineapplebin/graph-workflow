import { createContext, useContext, useEffect, useMemo } from 'react'
import {
  Node,
  Edge,
  NodeChange,
  applyNodeChanges,
  EdgeChange,
  applyEdgeChanges,
  addEdge,
  Connection,
} from 'reactflow'
import { StoreApi, createStore, useStore } from 'zustand'
import { shallow } from 'zustand/shallow'
import { DataInEngine } from './types'
import { EnginePipeline } from './core/EnginePipeline'

export interface FlowDataState {
  // states
  nodes: Node<DataInEngine>[]
  edges: Edge[]
  systemRunning: boolean
  // actions
  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[]) => void
  onNodesChange: (changes: NodeChange[]) => void
  onEdgesChange: (changes: EdgeChange[]) => void
  onConnect: (params: Edge | Connection) => void
  updateNodeData: (id: string, data: any) => void
  // engine related
  startRun: (nodeId: string) => void
}

export const IndividualFlowContext = createContext<StoreApi<FlowDataState>>(
  null as any,
)

/**
 * 初始化 flow data
 */
export function useInitialFlow(
  initialValue: Pick<FlowDataState, 'nodes' | 'edges'>,
) {
  const engine = useMemo(() => {
    return new EnginePipeline()
  }, [])

  const store = useMemo(() => {
    const _store = createStore<FlowDataState>((set, get) => {
      return {
        // states
        ...initialValue,
        systemRunning: false,
        // actions
        setNodes: (nodes) => {
          set({ nodes })
        },
        setEdges: (edges) => {
          set({ edges })
        },
        onNodesChange: (changes) => {
          set({ nodes: applyNodeChanges(changes, get().nodes) })
        },
        onEdgesChange: (changes) => {
          set({ edges: applyEdgeChanges(changes, get().edges) })
        },
        onConnect: (params) => {
          set({ edges: addEdge(params, get().edges) })
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

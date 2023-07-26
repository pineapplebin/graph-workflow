import { createContext, useContext, useMemo } from 'react'
import { Node, Edge, NodeChange, applyNodeChanges } from 'reactflow'
import { StoreApi, createStore, useStore } from 'zustand'
import { shallow } from 'zustand/shallow'

export interface FlowDataState {
  nodes: Node[]
  edges: Edge[]
  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[]) => void
  onNodesChange: (changes: NodeChange[]) => void
  updateNodeData: (id: string, data: any) => void
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
  const store = useMemo(() => {
    return createStore<FlowDataState>((set, get) => {
      return {
        ...initialValue,
        setNodes: (nodes: Node[]) => {
          set({ nodes })
        },
        setEdges: (edges: Edge[]) => {
          set({ edges })
        },
        onNodesChange: (changes: NodeChange[]) => {
          set({ nodes: applyNodeChanges(changes, get().nodes) })
        },
        updateNodeData: (id: string, data: any) => {
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
      }
    })
  }, [])
  return store
}

/**
 * 获取当前 flow data 的内容
 */
export function useGetFlow<U>(selector: (state: FlowDataState) => U) {
  const store = useContext(IndividualFlowContext)
  return useStore(store, selector, shallow)
}

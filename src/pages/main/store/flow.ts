import { create } from 'zustand'
import { Node, Edge, NodeChange, applyNodeChanges } from 'reactflow'

export interface FlowDataState {
  nodes: Node[]
  edges: Edge[]
  restoreFlowDataFromPersistence: () => void
  onNodesChange: (changes: NodeChange[]) => void
}

export const useFlowData = create<FlowDataState>((set, get) => ({
  nodes: [],
  edges: [],
  restoreFlowDataFromPersistence: () => {
    set(() => ({
      nodes: [
        {
          id: 'ChooseFile',
          type: 'ChooseFile',
          position: { x: 0, y: 0 },
          data: {},
        },
      ],
      edges: [],
    }))
  },
  onNodesChange: (changes: NodeChange[]) => {
    set(() => ({
      nodes: applyNodeChanges(changes, get().nodes),
    }))
  },
}))

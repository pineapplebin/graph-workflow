import { createContext } from 'react'
import { Node } from 'reactflow'

export interface NodeContextValue {
  nodeId: string | null
  node: Node | null
}

export const NodeContext = createContext<NodeContextValue>({
  nodeId: null,
  node: null,
})

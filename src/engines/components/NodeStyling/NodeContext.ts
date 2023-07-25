import { createContext } from 'react'
import { Node } from 'reactflow'

export interface NodeContextValue {
  node: Node | null
}

export const NodeContext = createContext<NodeContextValue>({
  node: null,
})

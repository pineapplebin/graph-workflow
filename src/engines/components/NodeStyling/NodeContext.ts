import { createContext } from 'react'
import { EngineNode } from '../../types'

export interface NodeContextValue {
  nodeId: string | null
  node: EngineNode | null
}

export const NodeContext = createContext<NodeContextValue>({
  nodeId: null,
  node: null,
})

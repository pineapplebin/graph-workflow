import { createContext } from 'react'
import { noop } from 'lodash'
import type { LimitedNodeProps } from '../../types'

export interface NodeContextValue {
  nodeId: string | null
  node: LimitedNodeProps | null
  error: string | null
}

export const NodeContext = createContext<NodeContextValue>({
  nodeId: null,
  node: null,
  error: null,
})

export const NodeFormValueContext = createContext<{
  value: Record<string, any>
  onChange: (key: string, value: any) => void
}>({
  value: {},
  onChange: noop,
})

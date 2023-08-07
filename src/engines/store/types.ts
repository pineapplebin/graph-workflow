import type { EngineNode } from '../types'

export type StoreNode = {
  node: EngineNode
  paramsEdges: {
    [p: string]: string // nodeId
  }
}

import type { Node, Edge } from 'reactflow'
import type { DataInEngine, EngineNode } from '../types'
import type { GraphData } from './GraphData'

export type StoreNode = {
  node: Node
  data: DataInEngine
  paramsEdges: {
    [p: string]: string // nodeId
  }
}

export interface FlowDataState {
  // states
  graphData: GraphData
  nodes: EngineNode[]
  edges: Edge[]
  nodeTypesList: string[]
  // engine related
  systemRunning: boolean
  startRun: (nodeId: string) => void
}

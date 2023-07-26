import { RefObject } from 'react'
import { Node } from 'reactflow'

export type NodeComponentRunnerHelpers = {
  updateCurrentNodeData: (data: DataInEngine) => void
}
export type NodeComponentRunner = (
  args: Record<string, any>,
  helpers: NodeComponentRunnerHelpers,
) => Promise<void>

type ExecuteNodeComponentRunner = (args: Record<string, any>) => Promise<void>

export type NodeComponentHandler = {
  run: ExecuteNodeComponentRunner
}

export type DataInEngine = {
  ref?: RefObject<NodeComponentHandler>
  params?: Record<string, any>
  output?: any
}

export type EngineNode = Node<DataInEngine>

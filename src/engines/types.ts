import type { RefObject } from 'react'
import type { Node } from 'reactflow'

export type NodeComponentRunnerHelpers<T extends Record<string, any>> = {
  updateCurrentNodeData: (data: DataInEngine) => void
  updateErrorMessage: (msg: string | null) => void
  updateFormValue: <K extends keyof T>(field: K, value: T[K]) => void
}
export type NodeComponentRunner<T extends Record<string, any>> = (
  args: Partial<T>,
  helpers: NodeComponentRunnerHelpers<T>,
) => Promise<void>

type ExecuteNodeComponentRunner = (args: Record<string, any>) => Promise<void>

export type NodeComponentHandler = {
  run: ExecuteNodeComponentRunner
}

export type DataInEngine<
  P extends Record<string, any> = Record<string, any>,
  O = any,
> = {
  ref?: RefObject<NodeComponentHandler>
  params?: P
  output?: O
}

export type EngineNode = Node<DataInEngine>

export type LimitedNodeProps<
  P extends Record<string, any> = Record<string, any>,
  O = any,
> = {
  id: string
  type: string
  data: DataInEngine<P, O>
  selected: boolean
}

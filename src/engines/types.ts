import type { ComponentType, RefObject } from 'react'
import type { Node } from 'reactflow'

/**
 * 自定义节点 runner 方法传入的辅助函数
 */
export type NodeComponentRunnerHelpers<T extends Record<string, any>> = {
  updateCurrentNodeData: (data: DataInEngine) => void
  updateErrorMessage: (msg: string | null) => void
  updateFormValue: <K extends keyof T>(field: K, value: T[K]) => void
}

/**
 * 自定义节点 runner 方法
 */
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
  paramsEdges?: Partial<{ [K in keyof P]: string }>
  output?: O
}

export type EngineNode<
  P extends Record<string, any> = Record<string, any>,
  O = any,
> = Node<DataInEngine<P, O>>

/**
 * 自定义节点组件传入的受限的 node 参数
 */
export type LimitedNodeProps<
  P extends Record<string, any> = Record<string, any>,
  O = any,
> = {
  id: string
  type: string
  data: DataInEngine<P, O>
  selected: boolean
}

/**
 * params 部分表单组件的 props
 */
export type ParamsFormComponentProps<T = any> = {
  value?: T
  onChange?: (val: T) => void
  disabled?: boolean
}

/**
 * params 部分表单组件
 */
export type ParamsFormComponent = ComponentType<ParamsFormComponentProps>

/**
 * output 部分组件
 */
export type OutputContentComponent<
  T extends Record<string, any>,
  O = any,
> = ComponentType<LimitedNodeProps<T, O>>

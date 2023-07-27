import {
  type ComponentType,
  memo,
  useMemo,
  type ReactNode,
  useCallback,
} from 'react'
import type { NodeProps } from 'reactflow'
import type {
  DataInEngine,
  LimitedNodeProps,
  NodeComponentRunner,
} from './types'
import { NodePanel, NodeVariable, NodeOutput } from './components/NodeStyling'
import { useCustomNode } from './utils/hooks'
import type { PipelineType } from './pipelines'
import { generatePipelineRunner } from './pipelines/runner'

const BUILD_PROPS = 'buildProps'

/**
 * 根据配置包装自定义节点组件
 *
 * 主要是根据配置的 params 和 output 生成对应的内容和端口
 * 只接受 id, type, data, selected 等有限的 props
 * 不会因为位置变化而重新 render
 */
function BuildUpComponent(
  props: LimitedNodeProps & {
    [BUILD_PROPS]: BuildUpOptions<any>
  },
) {
  const { [BUILD_PROPS]: buildUpProps, ...limitedProps } = props

  const realRunner: NodeComponentRunner<any> = useCallback(
    async (...args) => {
      if (buildUpProps.pipelines) {
        const pipelineRunner = generatePipelineRunner(buildUpProps.pipelines)
        await pipelineRunner.apply(null, args)
      }
      if (buildUpProps.runner) {
        await buildUpProps.runner.apply(null, args)
      }
    },
    [buildUpProps.runner, buildUpProps.pipelines],
  )

  const { data, helpers } = useCustomNode(props.id, {
    runner: realRunner,
    initialFormValue: buildUpProps.initialFormValue,
  })

  const paramsElement = useMemo(() => {
    return buildUpProps.params?.map(({ Body, ...rest }) => {
      const body = Body && <Body />

      return (
        <NodeVariable key={rest.name} {...rest}>
          {body}
        </NodeVariable>
      )
    })
  }, [buildUpProps.params])

  const outputElement = useMemo(() => {
    if (!buildUpProps.output) {
      return null
    }
    const { typing, Body } = buildUpProps.output
    const body = Body && <Body {...limitedProps} />

    return <NodeOutput typing={typing}>{body}</NodeOutput>
  }, [limitedProps, buildUpProps.output])

  return (
    <NodePanel
      {...data}
      limitedNode={limitedProps}
      onChange={helpers.updateFormValue}
    >
      {paramsElement}
      {outputElement}
    </NodePanel>
  )
}

type TMemoBuildUpComponent = <T extends Record<string, any>, O = any>(
  props: LimitedNodeProps<T, O> & {
    [BUILD_PROPS]: BuildUpOptions<T>
  },
) => ReactNode
const MemoBuildUpComponent: TMemoBuildUpComponent = memo(BuildUpComponent)

export type ParamsPortOption = {
  name: string
  label: string
  typing: string
  unConnectable?: boolean
  Body?: ComponentType<{ value?: any; onChange?: (val: any) => void }>
}
export type OutputPortOption<T extends Record<string, any>, O> = {
  typing: string
  Body?: ComponentType<LimitedNodeProps<T, O>>
}

export interface BuildUpOptions<T extends Record<string, any>, O = any> {
  name: string
  initialFormValue: Partial<T>
  runner?: NodeComponentRunner<T>
  pipelines?: PipelineType[]
  params?: ParamsPortOption[]
  output?: OutputPortOption<T, O>
}

/**
 * 1. 传入参数返回一个组件
 * 2. 根据 options 生成内容
 * 3. 组件的 props 会从 NodeProps 中剔除关于位置的属性
 */
export function buildUp<T extends Record<string, any>, O = any>(
  options: BuildUpOptions<T, O>,
): ComponentType<NodeProps<DataInEngine<T, O>>> {
  const Comp = memo((props: NodeProps<DataInEngine<T, O>>) => {
    const limitedProps = {
      id: props.id,
      type: props.type,
      data: props.data,
      selected: props.selected,
    }

    const buildProps = useMemo<{
      [BUILD_PROPS]: BuildUpOptions<T, O>
    }>(() => {
      return {
        [BUILD_PROPS]: options,
      }
    }, [options])

    return <MemoBuildUpComponent<T, O> {...limitedProps} {...buildProps} />
  })
  Comp.displayName = options.name

  return Comp
}

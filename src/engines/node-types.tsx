import { lazy, useMemo, type ComponentType, Suspense } from 'react'
import type { NodeProps, NodeTypes } from 'reactflow'

/**
 * 1. 动态加载节点类型
 */
export function useNodeTypes(nodeTypesList: string[]): NodeTypes {
  return useMemo(() => {
    return nodeTypesList.reduce((acc, type) => {
      acc[type] = CustomNodeComponent
      return acc
    }, {} as NodeTypes)
  }, [nodeTypesList])
}

const CustomNodeComponent: ComponentType<NodeProps> = (props) => {
  const { type } = props

  const Comp = useMemo(() => {
    return lazy<ComponentType<NodeProps>>(
      () => import(`./built-ins/${type}/index.ts`),
    )
  }, [type])

  return (
    <Suspense>
      <Comp {...props} />
    </Suspense>
  )
}

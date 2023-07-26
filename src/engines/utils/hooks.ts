import {
  DependencyList,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import { useNodes, Node } from 'reactflow'
import { useGetFlow } from '../store'

/**
 * 在 custom node 中获取当前 node
 */
export function useCurrentNode<T = any>(
  nodeId: string | null,
): {
  node: Node<T> | null
  nodeId: string | null
} {
  const nodes = useNodes()

  const node = useMemo(() => {
    return nodes.find((node) => node.id === nodeId) as Node<T> | undefined
  }, [nodeId, nodes])

  return {
    node: node || null,
    nodeId,
  }
}

export type NodeComponentHandler = {
  run: (args?: Record<string, any>) => Promise<void>
}

/**
 * 将当前组件引用注册到 flow data 中
 */
export function useRegisterNodeComponent(
  id: string | null,
  handler: NodeComponentHandler,
  deps: DependencyList,
) {
  const ref = useRef<NodeComponentHandler>(null)
  useImperativeHandle(ref, () => handler, deps)

  const updateNodeData = useGetFlow((state) => state.updateNodeData)
  useEffect(() => {
    if (!id) return
    updateNodeData(id, { ref })
    return () => {
      updateNodeData(id, { ref: null })
    }
  }, [])

  return ref
}

/**
 * 生成一个随机 hash id
 * 组件生命周期内保持一致
 * 常用于 label 的 htmlFor 属性
 */
export function useHashId(): string {
  return useMemo(() => Math.random().toString(36).slice(2), [])
}

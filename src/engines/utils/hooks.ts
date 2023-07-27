import {
  type DependencyList,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useNodes, type Node } from 'reactflow'
import { useMemoizedFn } from 'ahooks'
import { useGetFlow } from '../store'
import type {
  DataInEngine,
  NodeComponentHandler,
  NodeComponentRunner,
  NodeComponentRunnerHelpers,
} from '../types'
import { sleep } from './tools'

/**
 * 在 custom node 中获取当前 node
 */
export function useCurrentNode(nodeId: string | null): {
  node: Node<DataInEngine> | null
  nodeId: string | null
} {
  const nodes = useNodes()

  const node = useMemo(() => {
    return nodes.find((node) => node.id === nodeId) as
      | Node<DataInEngine>
      | undefined
  }, [nodeId, nodes])

  return {
    node: node || null,
    nodeId,
  }
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
 * 处理 runner 相关逻辑
 * running 等状态
 */
export function useRunner(
  fn: NodeComponentRunner,
  helpers: NodeComponentRunnerHelpers,
) {
  const [running, setRunning] = useState(false)

  const run = useMemoizedFn(async (args: Record<string, any>) => {
    setRunning(true)
    const start = Date.now()
    const rst = await fn(args, helpers)
    const end = Date.now()
    if (end - start < 1000) {
      await sleep(1000 - (end - start))
    }
    setRunning(false)
    return rst
  })

  return { run, running }
}

/**
 * 自定义节点的所有 hooks 集合
 */
export function useCustomNode<F extends NodeComponentRunner>(
  nodeId: string | null,
  runner: F,
) {
  // 获取当前节点
  const { node } = useCurrentNode(nodeId)
  const { updateNodeData } = useGetFlow((state) => ({
    updateNodeData: state.updateNodeData,
  }))

  const helpers = useMemo<NodeComponentRunnerHelpers>(() => {
    return {
      updateCurrentNodeData: (data) => {
        if (!nodeId) {
          return
        }
        updateNodeData(nodeId, data)
      },
    }
  }, [nodeId, updateNodeData])

  const { run, running } = useRunner(runner, helpers)
  // 注册到 flow data 中
  const ref = useRegisterNodeComponent(nodeId, { run }, [])

  return { node, nodeId, running, ref, ...helpers }
}

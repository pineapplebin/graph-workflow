import {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  useReducer,
  type RefObject,
} from 'react'
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
 * 将当前组件引用注册到 flow data 中
 */
export function useRegisterNodeComponent(
  id: string | null,
  handler: NodeComponentHandler,
  updateRef: (ref: RefObject<NodeComponentHandler> | null) => void,
) {
  const ref = useRef<NodeComponentHandler>(null)
  useImperativeHandle(ref, () => handler, [])

  useEffect(() => {
    if (!id) return
    updateRef(ref)
    return () => {
      updateRef(null)
    }
  }, [])

  return ref
}

/**
 * 处理 runner 相关逻辑
 * running 等状态
 */
export function useRunner<T extends Record<string, any>>(
  fn: NodeComponentRunner<T>,
  helpers: NodeComponentRunnerHelpers<T>,
  formValue: Partial<T>,
) {
  const [running, setRunning] = useState(false)

  const run = useMemoizedFn(async (args: Partial<T>) => {
    helpers.updateErrorMessage(null)
    setRunning(true)
    const start = Date.now()

    try {
      const rst = await fn({ ...formValue, ...args }, helpers)
      const end = Date.now()
      if (end - start < 1000) {
        await sleep(1000 - (end - start))
      }
      return rst
    } catch (e) {
      helpers.updateErrorMessage((e as Error).message)
      throw e
    } finally {
      setRunning(false)
    }
  })

  return { run, running }
}

/**
 * 自定义节点的表单数据
 */
export function useFormValue<T extends Record<string, any>>(
  initialValue: Partial<T>,
) {
  const [value, dispatch] = useReducer(
    (state: T, { type, data }: { type: string; data: any }) => {
      switch (type) {
        case 'update':
          return { ...state, ...data }
        case 'clear':
          return {}
      }
      return state
    },
    initialValue,
  )

  return { formValue: value as Partial<T>, dispatchFormValueUpdate: dispatch }
}

type UseCustomNodeOptions<T extends Record<string, any>> = {
  runner: NodeComponentRunner<T>
  initialFormValue: Partial<T>
}

/**
 * 自定义节点的所有 hooks 集合
 */
export function useCustomNode<T extends Record<string, any>>(
  nodeId: string | null,
  { runner, initialFormValue }: UseCustomNodeOptions<T>,
) {
  // 获取当前节点
  const { graphData } = useGetFlow((state) => ({
    graphData: state.graphData,
  }))

  const { formValue, dispatchFormValueUpdate } =
    useFormValue<T>(initialFormValue)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // 各种辅助函数
  const helpers = useMemo(() => {
    const _helpers = {
      updateCurrentNodeData: (data: DataInEngine) => {
        if (nodeId) {
          graphData.updateNodeData(nodeId, data)
        }
      },
      updateErrorMessage(msg: string | null) {
        setErrorMsg(msg)
      },
      updateFormValue<K extends keyof T>(field: K, value: T[K]) {
        dispatchFormValueUpdate({ type: 'update', data: { [field]: value } })
        // 清空错误信息、输出数据
        setErrorMsg(null)
        if (nodeId) {
          graphData.updateNodeData(nodeId, { output: undefined })
        }
      },
    }
    return _helpers
  }, [nodeId, graphData, dispatchFormValueUpdate])

  // 包装 run 逻辑
  const { run, running } = useRunner<T>(runner, helpers, formValue)
  // 注册到 flow data 中
  const ref = useRegisterNodeComponent(
    nodeId,
    { run: run as NodeComponentHandler['run'] },
    (ref: RefObject<NodeComponentHandler> | null) => {
      helpers.updateCurrentNodeData({ ref: ref ?? undefined })
    },
  )

  return {
    ref,
    data: {
      nodeId,
      running,
      formValue,
      error: errorMsg,
    },
    helpers,
  }
}

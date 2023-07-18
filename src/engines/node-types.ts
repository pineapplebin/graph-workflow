import { ComponentType, MemoExoticComponent, useMemo } from 'react'

const CONST_NODE_TYPES: Record<string, MemoExoticComponent<ComponentType>> = {}

/**
 * TODO: 后面应该过滤完之后返回
 */
export function useNodeTypes(): Record<
  string,
  MemoExoticComponent<ComponentType>
> {
  return useMemo(() => {
    return CONST_NODE_TYPES
  }, [])
}

import { useMemo } from 'react'
import { ChooseFileNode } from './built-ins/ChooseFile'
import { NodeTypes } from 'reactflow'

const CONST_NODE_TYPES: NodeTypes = {
  ChooseFile: ChooseFileNode,
}

/**
 * TODO: 后面应该过滤完之后返回
 */
export function useNodeTypes(): NodeTypes {
  return useMemo(() => {
    return CONST_NODE_TYPES
  }, [])
}

import { useMemo } from 'react'
import type { NodeTypes } from 'reactflow'

import { ChooseFile } from './built-ins/ChooseFile'
import { ImagePreview } from './built-ins/ImagePreview'

const CONST_NODE_TYPES: NodeTypes = {
  ChooseFile,
  ImagePreview,
}

/**
 * TODO: 后面应该过滤完之后返回
 */
export function useNodeTypes(): NodeTypes {
  return useMemo(() => {
    return CONST_NODE_TYPES
  }, [])
}

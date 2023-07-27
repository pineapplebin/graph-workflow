import type { PassThroughFn } from '../types'

export function paramsToOutput(field: string): PassThroughFn {
  return (...args) => {
    const [value, helpers] = args
    helpers.updateCurrentNodeData({ output: value[field] })
    return args
  }
}

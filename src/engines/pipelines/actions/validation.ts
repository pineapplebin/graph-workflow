import { PipeLineError } from '../tools'
import type { PassThroughFn } from '../types'

export function required(field: string): PassThroughFn {
  return (...args) => {
    const value = args[0]
    if (value[field] === undefined || value[field] === null) {
      throw new PipeLineError(`需要参数：${field}`)
    }
    return args
  }
}

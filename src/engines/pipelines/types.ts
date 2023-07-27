import type { NodeComponentRunnerHelpers } from '../types'

export type PassThroughFn<T extends Record<string, any> = Record<string, any>> =
  (value: Partial<T>, helpers: NodeComponentRunnerHelpers<T>) => void

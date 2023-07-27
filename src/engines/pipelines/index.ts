import { required } from './actions/validation'
import { paramsToOutput } from './actions/assignment'

export const PIPELINES = {
  'validation.required': required,
  'assignment.paramsToOutput': paramsToOutput,
} as const

export type Pipelines = typeof PIPELINES

export type PipelineType<K = keyof Pipelines> = K extends keyof Pipelines
  ? [K, ...Parameters<Pipelines[K]>]
  : never

import type { NodeComponentRunnerHelpers } from '../types'
import { PIPELINES, type PipelineType } from './index'
import { PipeLineError } from './tools'

type PipelineRunner = (
  value: Record<string, any>,
  helpers: NodeComponentRunnerHelpers<Record<string, any>>,
) => Promise<void>

export function generatePipelineRunner(
  pipelines: PipelineType[],
): PipelineRunner {
  return async (...args) => {
    let resultAsArgs: any = args
    const errors: string[] = []

    for (const pl of pipelines) {
      const [name, ...args] = pl
      if (!(name in PIPELINES)) {
        throw new Error(`不存在的 pipeline: ${name}`)
      }

      try {
        const fn = PIPELINES[name]
        const runner = fn.apply(null, args)
        resultAsArgs = await runner.apply(null, resultAsArgs)
      } catch (e) {
        if (e instanceof PipeLineError) {
          errors.push(e.message)
          continue
        } else {
          throw e
        }
      }
    }

    if (errors.length) {
      throw new Error(errors.join('\n'))
    }

    return resultAsArgs
  }
}

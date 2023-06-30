import { useMemo, type CSSProperties } from 'react'
import { mergeWith, merge } from 'lodash'
import type { NotUndefined } from '../type-tools'

type OriginProps = Record<string, any>

type PropsWithDefaults<P extends OriginProps, D extends Partial<P>> = Omit<
  P,
  keyof D
> & {
  [K in keyof D]-?: NotUndefined<D[K]>
}

/**
 * 给 props 添加默认值
 * 设置默认值后的 props 中，所有的属性都不会是 undefined
 */
export function usePropsWithDefaults<
  P extends Record<string, any>,
  D extends Partial<P>,
>(props: P, defaults: D): PropsWithDefaults<P, D> {
  return mergeWith({}, props, defaults, (objValue, srcValue) => {
    if (objValue === undefined) {
      return srcValue
    }
    return objValue
  }) as PropsWithDefaults<P, D>
}

/**
 * 合并 style
 */
export function useMergeStyle(
  ...styles: (CSSProperties | undefined)[]
): CSSProperties | undefined {
  return useMemo(() => {
    const mapped = styles
      .map((style) => {
        if (style === undefined) {
          return undefined
        }
        if (Object.keys(style).length === 0) {
          return undefined
        }
        return style
      })
      .filter(Boolean)
    if (mapped.length === 0) {
      return undefined
    }
    return merge({}, ...mapped)
  }, styles)
}

import { type FC, useMemo, forwardRef } from 'react'
import { useMergeStyle } from './with-defaults'
import type { PropsWithStyling } from '../common-types'

import cx from 'classnames'
import styles from './flex.module.css'

export interface AsFlexItemProps {
  /**
   * 主轴上伸展控制
   */
  flexGrow?: boolean | number
  /**
   * 主轴上收缩控制
   */
  flexShrink?: boolean | number
}

export interface UseAsFlexItemResult {
  className: string | null
  style: Partial<React.CSSProperties>
}

/**
 * 处理 flex 的 grow 和 shrink 属性
 */
export function useAsFlexItem<P extends AsFlexItemProps>({
  flexGrow,
  flexShrink,
}: P): UseAsFlexItemResult {
  return useMemo(() => {
    const result: UseAsFlexItemResult = { className: null, style: {} }

    if (flexGrow === true || flexGrow === 1) {
      result.className = cx(result.className, styles.flexGrow)
    } else if (flexGrow === false || flexGrow === 0) {
      result.className = cx(result.className, styles.noFlexGrow)
    } else if (typeof flexGrow === 'number') {
      result.style.flexGrow = flexGrow
    }
    if (flexShrink === true || flexShrink === 1) {
      result.className = cx(result.className, styles.flexShrink)
    } else if (flexShrink === false || flexShrink === 0) {
      result.className = cx(result.className, styles.noFlexShrink)
    } else if (typeof flexShrink === 'number') {
      result.style.flexShrink = flexShrink
    }

    return result
  }, [flexGrow, flexShrink])
}

/**
 * asFlexItem hoc
 */
export function asFlexItem<T extends unknown, P extends PropsWithStyling>(
  comp: FC<P>,
) {
  const Comp = comp

  return forwardRef<T, P & AsFlexItemProps>(function (props, ref) {
    const { className, style } = useAsFlexItem(props)

    const passedClassName = cx(className, props.className)
    const passedStyle = useMergeStyle(style, props.style)

    return (
      <Comp
        ref={ref}
        className={passedClassName}
        style={passedStyle}
        {...props}
      />
    )
  })
}

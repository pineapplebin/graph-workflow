import { type PropsWithChildren, forwardRef } from 'react'
import { asFlexItem, useMergeStyle } from '../../hooks'
import type { PropsWithStyling } from '../../common-types'

import cx from 'classnames'
import styles from './index.module.css'

interface ContainerProps
  extends PropsWithChildren,
    PropsWithStyling,
    Partial<Pick<HTMLDivElement, 'tabIndex'>> {
  width?: number | string
  height?: number | string
  /**
   * 是否可滚动
   * true 时 x 轴与 y 轴都可滚动
   */
  scrollable?: boolean
  onClick?: () => void
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, style, children, ...props }, ref) => {
    const { width, height, scrollable, onClick, ...restDivAttrs } = props

    const mergedStyle = useMergeStyle(style, {
      width,
      height,
    })

    return (
      <div
        ref={ref}
        className={cx(
          className,
          styles.Container,
          scrollable && styles.Scrollable,
        )}
        style={mergedStyle}
        onClick={onClick}
        {...restDivAttrs}
      >
        {children}
      </div>
    )
  },
)

export default asFlexItem<HTMLDivElement, ContainerProps>(Container)

import { FC, PropsWithChildren } from 'react'
import { PropsWithStyling, asFlexItem, useMergeStyle } from '@/desktop-ui'

import cx from 'classnames'
import styles from './index.module.css'

interface ContainerProps extends PropsWithChildren, PropsWithStyling {
  width?: number | string
  height?: number | string
  scrollable?: boolean
}

const Container: FC<ContainerProps> = ({
  className,
  style,
  children,
  ...props
}) => {
  const { width, height, scrollable } = props

  const mergedStyle = useMergeStyle(style, {
    width,
    height,
  })

  return (
    <div
      className={cx(
        className,
        styles.Container,
        scrollable && styles.Scrollable,
      )}
      style={mergedStyle}
    >
      {children}
    </div>
  )
}

export default asFlexItem(Container)

import { type FC, type PropsWithChildren } from 'react'
import { asFlexItem, useMergeStyle, usePropsWithDefaults } from '../../hooks'
import { MainAxisAlignment } from '../../enums'
import type { PropsWithStyling } from '../../common-types'

import cx from 'classnames'
import styles from './index.module.css'

export interface ColumnProps extends PropsWithStyling, PropsWithChildren {
  /**
   * 主轴对齐方式
   */
  mainAxisAlignment?: MainAxisAlignment
}

const Column: FC<ColumnProps> = ({ className, style, children, ...rest }) => {
  const props = usePropsWithDefaults(rest, {
    mainAxisAlignment: MainAxisAlignment.start,
  })

  const mergedStyle = useMergeStyle(style, {
    justifyContent: props.mainAxisAlignment,
  })

  return (
    <div className={cx(className, styles.Column)} style={mergedStyle}>
      {children}
    </div>
  )
}

export default asFlexItem(Column)

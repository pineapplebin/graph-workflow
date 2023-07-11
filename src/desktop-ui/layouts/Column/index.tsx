import { type FC, type PropsWithChildren } from 'react'
import { asFlexItem, type PropsWithStyling } from '@/desktop-ui'
import cx from 'classnames'

import styles from './index.module.css'

export interface ColumnProps extends PropsWithStyling, PropsWithChildren {}

const Column: FC<ColumnProps> = ({ className, style, children }) => {
  return (
    <div className={cx(className, styles.Column)} style={style}>
      {children}
    </div>
  )
}

export default asFlexItem(Column)

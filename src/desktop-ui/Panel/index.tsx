import type { FC, PropsWithChildren } from 'react'
import type { PropsWithStyling } from '../common-types'

import cx from 'classnames'
import styles from './index.module.css'

export interface PanelProps extends PropsWithChildren, PropsWithStyling {}

const Panel: FC<PanelProps> = ({ className, style, children }) => {
  return (
    <div className={cx(styles.Panel, className)} style={style}>
      {children}
    </div>
  )
}

export default Panel

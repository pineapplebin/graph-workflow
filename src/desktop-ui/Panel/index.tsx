import type { FC, PropsWithChildren } from 'react'
import type { PropsWithStyling } from '../common-types'

import cx from 'classnames'

export interface PanelProps extends PropsWithChildren, PropsWithStyling {}

const Panel: FC<PanelProps> = ({ className, style, children }) => {
  return (
    <div
      className={cx('h-full w-full rounded-md bg-slate-100', className)}
      style={style}
    >
      {children}
    </div>
  )
}

export default Panel

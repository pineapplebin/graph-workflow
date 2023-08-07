import { type FC, type PropsWithChildren } from 'react'
import type { PropsWithStyling } from '../../common-types'

import cx from 'classnames'

export interface ColumnProps extends PropsWithStyling, PropsWithChildren {}

const Column: FC<ColumnProps> = ({ className, style, children }) => {
  return (
    <div
      className={cx('flex h-full w-full flex-col justify-start', className)}
      style={style}
    >
      {children}
    </div>
  )
}

export default Column

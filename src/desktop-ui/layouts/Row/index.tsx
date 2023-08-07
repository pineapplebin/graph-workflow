import { type FC, type PropsWithChildren } from 'react'
import type { PropsWithStyling } from '../../common-types'

import cx from 'classnames'

interface RowProps extends PropsWithStyling, PropsWithChildren {}

const Row: FC<RowProps> = ({ className, style, children }) => {
  return (
    <div
      className={cx(
        'flex h-full w-full flex-row items-center justify-start',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
}

export default Row

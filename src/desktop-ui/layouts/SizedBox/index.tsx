import { type FC, type PropsWithChildren } from 'react'
import { useMergeStyle } from '../../hooks'
import type { PropsWithStyling } from '../../common-types'

import cx from 'classnames'

export interface SizedBoxProps extends PropsWithStyling, PropsWithChildren {
  width?: number | string
  height?: number | string
}

const SizedBox: FC<SizedBoxProps> = ({
  width,
  height,
  className,
  style,
  children,
}) => {
  const mergedStyle = useMergeStyle(style, {
    width: width ?? undefined,
    height: height ?? undefined,
  })

  return (
    <div className={cx('shrink-0', className)} style={mergedStyle}>
      {children}
    </div>
  )
}

export default SizedBox

import { type FC, type PropsWithChildren } from 'react'
import { useMergeStyle } from '../../hooks'
import type { PropsWithStyling } from '../../common-types'

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
    flexShrink: 0,
  })

  return (
    <div className={className} style={mergedStyle}>
      {children}
    </div>
  )
}

export default SizedBox

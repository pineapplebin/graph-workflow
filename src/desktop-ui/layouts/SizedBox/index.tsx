import { PropsWithStyling, useMergeStyle } from '@/desktop-ui'
import { FC, PropsWithChildren } from 'react'

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

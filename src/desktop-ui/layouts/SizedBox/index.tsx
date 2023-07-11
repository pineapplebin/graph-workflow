import { PropsWithStyling, asFlexItem, useMergeStyle } from '@/desktop-ui'
import { FC, PropsWithChildren } from 'react'

interface SizedBoxProps extends PropsWithStyling, PropsWithChildren {
  width?: number
  height?: number
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

export default asFlexItem(SizedBox)

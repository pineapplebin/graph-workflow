import { type FC, type PropsWithChildren } from 'react'
import type { PropsWithStyling } from '../../common-types'

import { useSplitChildren } from './split'
import { useResizeChildren } from './resize'
import { useWrapUp } from './wrap'

import cx from 'classnames'

export interface HSplitContainerProps
  extends PropsWithChildren,
    PropsWithStyling {}

const HSplitContainer: FC<HSplitContainerProps> = ({
  className,
  style,
  children,
}) => {
  const elements = useSplitChildren(children)

  const { containerEl, panels, handleDrag } = useResizeChildren({
    direction: 'horizontal',
    children: elements,
  })

  const wrapped = useWrapUp({
    direction: 'horizontal',
    onDrag: handleDrag,
    panels,
  })

  return (
    <div
      ref={containerEl}
      className={cx('flex h-full w-full !flex-row', className)}
      style={style}
    >
      {wrapped}
    </div>
  )
}

export default HSplitContainer

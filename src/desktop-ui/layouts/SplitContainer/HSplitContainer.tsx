import { FC, PropsWithChildren, useMemo } from 'react'
import type { PropsWithStyling } from '../../common-types'
import { asFlexItem } from '../../hooks'
import SizedBox from '../SizedBox'

import { useSplitChildren } from './split'
import { useResizeChildren } from './resize'

import cx from 'classnames'
import styles from './HSplitContainer.module.css'
import { useWrapUp } from './wrap'

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
      className={cx(className, styles.HSplitContainer)}
      style={style}
    >
      {wrapped}
    </div>
  )
}

export default asFlexItem(HSplitContainer)

import { FC, PropsWithChildren, useMemo } from 'react'
import type { PropsWithStyling } from '../../common-types'
import { asFlexItem } from '../../hooks'
import { useSplitChildren } from './split'

import Grabber from './Grabber'
import SizedBox from '../SizedBox'
import { STYLING } from '@/utils/styling'

import cx from 'classnames'
import styles from './HSplitContainer.module.css'
import { useResizeChildren } from './resize'

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

  const grabber = useMemo(() => {
    return (
      <SizedBox width={STYLING.normalGap}>
        <Grabber direction="horizontal" onDrag={handleDrag}></Grabber>
      </SizedBox>
    )
  }, [handleDrag])

  const content = useMemo(() => {
    if (panels === null) {
      return <div>not valid</div>
    }
    return (
      <>
        {panels[0]}
        {grabber}
        {panels[1]}
      </>
    )
  }, [panels, handleDrag])

  return (
    <div
      ref={containerEl}
      className={cx(className, styles.HSplitContainer)}
      style={style}
    >
      {content}
    </div>
  )
}

export default asFlexItem(HSplitContainer)

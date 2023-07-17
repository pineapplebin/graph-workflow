import { FC, PropsWithChildren, useMemo, Children, ReactNode } from 'react'

import Container from '../Container'
import SizedBox from '../SizedBox'
import { asFlexItem, usePropsWithDefaults } from '../../hooks'
import { useResizeChildren } from './resize'

import type { PropsWithStyling } from '../../common-types'
import { STYLING } from '@/utils/styling'

import Grabber from './Grabber'

import cx from 'classnames'
import styles from './index.module.css'

export interface HSplitContainerProps
  extends PropsWithStyling,
    PropsWithChildren {
  initialLPanelWidth?: number | string
  initialRPanelWidth?: number | string
}

const HSplitContainer: FC<HSplitContainerProps> = ({
  className,
  style,
  children,
  ...rest
}) => {
  const { initialLPanelWidth, initialRPanelWidth } = usePropsWithDefaults(
    rest,
    {
      initialLPanelWidth: '100%',
      initialRPanelWidth: '100%',
    },
  )

  const {
    lChildEl,
    lPanelWidth,
    rChildEl,
    rPanelWidth,
    handleGrabberDrag,
    handleResizeContainer,
  } = useResizeChildren({
    initialLPanelWidth,
    initialRPanelWidth,
  })

  // 处理子元素切割
  const splitResult = useSplitChildren(children)
  if (splitResult === null) {
    return (
      <div style={{ color: 'darkred' }}>
        HSplitContainer accept only 2 children, got {Children.count(children)}
      </div>
    )
  }
  const [lChild, rChild] = splitResult

  return (
    <div
      className={cx(className, styles.HSplitContainer)}
      style={style}
      onResize={handleResizeContainer}
    >
      <Container
        ref={lChildEl}
        className={styles.Panel}
        width={lPanelWidth}
        flexGrow
      >
        {lChild}
      </Container>
      <SizedBox width={STYLING.normalGap}>
        <Grabber onDrag={handleGrabberDrag} />
      </SizedBox>
      <Container
        ref={rChildEl}
        className={styles.Panel}
        width={rPanelWidth}
        flexGrow
      >
        {rChild}
      </Container>
    </div>
  )
}

type SingleChild = Exclude<ReactNode, boolean | null | undefined>

/**
 * 分割 children，限定只能接受 2 个
 */
function useSplitChildren(
  children: PropsWithChildren['children'],
): [SingleChild, SingleChild] | null {
  return useMemo(() => {
    const childrenArray = Children.toArray(children)
    if (childrenArray.length !== 2) {
      return null
    }
    return [childrenArray[0], childrenArray[1]]
  }, [children])
}

export default asFlexItem(HSplitContainer)

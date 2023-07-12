import {
  FC,
  useState,
  useRef,
  PropsWithChildren,
  useMemo,
  Children,
  ReactNode,
  useLayoutEffect,
} from 'react'

import Container from '../Container'
import SizedBox from '../SizedBox'
import { asFlexItem, usePropsWithDefaults } from '../../hooks'

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

  const [lPanelWidth, setLPanelWidth] = useState<number | string>(
    initialLPanelWidth,
  )
  const [rPanelWidth, setRPanelWidth] = useState<number | string>(
    initialRPanelWidth,
  )

  const containerEl = useRef<HTMLDivElement>(null)
  const lChildEl = useRef<HTMLDivElement>(null)
  const rChildEl = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!containerEl.current || !lChildEl.current || !rChildEl.current) {
      return
    }
    const lChildWidth = lChildEl.current.getBoundingClientRect().width
    const rChildWidth = rChildEl.current.getBoundingClientRect().width

    setLPanelWidth(lChildWidth)
    setRPanelWidth(rChildWidth)
  }, [])

  const handleGrabberDrag = (dx: number) => {
    const intDx = Math.round(dx)
    if (typeof lPanelWidth === 'number') {
      setLPanelWidth(lPanelWidth + intDx)
    }
    if (typeof rPanelWidth === 'number') {
      setRPanelWidth(rPanelWidth - intDx)
    }
  }

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
      ref={containerEl}
      className={cx(className, styles.HSplitContainer)}
      style={style}
    >
      <Container
        ref={lChildEl}
        width={lPanelWidth}
        style={{ willChange: 'width', transition: 'width 0.2s ease-in-out' }}
        flexGrow
      >
        {lChild}
      </Container>
      <SizedBox width={STYLING.normalGap}>
        <Grabber onDrag={handleGrabberDrag} />
      </SizedBox>
      <Container
        ref={rChildEl}
        width={rPanelWidth}
        style={{ willChange: 'width', transition: 'width 0.2s ease-in-out' }}
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

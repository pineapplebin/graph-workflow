import {
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
  type ReactElement,
  useCallback,
} from 'react'
import Panel, { type PanelProps } from './Panel'
import { STYLING, stringUnitToNumberPx } from '@/utils/styling'
import clamp from 'lodash/clamp'

export interface UseResizeChildrenArgs {
  direction: 'horizontal' | 'vertical'
  children: [ReactElement, ReactElement] | null
  grabberSize?: number
}

type Sizes = [number, number]

const DEFAULT_GRABBER_SIZE = stringUnitToNumberPx(STYLING.normalGap)

export function useResizeChildren({
  direction,
  children,
  grabberSize = DEFAULT_GRABBER_SIZE,
}: UseResizeChildrenArgs) {
  const container = useRef<HTMLDivElement>(null)
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null)
  const [panelSizes, setPanelSizes] = useState<Sizes>([Infinity, Infinity])

  const { sizePropName } = useMemo(() => {
    return {
      sizePropName: direction === 'horizontal' ? 'width' : 'height',
    } as const
  }, [direction])
  const containerSize = containerRect?.[sizePropName] ?? 0

  /**
   * 计算每个 panel 的最小和最大尺寸
   */
  const limitSizes = useMemo<[Sizes, Sizes]>(() => {
    const CONST = [
      [0, Infinity],
      [0, Infinity],
    ] as [Sizes, Sizes]
    if (children === null) {
      return CONST
    }
    return children.map((child, idx) => {
      if (child.type === Panel) {
        const { minSize } = child.props as PanelProps
        return [minSize ?? 0, Infinity]
      }
      return CONST[idx]
    }) as typeof CONST
  }, [children])

  /**
   * 观察容器尺寸的变化
   */
  useLayoutEffect(() => {
    const observer = new ResizeObserver(() => {
      if (container.current) {
        setContainerRect(container.current.getBoundingClientRect())
      }
    })

    // initial panel size
    if (children !== null) {
      const newSizes = children.map((child) => {
        if (child.type === Panel && (child.props as PanelProps).initialSize) {
          return stringUnitToNumberPx((child.props as PanelProps).initialSize!)
        }
        return Infinity
      }) as Sizes
      setPanelSizes(newSizes)
    }

    // start observing
    observer.observe(container.current!)
    return () => {
      observer.disconnect()
    }
  }, [])

  const sizes = useMemo<Sizes>(() => {
    if (!containerSize || !children) {
      return [0, 0]
    }
    const safeWidth = containerSize - grabberSize

    let currentWidth = 0
    let evenCount = 0
    const rst = panelSizes.map((size, idx) => {
      const limit = limitSizes[idx]
      const check = clamp(size, limit[0], limit[1])
      if (check === Infinity) {
        evenCount++
      } else {
        currentWidth += check
      }
      return check
    }) as Sizes

    if (currentWidth > safeWidth || (!evenCount && currentWidth < safeWidth)) {
      const ratio = (currentWidth - safeWidth) / currentWidth
      return rst.map((size, idx) => {
        const limit = limitSizes[idx]
        return clamp(
          size === Infinity ? 0 : size - size * ratio,
          limit[0],
          limit[1],
        )
      }) as Sizes
    }

    if (evenCount > 0) {
      const average = (safeWidth - currentWidth) / evenCount
      return rst.map((size) => {
        return size === Infinity ? average : size
      }) as Sizes
    }

    return rst
  }, [...panelSizes, limitSizes, containerSize, grabberSize])

  const panels = useMemo(() => {
    if (!children) {
      return null
    }
    return children.map((el, idx) => {
      const isPanel = el.type === Panel
      const panelProps = isPanel ? (el.props as PanelProps) : {}

      return (
        <Panel {...panelProps} style={{ [sizePropName]: sizes[idx] }} key={idx}>
          {isPanel ? el.props.children : el}
        </Panel>
      )
    }) as [ReactElement<PanelProps>, ReactElement<PanelProps>]
  }, [sizes, children, sizePropName])

  const handleDrag = useCallback(
    (delta: number) => {
      const [lPanelW, rPanelW] = sizes
      setPanelSizes([
        Math.max(lPanelW + delta, limitSizes[0][0]),
        Math.max(rPanelW - delta, limitSizes[1][0]),
      ])
    },
    [sizes, limitSizes],
  )

  return { containerEl: container, panels, handleDrag } as const
}

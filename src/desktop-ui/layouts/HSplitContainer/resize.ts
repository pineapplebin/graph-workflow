import {
  useCallback,
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
} from 'react'
import throttle from 'lodash/throttle'

interface ResizeChildrenArgs {
  initialLPanelWidth: number | string
  initialRPanelWidth: number | string
}

export function useResizeChildren({
  initialLPanelWidth,
  initialRPanelWidth,
}: ResizeChildrenArgs) {
  const [lPanelWidth, setLPanelWidth] = useState<number | string>(
    initialLPanelWidth,
  )
  const [rPanelWidth, setRPanelWidth] = useState<number | string>(
    initialRPanelWidth,
  )
  const lChildEl = useRef<HTMLDivElement>(null)
  const rChildEl = useRef<HTMLDivElement>(null)

  const handleGrabberDrag = useCallback((dx: number) => {
    const intDx = Math.round(dx)
    setLPanelWidth((prevWidth) => {
      const newWidth =
        typeof prevWidth === 'number' ? prevWidth + intDx : prevWidth
      return newWidth
    })
    setRPanelWidth((prevWidth) => {
      const newWidth =
        typeof prevWidth === 'number' ? prevWidth - intDx : prevWidth
      return newWidth
    })
  }, [])

  const handleResizeContainer = useCallback((ev: any) => {
    console.log(ev)
  }, [])

  /**
   * 初始化 lPanelWidth 和 rPanelWidth
   */
  useLayoutEffect(() => {
    if (!lChildEl.current || !rChildEl.current) {
      return
    }
    const lChildWidth = lChildEl.current.getBoundingClientRect().width
    const rChildWidth = rChildEl.current.getBoundingClientRect().width

    setLPanelWidth(lChildWidth)
    setRPanelWidth(rChildWidth)
  }, [])

  /**
   * window resize 时重新计算 lPanelWidth 和 rPanelWidth
   */
  useEffect(() => {
    const handleWindowResize = throttle((ev: UIEvent) => {
      console.log(ev)
    }, 500)

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return {
    lPanelWidth,
    rPanelWidth,
    lChildEl,
    rChildEl,
    handleGrabberDrag,
    handleResizeContainer,
  }
}

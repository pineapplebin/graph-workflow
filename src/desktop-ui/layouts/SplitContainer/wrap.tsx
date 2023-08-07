import { type ReactElement, useMemo } from 'react'
import Grabber from './Grabber'

interface UseWrapUpArgs {
  direction: 'horizontal' | 'vertical'
  panels: [ReactElement, ReactElement] | null
  onDrag?: (delta: number) => void
}

export function useWrapUp({ direction, panels, onDrag }: UseWrapUpArgs) {
  const grabber = useMemo(() => {
    return <Grabber direction="horizontal" onDrag={onDrag}></Grabber>
  }, [direction, onDrag])

  const wrapped = useMemo(() => {
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
  }, [panels, grabber])

  return wrapped
}

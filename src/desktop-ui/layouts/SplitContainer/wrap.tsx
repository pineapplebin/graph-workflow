import { ReactElement, useMemo } from 'react'
import SizedBox from '../SizedBox'
import Grabber from './Grabber'
import { STYLING } from '@/utils/styling'

interface UseWrapUpArgs {
  direction: 'horizontal' | 'vertical'
  panels: [ReactElement, ReactElement] | null
  onDrag?: (delta: number) => void
}

export function useWrapUp({ direction, panels, onDrag }: UseWrapUpArgs) {
  const grabber = useMemo(() => {
    return (
      <SizedBox width={STYLING.normalGap}>
        <Grabber direction="horizontal" onDrag={onDrag}></Grabber>
      </SizedBox>
    )
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

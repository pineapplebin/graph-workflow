import { type FC } from 'react'
import type { PropsWithStyling } from '../../common-types'
import { useDrag } from '@use-gesture/react'

import cx from 'classnames'
import styles from './Grabber.module.css'

export interface GrabberProps extends PropsWithStyling {
  direction: 'vertical' | 'horizontal'
  onDrag?: (delta: number) => void
}

const Grabber: FC<GrabberProps> = ({ className, style, direction, onDrag }) => {
  const bind = useDrag(
    ({ pressed, delta: [dx, dy] }) => {
      if (pressed) {
        direction === 'vertical' ? onDrag?.(dy) : onDrag?.(dx)
      }
    },
    { axis: direction === 'vertical' ? 'y' : 'x' },
  )

  return (
    <div
      className={cx(
        className,
        styles.GrabberBlock,
        direction === 'vertical' && styles.Vertical,
        direction === 'horizontal' && styles.Horizontal,
      )}
      style={style}
      {...bind()}
    >
      <div className={cx('h-full w-full bg-blue-500', styles.Grabber)}></div>
    </div>
  )
}

export default Grabber

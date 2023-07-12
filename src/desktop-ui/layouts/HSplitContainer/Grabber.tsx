import { FC } from 'react'
import { useDrag } from '@use-gesture/react'

import styles from './Grabber.module.css'

export interface GrabberProps {
  onDrag?: (dx: number) => void
}

const Grabber: FC<GrabberProps> = ({ onDrag }) => {
  const bind = useDrag(
    ({ pressed, delta: [dx] }) => {
      if (pressed) {
        onDrag?.(dx)
      }
    },
    { axis: 'x' },
  )

  return (
    <div className={styles.GrabberBlock} {...bind()}>
      <div className={styles.Grabber}></div>
    </div>
  )
}

export default Grabber

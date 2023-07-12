import { FC } from 'react'

import styles from './Grabber.module.css'

export interface GrabberProps {}

const Grabber: FC<GrabberProps> = () => {
  return (
    <div className={styles.GrabberBlock}>
      <div className={styles.Grabber}></div>
    </div>
  )
}

export default Grabber

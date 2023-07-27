import { type FC } from 'react'

import cx from 'classnames'
import styles from './index.module.css'

export interface TabOption {
  key: string | number
  label: string
}

export interface TabBarProps {
  tabs: TabOption[]
  current?: string | number
  onChange?: (key: string | number) => void
}

const TabBar: FC<TabBarProps> = ({ current, onChange, tabs }) => {
  return (
    <div className={styles.TabBar}>
      {tabs.map((opt) => (
        <div
          key={opt.key}
          className={cx(styles.Tab, current === opt.key && styles.Active)}
          onClick={() => onChange?.(opt.key)}
        >
          {opt.label}
        </div>
      ))}
    </div>
  )
}

export default TabBar

import { type FC } from 'react'
import type { PropsWithStyling } from '../common-types'

import cx from 'classnames'
import styles from './index.module.css'

export interface TabOption {
  key: string | number
  label: string
}

export interface TabBarProps extends PropsWithStyling {
  tabs: TabOption[]
  current?: string | number
  onChange?: (key: string | number) => void
}

const TabBar: FC<TabBarProps> = ({
  className,
  style,
  current,
  onChange,
  tabs,
}) => {
  return (
    <div
      className={cx('flex w-full items-center justify-start', className)}
      style={style}
    >
      {tabs.map((opt) => (
        <div
          key={opt.key}
          className={cx(
            'relative shrink-0 cursor-pointer select-none px-5 py-2 duration-200 ease-in-out transition-bg',
            current === opt.key && styles.Active,
            current !== opt.key && 'hover:bg-slate-50',
          )}
          onClick={() => onChange?.(opt.key)}
        >
          {opt.label}
        </div>
      ))}
    </div>
  )
}

export default TabBar

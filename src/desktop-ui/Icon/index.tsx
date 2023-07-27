import type { FC } from 'react'
import cx from 'classnames'
import { usePropsWithDefaults } from '../hooks'

import './iconfont.css'

export type IconType = 'delete' | 'caret-right' | 'plus'

interface IconProps {
  type: IconType
  fontSize?: string | number
  color?: string
}

const Icon: FC<IconProps> = ({ type, ...rest }) => {
  const style = usePropsWithDefaults(rest, {
    fontSize: '1.6rem',
  })

  return <span className={cx('iconfont', `icon-${type}`)} style={style}></span>
}

export default Icon

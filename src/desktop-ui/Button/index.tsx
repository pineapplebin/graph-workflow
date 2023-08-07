import { type FC, type PropsWithChildren, type HTMLProps } from 'react'
import type { PropsWithOnClick } from '../common-types'

import cx from 'classnames'
import styles from './index.module.css'

type HTMLButtonElementProps = Pick<
  HTMLProps<HTMLButtonElement>,
  'className' | 'style' | 'disabled'
>

export interface ButtonProps
  extends HTMLButtonElementProps,
    PropsWithChildren,
    PropsWithOnClick {
  color?: 'light' | 'dark' | undefined
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  className,
  style,
  children,
  ...rest
}) => {
  return (
    <button
      className={cx(
        className,
        styles.Button,
        rest.color === 'light' && styles.Light,
        rest.color === 'dark' && styles.Dark,
      )}
      style={style}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button

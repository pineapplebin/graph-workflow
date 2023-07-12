import { FC, PropsWithChildren, HTMLProps } from 'react'
import { asFlexItem, type PropsWithOnClick } from '@/desktop-ui'

import cx from 'classnames'
import styles from './index.module.css'

type HTMLButtonElementProps = Pick<
  HTMLProps<HTMLButtonElement>,
  'className' | 'style' | 'disabled'
>

export interface ButtonProps
  extends HTMLButtonElementProps,
    PropsWithChildren,
    PropsWithOnClick {}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  className,
  style,
  children,
  ...rest
}) => {
  return (
    <button className={cx(className, styles.Button)} style={style} {...rest}>
      {children}
    </button>
  )
}

export default asFlexItem(Button)

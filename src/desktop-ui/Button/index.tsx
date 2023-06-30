import { FC, PropsWithChildren, HTMLProps } from 'react'
import { asFlexItem } from '@dui'
import cx from 'classnames'

import styles from './index.module.css'

type HTMLButtonElementProps = Pick<
  HTMLProps<HTMLButtonElement>,
  'className' | 'style' | 'disabled' | 'onClick'
>

export interface ButtonProps extends HTMLButtonElementProps {}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, ...rest }) => {
  return (
    <button {...rest} className={cx(styles.Button, rest.className)}>
      {children}
    </button>
  )
}

export default asFlexItem(Button)

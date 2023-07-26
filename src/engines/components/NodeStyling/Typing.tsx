import { FC, useMemo } from 'react'
import { Row } from '@/desktop-ui'

import cx from 'classnames'
import styles from './Typing.module.css'

export interface TypingProps {
  typing: string
  missing?: boolean
}

export const Typing: FC<TypingProps> = ({ typing, missing }) => {
  const content = useMemo(() => {
    return typing.toLowerCase()
  }, [typing])

  return (
    <Row className={cx(styles.Typing, missing && styles.Missing)}>
      <span>{content}</span>
    </Row>
  )
}

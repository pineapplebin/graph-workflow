import { useMemo, type FC } from 'react'
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
    <Row className={cx(styles.Typing, missing && 'opacity-50')}>
      <span>{content}</span>
    </Row>
  )
}

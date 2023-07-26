import { FC, useMemo } from 'react'

import styles from './Typing.module.css'

export interface TypingProps {
  typing: string
}

export const Typing: FC<TypingProps> = ({ typing }) => {
  const content = useMemo(() => {
    return typing.toLowerCase()
  }, [typing])

  return <span className={styles.Typing}>{content}</span>
}

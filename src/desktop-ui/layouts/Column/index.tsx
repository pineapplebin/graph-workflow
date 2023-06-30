import { FC } from 'react'
import { asFlexItem } from '@dui'

import styles from './index.module.css'

export interface ColumnProps {}

const Column: FC<ColumnProps> = () => {
  return <div></div>
}

export default asFlexItem(Column)

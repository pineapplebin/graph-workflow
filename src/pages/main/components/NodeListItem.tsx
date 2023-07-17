import { FC } from 'react'
import { Container, Row } from '@/desktop-ui'
import { PersistentNode } from '@/engines/structs/types'

import styles from './NodeListItem.module.css'

export interface NodeListItemProps {
  node: PersistentNode
}

const NodeListItem: FC<NodeListItemProps> = ({ node }) => {
  return (
    <Container className={styles.NodeListItem}>
      <Row>
        <span>{node.name}</span>
      </Row>
    </Container>
  )
}

export default NodeListItem

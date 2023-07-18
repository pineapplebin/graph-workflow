import { FC } from 'react'
import { Container, Row } from '@/desktop-ui'
import { Node } from 'reactflow'

import styles from './NodeListItem.module.css'

export interface NodeListItemProps {
  node: Node
}

const NodeListItem: FC<NodeListItemProps> = ({ node }) => {
  return (
    <Container className={styles.NodeListItem}>
      <Row>
        <span>
          {node.id}({node.type})
        </span>
      </Row>
    </Container>
  )
}

export default NodeListItem

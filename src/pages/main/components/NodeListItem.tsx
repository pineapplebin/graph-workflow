import { FC } from 'react'
import { Container, Row } from '@/desktop-ui'
import { Node } from 'reactflow'

import cx from 'classnames'
import styles from './NodeListItem.module.css'

export interface NodeListItemProps {
  node: Node
  selected?: boolean
}

const NodeListItem: FC<NodeListItemProps> = ({ node, selected }) => {
  return (
    <Container className={cx(styles.NodeListItem, selected && styles.Active)}>
      <Row>
        <span>
          {node.id}({node.type})
        </span>
      </Row>
    </Container>
  )
}

export default NodeListItem

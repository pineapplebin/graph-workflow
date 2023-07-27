import { type FC } from 'react'
import { Container, Row } from '@/desktop-ui'
import type { Node } from 'reactflow'

import cx from 'classnames'
import styles from './NodeListItem.module.css'

export interface NodeListItemProps {
  node: Node
  selected?: boolean
  onClick?: () => void
}

const NodeListItem: FC<NodeListItemProps> = ({ node, selected, onClick }) => {
  return (
    <Container
      className={cx(styles.NodeListItem, selected && styles.Active)}
      onClick={onClick}
    >
      <Row>
        <span>
          {node.id}({node.type})
        </span>
      </Row>
    </Container>
  )
}

export default NodeListItem

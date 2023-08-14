import { type FC } from 'react'
import { Container, Row } from '@/desktop-ui'
import type { Node } from 'reactflow'

import cx from 'classnames'

export interface NodeListItemProps {
  node: Node
  selected?: boolean
  onClick?: () => void
}

const NodeListItem: FC<NodeListItemProps> = ({ node, selected, onClick }) => {
  return (
    <Container
      className={cx(
        'rounded-md px-4 py-2 duration-200 ease-in-out transition-bg',
        selected && 'bg-gray-300',
        !selected && 'hover:bg-gray-300',
      )}
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

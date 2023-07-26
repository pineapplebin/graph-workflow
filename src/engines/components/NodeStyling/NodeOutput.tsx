import { FC, PropsWithChildren, useContext, useEffect, useRef } from 'react'
import { useUpdateNodeInternals } from 'reactflow'
import { Container, Row, SizedBox } from '@/desktop-ui'
import { Typing } from './Typing'
import { SourceHandle } from './Handle'
import { NodeContext } from './NodeContext'

import styles from './NodeOutput.module.css'

export interface NodeOutputProps extends PropsWithChildren {
  typing: string
}

const NodeOutput: FC<NodeOutputProps> = ({ typing, children }) => {
  const { nodeId } = useContext(NodeContext)
  const handleRef = useRef<HTMLDivElement>(null)
  const updateNodeInternals = useUpdateNodeInternals()

  useEffect(() => {
    if (handleRef.current && nodeId) {
      handleRef.current.style.right = '-0.5rem'
      updateNodeInternals(nodeId)
    }
  }, [nodeId, updateNodeInternals])

  return (
    <div className={styles.NodeOutput}>
      <div className={styles.Label}>
        <Row>
          <label>输出</label>
          <SizedBox width="0.5rem" />
          <Typing typing={typing} />
        </Row>
        <SourceHandle ref={handleRef} />
      </div>
      {children && <Container className={styles.Result}>{children}</Container>}
    </div>
  )
}

export default NodeOutput

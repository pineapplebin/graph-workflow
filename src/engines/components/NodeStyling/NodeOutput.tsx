import {
  type FC,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
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
  const { nodeId, node, error } = useContext(NodeContext)
  const handleRef = useRef<HTMLDivElement>(null)
  const updateNodeInternals = useUpdateNodeInternals()

  useEffect(() => {
    if (handleRef.current && nodeId) {
      handleRef.current.style.right = '-0.5rem'
      updateNodeInternals(nodeId)
    }
  }, [nodeId, updateNodeInternals])

  const handleId = useMemo(() => {
    return `${nodeId}_output`
  }, [nodeId])

  const content = useMemo(() => {
    if (children || error) {
      const display = !error ? (
        children
      ) : (
        <span className={styles.ErrorHint}>{error}</span>
      )
      return <Container className={styles.Result}>{display}</Container>
    }
    return null
  }, [children, error])

  return (
    <div className={styles.NodeOutput}>
      <div className={styles.Label}>
        <Row>
          <label>输出</label>
          <SizedBox width="0.5rem" />
          <Typing typing={typing} missing={!node?.data.output} />
        </Row>
        <SourceHandle ref={handleRef} id={handleId} />
      </div>
      {content}
    </div>
  )
}

export default NodeOutput

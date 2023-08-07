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
        <span className="whitespace-pre-wrap text-left text-red-500">
          {error}
        </span>
      )
      return <Container className="p-3">{display}</Container>
    }
    return null
  }, [children, error])

  return (
    <div className="relative">
      <div className="relative p-3">
        <Row>
          <label className="font-bold">输出</label>
          <SizedBox className="w-[0.5rem]" />
          <Typing typing={typing} missing={!node?.data.output} />
        </Row>
        <SourceHandle ref={handleRef} id={handleId} />
      </div>
      <div className="rounded-b-md bg-slate-100">{content}</div>
    </div>
  )
}

export default NodeOutput

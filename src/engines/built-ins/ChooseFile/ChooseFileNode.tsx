import { FC, useMemo } from 'react'
import {
  Handle,
  NodeProps,
  Position,
  useNodeId,
  useNodes,
  Node,
} from 'reactflow'
import { NodePanel } from '../../components/NodeStyling'

export type ChooseFileNodeProps = NodeProps<{}>

const ChooseFileNode: FC<ChooseFileNodeProps> = ({}) => {
  const nodeId = useNodeId()
  const nodes = useNodes()

  const node = useMemo(() => {
    return nodes.find((node) => node.id === nodeId) as Node
  }, [nodes, nodeId])

  return (
    <NodePanel node={node}>
      <div>
        <Handle type="target" position={Position.Left}></Handle>
        <label>file</label>
        <input type="file" />
      </div>
      <div>
        <label>output</label>
        <Handle type="source" position={Position.Right}></Handle>
      </div>
    </NodePanel>
  )
}

export default ChooseFileNode

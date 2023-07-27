import type { FC } from 'react'
import type { NodeProps } from 'reactflow'
import {
  NodePanel,
  NodeVariable,
  DataTyping,
  NodeOutput,
} from '../../components/NodeStyling'
import { useCustomNode } from '@/engines/utils/hooks'
import ImageInside from './ImageInside'

type ImagePreviewProps = NodeProps<{}>

const ImagePreview: FC<ImagePreviewProps> = ({ id }) => {
  const { node, nodeId, running } = useCustomNode(
    id,
    async (args, { updateCurrentNodeData }) => {
      updateCurrentNodeData({ output: args.image })
    },
  )

  return (
    <NodePanel node={node} nodeId={nodeId} running={running}>
      <NodeVariable name="image" label="图片来源" typing={DataTyping.dynamic}>
        <ImageInside image={node?.data.output} />
      </NodeVariable>
      <NodeOutput typing={DataTyping.dynamic}></NodeOutput>
    </NodePanel>
  )
}

export default ImagePreview

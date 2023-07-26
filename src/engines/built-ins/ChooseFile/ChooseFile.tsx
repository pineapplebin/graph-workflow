import { FC, SyntheticEvent, useCallback, useState } from 'react'
import { NodeProps } from 'reactflow'
import {
  NodeOutput,
  NodePanel,
  NodeVariable,
} from '../../components/NodeStyling'
import { useCustomNode } from '../../utils/hooks'
import { Column, Container } from '@/desktop-ui'

export type ChooseFileNodeProps = NodeProps<{}>

const ChooseFileNode: FC<ChooseFileNodeProps> = ({ id }) => {
  // data
  const [value, setValue] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const { node, nodeId, running, updateCurrentNodeData } = useCustomNode(
    id,
    async (_, { updateCurrentNodeData }) => {
      updateCurrentNodeData({ output: file })
    },
  )

  const handleChange = useCallback((ev: SyntheticEvent) => {
    const input = ev.target as HTMLInputElement
    const files = Array.from(input.files || [])
    setValue(input.value)
    setFile(files[0] ?? null)
    updateCurrentNodeData({ output: undefined })
  }, [])

  return (
    <NodePanel node={node} nodeId={nodeId} running={running}>
      <NodeVariable<string>
        name="file"
        label="上传文件"
        typing="string"
        value={value}
        onChange={handleChange}
        unConnectable
      >
        <input type="file" />
      </NodeVariable>
      <NodeOutput typing="blob">
        {node?.data.output && (
          <Container width="30rem" scrollable>
            <Column>
              <p>name:{node.data.output.name}</p>
              <p>size:{node.data.output.size}</p>
              <p>path:{node.data.output.path}</p>
            </Column>
          </Container>
        )}
      </NodeOutput>
    </NodePanel>
  )
}

export default ChooseFileNode

import { FC, SyntheticEvent, useCallback, useState } from 'react'
import { NodeProps } from 'reactflow'
import {
  NodeOutput,
  NodePanel,
  NodeVariable,
} from '../../components/NodeStyling'
import { useCurrentNode, useRegisterNodeComponent } from '../../utils/hooks'
import { Column, Container } from '@/desktop-ui'

export type ChooseFileNodeProps = NodeProps<{}>

const ChooseFileNode: FC<ChooseFileNodeProps> = ({ id, type }) => {
  // data
  const [value, setValue] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const { node, nodeId } = useCurrentNode(id)
  useRegisterNodeComponent(
    nodeId,
    {
      async run() {
        console.log('run', file)
      },
    },
    [file],
  )

  const handleChange = useCallback((ev: SyntheticEvent) => {
    const input = ev.target as HTMLInputElement
    const files = Array.from(input.files || [])
    setValue(input.value)
    setFile(files[0] ?? null)
  }, [])

  return (
    <NodePanel type={type} node={node} nodeId={nodeId}>
      <NodeVariable<string>
        name="file"
        label="上传文件"
        typing="string"
        value={value}
        onChange={handleChange}
      >
        <input type="file" />
      </NodeVariable>
      <NodeOutput typing="blob">
        {file && (
          <Container width="30rem" scrollable>
            <Column>
              <p>name:{file.name}</p>
              <p>size:{file.size}</p>
              <p>path:{file.path}</p>
            </Column>
          </Container>
        )}
      </NodeOutput>
    </NodePanel>
  )
}

export default ChooseFileNode

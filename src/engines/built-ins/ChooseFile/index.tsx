import { Container, Column } from '@/desktop-ui'
import { buildUp } from '../../BuildUpComponent'
import { InputFile } from '../../components/form-controls'

export default buildUp<{ file: File | null }, File>({
  name: 'ChooseFile',
  initialFormValue: {
    file: null,
  },
  pipelines: [
    ['validation.required', 'file'],
    ['assignment.paramsToOutput', 'file'],
  ],
  params: [
    {
      name: 'file',
      label: '选择文件',
      typing: 'blob',
      unConnectable: true,
      Body: InputFile,
    },
  ],
  output: {
    typing: 'blob',
    Body: ({ data }) => {
      const output = data.output
      return (
        output && (
          <Container width="30rem" scrollable>
            <Column>
              <p>name:{output.name}</p>
              <p>size:{output.size}</p>
              <p>path:{output.path}</p>
            </Column>
          </Container>
        )
      )
    },
  },
})

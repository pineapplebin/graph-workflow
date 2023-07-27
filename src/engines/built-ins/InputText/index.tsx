import { buildUp } from '../../BuildUpComponent'
import { InputText } from '../../components/form-controls'

export default buildUp({
  name: 'InputText',
  initialFormValue: { text: '' },
  pipelines: [['assignment.paramsToOutput', 'text']],
  params: [
    {
      name: 'text',
      label: '输入文本',
      typing: 'string',
      Body: InputText,
    },
  ],
  output: {
    typing: 'string',
  },
})

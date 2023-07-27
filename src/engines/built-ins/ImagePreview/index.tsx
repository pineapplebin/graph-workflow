import { buildUp } from '../../BuildUpComponent'
import { DataTyping } from '../../components/NodeStyling'
import ImageInside from './ImageInside'

export default buildUp<{ image: any }>({
  name: 'ImagePreview',
  initialFormValue: { image: null },
  pipelines: [['assignment.paramsToOutput', 'image']],
  params: [
    {
      typing: DataTyping.dynamic,
      name: 'image',
      label: '来源图片',
    },
  ],
  output: {
    typing: DataTyping.dynamic,
    Body: ImageInside,
  },
})

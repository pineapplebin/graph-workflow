import { buildUp } from '@/engines/BuildUpComponent'

type Field = {
  name: string
  value: string
}

export default buildUp<{ fields: Field[] }>({
  name: 'DynamicObject',
  initialFormValue: {
    fields: [],
  },
})

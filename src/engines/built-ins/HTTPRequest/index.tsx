import { buildUp } from '@/engines/BuildUpComponent'

export default buildUp({
  name: 'HTTPRequest',
  initialFormValue: {
    method: 'GET',
    header: {},
    body: {},
    query: {},
  },
  params: [],
})

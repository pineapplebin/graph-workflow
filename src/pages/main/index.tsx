import { type FC } from 'react'
import { HSplitContainer, PopupModal, SplitContainerPanel } from '@/desktop-ui'
import { FlowStoreProvider, useInitialFlow } from '@/engines/store'
import NodeList from './components/NodeList'
import GraphEditor from './components/GraphEditor'
import AddNodeModal from './components/AddNodeModal'

const MainPage: FC = () => {
  const store = useInitialFlow({
    nodes: [
      {
        id: 'ChooseFile',
        type: 'ChooseFile',
        position: { x: 50, y: 50 },
        data: {},
      },
      {
        id: 'ImagePreview',
        type: 'ImagePreview',
        position: { x: 550, y: 50 },
        data: {},
      },
      {
        id: 'InputText',
        type: 'InputText',
        position: { x: 130, y: 350 },
        data: {},
      },
    ],
    edges: [],
  })

  const { toggle, modal } = PopupModal.build({
    children: <AddNodeModal />,
  })

  return (
    <FlowStoreProvider value={store}>
      <HSplitContainer>
        <SplitContainerPanel minSize={300} initialSize={300}>
          <NodeList onClickAdd={toggle} />
        </SplitContainerPanel>
        <GraphEditor />
      </HSplitContainer>
      {modal}
    </FlowStoreProvider>
  )
}

export default MainPage

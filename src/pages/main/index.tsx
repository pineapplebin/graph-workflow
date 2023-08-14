import { type FC, useEffect } from 'react'
import { HSplitContainer, SplitContainerPanel } from '@/desktop-ui'
import NodeList from './components/NodeList'
import GraphEditor from './components/GraphEditor'
import { FlowStoreProvider, useInitialFlow } from '@/engines/store'

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

  useEffect(() => {
    // @ts-ignore
    window.store = store
  }, [store])

  return (
    <FlowStoreProvider value={store}>
      <HSplitContainer>
        <SplitContainerPanel minSize={300} initialSize={300}>
          <NodeList />
        </SplitContainerPanel>
        <GraphEditor />
      </HSplitContainer>
    </FlowStoreProvider>
  )
}

export default MainPage

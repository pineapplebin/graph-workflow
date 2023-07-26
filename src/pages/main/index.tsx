import { FC } from 'react'
import { HSplitContainer, SplitContainerPanel } from '@/desktop-ui'
import NodeList from './components/NodeList'
import GraphEditor from './components/GraphEditor'
import { IndividualFlowContext, useInitialFlow } from '@/engines/store'

const MainPage: FC = () => {
  const store = useInitialFlow({
    nodes: [
      {
        id: 'ChooseFile',
        type: 'ChooseFile',
        position: { x: 0, y: 0 },
        data: {},
      },
    ],
    edges: [],
  })

  return (
    <IndividualFlowContext.Provider value={store}>
      <HSplitContainer>
        <SplitContainerPanel minSize={300} initialSize={300}>
          <NodeList />
        </SplitContainerPanel>
        <GraphEditor />
      </HSplitContainer>
    </IndividualFlowContext.Provider>
  )
}

export default MainPage

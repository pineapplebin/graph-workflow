import { FC, useEffect } from 'react'
import { HSplitContainer, SplitContainerPanel } from '@/desktop-ui'
import NodeList from './components/NodeList'
import GraphEditor from './components/GraphEditor'
import { useFlowData } from './store/flow'

const MainPage: FC = () => {
  const restoreFlowDataFromPersistence = useFlowData(
    (state) => state.restoreFlowDataFromPersistence,
  )

  useEffect(() => {
    restoreFlowDataFromPersistence()
  }, [])

  return (
    <HSplitContainer>
      <SplitContainerPanel minSize={300} initialSize={300}>
        <NodeList />
      </SplitContainerPanel>
      <GraphEditor />
    </HSplitContainer>
  )
}

export default MainPage

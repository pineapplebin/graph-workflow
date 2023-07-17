import { FC, useEffect } from 'react'
import { HSplitContainer, SplitContainerPanel } from '@/desktop-ui'
import NodeList from './components/NodeList'
import GraphEditor from './components/GraphEditor'
import { useMainPageStore } from './store'

const MainPage: FC = () => {
  const initialize = useMainPageStore((state) => state.initialize)

  useEffect(() => {
    initialize()
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

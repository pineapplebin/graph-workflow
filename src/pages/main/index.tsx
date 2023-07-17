import { HSplitContainer, SplitContainerPanel } from '@/desktop-ui'
import { FC, useEffect } from 'react'
import NodeList from './components/NodeList'
import { useMainPageStore } from './store'
import GraphEditor from './components/GraphEditor'

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

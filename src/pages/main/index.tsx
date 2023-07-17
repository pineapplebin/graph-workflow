import { Container, HSplitContainer, SplitContainerPanel } from '@/desktop-ui'
import { FC } from 'react'
import NodeList from './components/NodeList'

const MainPage: FC = () => {
  return (
    <HSplitContainer>
      <SplitContainerPanel minSize={300} initialSize={300}>
        <NodeList />
      </SplitContainerPanel>
      <Container>hello world</Container>
    </HSplitContainer>
  )
}

export default MainPage

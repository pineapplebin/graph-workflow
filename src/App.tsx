import { Column, Button, HSplitContainer } from '@/desktop-ui'

function App() {
  return (
    <HSplitContainer>
      <Column>
        <Button>left</Button>
      </Column>
      <Column>
        <Button>right</Button>
      </Column>
    </HSplitContainer>
  )
}

export default App

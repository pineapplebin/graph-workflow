import {
  Column,
  Container,
  Row,
  SizedBox,
  Button,
  MainAxisAlignment,
} from '@/desktop-ui'
import { STYLING } from './utils/styling'

function App() {
  return (
    <Row>
      <Container height={100} flexGrow>
        <Container width={100} scrollable>
          <Column>
            <div>
              contentcontentcontentcontentcontentcontentcontentcontentcontent
            </div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
          </Column>
        </Container>
        <SizedBox width={STYLING.normalGap} />
        <Container flexGrow>
          <Column mainAxisAlignment={MainAxisAlignment.spaceEvenly}>
            <Button>one</Button>
            <Button>two</Button>
            <Button>three</Button>
          </Column>
        </Container>
      </Container>
    </Row>
  )
}

export default App

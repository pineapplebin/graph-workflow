import {
  Column,
  Button,
  Panel,
  HSplitContainer,
  SplitContainerPanel,
  SizedBox,
} from '@/desktop-ui'
import { STYLING } from './utils/styling'

function App() {
  return (
    <HSplitContainer>
      <SplitContainerPanel minSize={100} initialSize={100}>
        <Column>
          <Button>left</Button>
        </Column>
      </SplitContainerPanel>
      <Column>
        <HSplitContainer>
          <Column>
            <Panel style={{ padding: STYLING.normalGap }}>
              <Column>
                <Button color="dark">middle</Button>
                <SizedBox height={STYLING.normalGap} />
                <Button color="dark">middle</Button>
              </Column>
            </Panel>
          </Column>
          <Column>
            <Button>right</Button>
          </Column>
        </HSplitContainer>
      </Column>
    </HSplitContainer>
  )
}

export default App

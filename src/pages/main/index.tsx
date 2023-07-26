import { FC, useEffect } from 'react'
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
        position: { x: 50, y: 50 },
        data: {},
      },
      {
        id: 'ImagePreview',
        type: 'ImagePreview',
        position: { x: 550, y: 50 },
        data: {},
      },
    ],
    edges: [
      {
        source: 'ChooseFile',
        sourceHandle: 'ChooseFile_output',
        target: 'ImagePreview',
        targetHandle: 'ImagePreview_image',
        id: 'reactflow__edge-ChooseFileChooseFile_output-ImagePreviewImagePreview_image',
      },
    ],
  })

  useEffect(() => {
    // @ts-ignore
    window.store = store
  }, [])

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

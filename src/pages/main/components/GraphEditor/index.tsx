import { FC } from 'react'
import { Container } from '@/desktop-ui'
import { Background, ReactFlow, ReactFlowProvider } from 'reactflow'

import 'reactflow/dist/style.css'
import styles from './index.module.css'

const GraphEditor: FC = () => {
  return (
    <ReactFlowProvider>
      <Container className={styles.GraphEditor}>
        <ReactFlow>
          <Background></Background>
        </ReactFlow>
      </Container>
    </ReactFlowProvider>
  )
}

export default GraphEditor

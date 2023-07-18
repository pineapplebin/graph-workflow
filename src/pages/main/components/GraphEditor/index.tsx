import { FC } from 'react'
import { Container } from '@/desktop-ui'
import { Background, ReactFlow, ReactFlowProvider } from 'reactflow'

import 'reactflow/dist/style.css'
import styles from './index.module.css'
import { useNodeTypes } from '@/engines/node-types'
import { useFlowData } from '../../store/flow'
import { shallow } from 'zustand/shallow'

const proOptions = { hideAttribution: true }

const GraphEditor: FC = () => {
  const nodeTypes = useNodeTypes()
  const { nodes, edges, onNodesChange } = useFlowData(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
      onNodesChange: state.onNodesChange,
    }),
    shallow,
  )

  return (
    <ReactFlowProvider>
      <Container className={styles.GraphEditor}>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          proOptions={proOptions}
          onNodesChange={onNodesChange}
          nodesDraggable
        >
          <Background></Background>
        </ReactFlow>
      </Container>
    </ReactFlowProvider>
  )
}

export default GraphEditor

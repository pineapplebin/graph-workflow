import { FC } from 'react'
import { Container, Panel } from '@/desktop-ui'
import { Background, ReactFlow, ReactFlowProvider } from 'reactflow'
import { useNodeTypes } from '@/engines/node-types'
import { useGetFlow } from '@/engines/store'

import 'reactflow/dist/style.css'
import styles from './index.module.css'

const proOptions = { hideAttribution: true }

const GraphEditor: FC = () => {
  const nodeTypes = useNodeTypes()
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useGetFlow(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
    }),
  )

  return (
    <ReactFlowProvider>
      <Panel>
        <Container className={styles.GraphEditor}>
          <ReactFlow
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            proOptions={proOptions}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodesDraggable
          >
            <Background></Background>
          </ReactFlow>
        </Container>
      </Panel>
    </ReactFlowProvider>
  )
}

export default GraphEditor

import { FC, useContext, useMemo, useRef } from 'react'
import { Container, Panel } from '@/desktop-ui'
import {
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  NodeChange,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  updateEdge,
} from 'reactflow'
import { useNodeTypes } from '@/engines/node-types'
import { IndividualFlowContext, useGetFlow } from '@/engines/store'

import 'reactflow/dist/style.css'
import styles from './index.module.css'

const proOptions = { hideAttribution: true }

const GraphEditor: FC = () => {
  const nodeTypes = useNodeTypes()
  const { nodes, edges } = useGetFlow((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }))
  const store = useContext(IndividualFlowContext)

  const edgeUpdateSuccessful = useRef(false)
  const fns = useMemo(() => {
    const { setState: set, getState: get } = store
    return {
      onNodesChange: (changes: NodeChange[]) => {
        set({ nodes: applyNodeChanges(changes, get().nodes) })
      },
      onEdgesChange: (changes: EdgeChange[]) => {
        set({ edges: applyEdgeChanges(changes, get().edges) })
      },
      onConnect: (params: Edge | Connection) => {
        const edges = get().edges
        // 禁止同一个节点相互连接
        if (params.target && params.target === params.source) {
          return
        }
        // 禁止一个端口连接多次
        if (params.target && edges.find((e) => e.target === params.target)) {
          return
        }
        set({ edges: addEdge(params, edges) })
      },
      onEdgeUpdateStart: () => {
        edgeUpdateSuccessful.current = false
      },
      onEdgeUpdate: (oldEdge: Edge, newConnection: Connection) => {
        edgeUpdateSuccessful.current = true
        set({ edges: updateEdge(oldEdge, newConnection, get().edges) })
      },
      onEdgeUpdateEnd: (_: any, edge: Edge) => {
        if (!edgeUpdateSuccessful.current) {
          set({ edges: get().edges.filter((e) => e.id !== edge.id) })
        }
        edgeUpdateSuccessful.current = true
      },
    }
  }, [store.getState, store.setState])

  return (
    <ReactFlowProvider>
      <Panel>
        <Container className={styles.GraphEditor}>
          <ReactFlow
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            proOptions={proOptions}
            onNodesChange={fns.onNodesChange}
            onEdgesChange={fns.onEdgesChange}
            onConnect={fns.onConnect}
            onEdgeUpdate={fns.onEdgeUpdate}
            onEdgeUpdateStart={fns.onEdgeUpdateStart}
            onEdgeUpdateEnd={fns.onEdgeUpdateEnd}
            nodesDraggable
          >
            <Background />
            <Controls />
          </ReactFlow>
        </Container>
      </Panel>
    </ReactFlowProvider>
  )
}

export default GraphEditor

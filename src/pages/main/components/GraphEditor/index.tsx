import { FC, useMemo, useRef } from 'react'
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
import { useGetFlow } from '@/engines/store'

import 'reactflow/dist/style.css'
import styles from './index.module.css'

const proOptions = { hideAttribution: true }

const GraphEditor: FC = () => {
  const nodeTypes = useNodeTypes()
  const { nodes, edges, reducer } = useGetFlow((state) => ({
    nodes: state.nodes,
    edges: state.edges,
    reducer: state.reducer,
  }))

  const edgeUpdateSuccessful = useRef(false)
  const fns = useMemo(() => {
    return {
      onNodesChange: (changes: NodeChange[]) =>
        reducer((set, get) => {
          set({ nodes: applyNodeChanges(changes, get().nodes) })
        }),
      onEdgesChange: (changes: EdgeChange[]) =>
        reducer((set, get) => {
          set({ edges: applyEdgeChanges(changes, get().edges) })
        }),
      onConnect: (params: Edge | Connection) =>
        reducer((set, get) => {
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
        }),
      onEdgeUpdateStart: () => {
        edgeUpdateSuccessful.current = false
      },
      onEdgeUpdate: (oldEdge: Edge, newConnection: Connection) => {
        edgeUpdateSuccessful.current = true
        reducer((set, get) => {
          set({ edges: updateEdge(oldEdge, newConnection, get().edges) })
        })
      },
      onEdgeUpdateEnd: (_: any, edge: Edge) => {
        reducer((set, get) => {
          if (!edgeUpdateSuccessful.current) {
            set({ edges: get().edges.filter((e) => e.id !== edge.id) })
          }
        })
        edgeUpdateSuccessful.current = true
      },
    }
  }, [reducer])

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

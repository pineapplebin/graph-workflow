import { type FC, useMemo, useRef } from 'react'
import { Container, Panel } from '@/desktop-ui'
import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  type Connection,
  type Edge,
  type NodeChange,
  type EdgeChange,
} from 'reactflow'
import { useNodeTypes } from '@/engines/node-types'
import { useGetFlow } from '@/engines/store'

import 'reactflow/dist/style.css'

const proOptions = { hideAttribution: true }

const GraphEditor: FC = () => {
  const { nodes, edges, nodeTypesList, graphData } = useGetFlow((state) => ({
    nodes: state.nodes,
    edges: state.edges,
    nodeTypesList: state.nodeTypesList,
    graphData: state.graphData,
  }))
  const nodeTypes = useNodeTypes(nodeTypesList)

  const edgeUpdateSuccessful = useRef(false)
  const fns = useMemo(() => {
    return {
      onNodesChange: (changes: NodeChange[]) => {
        return graphData.updateNodesByChanges(changes)
      },
      onEdgesChange: (changes: EdgeChange[]) => {
        return graphData.updateEdgesByChanges(changes)
      },
      onConnect: (params: Edge | Connection) => {
        const edges = graphData.api.get().edges
        // 禁止同一个节点相互连接
        if (params.target && params.target === params.source) {
          return
        }
        // 禁止一个端口连接多次
        if (params.target && edges.find((e) => e.target === params.target)) {
          return
        }
        graphData.updateConnection(null, params)
      },
      onEdgeUpdateStart: () => {
        edgeUpdateSuccessful.current = false
      },
      onEdgeUpdate: (oldEdge: Edge, newConnection: Connection) => {
        edgeUpdateSuccessful.current = true
        graphData.updateConnection(oldEdge, newConnection)
      },
      onEdgeUpdateEnd: (_: any, edge: Edge) => {
        if (!edgeUpdateSuccessful.current) {
          graphData.removeEdge(edge)
        }
        edgeUpdateSuccessful.current = true
      },
    }
  }, [graphData])

  return (
    <ReactFlowProvider>
      <Panel>
        <Container className="h-full w-full bg-white">
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

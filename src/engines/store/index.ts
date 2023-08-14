import { useCreation } from 'ahooks'
import { type Edge } from 'reactflow'
import { createStore } from 'zustand'
import { EngineCore } from '../core/EngineCore'
import { GraphData } from './GraphData'
import type { FlowDataState } from './types'
import type { EngineNode } from '../types'
import { useEffect } from 'react'

export { useGetFlow, FlowStoreProvider } from './context'

/**
 * 初始化 flow data
 */
export function useInitialFlow(initialData: {
  nodes: EngineNode[]
  edges: Edge[]
}) {
  const engine = useCreation(() => new EngineCore(), [])

  const store = useCreation(() => {
    const _store = createStore<FlowDataState>((set, get) => {
      const graphData = new GraphData({ set, get })
      graphData.initFlowState(initialData)

      const _states: FlowDataState = {
        // states
        graphData,
        nodes: graphData.nodes,
        edges: graphData.edges,
        nodeTypesList: graphData.nodeTypes,
        // engine related
        systemRunning: false,
        startRun: (nodeId) => {
          set({ systemRunning: true })
          engine.startRun(nodeId)
        },
      }

      return _states
    })

    engine.setStore(_store)
    return _store
  }, [engine])

  /**
   * 销毁 engine
   */
  useEffect(() => {
    engine.store = store
    return () => {
      // store.getState().graphData.destroy()
      engine.destroy()
    }
  }, [engine, store])

  return store
}

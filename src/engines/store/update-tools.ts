import { type Edge, type Connection } from 'reactflow'
import { merge } from 'lodash'
import type { DataInEngine, EngineNode } from '../types'

export interface CustomRemoveEdgeChange {
  type: 'remove-edge'
  id: string
  data: Edge
}

export interface CustomUpdateEdgeChange {
  type: 'update-edge'
  id: string
  data: Connection
}

export interface CustomUpdateNodeDataChange {
  type: 'update-node-data'
  id: string
  data: Partial<DataInEngine>
}

export type CustomChange =
  | CustomRemoveEdgeChange
  | CustomUpdateEdgeChange
  | CustomUpdateNodeDataChange

export function makeChangesMap(
  changes: CustomChange[],
): Record<string, CustomChange[]> {
  return changes.reduce(
    (acc, change) => {
      if (!Array.isArray(acc[change.id])) {
        acc[change.id] = []
      }
      acc[change.id].push(change)
      return acc
    },
    {} as Record<string, CustomChange[]>,
  )
}

export function applyCustomChange(
  node: EngineNode,
  change: CustomChange,
): EngineNode {
  switch (change.type) {
    case 'remove-edge':
      return applyRemoveEdgeChange(node, change)
    case 'update-edge':
      return applyUpdateEdgeChange(node, change)
    case 'update-node-data':
      return applyUpdateNodeDataChange(node, change)
  }
}

export function applyRemoveEdgeChange(
  node: EngineNode,
  change: CustomRemoveEdgeChange,
): EngineNode {
  const newNode = { ...node }
  const { paramsEdges } = newNode.data

  const [_, params] = change.data.targetHandle!.split('_') // id_params 格式
  if (paramsEdges?.[params] === change.data.source) {
    delete paramsEdges[params]
  }

  newNode.data = { ...newNode.data, paramsEdges }
  return newNode
}

export function applyUpdateEdgeChange(
  node: EngineNode,
  change: CustomUpdateEdgeChange,
): EngineNode {
  const newNode = { ...node }
  const { paramsEdges } = newNode.data
  const [_, params] = change.data.targetHandle!.split('_') // id_params 格式

  const newParasEdges = paramsEdges ? { ...paramsEdges } : {}
  // 更新节点连接
  if (change.data.source) {
    newParasEdges[params] = change.data.source
  }

  newNode.data = { ...newNode.data, paramsEdges: newParasEdges }
  return newNode
}

export function applyUpdateNodeDataChange(
  node: EngineNode,
  change: CustomUpdateNodeDataChange,
): EngineNode {
  return merge({}, node, { data: change.data })
}

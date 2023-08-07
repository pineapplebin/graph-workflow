import { type Node, type Edge } from 'reactflow'
import { shallow } from 'zustand/shallow'
import type { StoreNode } from './types'

export function compare<T>(objA: T, objB: T): boolean {
  if (typeof objA === 'function' || typeof objB === 'function') {
    return Object.is(objA, objB)
  }

  if (Array.isArray(objA) || Array.isArray(objB)) {
    return Object.is(objA, objB)
  }

  if (
    typeof objA === 'string' ||
    typeof objA === 'number' ||
    typeof objA === 'boolean'
  ) {
    return objA === objB
  }

  return shallow(objA, objB)
}

export function extractNodeTypesList(nodes: Node[]) {
  return Array.from(new Set(nodes.map((node) => node.type!))).sort()
}

export function nodeMapToNodes(map: Record<string, StoreNode>) {
  return Object.values(map).map((store) => {
    store.node.data.paramsEdges = store.paramsEdges ?? {}
    return store.node
  })
}

export function nodeMapToEdges(map: Record<string, StoreNode>) {
  return Object.values(map).reduce((acc, store) => {
    return acc.concat(
      Object.entries(store.paramsEdges).map(([handle, source]) => {
        return {
          source,
          sourceHandle: `${source}_output`,
          target: store.node.id,
          targetHandle: `${store.node.id}_${handle}`,
          id: `edge:${source}:${store.node.id}_${handle}`,
        } as Edge
      }),
    )
  }, [] as Edge[])
}

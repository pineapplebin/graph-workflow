import { shallow } from 'zustand/shallow'
import type { EngineNode } from '../types'

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

export function extractNodeTypesList(nodes: EngineNode[]): string[] {
  return Array.from(
    new Set<string>(
      nodes.map((node) => node.type).filter((type) => !!type) as string[],
    ),
  ).sort()
}

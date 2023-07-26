import { StoreApi } from 'zustand'
import { Edge } from 'reactflow'
import { EngineNode } from '../types'
import { FlowDataState } from '../store'

export class Task {
  constructor(public node: EngineNode, public edges: Edge[]) {}

  toString() {
    return `${this.node.type}(${this.node.id})`
  }

  /**
   * 1. 根据 edges 依赖的节点 从 store 中获取数据
   * 2. 组织传入到当前节点的 run 中
   */
  async exec(store: StoreApi<FlowDataState>) {
    const { nodes } = store.getState()
    const paramList = this.edges.map(({ source, targetHandle }) => {
      const [_, paramName] = targetHandle!.split('_')
      const node = nodes.find((node) => node.id === source)!

      return { name: paramName, value: node.data.output ?? null }
    })

    const params = paramList.reduce((acc, { name, value }) => {
      acc[name] = value
      return acc
    }, {} as Record<string, any>)

    const { ref } = this.node.data
    await ref?.current?.run(params)
  }
}

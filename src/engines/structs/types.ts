/**
 * 持久化存储的 node 类型
 */
export interface PersistentNode<P extends Record<string, any> = {}> {
  name: string
  type: string
  props: P
}

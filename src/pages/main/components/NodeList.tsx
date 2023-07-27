import { type FC, useCallback, useMemo } from 'react'
import { Column, Container, Panel, TabBar } from '@/desktop-ui'
import type { TabOption } from '@/desktop-ui/TabBar'
import { STYLING } from '@/utils/styling'
import { useGetFlow } from '@/engines/store'
import NodeListItem from './NodeListItem'

import styles from './NodeList.module.css'

const NodeList: FC = () => {
  const { nodes, reducer } = useGetFlow((state) => ({
    nodes: state.nodes,
    reducer: state.reducer,
  }))

  const tabs = useMemo<TabOption[]>(() => {
    return [{ key: 0, label: '节点列表' }]
  }, [])

  const handleClickItem = useCallback(
    (nodeId: string) => {
      reducer((set) => {
        set({
          nodes: nodes.map((node) => ({
            ...node,
            selected: node.id === nodeId,
          })),
        })
      })
    },
    [nodes, reducer],
  )

  return (
    <Column>
      <TabBar current={0} tabs={tabs} />
      <Panel style={{ padding: STYLING.smallGap }}>
        <Container scrollable className={styles.Container}>
          <Column>
            {nodes.map((node) => (
              <NodeListItem
                key={node.id}
                node={node}
                selected={node.selected}
                onClick={() => handleClickItem(node.id)}
              />
            ))}
          </Column>
        </Container>
      </Panel>
    </Column>
  )
}

export default NodeList

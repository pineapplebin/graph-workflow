import { FC, useMemo } from 'react'
import { Column, Container, Panel, TabBar } from '@/desktop-ui'
import { TabOption } from '@/desktop-ui/TabBar'
import { STYLING } from '@/utils/styling'
import { useMainPageStore } from '../store'

import styles from './NodeList.module.css'
import NodeListItem from './NodeListItem'

const NodeList: FC = () => {
  const nodes = useMainPageStore((state) => state.nodes)

  const tabs = useMemo<TabOption[]>(() => {
    return [{ key: 0, label: '节点列表' }]
  }, [])

  return (
    <Column>
      <TabBar current={0} tabs={tabs} />
      <Panel style={{ padding: STYLING.smallGap }}>
        <Container scrollable className={styles.Container}>
          <Column>
            {nodes.map((node) => (
              <NodeListItem key={node.name} node={node} />
            ))}
          </Column>
        </Container>
      </Panel>
    </Column>
  )
}

export default NodeList
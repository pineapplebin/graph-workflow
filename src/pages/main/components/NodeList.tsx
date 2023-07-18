import { FC, useMemo } from 'react'
import { Column, Container, Panel, TabBar } from '@/desktop-ui'
import { TabOption } from '@/desktop-ui/TabBar'
import { STYLING } from '@/utils/styling'
import { useFlowData } from '../store/flow'
import NodeListItem from './NodeListItem'

import styles from './NodeList.module.css'

const NodeList: FC = () => {
  const nodes = useFlowData((state) => state.nodes)

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
              <NodeListItem key={node.id} node={node} />
            ))}
          </Column>
        </Container>
      </Panel>
    </Column>
  )
}

export default NodeList

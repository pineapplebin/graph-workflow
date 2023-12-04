import { type FC, useCallback, useMemo } from 'react'
import {
  Button,
  Column,
  Container,
  Icon,
  Panel,
  Row,
  SizedBox,
  TabBar,
} from '@/desktop-ui'
import type { TabOption } from '@/desktop-ui/TabBar'
import { useGetFlow } from '@/engines/store'
import NodeListItem from './NodeListItem'

export interface NodeListProps {
  onClickAdd?: () => void
}

const NodeList: FC<NodeListProps> = ({ onClickAdd }) => {
  const { nodes, graphData } = useGetFlow((state) => ({
    nodes: state.nodes,
    graphData: state.graphData,
  }))

  const tabBarProps = TabBar.useTabState(0)
  const tabs = useMemo<TabOption[]>(() => {
    return [
      { key: 0, label: '节点列表' },
      { key: 1, label: '节点属性' },
    ]
  }, [])

  const handleClickItem = useCallback(
    (nodeId: string) => {
      // 选中点击的节点，其他节点取消选中
      graphData.updateNodesByChanges(
        graphData.api.get().nodes.map((node) => ({
          type: 'select',
          id: node.id,
          selected: node.id === nodeId,
        })),
      )
    },
    [graphData],
  )

  return (
    <Column>
      <TabBar tabs={tabs} {...tabBarProps} />
      <Panel className="p-2">
        <Column>
          <Row className="!h-auto">
            <Button onClick={onClickAdd}>
              <Icon type="plus" />
            </Button>
          </Row>
          <SizedBox className="h-common-gap" />
          <Container
            className="h-full w-full rounded-md bg-slate-200 p-3 focus:outline-hl focus-visible:outline-hl"
            scrollable
            tabIndex={0}
          >
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
        </Column>
      </Panel>
    </Column>
  )
}

export default NodeList

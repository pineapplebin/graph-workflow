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

const NodeList: FC = () => {
  const { nodes, reducer } = useGetFlow((state) => ({
    nodes: state.nodes,
    reducer: state.reducer,
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
      <TabBar tabs={tabs} {...tabBarProps} />
      <Panel className="p-2">
        <Column>
          <Row className="!h-auto">
            <Button>
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

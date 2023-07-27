import { type FC, type PropsWithChildren, useMemo, useCallback } from 'react'
import {
  Button,
  Row,
  type PropsWithStyling,
  Icon,
  SizedBox,
} from '@/desktop-ui'
import {
  NodeContext,
  NodeFormValueContext,
  type NodeContextValue,
} from './NodeContext'
import { extractNodeTypesList, useGetFlow } from '@/engines/store'

import cx from 'classnames'
import styles from './NodePanel.module.css'
import type { LimitedNodeProps } from '../../types'

export interface NodePanelProps<T extends Record<string, any>>
  extends PropsWithChildren,
    PropsWithStyling {
  limitedNode: LimitedNodeProps
  nodeId: string | null
  running?: boolean
  error?: string | null
  formValue?: Record<string, any>
  onChange?: (field: keyof T, value: any) => void
}

/**
 * 节点的面板
 * 可控制缩放
 */
function NodePanel<T extends Record<string, any>>({
  className,
  style,
  children,
  limitedNode,
  nodeId,
  running,
  error,
  formValue,
  onChange,
}: NodePanelProps<T>) {
  const contextValue = useMemo<NodeContextValue>(() => {
    return { node: limitedNode, nodeId, error: error ?? null }
  }, [limitedNode])

  const { handleStartRun, systemRunning, reducer } = useGetFlow((state) => ({
    handleStartRun: state.startRun,
    systemRunning: state.systemRunning,
    reducer: state.reducer,
  }))

  /**
   * 删除节点
   * 1. 删除节点
   * 2. 删除节点的所有边
   * 3. 更新节点类型列表
   */
  const handleRemove = useCallback(() => {
    reducer((set, get) => {
      const newNodes = get().nodes.filter((node) => node.id !== nodeId)
      set({
        nodes: newNodes,
        edges: get().edges.filter(
          (edge) => !(edge.source === nodeId || edge.target === nodeId),
        ),
        nodeTypesList: extractNodeTypesList(newNodes),
      })
    })
  }, [nodeId])

  const formValueContextValue = useMemo(() => {
    return { value: formValue ?? {}, onChange: onChange ?? (() => {}) }
  }, [formValue, onChange])

  return (
    <NodeContext.Provider value={contextValue}>
      <NodeFormValueContext.Provider value={formValueContextValue}>
        <PanelControl
          disabled={systemRunning}
          selected={limitedNode?.selected}
          onStartRun={() => nodeId && handleStartRun(nodeId)}
          onRemove={handleRemove}
        />
        <div
          className={cx(
            className,
            styles.NodePanel,
            running && styles.Running,
            error && styles.Error,
            limitedNode?.selected && styles.Selected,
          )}
          style={style}
        >
          <div className={styles.Header}>{limitedNode?.type}</div>
          <div className={styles.Content}>{children}</div>
        </div>
      </NodeFormValueContext.Provider>
    </NodeContext.Provider>
  )
}

interface PanelControlProps {
  disabled?: boolean
  selected?: boolean
  onStartRun?: () => void
  onRemove?: () => void
}

const PanelControl: FC<PanelControlProps> = ({
  disabled,
  selected,
  onStartRun,
  onRemove,
}) => {
  return (
    <div
      className={cx(styles.PanelControl, selected && styles.PanelControlActive)}
    >
      <Row>
        <Button disabled={disabled} onClick={onStartRun}>
          <Icon type="caret-right" />
        </Button>
        <SizedBox width="0.2rem" />
        <Button disabled={disabled} onClick={onRemove}>
          <Icon type="delete" />
        </Button>
      </Row>
    </div>
  )
}

export default NodePanel

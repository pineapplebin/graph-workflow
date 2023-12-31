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
import { useGetFlow } from '@/engines/store'
import type { LimitedNodeProps } from '../../types'

import cx from 'classnames'
import styles from './NodePanel.module.css'

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

  const { handleStartRun, systemRunning, graphData } = useGetFlow((state) => ({
    handleStartRun: state.startRun,
    systemRunning: state.systemRunning,
    graphData: state.graphData,
  }))

  /**
   * 删除节点
   */
  const handleRemove = useCallback(() => {
    if (nodeId) {
      graphData.removeNode(nodeId)
    }
  }, [nodeId, graphData])

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
            'relative min-w-[24rem] rounded-md bg-slate-50',
            className,
            running && styles.Running,
            error && '!outline-4 outline-err',
            limitedNode?.selected && '!outline-4 outline-hl',
          )}
          style={style}
        >
          <div className="rounded-t-md bg-slate-100 p-3 font-mono font-bold text-purple-500">
            {limitedNode?.type}
          </div>
          <div className="relative border-t border-t-slate-300">{children}</div>
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
        <Button
          className="border border-slate-100"
          disabled={disabled}
          onClick={onStartRun}
        >
          <Icon type="caret-right" />
        </Button>
        <SizedBox width="0.2rem" />
        <Button
          className="border border-slate-100"
          disabled={disabled}
          onClick={onRemove}
        >
          <Icon type="delete" />
        </Button>
      </Row>
    </div>
  )
}

export default NodePanel

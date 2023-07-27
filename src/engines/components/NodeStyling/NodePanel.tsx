import { type FC, type PropsWithChildren, useMemo } from 'react'
import { Button, Row, type PropsWithStyling } from '@/desktop-ui'
import {
  NodeContext,
  NodeFormValueContext,
  type NodeContextValue,
} from './NodeContext'
import { useGetFlow } from '@/engines/store'

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

  const { handleStartRun, systemRunning } = useGetFlow((state) => ({
    handleStartRun: state.startRun,
    systemRunning: state.systemRunning,
  }))

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
}

const PanelControl: FC<PanelControlProps> = ({
  disabled,
  selected,
  onStartRun,
}) => {
  return (
    <div
      className={cx(styles.PanelControl, selected && styles.PanelControlActive)}
    >
      <Row>
        <Button disabled={disabled} onClick={onStartRun}>
          Run
        </Button>
      </Row>
    </div>
  )
}

export default NodePanel

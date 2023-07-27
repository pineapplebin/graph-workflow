import { type FC, type PropsWithChildren, useMemo } from 'react'
import type { Node } from 'reactflow'
import { Button, Row, type PropsWithStyling } from '@/desktop-ui'
import { NodeContext, type NodeContextValue } from './NodeContext'

import cx from 'classnames'
import styles from './NodePanel.module.css'
import { useGetFlow } from '@/engines/store'

export interface NodePanelProps extends PropsWithChildren, PropsWithStyling {
  node: Node | null
  nodeId: string | null
  running?: boolean
  error?: boolean
}

/**
 * 节点的面板
 * 可控制缩放
 */
const NodePanel: FC<NodePanelProps> = ({
  className,
  style,
  children,
  node,
  nodeId,
  running,
  error,
}) => {
  const contextValue = useMemo<NodeContextValue>(() => {
    return { node, nodeId }
  }, [node])
  const { handleStartRun, systemRunning } = useGetFlow((state) => ({
    handleStartRun: state.startRun,
    systemRunning: state.systemRunning,
  }))

  return (
    <NodeContext.Provider value={contextValue}>
      <PanelControl
        disabled={systemRunning}
        selected={node?.selected}
        onStartRun={() => nodeId && handleStartRun(nodeId)}
      />
      <div
        className={cx(
          className,
          styles.NodePanel,
          running && styles.Running,
          error && styles.Error,
          node?.selected && styles.Selected,
        )}
        style={style}
      >
        <div className={styles.Header}>{node?.type}</div>
        <div className={styles.Content}>{children}</div>
      </div>
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

import {
  Children,
  cloneElement,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type PropsWithChildren,
  useCallback,
} from 'react'
import { useUpdateNodeInternals } from 'reactflow'
import { NodeContext, NodeFormValueContext } from './NodeContext'
import { TargetHandle } from './Handle'
import { Row, SizedBox, Container } from '@/desktop-ui'
import { Typing } from './Typing'

export interface NodeVariableProps extends PropsWithChildren {
  name: string
  label: string
  typing: string
  unConnectable?: boolean
}

function NodeVariable({
  name,
  label,
  typing,
  children,
  unConnectable,
}: NodeVariableProps) {
  const { nodeId, node } = useContext(NodeContext)
  const { value: formValue, onChange: onChangeFieldValue } =
    useContext(NodeFormValueContext)

  const updateNodeInternals = useUpdateNodeInternals()
  const handleRef = useRef<HTMLDivElement>(null)

  const fieldId = useMemo(() => {
    return `${nodeId}_${name}`
  }, [nodeId, name])

  useEffect(() => {
    if (handleRef.current && nodeId) {
      handleRef.current.style.left = '-0.5rem'
      updateNodeInternals(nodeId)
    }
  }, [nodeId, updateNodeInternals])

  const handleChange = useCallback(
    (value: any) => {
      onChangeFieldValue(name, value)
    },
    [label, onChangeFieldValue],
  )

  const value = formValue[label]
  const fieldControl = useInjectChild(
    { id: fieldId, value, onChange: handleChange },
    children,
  )

  return (
    <div className="relative">
      <div className="relative p-3">
        {!unConnectable && <TargetHandle ref={handleRef} id={fieldId} />}
        <Row>
          <label htmlFor={fieldId} className="font-bold">
            {label}
          </label>
          <SizedBox className="w-[0.5rem]" />
          <Typing typing={typing} missing={!value && !node?.data.output} />
        </Row>
      </div>
      <Container className="relative rounded-md bg-slate-100 p-3">
        {fieldControl}
      </Container>
    </div>
  )
}

function useInjectChild(
  fieldProps: {
    value?: any
    id?: string
    onChange?: (value: any) => void
  },
  children: PropsWithChildren['children'],
) {
  return useMemo(() => {
    if (!children) {
      return null
    }
    const child = Children.only(children)
    if (!child || typeof child !== 'object' || !isValidElement(child)) {
      return child
    }

    const newChild = cloneElement(child, { ...fieldProps })
    return newChild
  }, [children, fieldProps.value, fieldProps.onChange])
}

export default NodeVariable

import type { ParamsFormComponentProps } from '@/engines/types'
import { useCallback, type FC, type SyntheticEvent } from 'react'

const InputText: FC<ParamsFormComponentProps<string>> = ({
  value,
  onChange,
  disabled,
}) => {
  const handleChange = useCallback(
    (ev: SyntheticEvent) => {
      const target = ev.target as HTMLInputElement
      onChange?.(target.value)
    },
    [onChange],
  )

  return (
    <input
      style={{ width: '100%' }}
      type="text"
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
  )
}

export default InputText

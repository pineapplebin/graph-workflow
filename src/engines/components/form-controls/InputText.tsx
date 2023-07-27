import { useCallback, type FC, type SyntheticEvent } from 'react'

interface InputTextProps {
  value?: string
  onChange?: (val: string) => void
}

const InputText: FC<InputTextProps> = ({ value, onChange }) => {
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
    />
  )
}

export default InputText

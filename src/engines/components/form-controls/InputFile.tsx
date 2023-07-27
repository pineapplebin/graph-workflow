import { useMemo, type FC, useCallback, type SyntheticEvent } from 'react'

interface InputFileProps {
  value?: File | null
  onChange?: (value: File | null) => void
}

const InputFile: FC<InputFileProps> = ({ value, onChange }) => {
  const passValue = useMemo(() => {
    if (!value) {
      return ''
    }
    return value.path
  }, [value])

  const handleChange = useCallback(
    (ev: SyntheticEvent) => {
      const input = ev.target as HTMLInputElement
      const files = Array.from(input.files || [])
      if (files[0]) {
        onChange?.(files[0])
      } else {
        onChange?.(null)
      }
    },
    [onChange],
  )

  return <input type="file" value={passValue} onChange={handleChange} />
}

export default InputFile

import { type FC, useCallback, type SyntheticEvent, useState } from 'react'

interface InputFileProps {
  value?: File | null
  onChange?: (value: File | null) => void
}

const InputFile: FC<InputFileProps> = ({ onChange }) => {
  const [passValue, setPassValue] = useState('')

  const handleChange = useCallback(
    (ev: SyntheticEvent) => {
      const input = ev.target as HTMLInputElement
      const files = Array.from(input.files || [])
      if (files[0]) {
        onChange?.(files[0])
        setPassValue(input.value)
      } else {
        onChange?.(null)
        setPassValue('')
      }
    },
    [onChange],
  )

  return <input type="file" value={passValue} onChange={handleChange} />
}

export default InputFile

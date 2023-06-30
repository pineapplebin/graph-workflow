import { useState } from 'react'
import { Button } from '@dui'
import styles from './App.module.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <div className={styles.card}>
        <Button flexGrow={true} onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <Button disabled onClick={() => window.bridge.darkMode.toggle()}>
          change dark mode
        </Button>
      </div>
    </>
  )
}

export default App

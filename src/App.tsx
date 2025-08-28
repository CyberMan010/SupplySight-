import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/Button'
import { Card } from './components/ui/Card'
import { StatusPill } from './components/ui/StatusPill'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Card/>
     <StatusPill status="Healthy"/>
    </>
  )
}

export default App

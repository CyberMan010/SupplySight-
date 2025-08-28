import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductTable from './products'
import { Button } from './components/ui/Button'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ProductTable/>
    <Button />
     
    </>
  )
}

export default App

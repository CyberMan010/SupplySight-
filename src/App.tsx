import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/Button'
import { Card } from './components/ui/Card'
import { StatusPill } from './components/ui/StatusPill'
import { ProductsTable } from './components/dashboard/ProductsTable'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Card/>
     <StatusPill status="Healthy"/>
     <ProductsTable products={[]} getProductStatus={() => 'Healthy'} onRowClick={() => {}} currentPage={1} setCurrentPage={() => {}}/>
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GraficoEvolucion from './components/GraficoEvolucion'
import CSVAnalysis from './components/CSVAnalysis'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CSVAnalysis />
    </>
  )
}

export default App

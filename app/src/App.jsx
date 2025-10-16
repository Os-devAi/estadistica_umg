import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import ConsultasInternas from './components/ConsultasDashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="consulta/interna" element={<ConsultasInternas />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

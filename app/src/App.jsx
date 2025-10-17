import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import ConsultasDashboard from './components/ConsultasDashboard';
import CausaHospitalizacion from './components/CausaHospitalizacion';
import PromedioDias from './components/PromedioDias';
import AtencionMediaca from './components/AtencionMediaca';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="consulta/interna" element={<ConsultasDashboard />} />
          <Route path="causa/interna" element={<CausaHospitalizacion />} />
          <Route path="promedio/dias" element={<PromedioDias />} />
          <Route path="atencion/tratamiento" element={<AtencionMediaca />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

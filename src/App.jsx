import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import { Container } from '@mui/material'
import Login from './pages/Login'
import PedidoList from './pages/PedidoList'
import './App.css'
import PedidoForm from './pages/PedidoForm'
import PedidoDetail from './pages/PedidoDetail'
import ClienteList from './components/ClienteList'
import ClienteForm from './pages/ClienteForm'
import ClienteDetail from './pages/ClienteDetail'

function App() {
  return (
    <>
      <Container>
        <BrowserRouter>
          <Header />
          {/* Rutas y componentes irían aquí */}
          <Routes>
            <Route path="/" element={<PedidoList />} />
            <Route path="/pedidos/:id" element={<PedidoDetail />} />
            <Route path="/add-pedido" element={<PedidoForm />} />
            <Route path="/edit-pedido/:id" element={<PedidoForm />} />
            <Route path="/clientes" element={<ClienteList />} />
            <Route path="/clientes/:id" element={<ClienteDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-cliente" element={<ClienteForm />} />
            <Route path="/edit-cliente/:id" element={<ClienteForm />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  )
}
export default App
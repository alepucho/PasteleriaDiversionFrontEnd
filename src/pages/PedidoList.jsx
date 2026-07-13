import { Grid } from '@mui/material'
import PedidoCard from '../components/PedidoCard'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchPedidos, deletePedido } from '../services/pedidoService';
import Spinner from '../components/Spinner';
import './PedidoList.css';

export default function PedidoList() {
    const [pedidos, setPedidos]= useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true);
        fetchPedidos()
        .then(data => setPedidos(data))
        .catch(error => {
            console.error("Error fetching pedidos:", error)
            alert("Error fetching pedidos, intenta nuevamente más tarde.");
        })
        .finally(() => setLoading(false));
    },[]);

    const handleDeletePedido = async (pedidoId) => {
        try {
            await deletePedido(pedidoId);
            setPedidos(pedidos.filter(p => p.id !== pedidoId));
        } catch (error) {
            console.error("Error deleting pedido:", error);
            alert("No se puede eliminar sin estar autenticado.");
        }
    };

    const handleUpdatePedido = (pedidoId) => {
        navigate(`/edit-pedido/${pedidoId}`);
    };

    const handleDetailsPedido = (pedidoId) => {
        navigate(`/pedido/${pedidoId}`);
    };
    if (loading) {
        return (
            <Spinner />
        );
    }
    return (
        <Grid container spacing={2}>
            {pedidos.map(
                (pedido) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={pedido.id}>
                        <PedidoCard pedido={pedido} onDelete={handleDeletePedido} onUpdate={handleUpdatePedido} onDetails={handleDetailsPedido} />
                    </Grid>
                ))}
        </Grid>
    )
}
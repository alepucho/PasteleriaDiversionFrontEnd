import { Grid } from '@mui/material'
import ClienteCard from './ClienteCard'
import "./ClienteList.css";
import { useEffect, useState } from 'react';
import { fetchClientes, deleteCliente } from '../services/clienteService';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

export default function ClienteList() {
    const [clientes, setClientes] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetchClientes()
            .then((data) => setClientes(data))
            .catch((error) => {
                console.error('Error obteniendo clientes:', error);
                alert("Error obteniendo clientes, regresa más tarde")
            })
            .finally(() => setLoading(false));
    }, []);
    const handleDeleteCliente = async (clienteId) => {
        try {
            await deleteCliente(clienteId);
            setClientes(clientes.filter(p => p.id !== clienteId));
        } catch (error) {
            console.error("Error deleting cliente:", error);
            alert("No se puede eliminar sin estar autenticado.");
        }
    };

    const handleUpdateCliente = (clienteId) => {
        navigate(`/edit-cliente/${clienteId}`);
    };

    const handleDetailsCliente = (clienteId) => {
        navigate(`/cliente/${clienteId}`);
    };
    if (loading) {
        return <Spinner />
    }
    return (
        <Grid container spacing={2}>
            {clientes.map(
                (cliente) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cliente.id}>
                        <ClienteCard cliente={cliente} onDelete={handleDeleteCliente} onUpdate={handleUpdateCliente} onDetails={handleDetailsCliente} />
                    </Grid>
                ))}
        </Grid>
    )
}
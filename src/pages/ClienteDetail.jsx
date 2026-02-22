import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getClienteById } from '../services/clienteService';
import './ClienteDetail.css';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ClienteDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cliente, setCliente] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getClienteById(id)
            .then(data => {
                setCliente(data);
            })
            .catch(error => {
                console.error('Error al cargar cliente:', error);
                alert('Error al cargar el cliente');
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <Typography>Cargando...</Typography>;
    }

    if (!cliente) {
        return <Typography>Cliente no encontrado</Typography>;
    }

    return (
        <Box sx={{ maxWidth: 500, margin: '0 auto' }}>
            <Button 
                startIcon={<ArrowBackIcon />} 
                onClick={() => navigate('/clientes')}
                sx={{ marginBottom: 2 }}
            >
                Atrás
            </Button>
            
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {cliente.name}
                    </Typography>
                    
                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Nombre</Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            {cliente.name}
                        </Typography>
                    </Box>

                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Apellido</Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            {cliente.last_name}
                        </Typography>
                    </Box>

                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Número de teléfono</Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            {cliente.tlf}
                        </Typography>
                    </Box>

                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Fecha de incorporación</Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            {cliente.incorporationdate}
                        </Typography>
                    </Box>

                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Pedidos</Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            {cliente.pedidos}
                        </Typography>
                    </Box>

                    <Box sx={{ marginTop: 3, display: 'flex', gap: 1 }}>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={() => navigate(`/edit-cliente/${id}`)}
                        >
                            Editar
                        </Button>
                        <Button 
                            variant="contained" 
                            color="error"
                            onClick={() => navigate('/')}
                        >
                            Volver al Inicio
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPedidoById } from '../services/pedidoService';
import { getClienteById } from '../services/clienteService';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Spinner from '../components/Spinner';
import './PedidoDetail.css';

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;

export default function PedidoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPedidoById(id)
      .then(async (data) => {
        setPedido(data);
        if (data.cliente) {
          try {
            const clienteData = await getClienteById(data.cliente);
            setCliente(clienteData);
          } catch (error) {
            console.error("Error al cargar cliente:", error);
          }
        }
      })
      .catch(error => {
        console.error('Error al cargar pedido:', error);
        alert('Error al cargar el pedido');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!pedido) {
    return <Typography>Pedido no encontrado</Typography>;
  }

  const pedidoImageUrl = pedido.picture
    ? `${API_MEDIA_URL}/${pedido.picture}`
    : null;

  return (
    <Box sx={{ maxWidth: 500, margin: '0 auto' }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ marginBottom: 2 }}
      >
        Volver
      </Button>

      <Card>
        {pedidoImageUrl && (
          <CardMedia
            component="img"
            height={400}
            image={pedidoImageUrl}
            alt={pedido.name}
          />
        )}
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {pedido.name}
          </Typography>

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Descripción</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {pedido.description || 'Sin descripción'}
            </Typography>
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Precio</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              ${pedido.price}
            </Typography>
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Entrega</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {pedido.delivery}
            </Typography>
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Entrega</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {pedido.delivery}
            </Typography>
          </Box>
          
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Cliente</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {cliente ? `${cliente.name} ${cliente.last_name ?? ''}` : 'Sin cliente asignado'}
            </Typography>
          </Box>

          <Box sx={{ marginTop: 3, display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/edit-pedido/${id}`)}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => navigate('/')}
            >
              Volver
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

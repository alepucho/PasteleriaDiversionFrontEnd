import { Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material";

const API_MEDIA_URL= import.meta.env.VITE_API_MEDIA_URL;

export default function PedidoCard({ pedido, onDelete, onUpdate, onDetails }) {
    const pedidoImageUrl = `${API_MEDIA_URL}/${pedido.picture}`;
    return (
        <Card>
            <CardMedia
                component="img"
                height={200}
                image={pedidoImageUrl}
                alt={pedido.name}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {pedido.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Precio {pedido.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => onDetails(pedido.id)}>Detalles</Button>
                <Button size="small" color="error" onClick={() => onDelete(pedido.id)}>Eliminar</Button>
                <Button size="small" color="primary" onClick={() => onUpdate(pedido.id)}>Actualizar</Button>
            </CardActions>
        </Card>
    );
}
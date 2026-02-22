import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import "./ClienteCard.css";

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL

export default function ClienteCard({ cliente, onDelete, onUpdate, onDetails }) {
    return (
        <Card>
            <CardContent>
                <Typography className="titulo" variant="h5" component="div">
                    {cliente.name}
                </Typography>
            </CardContent>
            <CardActions className="modelo-b">
                <Button size="small" onClick={() => onDetails(cliente.id)}>Detalles</Button>
                <Button size="small" color="error" onClick={() => onDelete(cliente.id)}>Eliminar</Button>
                <Button size="small" color="primary" onClick={() => onUpdate(cliente.id)}>Actualizar</Button>
            </CardActions>
        </Card>
    );
}
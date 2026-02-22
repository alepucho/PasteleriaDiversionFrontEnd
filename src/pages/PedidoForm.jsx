import { TextField, Typography, Box, Button, MenuItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPedido, updatePedido, getPedidoById } from "../services/pedidoService";
import Spinner from "../components/Spinner";
import { fetchClientes } from "../services/clienteService";
import './PedidoForm.css';
import { Description } from "@mui/icons-material";

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;

export default function PedidoForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const [pedidoData, setPedidoData] = useState({
    name: "",
    description: "",
    price: "",
    delivery: "",
    deliverydate: "",
    cliente: "",
  });

  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pictureChanged, setPictureChanged] = useState(false);
  const navigate = useNavigate();

  // Cargar datos si es edición
  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      getPedidoById(id)
        .then((data) => {
          setPedidoData({
            name: data.name,
            description: data.description,
            price: data.price,
            delivery: data.delivery,
            deliverydate: data.deliverydate,
            weight: data.weight,
            picture: data.picture || null,
            cliente: data.cliente ? data.cliente.id : "",
          });
        })
        .catch((error) => {
          console.error("Error al cargar Pedido:", error);
          alert("Error al cargar el Pedido, regresa más tarde");
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  // Cargar lista de clientes
  useEffect(() => {
    fetchClientes()
      .then((data) => setClientes(data))
      .catch((error) => {
        console.error("Error obteniendo clientes:", error);
        alert("Error obteniendo clientes, regresa más tarde");
      });
  }, []);

  // Manejo de cambios
  const handleChange = (e) => {
    if (e.target.name === "picture") {
      setPedidoData({
        ...pedidoData,
        picture: e.target.files[0],
      });
      setPictureChanged(true);
      alert("Imagen cargada con éxito");
    } else {
      const { name, value } = e.target;
      setPedidoData({ ...pedidoData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updatePedido(id, pedidoData, pictureChanged);
        alert("Pedido actualizado con éxito");
      } else {
        await createPedido(pedidoData);
        alert("Pedido creado con éxito");
      }
      navigate("/");
    } catch (error) {
      alert(`Error al ${isEdit ? "actualizar" : "crear"} el Pedido, intenta de nuevo`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const pedidoImageUrl =
    pedidoData.picture && typeof pedidoData.picture === "string"
      ? `${API_MEDIA_URL}${pedidoData.picture}`
      : null;


  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {isEdit ? "Editar Pedido" : "Crear Pedido"}
      </Typography>
      {loading ? (
        <Spinner />
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField label="Nombre" name="name" variant="outlined" value={pedidoData.name} onChange={handleChange} />
          <TextField label="Descripción" name="description" variant="outlined" value={pedidoData.description} onChange={handleChange} />
          <TextField label="Precio" name="price" variant="outlined" type="number" value={pedidoData.price} onChange={handleChange} />
          <TextField label="Fecha de Entrega" name="deliverydate" variant="outlined" type="date" value={pedidoData.deliverydate} onChange={handleChange} />

          {/* Selector de cliente */}
          <TextField
            select
            label="Cliente"
            name="cliente"
            value={pedidoData.cliente}
            onChange={handleChange}
          >
            <MenuItem value="">Sin cliente</MenuItem>
            {clientes.map((cliente) => (
              <MenuItem key={cliente.id} value={cliente.id}>
                {cliente.name} {cliente.last_name}
              </MenuItem>
            ))}
          </TextField>

          {/* Subir una nueva imagen */}
          <Button variant="outlined" component="label">
            Subir Imagen
            <input type="file" name="picture" hidden onChange={handleChange} />
          </Button>

          {/* Mostramos la imagen si es que ya había una */}
          {pedidoImageUrl && (
            <img src={pedidoImageUrl} alt="Pedido" style={{ width: "150px", marginTop: "10px" }} />
          )}

          <Button type="submit" variant="contained">
            {isEdit ? "Actualizar" : "Guardar"}
          </Button>
        </Box>
      )}
    </>
  );
}
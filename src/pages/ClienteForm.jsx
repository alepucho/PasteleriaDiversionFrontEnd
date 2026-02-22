import { TextField, Typography, Box, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createCliente, updateCliente, getClienteById } from "../services/clienteService";
import './ClienteForm.css';

export default function ClienteForm() {
  const { id } = useParams(); // Obtiene el ID de la URL
  const isEdit = !!id; // true si hay ID, false si es crear nuevo

  const [clienteData, setClienteData] = useState({
    name: '',
    last_name: '',
    tlf: '',
    incorporationdate: '',
    pedidos: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Cargar datos del cliente si es edición
  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      getClienteById(id)
        .then(data => {
          setClienteData({
            name: data.name,
            last_name: data.last_name,
            tlf: data.tlf,
            incorporationdate: data.incorporationdate,
            pedidos: data.pedidos,
          });
        })
        .catch(error => {
          console.error('Error al cargar cliente:', error);
          alert('Error al cargar el cliente');
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value} = e.target;
    setClienteData({ ...clienteData, [name]: value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if (isEdit) {
        await updateCliente(id, clienteData);
        alert('Cliente actualizado con éxito');
      } else {
        await createCliente(clienteData);
        alert('Cliente creado con éxito');
      }
      navigate('/');
    }catch(error){
      alert(`Error al ${isEdit ? 'actualizar' : 'crear'} el Cliente`);
      console.error(error);
      return;
    }
  }
  return (
    <>
      <Typography variant="h4" gutterBottom>
        {isEdit ? 'Editar Cliente' : 'Crear Cliente'}
      </Typography>
      {loading ? (
        <Typography>Cargando...</Typography>
      ) : (
        <Box component="form" onSubmit ={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Nombre" name="name" variant="outlined" value={clienteData.name} onChange={handleChange}/>
          <TextField label="Apellido" name="last_name" variant="outlined" value={clienteData.last_name} onChange={handleChange}/>
          <TextField label="Teléfono" name="tlf" variant="outlined" value={clienteData.tlf} onChange={handleChange}/>
          <TextField label="Fecha de incorporación" name="incorporationdate" variant="outlined" type="date" value={clienteData.incorporationdate} onChange={handleChange}/>
          <TextField label="Pedidos" name="pedidos" variant="outlined" value={clienteData.pedidos} onChange={handleChange}/>
          <Button type="submit" variant="contained">{isEdit ? 'Actualizar' : 'Guardar'}</Button>
        </Box>
      )}
    </>
  )
}
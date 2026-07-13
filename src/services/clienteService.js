const API_BASE_URL= import.meta.env.VITE_API_BASE_URL;
const CLIENT_ID= import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET= import.meta.env.VITE_CLIENT_SECRET;
import axios from 'axios';

/**
 * Obtener Clientes desde la API
 * @returns Data de Clientes 
 */
export async function fetchClientes () {
    const response = await axios.get(`${API_BASE_URL}/cliente/`);
    return response.data;
}
export async function createCliente(clienteData){
    const payload={
        ...clienteData,
    }
    const response =await axios.post (`${API_BASE_URL}/cliente/`, payload);
    return response.data;
}
export async function deleteCliente(clienteId){
    const response = await axios.delete(`${API_BASE_URL}/cliente/${clienteId}/`);
    return response.data;
}
export async function getClienteById(clienteId){
    const response = await axios.get(`${API_BASE_URL}/cliente/${clienteId}/`);
    return response.data;
}
export async function updateCliente(clienteId, clienteData){
    const payload = { ...clienteData };
    const response = await axios.put(`${API_BASE_URL}/cliente/${clienteId}/`, payload);
    return response.data;
}
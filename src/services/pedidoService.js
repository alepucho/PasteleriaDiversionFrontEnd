const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { PriceChange } from "@mui/icons-material";
import axios from "axios";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Convertir un archivo a Base64
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function createPedido(pedidoData) {
  let pictureBase64 = "";
  if (pedidoData.picture instanceof File) {
    pictureBase64 = await fileToBase64(pedidoData.picture);
  }
  const payload = {
    ...pedidoData,
    picture: pictureBase64,
  };
  const response = await axios.post(`${API_BASE_URL}/pedidos/`, payload);
  return response.data;
}

export async function fetchPedidos() {
  const response = await axios.get(`${API_BASE_URL}/pedidos/`);
  return response.data;
}

export async function deletePedido(pedidoId) {
  const response = await axios.delete(`${API_BASE_URL}/pedidos/${pedidoId}/`);
  return response.data;
}

export async function getPedidoById(pedidoId) {
  const response = await axios.get(`${API_BASE_URL}/pedidos/${pedidoId}/`);
  return response.data;
}

export async function updatePedido(pedidoId, pedidoData, pictureChanged = false) {
  let payload = {
    ...pedidoData,
  };

  // Solo convertir la imagen si realmente cambió
  if (pictureChanged && pedidoData.picture instanceof File) {
    const pictureBase64 = await fileToBase64(pedidoData.picture);
    payload.picture = pictureBase64;
  } else {
    delete payload.picture;
  }

  console.log("payload enviado:", payload);

  const response = await axios.patch(`${API_BASE_URL}/pedidos/${pedidoId}/`, payload);
  return response.data;
}
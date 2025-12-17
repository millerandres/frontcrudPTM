// src/services/api.js
const API_BASE = '/api';

export const api = {
  // Productos
  getProducts: () => fetch(`${API_BASE}/productos`).then(res => res.json()),
  createProduct: (product) =>
    fetch(`${API_BASE}/productos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    }).then(res => res.json()),

  updateProduct: (id, product) =>
    fetch(`${API_BASE}/productos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    }).then(res => res.json()),

  deleteProduct: (id) =>
    fetch(`${API_BASE}/productos/${id}`, { method: 'DELETE' }),

  // Combinaciones
  getCombinations: (budget) =>
    fetch(`${API_BASE}/productos/combinaciones?precioMaximo=${budget}`)
      .then(res => res.json())
};
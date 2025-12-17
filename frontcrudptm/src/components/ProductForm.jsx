// src/components/ProductForm.jsx
import { useState, useEffect } from 'react';

export default function ProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    stock: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre || '',
        precio: product.precio || '',
        descripcion: product.descripcion || '',
        stock: product.stock || ''
      });
    } else {
      setFormData({ nombre: '', precio: '', descripcion: '', stock: '' });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock, 10)
    };
    if (product) payload.id = product.id;
    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
      <input name="precio" type="number" step="0.01" placeholder="Precio" value={formData.precio} onChange={handleChange} required />
      <input name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} required />
      <input name="stock" type="number" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
      <button type="submit">{product ? 'Actualizar' : 'Agregar'}</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
    </form>
  );
}
// src/components/ProductList.jsx
import { useState } from 'react';

export default function ProductList({ products, onEdit, onDelete }) {
  const [sortKey, setSortKey] = useState('nombre');
  const [sortDir, setSortDir] = useState('asc');

  const sorted = [...products].sort((a, b) => {
    const A = a[sortKey];
    const B = b[sortKey];
    if (typeof A === 'string') {
      return sortDir === 'asc' ? A.localeCompare(B) : B.localeCompare(A);
    }
    return sortDir === 'asc' ? A - B : B - A;
  });

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <table border="1" cellPadding="8" cellSpacing="0">
      <thead>
        <tr>
          {['nombre', 'precio', 'stock'].map(key => (
            <th key={key} onClick={() => handleSort(key)} style={{ cursor: 'pointer' }}>
              {key} {sortKey === key ? (sortDir === 'asc' ? '↑' : '↓') : ''}
            </th>
          ))}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map(p => (
          <tr key={p.id}>
            <td>{p.nombre}</td>
            <td>{p.precio.toFixed(2)}</td>
            <td>{p.stock}</td>
            <td>
              <button onClick={() => onEdit(p)}>Editar</button>
              <button onClick={() => onDelete(p.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
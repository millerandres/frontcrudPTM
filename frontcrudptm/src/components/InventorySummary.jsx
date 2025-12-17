// src/components/InventorySummary.jsx
export default function InventorySummary({ total, topProduct }) {
  return (
    <div style={{ margin: '20px 0', padding: '10px', background: '#e9f7ef', borderRadius: '5px' }}>
      <p><strong>Valor total del inventario:</strong> ${total.toFixed(2)}</p>
      {topProduct.nombre && (
        <p>
          <strong>Producto con mayor valor en inventario:</strong> {topProduct.nombre}
          (${(topProduct.precio * topProduct.stock).toFixed(2)})
        </p>
      )}
    </div>
  );
}
// src/App.js
import { useState, useEffect } from 'react';
import CatFactsModal from './components/CatFactsModal';
import UselessFactFooter from './components/UselessFactFooter';
import { api } from './services/api';

import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import CombinationFinder from './components/CombinationFinder';
import InventorySummary from './components/InventorySummary';

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [combinations, setCombinations] = useState([]);

  // Cargar productos al inicio
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    api.getProducts().then(setProducts);
  };

  const handleSave = (product) => {
    if (product.id) {
      api.updateProduct(product.id, product).then(() => loadProducts());
    } else {
      api.createProduct(product).then(() => loadProducts());
    }
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    api.deleteProduct(id).then(() => loadProducts());
  };

  const handleFindCombinations = (budget) => {
    api.getCombinations(budget).then(setCombinations);
  };

  // Calcular valor total del inventario
  const totalInventory = products.reduce(
    (sum, p) => sum + (p.precio * p.stock), 0
  );

  // Producto con mayor valor de inventario
  const maxInventoryProduct = products.reduce((max, p) => {
    const value = p.precio * p.stock;
    return value > (max.precio * max.stock || 0) ? p : max;
  }, {});

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Gestión de Productos</h1>

      <CatFactsModal />

      <CombinationFinder onFind={handleFindCombinations} combinations={combinations} />

      <h2>Agregar / Editar Producto</h2>
      <ProductForm
        product={editingProduct}
        onSave={handleSave}
        onCancel={() => setEditingProduct(null)}
      />

      <InventorySummary
        total={totalInventory}
        topProduct={maxInventoryProduct}
      />

      <h2>Lista de Productos</h2>
      <ProductList
        products={products}
        onEdit={setEditingProduct}
        onDelete={handleDelete}
      />

      <UselessFactFooter />
    </div>
  );
}

export default App;
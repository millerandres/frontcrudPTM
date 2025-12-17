// src/components/CombinationFinder.jsx
import { useState } from 'react';

export default function CombinationFinder({ onFind, combinations }) {
  const [budget, setBudget] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (budget > 0) onFind(parseFloat(budget));
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Buscar combinaciones dentro de un presupuesto</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          step="0.01"
          placeholder="Ingresa tu presupuesto"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />
        <button type="submit">Buscar</button>
      </form>

      {combinations.length > 0 && (
        <div style={{ marginTop: '10px', padding: '10px', background: '#fff3cd' }}>
          <h4>Combinaciones posibles:</h4>
          <ul>
            {combinations.map((combo, i) => (
              <li key={i}>
                Productos: {combo.nombres.join(', ')} — Total: ${combo.sumaPrecio.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
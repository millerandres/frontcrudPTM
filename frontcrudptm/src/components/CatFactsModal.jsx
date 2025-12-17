// src/components/CatFactsModal.jsx
import { useEffect, useState } from 'react';

export default function CatFactsModal() {
  const [facts, setFacts] = useState([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    fetch('https://meowfacts.herokuapp.com/?count=2&lang=esp')
      .then(res => res.json())
      .then(data => setFacts(data.data || []));
  }, []);

  if (!show || facts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20%',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      zIndex: 1000,
      width: '80%',
      maxWidth: '500px'
    }}>
      <h3 style={{ textAlign: 'center' }}>¿Sabías que...?</h3>
      <ul>
        {facts.map((fact, i) => (
          <li key={i}>{fact}</li>
        ))}
      </ul>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <button onClick={() => setShow(false)}>Cerrar</button>
      </div>
    </div>
  );
}
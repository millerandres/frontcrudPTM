// src/components/UselessFactFooter.jsx
import { useEffect, useState } from 'react';

export default function UselessFactFooter() {
  const [fact, setFact] = useState('');

  useEffect(() => {
    fetch('https://uselessfacts.jsph.pl/api/v2/facts/today?language=en')
      .then(res => res.json())
      .then(data => setFact(data.text || ''));
  }, []);

  return (
    <footer style={{
      marginTop: '40px',
      padding: '10px',
      textAlign: 'center',
      backgroundColor: '#f5f5f5',
      fontSize: '0.9em',
      color: '#555'
    }}>
      📌 Dato inútil del día: {fact}
    </footer>
  );
}
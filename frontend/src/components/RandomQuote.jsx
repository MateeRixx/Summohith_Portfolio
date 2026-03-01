import { useState } from 'react';
import { quotes } from '../data/quotes';

const RandomQuote = () => {
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  if (!quote) return null;

  return (
    <p style={{
      fontFamily: 'var(--font-display)',
      fontSize: '1rem',
      letterSpacing: '1px',
      color: 'var(--text-secondary)',
      opacity: 0.8,
      fontStyle: 'italic',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: 1.6
    }}>
      {quote}
    </p>
  );
};

export default RandomQuote;

import { useState } from 'react';
import { summarizeText } from '../services/summarizeService';

const useSummary = () => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSummary = async (text) => {
    setLoading(true);
    setError(null);
    try {
      const result = await summarizeText(text);
      setSummary(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { summary, loading, error, getSummary };
};

export default useSummary;
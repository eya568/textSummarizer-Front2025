// src/hooks/useAI.js
import useFetch from './useFetch';

const useAI = () => {
  const { data, loading, error, fetchData } = useFetch();

  const summarizeText = async (text) => {
    if (text.trim()) {
      // Assuming your FastAPI URL is something like: 'http://localhost:8000/summarize'
      await fetchData('ApiLink', {  // Replace with your FastAPI endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
    }
  };

  return {
    summary: data?.summary, 
    loading,
    error,
    summarizeText,
  };
};

export default useAI;

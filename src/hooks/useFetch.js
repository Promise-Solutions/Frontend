import { useState, useEffect } from "react";

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (fetchOptions = {}) => {
    setLoading(true);
    try {
      const response = await fetch(url, { ...options, ...fetchOptions });
      const result = await response.json();
      setData(result);
      setLoading(false);
      return result; // Return the fetched data
    } catch (error) {
      console.error("Erro:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, fetchData };
}

export default useFetch;

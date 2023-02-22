import { useState, useEffect } from "react";

export default function useFetch(url) {
  console.log("useFetch");
  const [isLoading, setIsLoading] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [isError, setIsError] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async (url) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setIsLoading(false);
        setApiData(data);
      } catch (error) {
        setIsError(error);
        setIsLoading(false);
      }
    };
    fetchData(url);
  }, [url]);

  return { isLoading, apiData, isError };
}

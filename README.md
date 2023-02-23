# Movie Finder

## 說明
因為API的緣故，只能透過英文片名搜尋，預設值是`Batman`，可嘗試搜尋其他英文片名，點擊CARD後會跳出詳細的說明。

此練習嘗試將fetch抽出來獨立撰寫成一個hook

```
import { useState, useEffect } from "react";

export default function useFetch(url) {
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
```

## 參考資料
OMDb API : https://www.omdbapi.com/


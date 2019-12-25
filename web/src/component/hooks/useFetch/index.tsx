import React, { useState } from "react";
import { useEffect } from "react";

interface IFetchHook {
  (url: RequestInfo, options: RequestInit): Response| null;
}

const useFetch: IFetchHook = (url, options) => {
  const [response, setResponse] = useState<Response | null >(null);

  useEffect(() => {
    async () => {
      const res: Response = await fetch(url, options);
      setResponse(res);
    };
  });

  return response;
};

export default useFetch;

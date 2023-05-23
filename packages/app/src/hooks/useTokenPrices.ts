// api.coingecko.com/api/v3/simple/price?ids=pepemon-pepeballs,pepedex&vs_currencies=usd

import { useEffect, useState } from "react";

const useTokenPrices = () => {
  const [ppblzPrice, setPpblzPrice] = useState<any>({});
  const [ppdexPrice, setPpdexPrice] = useState<any>({});

  const fetchTokenPrices = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=pepemon-pepeballs,pepedex&vs_currencies=usd",
      { method: "GET" }
    );
    return await response.json();
  };

  useEffect(() => {
    fetchTokenPrices().then((prices: any) => {
      if (!prices) {
        return;
      }
      setPpblzPrice(prices["pepemon-pepeballs"].usd);
      setPpdexPrice(prices["pepedex"].usd);
    });
  }, []);

  return { ppblzPrice, ppdexPrice };
};

export default useTokenPrices;

import { useEffect, useState } from "react";
import { correctChainIsLoaded } from "../utils/network";
import usePepemon from "./usePepemon";

const part1start = "0x0000000000000000000000000000000000000000";
const part2start = "0x0DEA5C01eEd9c927C782663671Fb475b308640e3";
const part3start = "0x198cA110a262F7b181176F91aede4347Ce33E298";
const part4start = "0x274808d9D91DBA904Dcc6aEA8Acda2c0a5170724";
const part5start = "0x35040Ba3c116d1D52B07Bc67E3E6B014DBFaB5bc";
const part6start = "0x42BDd0aA65171d2487E399848744F44b053D9728";
const part7start = "0x5075c0d90DD73b9EA2b75fF69Ab5d117c743EeB7";
const part8start = "0x5c86c503816D06940622646E12f36634ed54F5Cd";
const part9start = "0x6E31D226C3c10d20856d02f9D057522fD55c1C59";
const part10start = "0x79cf3bc997190f615e1d2Fb427ec5BAE7D1ee25c";
const part11start = "0x877cF7EA51A6846434b55919C5456c420d2aFc2a";
const part12start = "0x95532ABD9A83832586dc43adAC3d158Cf0987aB8";
const part13start = "0xA650D3B1A9b305d6AfF8539255Ae7c069edE1bb8";
const part14start = "0xC20500960e3217F12C80FF30F001280b90030373";
const part15start = "0xDb963794585F031E294bD504d16A1a6167608095";
const part16start = "0xF9E116397fdC2da11Af7d64Cb16cD4c6D72463F0";
const part17start = "0xb55265D14B8D23d9Cb0e6ebe49b76D8be4f771FF";
const part18start = "0xd14fae79b01dE8bE9E6feD86627f74D3A3242C42";
const part19start = "0xea006EC004F4b005ECaBF37ddF4541914c914f53";

const useAccountMerkle = (account: string) => {
  const [response, setResponse] = useState<any>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const pepemon = usePepemon();
  // @ts-ignore

  const selectPart = (account) => {
    if (account >= part19start) {
      return 19;
    }
    if (account >= part18start) {
      return 18;
    }
    if (account >= part17start) {
      return 17;
    }
    if (account >= part16start) {
      return 16;
    }
    if (account >= part15start) {
      return 15;
    }
    if (account >= part14start) {
      return 14;
    }
    if (account >= part13start) {
      return 13;
    }
    if (account >= part12start) {
      return 12;
    }
    if (account >= part11start) {
      return 11;
    }
    if (account >= part10start) {
      return 10;
    }
    if (account >= part9start) {
      return 9;
    }
    if (account >= part8start) {
      return 8;
    }
    if (account >= part7start) {
      return 7;
    }
    if (account >= part6start) {
      return 6;
    }
    if (account >= part5start) {
      return 5;
    }
    if (account >= part4start) {
      return 4;
    }
    if (account >= part3start) {
      return 3;
    }
    if (account >= part2start) {
      return 2;
    }
    if (account >= part1start) {
      return 1;
    }
  };

  const fetchData = async (part: any, account: string) => {
    setIsFetching(true);
    const endpoint = `https://raw.githubusercontent.com/ritaritaritarita/dropproofs/main/split${part}.json`;
    const response = await fetch(`${endpoint}`, { method: "GET" });

    if (!response.ok) {
      setIsFetching(false);
      return null;
    }

    const json = await response.json();
    const merkle = json[account];
    setIsFetching(false);
    return merkle;
  };

  useEffect(() => {
    correctChainIsLoaded(pepemon).then((correct) => {
      if (correct) {
        if (!account) {
          return;
        }
        const part = selectPart(account);
        try {
          fetchData(part, account)
            .then((res) => setResponse(res))
            .catch((err) => console.error(err));
        } catch {}
      }
    });
  }, [account]);

  return { response, isFetching };
};

export default useAccountMerkle;

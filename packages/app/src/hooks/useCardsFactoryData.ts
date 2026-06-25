import { useCallback, useEffect, useState } from "react";
import {
  getBalanceOfBatch,
  getMaxSupply,
  getTotalSupply,
} from "../utils/erc1155";
import usePepemon from "./usePepemon";
import { getPepemonFactoryContract } from "../pepemon/utils";
import { correctChainIsLoaded } from "../utils/network";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import PepemonFactoryAbi from "../pepemon/lib/abi/pepemon_factory.json";

const PUBLIC_ETH_RPC = "https://0xrpc.io/eth";
const FACTORY_ADDRESS_MAINNET = "0xCB6768a968440187157Cfe13b67Cac82ef6cc5a4";

export interface CardBalances {
  tokenId: number;
  userBalance: string;
  maxSupply: string;
  totalSupply: string;
}

const setIntervalAsync = (fn: any, ms: any) => {
  fn().then(() => {
    setTimeout(() => setIntervalAsync(fn, ms), ms);
  });
};

const useCardsFactoryData = (tokenIds: number[], transactions: number) => {
  const [cardsBalance, setCardsBalance] = useState([]);
  const {
    account,
    provider,
    chainId,
  }: { account: string; provider: any; chainId: number } = usePepemon();
  const pepemon = usePepemon();

  const fetchCardBalances = useCallback(
    async (factoryContract) => {
      const batches = tokenIds.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 10);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
      }, []);

      let runBatch = 0;
      let userBalances: any = [];
      await new Promise<void>((resolve) => {
        setIntervalAsync(async () => {
          if (runBatch >= batches.length) {
            return resolve();
          }

          const batchBalances = await getBalanceOfBatch(
            factoryContract,
            account,
            batches[runBatch]
          );
          userBalances = [...userBalances, ...batchBalances];

          runBatch += 1;
        }, 100);
      });

      // const userBalances = await getBalanceOfBatch(factoryContract, account, tokenIds);
      return Promise.all(
        tokenIds.map(async (tokenId, index) => {
          return {
            tokenId,
            userBalance: userBalances && userBalances[index],
            maxSupply: await getMaxSupply(factoryContract, tokenId),
            totalSupply: await getTotalSupply(factoryContract, tokenId),
          };
        })
      );
    },
    [tokenIds, account]
  );

  useEffect(() => {
    if (provider && tokenIds.length) {
      correctChainIsLoaded(pepemon).then((correct) => {
        if (correct) {
          const factoryContract = getPepemonFactoryContract(pepemon);
          fetchCardBalances(factoryContract).then((balances) =>
            setCardsBalance(balances)
          );
        }
      });
    }
  }, [provider, pepemon, tokenIds, transactions, chainId, fetchCardBalances]);

  return cardsBalance;
};

export const getCardFactoryData = async (
  tokenId: number,
  pepemon: any,
  transactions: number
) => {
  const account = pepemon?.account || null;

  let factoryContract: any;
  const correct = await correctChainIsLoaded(pepemon);
  if (correct) {
    factoryContract = getPepemonFactoryContract(pepemon);
  } else {
    // No wallet or wrong chain — use public RPC for read-only supply data
    const readProvider = new JsonRpcProvider(PUBLIC_ETH_RPC);
    factoryContract = new Contract(
      FACTORY_ADDRESS_MAINNET,
      PepemonFactoryAbi,
      readProvider
    );
  }

  if (!factoryContract) return [];

  const userBalance = account
    ? await getBalanceOfBatch(factoryContract, account, [tokenId])
    : null;

  return [
    {
      tokenId,
      userBalance: userBalance?.[0] ?? null,
      maxSupply: await getMaxSupply(factoryContract, tokenId),
      totalSupply: await getTotalSupply(factoryContract, tokenId),
    },
  ];
};

export default useCardsFactoryData;

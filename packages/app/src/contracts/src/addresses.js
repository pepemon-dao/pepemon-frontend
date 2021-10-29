/**
 * See all ids below
 * https://ethereum.stackexchange.com/questions/17051/how-to-select-a-network-id-or-is-there-a-list-of-network-ids
 */
export const MAINNET_ID = 1;
export const RINKEBY_ID = 4;
export const BSC_ID = 56;
export const MATIC_ID = 137;

const commonContracts = {
  factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
  router01: "0xf164fC0Ec4E93095b804a4795bBe1e041497b92a",
  router02: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
};

export default {
  [MAINNET_ID]: {
    pairs: {
      "PPDEX-WETH": "0x6b1455e27902ca89ee3abb0673a8aa9ce1609952",
      "PPBLZ-WETH": "0x9479b62fd1cb36f8fed1eebb1bb373d238d08216",
    },
    contracts: {
      PPBLZ: "0x4d2ee5dae46c86da2ff521f7657dad98834f97b8",
      PPDEX: "0xf1F508c7C9f0d1b15a76fbA564eEf2d956220cf7",
      PEPEMON_FACTORY: "0xCB6768a968440187157Cfe13b67Cac82ef6cc5a4",
      PEPEMON_STORE: "0x107e5b796AD60361BBDfEAd24bfCDF07ffdF25Ff",
      PEPEMON_STAKE: "0xDF7F126B7270BA17C7b9964188e9020EB410096d",
      PEPEMON_LOTTERY: "0x1Dd77156DBc9A4b2F574A54DA28923b8007c2846",
    },
    ...commonContracts,
  },
  [RINKEBY_ID]: {
    pairs: {
      "PPDEX-WETH": "0xc0c76f294f797ab6ef4fb2fd16e804d4711a1e27",
      "PPBLZ-WETH": "0x485b5e17f89d55606c1a9714a8eca671251b50e6",
    },
    contracts: {
      PPBLZ: "0xA446F19DdfB9F4bdc1AbD36a4bb322D422c1bB4A",
      PPDEX: "0x866510264B9e950A7Fd2C0F12f6cd63891AAB436",
      PEPEMON_FACTORY: "0xDbbE98e0286DE6EB5a559c75392742B114642229",
      PEPEMON_STORE: "0x4B348879782dF0148001f34BC94a9f61D7C1823E",
      PEPEMON_STAKE: "0x7B3753ab6A365f66E20c27b055F44c90c0B2FE9e",
      PEPEMON_LOTTERY: "0x2697204A98a4D8810fd259548a4Ac128066525E5",
    },
    ...commonContracts,
  },
  [MATIC_ID]: {
    contracts: {
      PPDEX: "0x127984b5E6d5c59f81DACc9F1C8b3Bdc8494572e",
      PEPEMON_FACTORY: "0xABa4Aa7376a5c4dbF9D0ed14Ac867fb9c40AdD5b",
      PEPEMON_STORE: "0x989b76B927487A3a87fF6405209C1aD0D51c38A5",
    },
  },
  [BSC_ID]: {
    contracts: {
      PPDEX: "0x840a9cc568e31692503e16588477439e2e69d5d1",
      PEPEMON_FACTORY: "0x0AC1bd198DB93d7EC428b698DCEf2E43DBcea7D1",
      PEPEMON_STORE: "0x7C9191a02542A2CB7d02f7a1d123Ef73c69e44dC",
    },
  },
};

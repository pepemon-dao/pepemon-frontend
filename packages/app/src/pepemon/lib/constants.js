import BigNumber from "bignumber.js/bignumber";

export const SUBTRACT_GAS_LIMIT = 100000;

const ONE_MINUTE_IN_SECONDS = new BigNumber(60);
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60);
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24);
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365);

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber("4294967295"), // 2**32-1
  ONES_127: new BigNumber("340282366920938463463374607431768211455"), // 2**128-1
  ONES_255: new BigNumber(
    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber("1e18"),
};

export const LOCAL = {
  provider: "http://localhost:7545",
  networkId: 5777,
  chainId: 1337,
};

export const addressMap = {
  uniswapFactory: "0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95",
  uniswapFactoryV2: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
  RFI: "0xa1afffe3f4d611d252010e3eaf6f4d77088b0cd7",
};

export const contractAddresses = {
  ppblz: {
    1: "0x4d2ee5dae46c86da2ff521f7657dad98834f97b8",
    4: "0xA446F19DdfB9F4bdc1AbD36a4bb322D422c1bB4A",
    42: "0x798bC8D67A44E6cdEEd0019b5D032a27A00922B7",
    // 56: '0xfa413664726d770a0c4a77eb2aab03780f7e6ac8',
    56: "0x6ab899f7c0a1bd4e9cab0501683ae90db34be1ce",
    5777: "0x9D17a6908212037ce2732D68C01D1Ff37F4888B4",
    906090: "0xD5678bCB3652a118A0B7e93C5C457e42ce263640",
  },
  ppdex: {
    1: "0xf1F508c7C9f0d1b15a76fbA564eEf2d956220cf7",
    4: "0x866510264B9e950A7Fd2C0F12f6cd63891AAB436",
    // 56: '0x840a9cc568e31692503e16588477439e2e69d5d1',
    56: "0x3758428802fbeab2858d58aec5ff5176df464edd",
    137: "0x127984b5E6d5c59f81DACc9F1C8b3Bdc8494572e",
    42: "0xc18266C82B2C8687A9AB07bBCe5A72316c2566d8",
    5777: "0x12E8e303Fbafc1BF1fbc8524A283BFe35a8b89E5",
    906090: "0xafCDdE24d03597D6f02B4b686F5adDE182ceE6b5",
  },
  weth: {
    1: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    4: "0xc778417e063141139fce010982780140aa0cd5ab",
    42: "0xd1Ad823f8dB3Eb29a5F525dF05D941F99323d16C",
    5777: "0x14489C8238e99F73E9E4149f1D25a9af37507883",
  },
  uniV2_ppblz: {
    1: "0x9479b62fd1cb36f8fed1eebb1bb373d238d08216",
    4: "0x485b5e17f89d55606c1a9714a8eca671251b50e6",
    42: "0xc0f1e5bddf4c9c096d8cfd98d82045e9e8dbc017",
    5777: "0x12E8e303Fbafc1BF1fbc8524A283BFe35a8b89E5",
  },
  uniV2_ppdex: {
    1: "0x6b1455e27902ca89ee3abb0673a8aa9ce1609952",
    4: "0xc0c76f294f797ab6ef4fb2fd16e804d4711a1e27",
  },
  pepemonFactory: {
    1: "0xCB6768a968440187157Cfe13b67Cac82ef6cc5a4",
    4: "0xDbbE98e0286DE6EB5a559c75392742B114642229",
    56: "0x0AC1bd198DB93d7EC428b698DCEf2E43DBcea7D1",
    137: "0xABa4Aa7376a5c4dbF9D0ed14Ac867fb9c40AdD5b",
  },
  pepemonStore: {
    1: "0x107e5b796AD60361BBDfEAd24bfCDF07ffdF25Ff",
    4: "0x4B348879782dF0148001f34BC94a9f61D7C1823E",
    // 56: '0x2f1455eab7a4ec015ca56ff9445250d1f10cb71c',
    56: "0x7C9191a02542A2CB7d02f7a1d123Ef73c69e44dC",
    137: "0x989b76B927487A3a87fF6405209C1aD0D51c38A5",
  },
  pepemonStake: {
    1: "0xDF7F126B7270BA17C7b9964188e9020EB410096d",
    4: "0x7B3753ab6A365f66E20c27b055F44c90c0B2FE9e",
  },
  merkle: {
    1: "0x85aF8A5A3cB81f3F8E91f72Bff5f2b76127eEB3f",
    4: "0x680921158804E63f816233716f5F056D8c53fAbf",
  },
  merklePpblz: {
    1: "0x4d42B495260007a87036652ba1b8A5A206410704",
    4: "0x680921158804E63f816233716f5F056D8c53fAbf",
  },
  merklePpdex: {
    1: "0x07050BF1695C8294Bb68F9Ac38D9d16Ed3B1b3aD",
    4: "0x680921158804E63f816233716f5F056D8c53fAbf",
  },
  merkleUniV2: {
    1: "0x8dCFC55F388002675091541Ec9796698e61C8D0F",
    4: "0x680921158804E63f816233716f5F056D8c53fAbf",
  },
  pepemonLottery: {
    1: "0x1Dd77156DBc9A4b2F574A54DA28923b8007c2846",
    4: "0x2697204A98a4D8810fd259548a4Ac128066525E5",
  },
  pepemonPromoStore: {
    1: "",
    4: "0x29601EcbB61D5478125534e5711b148A5eD6eC83",
  },
  pepemonPromoToken: {
    1: addressMap.RFI,
    4: "0xa8eabAaf1A9eE78b31DFe51366858abdd406c4Cd", //TEST RFI
  },
  merkleDego: {
    56: "0x5116f9c7d2caf010d1abba2dd1648c7e2d12919a",
  },
  merkleDistributor: {
    1: "0x78a285dcd2AD742d8D4ACC33C3a279f44d842e13",
  },
};

/*
UNI-V2 LP Address on mainnet for reference
==========================================
0  USDT 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852
1  USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
2  DAI  0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
3  sUSD 0xf80758ab42c3b07da84053fd88804bcb6baa4b5c
4  COMP 0xcffdded873554f362ac02f8fb1f02e5ada10516f
5  LEND 0xab3f9bf1d81ddb224a2014e98b238638824bcf20
6  SNX  0x43ae24960e5534731fc831386c07755a2dc33d47
7  UMA  0x88d97d199b9ed37c29d846d00d443de980832a22
8  LINK 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974
9  BAND 0xf421c3f2e695c2d4c0765379ccace8ade4a480d9
10 AMPL 0xc5be99a02c6857f9eac67bbce58df5572498f40c
11 YFI  0x2fdbadf3c4d5a8666bc06645b8358ab803996e28
*/

export const supportedPools = [
  {
    pid: 0,
    lpAddresses: {
      1: "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852",
    },
    tokenAddresses: {
      1: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    },
    name: "Tether Turtle",
    symbol: "USDT-ETH UNI-V2 LP",
    tokenSymbol: "USDT",
    icon: "🐢",
  },
];

export interface OnchainBoosterpackConfig {
  chainId: number;
  faucetAddress: string;
  packId: number;
  cardIds: number[];
}

// Base Sepolia testnet deployment
// Factory:  0xaE0B8933FcDA800e5C561B5585De7130Faff02d5
// Booster:  0x0D10D51Aa601113eb5C0b5c52FA9E590CC43Cc80
// Faucet:   0x353490205cBe9fB473443619C95779Bde640e76C
export const BATTLE_MONSTERS_3_CARD_BASE_SEPOLIA: OnchainBoosterpackConfig = {
  chainId: 84532,
  faucetAddress: "0x353490205cBe9fB473443619C95779Bde640e76C",
  packId: 2,
  cardIds: [1, 2, 3],
};

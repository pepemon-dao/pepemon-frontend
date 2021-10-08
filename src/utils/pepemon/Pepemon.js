import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import { Contracts } from './lib/contracts.js'
import { Account } from './lib/accounts.js'
import { EVM } from './lib/evm.js'

import { contractAddresses } from './lib/constants'

export class Pepemon {
  networkId;

  constructor(provider, networkId, testing, options) {
    this.realProvider = null;
    this.networkId = networkId;
    // Ganache fix
    networkId = networkId === 1337 ? 5777 : networkId;

    if (typeof provider === 'string') {
      if (provider.includes('wss')) {
        this.realProvider = new Web3.providers.WebsocketProvider(
          provider,
          options.ethereumNodeTimeout || 10000,
        )
      } else {
        this.realProvider = new Web3.providers.HttpProvider(
          provider,
          options.ethereumNodeTimeout || 10000,
        )
      }
    } else {
      this.realProvider = provider
    }

    this.web3 = new Web3(this.realProvider)

    if (testing) {
      this.testing = new EVM(this.realProvider)
      this.snapshot = this.testing.snapshot()
    }

    if (options.defaultAccount) {
      this.web3.eth.defaultAccount = options.defaultAccount
    }

    // Debug chainId / networkId
    // this.web3.eth.net.getId().then((x) => console.log('networkId: ', x));
    // this.web3.eth.getChainId().then(x => console.log('chainId: ', x));

    this.contracts = new Contracts(this.realProvider, networkId, this.web3, options)
    this.ppblzAddress = contractAddresses.ppblz[networkId]
    this.ppdexAddress = contractAddresses.ppdex[networkId]
    this.wethAddress = contractAddresses.weth[networkId]
    this.uniV2Address = contractAddresses.uniV2_ppblz[networkId]
    this.pepemonFactoryAddress = contractAddresses.pepemonFactory[networkId]
    this.pepemonStoreAddress = contractAddresses.pepemonStore[networkId]
    this.pepemonStakeAddress = contractAddresses.pepemonStake[networkId]
    this.merkleAddress = contractAddresses.merkle[networkId]
    this.merkleAddressPpblz = contractAddresses.merklePpblz[networkId]
    this.merkleAddressPpdex = contractAddresses.merklePpdex[networkId]
    this.merkleAddressUniV2 = contractAddresses.merkleUniV2[networkId]
    this.pepemonLottery = contractAddresses.pepemonLottery[networkId]
    this.uniV2PpdexAddress = contractAddresses.uniV2_ppdex[networkId]
    this.pepemonPromoStoreAddress = contractAddresses.pepemonPromoStore[networkId]
    this.pepemonPromoTokenAddress = contractAddresses.pepemonPromoToken[networkId]
  }

  async resetEVM() {
    this.testing.resetEVM(this.snapshot)
  }

  addAccount(address, number) {
    this.accounts.push(new Account(this.contracts, address, number))
  }

  setProvider(provider, networkId) {
    this.web3.setProvider(provider)
    this.contracts.setProvider(provider, networkId)
    // this.operation.setNetworkId(networkId)
  }

  setDefaultAccount(account) {
    this.web3.eth.defaultAccount = account
    this.contracts.setDefaultAccount(account)
  }

  getDefaultAccount() {
    return this.web3.eth.defaultAccount
  }

  loadAccount(account) {
    const newAccount = this.web3.eth.accounts.wallet.add(account.privateKey)

    if (
      !newAccount ||
      (account.address &&
        account.address.toLowerCase() !== newAccount.address.toLowerCase())
    ) {
      throw new Error(`Loaded account address mismatch.
        Expected ${account.address}, got ${
        newAccount ? newAccount.address : null
      }`)
    }
  }

  toBigN(a) {
    return BigNumber(a)
  }
}


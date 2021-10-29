import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const getPpdexAddress = (pepemon) => {
  return pepemon && pepemon.ppdexAddress
}
export const getPpblzAddress = (pepemon) => {
  return pepemon && pepemon.ppblzAddress
}
export const getPepemonFactoryAddress = (pepemon) => {
  return pepemon && pepemon.pepemonFactoryAddress
}
export const getPepemonStoreAddress = (pepemon) => {
  return pepemon && pepemon.pepemonStoreAddress
}
export const getPepemonStakeAddress = (pepemon) => {
  return pepemon && pepemon.pepemonStakeAddress
}
export const getMerkleAddress = (pepemon) => {
  return pepemon && pepemon.merkleAddress
}
export const getPepemonLotteryAddress = (pepemon) => {
  return pepemon && pepemon.pepemonLottery
}
export const getUniV2PpdexAddress = (pepemon) => {
  return pepemon && pepemon.uniV2PpdexAddress
}
export const getPepemonPromoStoreAddress = (pepemon) => {
  return pepemon && pepemon.pepemonPromoStoreAddress
}
export const getPepemonPromoTokenAddress = (pepemon) => {
  return pepemon && pepemon.pepemonPromoTokenAddress
}

export const getWethContract = (pepemon) => {
  return pepemon && pepemon.contracts && pepemon.contracts.weth
}
export const getPpdexContract = (pepemon) => {
  return pepemon && pepemon.contracts && pepemon.contracts.ppdex
}
export const getPpblzContract = (pepemon) => {
  return pepemon && pepemon.contracts && pepemon.contracts.ppblz
}
export const getPpblzUniv2Contract = (pepemon) => {
  return pepemon && pepemon.contracts && pepemon.contracts.uniV2_ppblz
}
export const getPpdexUniV2Contract = (pepemon) => {
  return pepemon && pepemon.contracts && pepemon.contracts.uniV2_ppdex
}
export const getPepemonFactoryContract = (pepemon) => {
  return pepemon && pepemon.contracts && pepemon.contracts.pepemonFactory
}
export const getPepemonStoreContract = (pepemon) => {
  return pepemon && pepemon.contracts && pepemon.contracts.pepemonStore
}
export const getPepemonStakeContract = (pepemon) => {
  return pepemon && pepemon.contracts && pepemon.contracts.pepemonStake
}
export const getMerkleContract = (pepemon) => {
  return pepemon && pepemon.contracts && pepemon.contracts.merkle
}
export const getMerklePpblzContract = (pepemon) => {
  return pepemon && pepemon.contracts && pepemon.contracts.merklePpblz
}
export const getMerklePpdexContract = (pepemon) => {
  return pepemon && pepemon.contracts && pepemon.contracts.merklePpdex
}
export const getMerkleUniV2Contract = (pepemon) => {
  return pepemon && pepemon.contracts && pepemon.contracts.merkleUniV2
}
export const getMerkleDistributor = (pepemon) => {
  return pepemon && pepemon.contracts && pepemon.contracts.merkleDistributor
}
export const getPepemonLotteryContract = (pepemon) => {
  return pepemon && pepemon.contracts && pepemon.contracts.pepemonLottery
}
export const getPepemonPromoStoreContract = (pepemon) => {
  return pepemon && pepemon.contracts && pepemon.contracts.pepemonPromoStore
}
export const getPepemonPromoTokenContract = (pepemon) => {
  return pepemon && pepemon.contracts && pepemon.contracts.pepemonPromoToken
}
export const getMerkleDegoContract = (pepemon) => {
  return pepemon && pepemon.contracts && pepemon.contracts.merkleDego
}

export const getFarms = (pepemon) => {
  return pepemon
    ? pepemon.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'ppblz',
          earnTokenAddress: pepemon.contracts.ppblz.options.address,
          icon,
        }),
      )
    : []
}

export const getPoolWeight = async (ppdexContract, pid) => {
  const { allocPoint } = await ppdexContract.poolInfo(pid)
  const totalAllocPoint = await ppdexContract.totalAllocPoint()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (ppdexContract, pid, account) => {
  try {
    const reward = await ppdexContract.myRewardsBalance(account)
    return new BigNumber(reward)
  } catch {
    return new BigNumber(0)
  }
}

export const getTotalLPWethValue = async (
  ppdexContract,
  wethContract,
  lpContract,
  tokenContract,
  pid,
) => {
  const tokenAmount = 0
  const wethAmount = 0
  const totalWethValue = new BigNumber(0);
  const tokenPriceInWeth = 0;
  const poolWeight = 0;
  // Get balance of the token address
  // const tokenAmountWholeLP = await tokenContract.methods
  //   .balanceOf(lpContract.options.address)
  //   .call()
  // const tokenDecimals = await tokenContract.methods.decimals().call()
  // // Get the share of lpContract that ppdexContract owns
  // const balance = await lpContract.methods
  //   .balanceOf(ppdexContract.options.address)
  //   .call()
  // // Convert that into the portion of total lpContract = p1
  // const totalSupply = await lpContract.methods.totalSupply().call()
  // // Get total weth value for the lpContract = w1
  // const lpContractWeth = await wethContract.methods
  //   .balanceOf(lpContract.options.address)
  //   .call()
  // // Return p1 * w1 * 2
  // const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  // const lpWethWorth = new BigNumber(lpContractWeth)
  // const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // // Calculate
  // const tokenAmount = new BigNumber(tokenAmountWholeLP)
  //   .times(portionLp)
  //   .div(new BigNumber(10).pow(tokenDecimals))
  //
  // const wethAmount = new BigNumber(lpContractWeth)
  //   .times(portionLp)
  //   .div(new BigNumber(10).pow(18))
  return {
    tokenAmount,
    wethAmount,
    totalWethValue,
    tokenPriceInWeth,
    poolWeight,
    // totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    // tokenPriceInWeth: wethAmount.div(tokenAmount),
    // poolWeight: await getPoolWeight(ppdexContract, pid),
  }
}

export const approve = async (provider, approvingContract, toApproveContract) => {
  try {
    const result = await sendTransaction(provider, async () => await approvingContract
      .approve(toApproveContract.address, ethers.constants.MaxUint256));
    return result;
  } catch (err) {
    console.error(err)
  }
}

export const getPpblzSupply = async (pepemon) => {
  const result = await pepemon.contracts.ppblz.totalSupply();
  return new BigNumber(result.toString())
}

export const getPpdexSupply = async (pepemon) => {
  const result = await pepemon.contracts.ppdex.totalSupply();
  return new BigNumber(result.toString());
}

export const stake = async (ppdexContract, pid, amount, account) => {
  return ppdexContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (ppdexContract, pid, amount, account) => {
  return ppdexContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (ppdexContract, pid, account) => {
  return ppdexContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (ppdexContract, pid, account) => {
  try {
    const staked = await ppdexContract.getAddressPpblzStakeAmount(account)
    return new BigNumber(staked.toString());
  } catch {
    return new BigNumber(0)
  }
}

export const getTotalPpblzStaked = async (ppdexContract) => {
  try {
    const ppblzStaked = await ppdexContract.totalStakedPpblz()
    return new BigNumber(ppblzStaked.toString())
  } catch {
    return new BigNumber(0)
  }
}

export const getTotalStaked = async (ppdexContract) => {
  try {
    const staked = await ppdexContract.totalStakedSupply()
    return new BigNumber(staked.toString())
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (ppdexContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return ppdexContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

export const redeemCard = async (provider, contract, tokenId) => {
  return await sendTransaction(provider, async () => await contract.redeem(tokenId));
}

export const redeemCardNative = async (provider, contract, tokenId, amount) => {
  return await sendTransaction(provider, async () => await contract.redeem(tokenId, { value: amount }));
}


export const getCardPrice = async(contract, tokenId) => {
  const price = await contract.cardCosts(tokenId)
  return new BigNumber(price.toString())
}

export const getTotalSpend = async (storeContract) => {
  try {
    const spend = await storeContract.totalPPDEXSpend()
    return new BigNumber(spend.toString())
  } catch {
    return new BigNumber(0)
  }
}

export const getTotalSpendBNB = async (storeContract) => {
  try {
    const spend = await storeContract.totalBNBspend()
    return new BigNumber(spend.toString())
  } catch {
    return new BigNumber(0)
  }
}

export const setApprovalForAll = async (provider, factoryContract, approveAddress) => {
  try {
    return await sendTransaction(provider, async () => await factoryContract.setApprovalForAll(approveAddress, true));
  } catch (e) {
    console.log(`[PepemonFactory, setApprovalForAll] error: ${e}`);
  }
}

export const getIsApprovedForAll = async (factoryContract, approveAddress, account) => {
  try {
    return factoryContract.isApprovedForAll(account, approveAddress)
  } catch (e) {
    console.log(`[PepemonFactory, isApprovedForAll] error: ${e}`);
  }
}

export const joinEvent = async (provider, stakeContract, eventId) => {
  try {
    return await sendTransaction(provider, async () => await stakeContract.stake(eventId));
  } catch (e) {
    console.log(`[PepemonStake, stake] error: ${e}`);
  }
}

export const claimEvent = async (provider, stakeContract, eventId) => {
  try {
    return await sendTransaction(provider, async () => await stakeContract.claim(eventId));
  } catch (e) {
    console.log(`[PepemonStake, claim] error: ${e}`);
  }
}

export const withdrawEvent = async (provider, stakeContract, eventId) => {
  try {
    return await sendTransaction(provider, async () => await stakeContract.cancel(eventId));
  } catch (e) {
    console.log(`[PepemonStake, claim] error: ${e}`);
  }
}

export const getUserProgress = async (stakeContract, eventId, account) => {
  try {
    const result = await stakeContract.getUserProgress(account, eventId)
    return result.toString();
  } catch (e) {
    console.log(`[PepemonStake, getUserProgress] error: ${e}`);
  }
}

export const getUserEventStatus = async (stakeContract, eventId, account) => {
  try {
    return stakeContract.userInfo(account, eventId)
  } catch (e) {
    console.log(`[PepemonStake, getUserProgress] error: ${e}`);
  }
}

export const getActiveEvents = async (stakeContract) => {
  try {
    return stakeContract.getActiveEvents()
  } catch (e) {
    console.log(`[PepemonStake, getActiveEvents] error: ${e}`);
  }
}

export const getClosedEvents = async (stakeContract) => {
  try {
    return stakeContract.getClosedEvents()
  } catch (e) {
    console.log(`[PepemonStake, getClosedEvents] error: ${e}`);
  }
}

export const merkleIsClaimed = async (merkleContract, index, bsc = false, tokenId = null) => {
  try {
    if (!bsc) {
		if (tokenId) {
			return merkleContract.isClaimed(tokenId, index);
		}
        return merkleContract.isClaimed(index);
    }
    //TODO create new function for new variation of merkle contract
    return merkleContract.isAddressClaimed(index);
  } catch (e) {
    console.log(`[merkleContract, isClaimed] error: ${e}`);
  }
}

export const claimMerkle = async (provider, merkleContract, index, account, amount, proof, tokenId = null) => {
  try {
	  if (tokenId) {
		  return await sendTransaction(provider, async () => await merkleContract.claim(tokenId, index, account, amount, proof));
	  }
    return await sendTransaction(provider, async () => await merkleContract.claim(index, account, amount, proof));
  } catch (e) {
    console.log(`[merkleContract, claim] error: ${e}`);
  }
}

export const getMinLPTokens = async (lotteryContract) => {
  try {
    const result = await lotteryContract.MinLPTokens()
    return result.toString()
  } catch (e) {
    console.log(`[lotteryContract, minLPTokens] error: ${e}`);
  }
}

export const getLPBalance = async (lotteryContract, address) => {
  try {
    const result = await lotteryContract.getLPBalance(address)
    return result.toString();
  } catch (e) {
    console.log(`[lotteryContract, getLPBalance] error: ${e}`);
  }
}

export const isUserStaking = async (lotteryContract, address) => {
  try {
    return lotteryContract.isUserStaking(address)
  } catch (e) {
    console.log(`[lotteryContract, isUSerStaking] error: ${e}`);
  }
}

export const hasUserMinted = async (lotteryContract, address, cardId) => {
  try {
    return lotteryContract.hasUserMinted(address, cardId)
  } catch (e) {
    console.log(`[lotteryContract, hasUserMinted] error: ${e}`);
  }
}

export const getRewardCardId = async (lotteryContract) => {
  try {
    return lotteryContract.normalID()
  } catch (e) {
    console.log(`[lotteryContract, rewardCard] error: ${e}`);
  }
}

export const getStakingDeadline = async (lotteryContract) => {
  try {
    return lotteryContract.stakingDeadline()
  } catch (e) {
    console.log(`[lotteryContract, stakingDeadline] error: ${e}`);
  }
}

export const getStakingStart = async (lotteryContract, address) => {
  try {
    return lotteryContract.getStakingStart(address)
  } catch (e) {
    console.log(`[lotteryContract, stakingStart] error: ${e}`);
  }
}

export const stakeLottery = async (provider, lotteryContract) => {
  try {
    const result = await sendTransaction(provider, async () => await lotteryContract.stakeForNormalNFT());
    return result;
  } catch (e) {
    console.log(`[lotteryContract, stakeNormalNFT] error: ${e}`);
  }
}

export const withdrawLottery = async (provider, lotteryContract) => {
  try {
    const result = await sendTransaction(provider, async () => await lotteryContract.withdrawLP());
    return result;
  } catch (e) {
    console.log(`[lotteryContract, withdrawLP] error: ${e}`);
  }
}

export const mintNFTLottery = async (provider, lotteryContract) => {
  try {
    const result = await sendTransaction(provider, async () => await lotteryContract.mintNFT());
    return result;
  } catch (e) {
    console.log(`[lotteryContract, withdrawLP] error: ${e}`);
  }
}


export const sendTransaction = async (provider, callback) => {
  try {
    const { hash } = await callback()
    // dispatch({
    //   type: 'transactionPending',
    //   id: hash,
    // })
    return new Promise((resolve) => {
      provider.once(hash, (transaction) => {
        // dispatch({
        //   type: 'transactionCompleted',
        // })
        // console.log('COMPLETED', transaction);
        resolve(hash)
      })
    })
  } catch (err) {
    // dispatch({
    //   type: 'transactionError',
    //   error: { code: err.code, message: err.message },
    // })
    console.error(err);
  }
}

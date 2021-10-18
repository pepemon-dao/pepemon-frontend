import React, { useCallback, useContext,useEffect, useState, useRef } from 'react';
import styled from "styled-components";
import { useWeb3Modal,useTokenPrices, usePepemon, useTokenBalance } from "../../hooks";
import { getBalanceNumber, formatAddress } from "../../utils";
import { Button, Modal, ModalTitle, ModalContent, ModalActions, Spacer, Text } from "../../components";
import { NetworkSwitch } from "./components";
import { PepemonProviderContext } from "../../contexts";
import { theme } from "../../theme";
import Web3 from 'web3';
import { correctChainIsLoaded } from '../../utils';

type TopBarProps = {
	setChainId: any;
};

const TopBar: React.FC<TopBarProps> = ({setChainId}) => {
	const [provider, loadWeb3Modal] = useWeb3Modal();
    const [ppblzBalance, setPpblzBalance] = useState<any>(0)

	const pepemonContext = useContext(PepemonProviderContext);
	const { account, chainId, ppblzAddress, ppdexAddress } = pepemonContext[0];

	const [ppdexRewards, setPpdexRewards] = useState<any>(0)
    const [isUpdatingRewards, setIsUpdatingRewards] = useState(false)
    const { ppblzPrice, ppdexPrice } = useTokenPrices();
    const [ppdexBalance, setPpdexBalance] = useState<any>(0)
    const [allowWalletConnect, setAllowWalletConnect] = useState<any>(false)

    const [ppblzStakedAmount, setPpblzStakedAmount] = useState<any>(0);
	const pepemon = usePepemon()
	const web3 = new Web3(provider);
	const getAccount = useCallback(() => {
        return account
    }, [account])
	let timer: any = useRef(null);

    useEffect(() => {
        return () => timer && clearTimeout(timer);
    }, [timer])

	const getMyPpblzStakeAmount = useCallback( async () => {

        let stakeA = await pepemon.contracts.ppdex.getAddressPpblzStakeAmount(getAccount());
        setPpblzStakedAmount((web3.utils.fromWei(stakeA.toString())));
    }, [pepemon.contracts.ppdex, setPpblzStakedAmount, getAccount, web3.utils])

	const getPpdexRewards = useCallback( async () => {
        setIsUpdatingRewards(true);
        let cRewards = (await pepemon.contracts.ppdex.myRewardsBalance(getAccount())).toString();
        const ppblzStaked = (await pepemon.contracts.ppdex.getAddressPpblzStakeAmount(getAccount())).toString();
        const uniV2Staked = (await pepemon.contracts.ppdex.getAddressUniV2StakeAmount(getAccount())).toString();

        // Faulty myRewardsBalance edge case.. dont use view but recalculate!
        if (ppblzStaked > 0 && uniV2Staked > 0) {
            const lastRewardBlock = await pepemon.contracts.ppdex.getLastBlockCheckedNum(getAccount());
            const currentBlock = await pepemon.contracts.ppdex.getBlockNum();
            const liquidityMultiplier = await pepemon.contracts.ppdex.getLiquidityMultiplier();
            const rewardsVar = 100000;

            const ppblzRewardBalance = ppblzStaked * (currentBlock - lastRewardBlock) / rewardsVar;
            const uniV2RewardsBalance = uniV2Staked * ((currentBlock - lastRewardBlock) * liquidityMultiplier) / rewardsVar;
            const originalReward = cRewards - (ppblzRewardBalance + uniV2RewardsBalance);

            if (originalReward > 10000) {
                const realReward = ((cRewards - (ppblzRewardBalance + uniV2RewardsBalance)) / 2) + (ppblzRewardBalance + uniV2RewardsBalance);
                cRewards = realReward.toString();
            }
        }
        setPpdexRewards(web3.utils.fromWei(cRewards));

        setTimeout(() => {
            setIsUpdatingRewards(false);
            clearTimeout(timer);
        }, 2000);
    }, [getAccount, pepemon.contracts.ppdex, web3.utils])


	const getPpdexBalance = useCallback( async () => {
        let _ppdexBalance = await pepemon.contracts.ppdex.balanceOf(getAccount());
        setPpdexBalance(web3.utils.fromWei(_ppdexBalance.toString()));
    }, [pepemon.contracts.ppdex, setPpdexBalance, getAccount, web3.utils])

	const getPpblzBalance = useCallback( async () => {
        let _ppblzBalance = await pepemon.contracts.ppblz.balanceOf(getAccount());
        setPpblzBalance(web3.utils.fromWei(_ppblzBalance.toString()));
    }, [pepemon.contracts.ppblz, setPpblzBalance, web3.utils, getAccount])

    useEffect(() => {
        if (!pepemon || !pepemon.contracts) {
            return;
        }

if(chainId == 1 || chainId == 4){
	correctChainIsLoaded(pepemon).then(correct => {
		if (!correct) {
			return;
		}

		try {
 
			getMyPpblzStakeAmount();
			getPpdexRewards();
			getPpdexBalance();
			getPpblzBalance();

  
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`,
			);
			console.error(error);
		}
	})
}
      
    }, [account, pepemon, provider,
		getMyPpblzStakeAmount,
	]);

	const handleUnlockClick = useCallback(async() => {
		loadWeb3Modal();


	}, [loadWeb3Modal]);

	const changeChain = async(chainIdHex,rpcUrl,chainName) =>{
		try {
			await window.ethereum.request({
			  method: 'wallet_switchEthereumChain',
			  params: [{ chainId: chainIdHex}], 
			});
		  } catch (switchError: any) {
			// This error code indicates that the chain has not been added to MetaMask.
			if (switchError.code === 4902) {
			  try {
				console.log("chainIdHex",chainIdHex,rpcUrl,"rpcUrl")

				await window.ethereum.request({
				  method: 'wallet_addEthereumChain',
				  params: [{ chainId: chainIdHex, rpcUrls: [rpcUrl] ,  chainName: chainName
				  
				}],

				});
			  } catch (addError) {
				// handle "add" error
			  }
			}
			// handle other "switch" errors
		  }
	}

	return (
		<StyledTopBar {...(account && {border: true})}>
			<StyledTopBarInner>
				{ account &&
					<StyledTopBarInfo>
						<TextInfo as="div" font={theme.font.spaceMace} color={theme.color.purple[800]} style={{ borderRight: "1px solid currentColor" }}>
							<NetworkSwitch {...{appChainId: chainId, providerChainId: chainId, setChainId: setChainId}}/>
						</TextInfo>
						{ppblzBalance && (
							<TextInfo as="p" font={theme.font.spaceMace} color={theme.color.purple[800]}>
{(parseFloat(ppblzBalance) + parseFloat(ppblzStakedAmount)).toFixed(2)}
							$PPBLZ
							</TextInfo>
						)}
						{ppblzBalance && (
							<TextInfo as="p" font={theme.font.spaceMace} color={theme.color.purple[800]}>
{(parseFloat(ppdexBalance.toString())+ (ppdexRewards * ppdexPrice)).toFixed(2)}								$PPDEX
							</TextInfo>
						)}
						<TextInfo as="p" font={theme.font.spaceMace} color={theme.color.purple[800]}>XX unique cards</TextInfo>
					</StyledTopBarInfo>
				}
				<Button styling="green"    {...(!account && {onClick: handleUnlockClick} )}>{!account ? 'Connect wallet' : formatAddress(account)}</Button>

				{ chainId !=1 || allowWalletConnect &&
				<Modal>
					<ModalTitle text="Wrong network"/>
					<ModalContent>
						<Text as="p" font={theme.font.inter} size={.875} color={theme.color.gray[600]}>
							Please change your wallet providers network to ETH
						</Text>
					</ModalContent>
					<Spacer size="md"/>
					<ModalActions>
						<Button styling="white" onClick={() => 	changeChain('0x1','https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161','Ethereum Mainnet')}>Change Network</Button>
					</ModalActions>
				</Modal>
			}
			</StyledTopBarInner>
		</StyledTopBar>
	);
};

const StyledTopBar = styled.div<{border?: boolean}>`
	background-color: ${props => props.border && "rgba(255, 255, 255, .6)"};
	border-radius: 10px;
	border: ${props => props.border && `1px solid ${theme.color.purple[800]}`};
	padding: .25em;
	position: absolute;
	right: 2.5em;
	top: 2em;
`

const StyledTopBarInner = styled.div`
	align-items: center;
	display: flex;
`

const StyledTopBarInfo = styled.div`
	align-items: center;
	display: flex;
`

const TextInfo = styled(Text)`
	padding: .4em 1em;
	position: relative;
`

export default TopBar;

import React, {useEffect, useState} from 'react'
import Web3 from 'web3';
import { StyledPageWrapperMain, StyledPageWrapperMainInner, StyledPageTitle, NotSupportedModal } from '../../components';
import { useModal, usePepemon, useWeb3Modal } from '../../hooks';
import StakeCard from './components/StakeCard';

const Staking: React.FC<any> = ({ appChainId: chainId, setChainId }) => {
  const [provider] = useWeb3Modal();
  const [providerChainId, setProviderChainId] = useState((window.ethereum && parseInt(window.ethereum.chainId)) || 1);
  const pepemon = usePepemon()
  const web3 = new Web3(provider);

  const [onPresentSupportModal] = useModal(<NotSupportedModal setChainId={setChainId} chainId={chainId} page="Staking"/>, 'not-supported-modal')
  const isSupportedChain = (chainId: number) => {
	return (chainId === 1 || chainId === 4)
  }

  const isOnSupportedChain = () => {
	return isSupportedChain(providerChainId);
  }

  useEffect(() => {
	pepemon.provider && pepemon.provider.getNetwork().then((network: any) => {
	  setProviderChainId(parseInt(network.chainId));
	})
  }, [pepemon.provider])

  useEffect(() => {
	const supported = isSupportedChain(chainId);
	if (!supported) {
	  return onPresentSupportModal();
	}
  }, [chainId, onPresentSupportModal])

  useEffect(() => {
	window.scrollTo(0, 0)
  }, [])

  return (
	  <StyledPageWrapperMain>
			<StyledPageWrapperMainInner>
				<StyledPageTitle as="h1">Staking</StyledPageTitle>
				{/* // TODO:  isOnSupportedChain() && chainId === providerChainId && */}
				{ isOnSupportedChain() && parseInt(window.ethereum && window.ethereum.chainId) === providerChainId &&
					<StakeCard
						pepemon={pepemon}
						web3={web3}
					/>
				}
			</StyledPageWrapperMainInner>
		</StyledPageWrapperMain>
	)
}

export default Staking;

import React, {useEffect, useState} from 'react'
import { StyledPageWrapperMain, StyledPageWrapperMainInner, StyledPageTitle, NotSupportedModal } from '../../components';
import { useModal, usePepemon } from '../../hooks';
import StakeLottery from './components/StakeLottery';

const Subscription: React.FC<any> = ({ appChainId: chainId, setChainId }) => {
  const [providerChainId, setProviderChainId] = useState((window.ethereum && parseInt(window.ethereum.chainId)) || 1);
  const pepemon = usePepemon();
  const { account } = pepemon;

  const [onPresentSupportModal] = useModal(<NotSupportedModal page="Subscription"/>, 'not-supported-modal')
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
				<StyledPageTitle as="h1">Subscription</StyledPageTitle>
				{/* // TODO:  isOnSupportedChain() && chainId === providerChainId && */}
				{ isOnSupportedChain() && parseInt(window.ethereum && window.ethereum.chainId) === providerChainId &&
					<StakeLottery
						pepemon={pepemon}
						account={account}
					/>
				}
			</StyledPageWrapperMainInner>
		</StyledPageWrapperMain>
	)
}

export default Subscription;

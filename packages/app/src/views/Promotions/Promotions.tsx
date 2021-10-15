import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { Button, Page, NotSupportedModal } from '../../components';
import { useModal, usePepemon, useIsClaimedMerkle, useClaimMerkle, useDetectMobileScreen, useAccountMerkle, usePepemonApi, useWeb3Modal } from '../../hooks';
import { getCardInfo } from '../../utils';

const DisabledMerkleCard: React.FC<any> = ({account, cardId, merkleType}) => {
    const [provider, onPresentWalletProviderModal, logoutOfWeb3Modal] = useWeb3Modal();
    return(
        <StyledCard>
            <img style={{marginBottom: '.5rem'}} height='240' src={getCardInfo(cardId).img}/>
            {!account ?
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={onPresentWalletProviderModal}
                    text="Connect Wallet"
                /> :
                <Button size="sm" variant="secondary" disabled={true}>{merkleType === 'ppdex' ? 'Available 27th' : 'Available 29th'}</Button>
            }
        </StyledCard>
    )
}
const MerkleCard: React.FC<any> = ({account, cardId, merkleType}) => {
    const [provider, onPresentWalletProviderModal, logoutOfWeb3Modal] = useWeb3Modal();
    const { response, isFetching } = usePepemonApi(`/merkle/${merkleType}/${account}`)
    const claimed = useIsClaimedMerkle((response && response.index) || null, merkleType);
    const { onClaimMerkle, isClaiming } = useClaimMerkle(response && response.index ? { account, ...response } : null, merkleType)

    return(
            <StyledCard>
                <img style={{marginBottom: '.5rem'}} height='240' src={getCardInfo(cardId).img}/>
                {!account ?
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={onPresentWalletProviderModal}
                        text="Connect Wallet"
                    /> : response ?
                        <Button size="sm" variant="secondary" disabled={claimed} onClick={onClaimMerkle}>{claimed ? 'Already claimed' : isClaiming ? 'Claiming...' : 'Claim Present'}</Button>
                        :
                        <Button size="sm" variant="secondary" disabled={true}>{isFetching ? 'Checking...' : 'Not Eligible'}</Button>
                }
            </StyledCard>
    )
}

const Promotions: React.FC<any> = ({ appChainId: chainId, setChainId }) => {

    // const { account } = usePepemon()
    // const [provider, onPresentWalletProviderModal, logoutOfWeb3Modal] = useWeb3Modal();
    const isMobile = useDetectMobileScreen();
    // const { response, isFetching } = useAccountMerkle(account);
    // const claimed = useIsClaimedMerkle(response && response.index || null, 'dego');
    // const { onClaimMerkle, isClaiming } = useClaimMerkle(response && response.index ? { account, ...response } : null, 'dego')
    // const [transactions, setTransactions] = useState(0);

    const [onPresentSupportModal, onDismissSupportModal] = useModal(<NotSupportedModal setChainId={setChainId} chainId={chainId} page="Home"/>, 'not-supported-modal-home')
    const isSupportedChain = (chainId: number) => {
        return (chainId === 1 || chainId === 4 || chainId === 56);
    }
    const isOnSupportedChain = () => {
        return isSupportedChain(providerChainId);
    }

    //TODO create solution to reuse over components
    const pepemon = usePepemon();
    const [providerChainId, setProviderChainId] = useState((window.ethereum && parseInt(window.ethereum.chainId)) || 1);
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
    }, [chainId])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const url = `https://treasureland.market/#/nft-market/pepemon?sellingType=0&priceType=0&title=0&sortValue=3&page=1&project=14`

    return (
        <Page image={'greenImg'} size={isMobile ? '1400px' : '800px'} color={'#046977'} repeat={'repeat'} scroll={true}>
            <div style={{flex: 1, width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row-reverse'}}>
                <div style={{flex: 1, padding: isMobile ? '1rem' : '1rem 7rem 3rem 5rem', color: 'white'}}>
                    <h1 style={{letterSpacing: '2px', fontSize: '55px'}}>Claim your free Degochu!</h1>
                    <p style={{fontSize: '28px', paddingRight: !isMobile && '3rem'}}>To celebrate the launch of Pepemon on BSC and Treasureland, we are offering a free Degochu to all DEGO holders and all Treasureland traders! Soon you can take your Degochu to battle in our upcoming blockchain game: Pepemon Battle Degen!</p>
                    <h1 style={{letterSpacing: '2px', fontSize: '28px'}}>How to claim your Pepemon:</h1>
                    <div style={{fontSize: '28px', paddingRight: !isMobile && '3rem'}}>1. Connect your wallet to see if you're eligible <br/>2. If you are click 'Claim present' and get Degochu for free! If not <a href="https://treasureland.market/#/nft-market/pepemon?sellingType=0&priceType=0&title=0&sortValue=3&page=1&project=14">get one from Treasureland</a><br/> 3. Congrats on your first Pepemon!</div><br/>
                    <div style={{fontSize: '14px', paddingRight: !isMobile && '3rem'}}>*only for those that have holded DEGO in their own wallet (exchange tokens not eligible) or sold a NFT on Treasureland before 7th April.</div>

                </div>
                <div style={{flex: 1, paddingTop: '2rem', display: 'flex', justifyContent: 'center', position: 'relative', height: isMobile && '400px'}}>
                        <img src={'degoImg'} style={{position: 'absolute', height: isMobile ? 'calc(100% - 2rem)' : 'calc(100% - 2rem)', right: isMobile ? '178px' : '118px'}}/>
                        <div style={{display: 'flex', flexDirection: 'column', zIndex: 2, marginLeft: 'auto', marginRight: isMobile && '1.5rem', transform: 'rotate(3deg)'}}>
                        <img style={{marginBottom: '.1rem', position: 'relative'}} height='250' src={getCardInfo(9, 56).img}/>
                        <StyledOverlay fontSize="40">SOLD OUT!<br/><span style={{fontSize: '20px'}}>10000 / 10000 minted</span></StyledOverlay>
                        {/*{!account ?*/}
                        {/*    <Button*/}
                        {/*        size="sm"*/}
                        {/*        onClick={onPresentWalletProviderModal}*/}
                        {/*        text="Connect Wallet"*/}
                        {/*    /> : chainId !== 56 ?*/}
                        {/*        <Button*/}
                        {/*            size="sm"*/}
                        {/*            onClick={() => setChainId(56)}*/}
                        {/*            text="Switch to BSC"*/}
                        {/*        /> : response ?*/}
                        {/*            <Button size="sm" onClick={() => onClaimMerkle().then(() => setTransactions(transactions + 1))}>{claimed ? 'Already claimed' : isClaiming ? 'Claiming...' : 'Claim Present'}</Button>*/}
                        {/*            :*/}
                        {/*            <Button size="sm" disabled={true}>{isFetching ? 'Checking...' : 'Not Eligible'}</Button>*/}
                        {/*}*/}
                        <a style={{textDecoration: 'none'}} href='https://treasureland.market/#/nft-market/pepemon?sellingType=0&priceType=0&title=0&sortValue=3&page=1&project=14' target="_blank">
                            <Button>Buy on Treasureland</Button>
                        </a>
                        </div>
                    </div>
            </div>
        </Page>
    )
}

interface StyledTitleProps {
    size: 'm' | 'l';
}

interface StyledOverlayProps {
    fontSize?: string;
}

const StyledOverlay = styled.div<StyledOverlayProps>`
    position: absolute;
    width: 100%;
    height: 4rem;
    transform: skewY(-13deg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: ${(props) => props.fontSize ? props.fontSize : 65}px;
    font-weight: 800;
    opacity: 0.7;

    margin: 9.9rem 0;
`

const StyledChristmasModal = styled.div`
    position: absolute;

    z-index: 2;
    width: 28rem;
    left: -3rem;
    border-radius: 8px;
    opacity: 0.97;
    display: flex;
    flex-direction: column;
    color: black;
    padding: 1rem;


`


const StyledCardHead = styled.div`
    background-color: ${(props) => props.theme.color[3]};
    padding: 1.5rem 3rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`

const StyledCardContent = styled.div`
    position: relative;
    padding: 1.5rem 3rem;
    background-color: #f1f1f1;
`

const StyledTitle = styled.h4<StyledTitleProps>`

  font-size: ${(props) => props.size === 'l' ? 38 : 30}px;
  font-weight: 700;
  margin: 0;
  letter-spacing: 3px;
  @media (max-width: 880px) {
    text-align: center;
  }
`

const StyledSubTitle = styled.div`
    font-size: 26px;
    font-weight: 600;
    letter-spacing: 2px;
    padding: 0 0 .5rem .5rem;
`
const StyledSubSubTitle = styled.div`
    display: flex;
    font-size: 20px;
    letter-spacing: 1px;
    padding: 0 0 .5rem .5rem;
`

const StyledCards= styled.div`
    display: flex;
    justify-content: space-between;
    background-color: white;
    border-radius: 8px;

    @media (max-width: 700px) {
        flex-direction: column;
        align-items: center;
    }
`

const StyledCard= styled.div`
    background-color: white;
    padding: 1rem 1rem .5rem 1rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
`


export default Promotions

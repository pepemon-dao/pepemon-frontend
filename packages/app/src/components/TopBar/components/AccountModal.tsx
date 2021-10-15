import React, { useCallback } from 'react'
import styled from 'styled-components'
import { getPpblzContract, getPpdexContract } from '../../../pepemon/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { Button, CardIcon, Label, Modal, ModalActions, ModalContent, ModalTitle, Spacer, Value } from '../../../components'
import type { ModalProps } from '../../../components'
import { usePepemon, useWeb3Modal, useTokenBalance } from '../../../hooks';
import { chainTitle } from './NetworkSwitch';

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account } = usePepemon()
  const [,, logoutOfWeb3Modal] = useWeb3Modal();

  const handleSignOutClick = useCallback(() => {
    logoutOfWeb3Modal();
    onDismiss!();
    // reset()
  }, [onDismiss, logoutOfWeb3Modal])

  const pepemon = usePepemon()
  const { chainId } = usePepemon()
  const ppblzBalance = useTokenBalance(getPpblzContract(pepemon) ? getPpblzContract(pepemon).address : null)
  const ppdexBalance = useTokenBalance(getPpdexContract(pepemon) ? getPpdexContract(pepemon).address : null)
  return (
    <Modal>
      <ModalTitle text={`My Account [${chainTitle(chainId)}]`} />
      <ModalContent>
        <Spacer />

        <div style={{ display: 'flex' }}>
          <StyledBalanceWrapper>
            <CardIcon>
              <img alt="placeholder" src={'ppblzIcon'} style={{ height: 42 }}/>
            </CardIcon>
            {ppblzBalance &&
              <StyledBalance>
                <Value value={getBalanceNumber(ppblzBalance)}/>
                <Label text={chainId === 56 ? 'BNB Balance' : 'PPBLZ Balance'}/>
              </StyledBalance>
            }
          </StyledBalanceWrapper>
        </div>
        { chainId !== 56 &&
          <div style={{display: 'flex'}}>
            <StyledBalanceWrapper>
              <CardIcon>
                <img alt="placeholder" src={'ppdexIcon'} style={{height: 42, mixBlendMode: 'multiply'}}/>
              </CardIcon>
              {ppdexBalance &&
              <StyledBalance>
                <Value value={getBalanceNumber(ppdexBalance)}/>
                <Label text="PPDEX Balance"/>
              </StyledBalance>
              }
            </StyledBalanceWrapper>
          </div>
        }
        <Spacer />
        <Button
          href={`https://etherscan.io/address/${account}`}
          text="View on Etherscan"
          variant="secondary"
        />
        <Spacer />
        <Button
          onClick={handleSignOutClick}
          text="Sign out"
          variant="secondary"
        />
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} text="Cancel" />
      </ModalActions>
    </Modal>
  )
}

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

export default AccountModal

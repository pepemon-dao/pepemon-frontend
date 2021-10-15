import React, { useCallback } from 'react'
import styled from 'styled-components'
import AccountModal from './AccountModal'
import { Button } from '../../../components'
import { useModal, useWeb3Modal, usePepemon } from '../../../hooks'

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const [onPresentAccountModal] = useModal(<AccountModal />)
  const { account } = usePepemon();
  const [, loadWeb3Modal] = useWeb3Modal()

  const handleUnlockClick = useCallback(() => {
    loadWeb3Modal()
  }, [loadWeb3Modal])

  return (
    <StyledAccountButton>
      {!account ? (
        <Button disabled={false} onClick={handleUnlockClick} size="sm" text="Unlock Wallet" />
      ) : (
        <Button onClick={onPresentAccountModal} size="sm" text="My Wallet" />
      )}
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div`
`

export default AccountButton

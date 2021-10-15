import React, { useCallback, useState, useMemo } from 'react'

import Button from '../Button'
import CardIcon from '../CardIcon'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'

interface DisclaimerModal extends ModalProps {
  onConfirm: () => void
}

const DisclaimerModal: React.FC<DisclaimerModal> = ({
  onConfirm,
  onDismiss,
}) => {
  const [step, setStep] = useState('disclaimer')

  const handleConfirm = useCallback(() => {
    onConfirm()
    onDismiss()
  }, [onConfirm, onDismiss])

  const modalContent = useMemo(() => {
    if (step === 'disclaimer') {
      return (
        <div>
          <p>Audits: None.</p>
          <p>
            While the initial creators of the Pepemon protocol have made
            reasonable efforts to attempt to ensure the security of the
            contracts, including forking much of the codebase from existing
            well-audited projects and soliciting review from friends, nothing
            approaching the rigor of a formal audit has been conducted at this
            time.
          </p>
          <p>
            We STRONGLY urge caution to anyone who chooses to engage with these
            contracts.
          </p>
        </div>
      )
    } else {
      return (
        <div>
          <p>Attention PEPEMON Uniswap LPs</p>
          <p>
              NOTHING HERE YET
          </p>
          <p>Providing liquidity for other Uniswap pools is dangerous</p>
          <p>You will LOSE your share of rebases</p>
        </div>
      )
    }
  }, [step])

  const button = useMemo(() => {
    if (step === 'disclaimer') {
      return (
        <Button
          styling="purple"
          onClick={() => setStep('uniswap')}
        >text="Next"</Button>
      )
    } else {
      return <Button onClick={handleConfirm} styling="purple">text="I understand"</Button>
    }
  }, [setStep, step, handleConfirm])

  return (
    <Modal>
      <ModalTitle text={`Warning`} />
      <CardIcon><span role="img" aria-label="placeholder">⚠️</span></CardIcon>
      <ModalContent>{modalContent}</ModalContent>
      <ModalActions>{button}</ModalActions>
    </Modal>
  )
}

export default DisclaimerModal

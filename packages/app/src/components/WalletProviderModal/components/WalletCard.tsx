import React from 'react'
import { Button } from '../../../components'
import Card from '../../Card'
import CardContent from '../../CardContent'
import CardIcon from '../../CardIcon'
import CardTitle from '../../CardTitle'
import Spacer from '../../Spacer'

interface WalletCardProps {
  icon: React.ReactNode
  onConnect: () => void
  title: string
  isMobile: boolean
}

const WalletCard: React.FC<WalletCardProps> = ({ icon, onConnect, title, isMobile}) => (
  <Card>
    <CardContent>
      {isMobile && <CardTitle text={title === 'Metamask' ? 'Connect with Metamask' : 'Mobile browsers (not Metamask browser)'} />}
      <CardIcon>{icon}</CardIcon>
      {!isMobile && <><CardTitle text={title} /> <Spacer /></>}
      <Button onClick={onConnect} text="Connect" />
    </CardContent>
  </Card>
)

export default WalletCard

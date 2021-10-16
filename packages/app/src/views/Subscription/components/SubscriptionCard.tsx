import React from 'react'
import { AccordionGroup } from "../../../components";
import { PepemonOneSubscription } from "../subscriptions";

const SubscriptionCard: React.FC<any> = () => {
    return (
		<AccordionGroup>
			<PepemonOneSubscription/>
		</AccordionGroup>
    )
}

export default SubscriptionCard

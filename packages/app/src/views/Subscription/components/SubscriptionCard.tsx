import React from 'react'
import { AccordionGroup } from "../../../components";
import { PepemonOneSubscription, PepemonOneAnniversarySet } from "../subscriptions";

const SubscriptionCard: React.FC<any> = () => {
    return (
		<AccordionGroup>
			<PepemonOneAnniversarySet/>
			<PepemonOneSubscription/>
		</AccordionGroup>
    )
}

export default SubscriptionCard

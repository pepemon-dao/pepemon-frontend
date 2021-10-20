import React from 'react'
import { AccordionGroup } from "../../../components";
import { PepemonOneSubscription } from "../subscriptions";
import { PepemonAnniversarySubscription } from "../subscriptions";

const SubscriptionCard: React.FC<any> = () => {
    return (
		<AccordionGroup>
			<PepemonOneSubscription/>
			<PepemonAnniversarySubscription />
		</AccordionGroup>
    )
}

export default SubscriptionCard

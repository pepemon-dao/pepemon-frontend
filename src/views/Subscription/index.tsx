import React from "react";
import { StyledPageTitle, AccordionGroup, Accordion, TopBar } from "../../components";

const Subscription: React.FC<any> = ({ appChainId: chainId, setChainId }) => {
	return (
		<>
			<StyledPageTitle as="h1">Subscription</StyledPageTitle>
			<AccordionGroup>
				<Accordion heading="Pepemon One Subscription" />
				<Accordion heading="Pepemon Two Subscription" />
				<Accordion heading="Pepemon Three Subscription" />
				<Accordion heading="Pepemon Four Subscription" />
			</AccordionGroup>
		</>
	);
};

export default Subscription;

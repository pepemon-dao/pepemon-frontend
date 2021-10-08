import React from "react";
import { StyledPageWrapperMain, StyledPageWrapperMainInner, StyledPageTitle, AccordionGroup, Accordion } from "../../components";

const Subscription: React.FC<any> = ({ appChainId: chainId, setChainId }) => {
	return (
		<StyledPageWrapperMain>
			<StyledPageWrapperMainInner>
				<StyledPageTitle as="h1">Subscription</StyledPageTitle>
				<AccordionGroup>
					<Accordion heading="Pepemon One Subscription" />
					<Accordion heading="Pepemon Two Subscription" />
					<Accordion heading="Pepemon Three Subscription" />
					<Accordion heading="Pepemon Four Subscription" />
				</AccordionGroup>
			</StyledPageWrapperMainInner>
		</StyledPageWrapperMain>
	);
};

export default Subscription;

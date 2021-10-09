import React from "react";
import { StyledPageWrapperMain, StyledPageWrapperMainInner, StyledPageTitle, AccordionGroup, Accordion } from "../../components";

const Subscription: React.FC<any> = ({ appChainId: chainId, setChainId }) => {
	return (
		<StyledPageWrapperMain>
			<StyledPageWrapperMainInner>
				<StyledPageTitle as="h1">Subscription</StyledPageTitle>
				<AccordionGroup>
					<Accordion state="approve" heading="Pepemon One Subscription" />
					<Accordion state="can_stake" heading="Pepemon Two Subscription" />
					<Accordion state="active" heading="Pepemon Three Subscription" />
					<Accordion state="active" heading="Pepemon Four Subscription" />
				</AccordionGroup>
			</StyledPageWrapperMainInner>
		</StyledPageWrapperMain>
	);
};

export default Subscription;

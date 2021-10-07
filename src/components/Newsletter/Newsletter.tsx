import { theme } from "../../theme";
import { ContentCentered, StyledTitle, StyledText, Spacer, StyledButton } from "../../components";

const Newsletter = () => {
	return (
		<ContentCentered style={{paddingTop: "7.5em", paddingBottom: "7.5em"}}>
			<StyledTitle as="h1" font={theme.font.neometric} size="3rem" weight={900} align="center">
				Stay up to date and claim ‘em all
			</StyledTitle>
			<Spacer size="md"/>
			<StyledText as="p" font={theme.font.spaceMace} align="center" txtDecoration="underline">Newsletter</StyledText>
			<Spacer size="md"/>
			<StyledText as="p" font={theme.font.inter} lineHeight="1.5" align="center">
				Be the first to collect all the new Pepemons. You can unsunscribe anytime.
			</StyledText>
			<Spacer size="md"/>
			<ContentCentered direction="row" bgColor={theme.color.white} style={{ borderRadius: "8px", border: `1px solid ${theme.color.purple[600]}` }}>
					<input className="input-email-text" type="email" />
					<StyledButton>Sign up</StyledButton>
			</ContentCentered>
		</ContentCentered>
	)
}

export default Newsletter;

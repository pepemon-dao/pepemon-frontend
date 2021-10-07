import styled from "styled-components";
import { theme } from "../../theme";
import { ContentBox, ContentBoxGrid, ContentCentered, StyledTitle, StyledText, Spacer } from "../../components";
import discord from "../../assets/discord.svg";
import twitter from "../../assets/twitter.svg";
import medium from "../../assets/medium.svg";
import telegram from "../../assets/telegram.svg";

const SocialBoxes = () => {
	return (
		<ContentCentered style={{paddingTop: "7.5em", paddingBottom: "7.5em"}}>
			<StyledTitle as="h1" font={theme.font.neometric} size="3rem" weight={900} align="center">
				Say hi and meet all the Pepetrainers
			</StyledTitle>
			<Spacer size="md"/>
			<StyledText as="p" font={theme.font.spaceMace} align="center" txtDecoration="underline">Our socials</StyledText>
			<Spacer size="lg"/>
			<ContentBoxGrid gridTemplate='"socialBox1 socialBox2 socialBox3 socialBox4"'>
				<ContentBox bgColor={theme.color.purple[300]} style={{ gridArea: "socialBox1", boxShadow: "0 18.7px 14.2px 0 rgba(0, 0, 0, 0.1)" }}>
					<StyledSocialIcon src={twitter} alt="twitter"/>
					<Spacer size="sm"/>
					<StyledText as="p" size="2rem" font={theme.font.neometric} weight={900} align="center">Twitter</StyledText>
					<Spacer size="sm"/>
					<StyledText as="p" align="center" lineHeight="1.5">Follow us on Twitter for all updates and anouncements.</StyledText>
				</ContentBox>
				<ContentBox bgColor={theme.color.purple[300]} style={{ gridArea: "socialBox2", boxShadow: "0 18.7px 14.2px 0 rgba(0, 0, 0, 0.1)" }}>
					<StyledSocialIcon src={telegram} alt="telegram"/>
					<Spacer size="sm"/>
					<StyledText as="p" size="2rem" font={theme.font.neometric} weight={900} align="center">Telegram</StyledText>
					<Spacer size="sm"/>
					<StyledText as="p" align="center" lineHeight="1.5">Join us on Telegram to ask us questions and talk with your fellow Pepemon trainers.</StyledText>
				</ContentBox>
				<ContentBox bgColor={theme.color.purple[300]} style={{ gridArea: "socialBox3", boxShadow: "0 18.7px 14.2px 0 rgba(0, 0, 0, 0.1)" }}>
					<StyledSocialIcon src={discord} alt="discord"/>
					<Spacer size="sm"/>
					<StyledText as="p" size="2rem" font={theme.font.neometric} weight={900} align="center">Discord</StyledText>
					<Spacer size="sm"/>
					<StyledText as="p" align="center" lineHeight="1.5">Come hang out with us and all the Pepemon trainers on Discord.</StyledText>
				</ContentBox>
				<ContentBox bgColor={theme.color.purple[300]} style={{ gridArea: "socialBox4", boxShadow: "0 18.7px 14.2px 0 rgba(0, 0, 0, 0.1)" }}>
					<StyledSocialIcon src={medium} alt="medium"/>
					<Spacer size="sm"/>
					<StyledText as="p" size="2rem" font={theme.font.neometric} weight={900} align="center">Medium</StyledText>
					<Spacer size="sm"/>
					<StyledText as="p" align="center" lineHeight="1.5">Find more detailed articles on Medium about Pepemon and the ecosystem.</StyledText>
				</ContentBox>
			</ContentBoxGrid>
		</ContentCentered>
	)
}

const StyledSocialIcon = styled.img`
	margin-left: auto;
	margin-right: auto;
	width: 3.75em;
`

export default SocialBoxes;

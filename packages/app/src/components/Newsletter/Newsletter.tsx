import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LazyLoadImage,LazyLoadImageProps } from 'react-lazy-load-image-component';
import { theme } from "../../theme";
import { useModal } from "../../hooks";
import { api } from "../../constants";
import { Button, ContentCentered, Title, Text, Spacer } from "../../components";
import { walk1, walk2, walk3 } from "../../assets";

type SignUpState = {
	success: boolean|undefined ;
	title: string;
	message: string;
  };

const Newsletter: React.FC<any> = () => {

	const randomNumber = Math.floor(Math.random() * 3);
	const walkingPepemon = [walk1, walk2, walk3][randomNumber];

	const [email, setEmail] = useState('');

	const initSignUpState: SignUpState = {
		success: undefined,
		title: '',
		message: ''
	};
	const [signUpState, setSignUpState] = useState(initSignUpState);

	// @dev: run `netlify dev --live` to test the function
	const handleSignUp = async () => {
		const lambdaApiEndpoint = api.lambdaApi.endpoint;
		const lambdaApiFunction = api.lambdaApi.functions.subsNewsletter;

		const req = await fetch(`${lambdaApiEndpoint+lambdaApiFunction}?email=${email}`);

		if (req.status === 202) {
			setSignUpState({
				success: true,
				title: 'Sign up succeeded',
				message: 'You are now subscribed to the pepemon newsletter.'
			});
		} else {
			setSignUpState({
				success: false,
				title: 'Sign up failed',
				message: 'Something went wrong. Please try again.'
			});
		}
		// reset input
		setEmail('');
	}

	const [handlePresent, onDismiss] = useModal({
		title: signUpState.title,
		content: <Text align='center' font={theme.font.inter} size='s' color={theme.color.gray[600]}>
					{signUpState.message}
				</Text>,
		modalActions: [
			{
				text: signUpState.success ? 'Great!' : 'I\'ll try again',
				buttonProps: { styling: 'purple', onClick: () => setSignUpState(initSignUpState) },
			}
		]
	})

	useEffect(() => {
		if (signUpState.success !== undefined) {
			handlePresent();
		} else if (signUpState.success) {
			onDismiss();
		}
	}, [signUpState, handlePresent, onDismiss]);

	return (
		<>
			<ContentCentered id="newsletter" style={{paddingTop: "6em", paddingBottom: "12em"}}>
				<Title as="h1" font={theme.font.neometric} size='xxl' weight={900} align="center">
					Stay up to date and claim ‘em all
				</Title>
				<Spacer size="md"/>
				<Text as="p" font={theme.font.spaceMace} align="center" underline>Newsletter</Text>
				<Spacer size="md"/>
				<Text as="p" font={theme.font.inter} lineHeight={1.5} align="center">
					Be the first to collect all the new Pepemons.
				</Text>
				<Spacer size="md"/>
				<ContentCentered 
					direction="row" 
					bgColor={theme.color.white} 
					style={{ 
						borderRadius: "8px", 
						border: `1px solid ${theme.color.purple[600]}`, 
						position: 'relative'
				}}>
					<StyledInput onChange={(e) => setEmail(e.target.value)} type="email" />
					<Button styling="purple" disabled={email ? false : true} onClick={handleSignUp}>Sign up</Button>
					<WalkingPepemon src={walkingPepemon} alt="walking pepemon" />
				</ContentCentered>
			</ContentCentered>
		</>
	)
}

const StyledInput = styled.input`
	background: none;
	border: none;
	flex: 1 1 0%;
	font-size: 1.2rem;
	min-width: 0;
	padding: 0.5em;
	&:focus-visible {
		outline: none;
	}
`


interface WalkingPepemonProps extends LazyLoadImageProps {
  duration?: string;
  delay?: string;
}


const WalkingPepemon = styled(LazyLoadImage)<WalkingPepemonProps>`
	position: absolute;
	width: 96px;
	height: 96px;
	transform: rotate(180deg) scale(-1);
	animation: walk-pepemon-newsletter ${(props) => props.duration || "10s"} linear infinite;
  	animation-delay: ${(props) => props.delay || "0s"};
	bottom: -96px;

  @keyframes walk-pepemon-newsletter {
    0% {
      left: calc(50% - 48px);
	  transform: rotate(180deg) scaleX(-1);
    }
	20% {
		left: calc(100% - 70px);
	}
	23% {
		left: calc(100% - 70px);
		transform: rotate(180deg) scaleX(-1);
	}
	27% {
		left: calc(100% - 70px);
		transform: rotate(180deg) scaleX(1);
	}
	30% {
		left: calc(100% - 70px);
	}
    50% {
    	left: calc(50% - 48px);
    }
	70% {
		left: calc(0% - 16px);
	}
	73% {
		left: calc(0% - 16px);
		transform: rotate(180deg) scaleX(1);
	}
	77% {
		left: calc(0% - 16px);
		transform: rotate(180deg) scaleX(-1);
    }
	80% {
		left: calc(0% - 16px);
	}
    100% {
		left: calc(50% - 48px);
		transform: rotate(180deg) scaleX(-1);
    }
  }
`

export default Newsletter;

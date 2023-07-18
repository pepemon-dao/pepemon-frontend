import React, { useContext, useRef, useState } from 'react';
import { BigNumber } from 'bignumber.js';
import { Button, Text, ContentCentered } from '../../../components';
import { useHorizontalScroll } from '../../../hooks';
import CardDropdown from '../../../components/CardDropdown';
import { PepemonProviderContext } from '../../../contexts';
import CardDropdownWrapper from '../../../components/CardDropdown/wrapper';
import { theme } from '../../../theme';
import { getDisplayBalance, oneEther } from '../../../utils';
import styled from 'styled-components';
import { getPpblzAddress, getPpdexAddress } from '../../../pepemon/utils';
import { useBridge } from '../../../hooks/pepe_bridge/useBridge';

// const options = [
//   {
//     title: "$PPDEX",
//     onClick: () => console.log("Goerli Testnet"),
//     address: getPpdexAddress(),
//   },
//   {
//     title: "$PPBLZ",
//     onClick: () => console.log("Rinkeby Testnet"),
//     address: getPpblzAddress(),
//   },
// ];

const BridgeSubview: React.FC<any> = () => {
	const [transactionFinished, setTransactionFinished] = useState(0);
	const [l1NativeBalanceToBridge, setL1NativeBalanceToBridge] =
		useState<any>(null);
	const [l1TokenBalanceToBridge, setL1TokenBalanceToBridge] = useState(0);

	const [l2NativeBalanceToBridge, setL2NativeBalanceToBridge] = useState<any>(null);
	const [l2TokenBalanceToBridge, setL2TokenBalanceToBridge] = useState(0);

	const [tokenToBridge, setTokenToBridge] = useState('$PPDEX');

	const [pepemon] = useContext(PepemonProviderContext);
	const { account, contracts, provider } = pepemon;

	const { Layer1, Layer2, depositFunds, withdrawFunds } = useBridge();

	let horzScroll: any = useRef(null);
	useHorizontalScroll(horzScroll);

	return (
		<>
			{/* <CardDropdownWrapper>
        <CardDropdown
          style={{ gridArea: "area2" }}
          options={options}
          title="Choose Token"
          setActive={(option) => setTokenToBridge(option.title)}
        />
      </CardDropdownWrapper> */}
			Start bridging Goerli ETH to Pepechain L2 Testnet today!
			<br></br>
			<br></br>Connect your wallet to Goerli to start.<br></br>
			Get Goerli ETH from{' '}
			<a href='https://faucet.paradigm.xyz/' target='#blank'>
				Paradigm's Faucet
			</a>
			<br></br>
			<br></br>
			<Text
				style={{ gridArea: 'area0' }}
				as='p'
				font={theme.font.neometric}
				weight={900}
				size='xl'>
				{getDisplayBalance(Layer1.nativeBalance)} $gETH
			</Text>
			<br></br>
			<br></br>
			<ContentCentered
				direction='row'
				bgColor={theme.color.white}
				style={{
					borderRadius: '8px',
					border: `1px solid ${theme.color.purple[700]}`,
					padding: '.1em .1em .1em 0.75em',
				}}>
				<StyledInput
					placeholder='0.00'
					value={l1NativeBalanceToBridge || ''}
					onChange={(event) =>
						setL1NativeBalanceToBridge(
							cleanNumberInput(event.target.value, 18) as null
						)
					}
					min='0.00'
					type={'number'}
					step='1'
					autoFocus={true}
				/>
			</ContentCentered>
			<br></br>
			<Button
				style={{ gridArea: 'area3' }}
				styling='purple'
				width='clamp(100px, 18em, 100%)'
				onClick={() =>
					l1NativeBalanceToBridge !== null &&
					depositFunds(
						new BigNumber(l1NativeBalanceToBridge).multipliedBy(oneEther)
					)
				}
				disabled={
					l1NativeBalanceToBridge &&
					(Layer1.nativeBalance.isLessThan(l1NativeBalanceToBridge) ||
						!Layer1.isActivate)
				}>
				Bridge to Pepechain
			</Button>
			<br />
			<br />
			<br />
			{/* <h1>{tokenToBridge}</h1>
      <StyledInput
        placeholder="0.00"
        value={l1NativeBalanceToBridge}
        onChange={(event) =>
          setL1NativeBalanceToBridge(
            cleanNumberInput(event.target.value, 18)
          )
        }
        min="0.00"
        type={"number"}
        step="1"
        autoFocus={true}
      />
      <Button
        style={{ gridArea: "area3" }}
        styling="purple"
        width="clamp(100px, 18em, 100%)"
        onClick={() =>
          depositFunds(
            new BigNumber(l1NativeBalanceToBridge).multipliedBy(oneEther)
          )
        }
        disabled={
          Layer1.nativeBalance.isLessThan(l1NativeBalanceToBridge) ||
          !Layer1.isActivate
        }
      >
        Bridge Tokens to Pepechain
      </Button> */}
			<hr />
			Want to bridge back your gETH to Goerli?<br></br>
			<br></br>Connect your wallet to Pepechain L2 Testnet to start.
			<br></br>
			<br></br>
			<Text
				style={{ gridArea: 'area0' }}
				as='p'
				font={theme.font.neometric}
				weight={900}
				size='xl'>
				{getDisplayBalance(Layer2.nativeBalance)} $pepETH
				<br></br>
				<br></br>
			</Text>
			<ContentCentered
				direction='row'
				bgColor={theme.color.white}
				style={{
					borderRadius: '8px',
					border: `1px solid ${theme.color.purple[700]}`,
					padding: '.1em .1em .1em 0.75em',
				}}>
				<StyledInput
					placeholder='0.00'
					value={l1NativeBalanceToBridge ?? ''}
					onChange={(event) =>
						setL2NativeBalanceToBridge(
							cleanNumberInput(event.target.value, 18) as null
						)
					}
					min='0.00'
					type={'number'}
					step='1'
					autoFocus={true}
				/>
			</ContentCentered>
			<br></br>
			<Button
				style={{ gridArea: 'area3' }}
				styling='purple'
				width='clamp(100px, 18em, 100%)'
				onClick={() =>
					l2NativeBalanceToBridge !== null &&
					withdrawFunds(
						new BigNumber(l2NativeBalanceToBridge).multipliedBy(oneEther)
					)
				}
				disabled={
					l2NativeBalanceToBridge &&
					(Layer2.nativeBalance.isLessThan(l2NativeBalanceToBridge) ||
						!Layer2.isActivate)
				}>
				Bridge to Goerli
			</Button>
			<br />
			<br />
			<br />
		</>
	);
};

const cleanNumberInput = (
	value: string,
	maxDecimals: number
): string | null => {
	if (value[0] === '0' && value[1] && value[1] !== '.') {
		return value[1];
	}
	if (value.slice(-2) === '..') {
		return value.slice(0, -1);
	}
	if (value.split('.').length > 1 && value.split('.')[1].length > maxDecimals) {
		return `${value.split('.')[0]}.${value
			.split('.')[1]
			.slice(0, maxDecimals)}`;
	}
	return value;
};

const isInvalidInput = (value: string) =>
	!Number(value) &&
	value !== '' &&
	parseFloat(value) !== 0 &&
	value.slice(-1) !== '.' &&
	value.slice(-2) !== '.0';

const StyledInput = styled.input`
	border: none;
	font-size: 1rem;
	flex: 1 1 auto;
	min-width: 0;

	&:focus-within {
		outline: none;
	}
`;

export default BridgeSubview;

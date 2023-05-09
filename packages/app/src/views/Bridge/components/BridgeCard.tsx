import React, {useContext, useRef, useState} from 'react';
import styled from "styled-components";
import Web3 from 'web3';
import {PepemonProviderContext} from '../../../contexts';
import {useHorizontalScroll} from "../../../hooks";
import {useBridge} from "../../../hooks/pepe_bridge/useBridge";
import {getDisplayBalance} from "../../../utils";
import {Button, Text} from "../../../components";
import {theme} from "../../../theme";
import BigNumber from "bignumber.js";

const BridgeCard: React.FC<any> = () => {
    const [transactionFinished, setTransactionFinished] = useState(0);
    const [l1BalanceToBridge, setL1BalanceToBridge] = useState(0);

    const [pepemon] = useContext(PepemonProviderContext);
    const {account, contracts, provider} = pepemon;
    const web3 = new Web3(provider);

    let horzScroll: any = useRef(null);
    useHorizontalScroll(horzScroll);
    const {Layer1, Layer2, depositFunds, withdrawFunds} = useBridge()


    const cleanNumberInput = (value: string, maxDecimals: number) => {
        if (value[0] === '0' && (value[1] && value[1] !== '.')) {
            return value[1]
        }
        if (value.slice(-2) === '..') {
            return value.slice(0, -1);
        }
        if (value.split('.').length > 1 && value.split('.')[1].length > maxDecimals) {
            return `${value.split('.')[0]}.${value.split('.')[1].slice(0, maxDecimals)}`
        }
        return value;
    }

    const isInvalidInput = (value: string) =>
        !Number(value) &&
        value !== '' &&
        parseFloat(value) !== 0 &&
        value.slice(-1) !== '.' &&
        (value.slice(-2) !== '.0')
    ;


    return (
        <div>
            Layer 1
            <Text style={{gridArea: 'area0'}} as="p" font={theme.font.neometric} weight={900} size='xl'>
                {getDisplayBalance(Layer1.nativeBalance)} $ETH
            </Text>
            <StyledInput
                placeholder="0.00"
                value={l1BalanceToBridge}
                onChange={(event) => setL1BalanceToBridge(parseFloat(cleanNumberInput(event.target.value, 18)))}
                min="0.00"
                type={"number"}
                step="1"
                autoFocus={true}
            />
            <Button style={{gridArea: 'area3'}} styling="purple" width="clamp(100px, 18em, 100%)"
                    onClick={() => depositFunds(new BigNumber(1))}>
                Bridge
            </Button>

            <hr/>

            Layer 2
            <Text style={{gridArea: 'area0'}} as="p" font={theme.font.neometric} weight={900} size='xl'>
                {getDisplayBalance(Layer2.nativeBalance)} $ETH
            </Text>
            <StyledInput
                placeholder="0.00"
                value={l1BalanceToBridge}
                onChange={(event) => setL1BalanceToBridge(parseFloat(cleanNumberInput(event.target.value, 18)))}
                min="0.00"
                type={"number"}
                step="1"
                autoFocus={true}
            />
            <Button style={{gridArea: 'area3'}} styling="purple" width="clamp(100px, 18em, 100%)"
                    onClick={() => withdrawFunds(new BigNumber(1))}
            >
                Withdraw
            </Button>

        </div>
    );
}

const StyledInput = styled.input`
  border: none;
  font-size: 1rem;
  flex: 1 1 auto;
  min-width: 0;

  &:focus-within {
    outline: none;
  }
`

export default BridgeCard

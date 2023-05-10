import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { PepemonProviderContext } from "../../../contexts";
import { useHorizontalScroll } from "../../../hooks";
import { useBridge } from "../../../hooks/pepe_bridge/useBridge";
import { getDisplayBalance, oneEther } from "../../../utils";
import { Button, Text } from "../../../components";
import { theme } from "../../../theme";
import BigNumber from "bignumber.js";
import { StyledStoreBody, StyledStoreWrapper } from "../../Store/components";
import CardDropdownWrapper from "../../../components/CardDropdown/wrapper";
import CardDropdown from "../../../components/CardDropdown";
import { getPpblzAddress, getPpdexAddress } from "../../../pepemon/utils";

const options = [
  {
    title: "$PPDEX",
    onClick: () => console.log("Goerli Testnet"),
    address: getPpdexAddress(),
  },
  {
    title: "$PPBLZ",
    onClick: () => console.log("Rinkeby Testnet"),
    address: getPpblzAddress(),
  },
];

const BridgeCard: React.FC<any> = () => {
  const [transactionFinished, setTransactionFinished] = useState(0);
  const [l1NativeBalanceToBridge, setL1NativeBalanceToBridge] = useState(0);
  const [l1TokenBalanceToBridge, setL1TokenBalanceToBridge] = useState(0);

  const [l2NativeBalanceToBridge, setL2NativeBalanceToBridge] = useState(0);
  const [l2TokenBalanceToBridge, setL2TokenBalanceToBridge] = useState(0);

  const [tokenToBridge, setTokenToBridge] = useState("$PPDEX");

  const [pepemon] = useContext(PepemonProviderContext);
  const { account, contracts, provider } = pepemon;

  let horzScroll: any = useRef(null);
  useHorizontalScroll(horzScroll);
  const { Layer1, Layer2, depositFunds, withdrawFunds } = useBridge();

  const cleanNumberInput = (value: string, maxDecimals: number) => {
    if (value[0] === "0" && value[1] && value[1] !== ".") {
      return value[1];
    }
    if (value.slice(-2) === "..") {
      return value.slice(0, -1);
    }
    if (
      value.split(".").length > 1 &&
      value.split(".")[1].length > maxDecimals
    ) {
      return `${value.split(".")[0]}.${value
        .split(".")[1]
        .slice(0, maxDecimals)}`;
    }
    return value;
  };

  const isInvalidInput = (value: string) =>
    !Number(value) &&
    value !== "" &&
    parseFloat(value) !== 0 &&
    value.slice(-1) !== "." &&
    value.slice(-2) !== ".0";
  return (
    <div>
      <StyledStoreWrapper>
        <StyledStoreBody>
          <CardDropdownWrapper>
            <CardDropdown
              style={{ gridArea: "area2" }}
              options={options}
              title="Choose Token"
              setActive={(option) => setTokenToBridge(option.title)}
            />
          </CardDropdownWrapper>
          Start bridging gETH or Pepemon tokens to Pepechain Testnet. Connect
          your wallet to Goerli to start.
          <Text
            style={{ gridArea: "area0" }}
            as="p"
            font={theme.font.neometric}
            weight={900}
            size="xl"
          >
            {getDisplayBalance(Layer1.nativeBalance)} $ETH
          </Text>
          <StyledInput
            placeholder="0.00"
            value={l1NativeBalanceToBridge}
            onChange={(event) =>
              setL1NativeBalanceToBridge(
                parseFloat(cleanNumberInput(event.target.value, 18))
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
            Bridge to Pepechain
          </Button>
          <br />
          <br />
          <br />
          <h1>{tokenToBridge}</h1>
          <StyledInput
            placeholder="0.00"
            value={l1NativeBalanceToBridge}
            onChange={(event) =>
              setL1NativeBalanceToBridge(
                parseFloat(cleanNumberInput(event.target.value, 18))
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
          </Button>
          <hr />
          Want to bridge back your gETH to Goerli? Connect your wallet to
          Pepechain Testnet to start.
          <Text
            style={{ gridArea: "area0" }}
            as="p"
            font={theme.font.neometric}
            weight={900}
            size="xl"
          >
            {getDisplayBalance(Layer2.nativeBalance)} $ETH
          </Text>
          <StyledInput
            placeholder="0.00"
            value={l2NativeBalanceToBridge}
            onChange={(event) =>
              setL2NativeBalanceToBridge(
                parseFloat(cleanNumberInput(event.target.value, 18))
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
              withdrawFunds(
                new BigNumber(l2NativeBalanceToBridge).multipliedBy(oneEther)
              )
            }
            disabled={
              Layer2.nativeBalance.isLessThan(l2NativeBalanceToBridge) ||
              !Layer2.isActivate
            }
          >
            Bridge to Goerli
          </Button>
          <br />
          <br />
          <br />
        </StyledStoreBody>
      </StyledStoreWrapper>
    </div>
  );
};

const StyledInput = styled.input`
  border: none;
  font-size: 1rem;
  flex: 1 1 auto;
  min-width: 0;

  &:focus-within {
    outline: none;
  }
`;

export default BridgeCard;

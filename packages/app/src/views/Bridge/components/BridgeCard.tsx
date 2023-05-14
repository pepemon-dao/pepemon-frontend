import React, { useContext } from "react";
import styled from "styled-components";
import { PepemonProviderContext } from "../../../contexts";
import { Badge, StyledLinkTitle } from "../../../components";
import {
  StyledStoreBody,
  StyledStoreHeader,
  StyledStoreWrapper,
} from "../../Store/components";
import { getPpblzAddress, getPpdexAddress } from "../../../pepemon/utils";
import { Link, Redirect, useParams } from "react-router-dom";
import BridgeSubview from "./BridgeSubview";

const BridgeCard: React.FC<any> = () => {

  const routerParams: any = useParams();

  console.log(routerParams.bridgeState)

  if (!routerParams.bridgeState) return <Redirect to="/bridge/testnet"/>

  return (
    <div>
      <StyledStoreWrapper>
        <StyledStoreHeader>
          <div style={{ display: "flex" }}>
            <StyledLinkTitle isInactive={routerParams.bridgeState !== "testnet"}>
              <Link to={`/bridge/testnet`}>Bridge</Link>
            </StyledLinkTitle>
            <StyledLinkTitle
              isInactive={routerParams.bridgeState !== "claim-ppblz"}
            >
              <Link to={`/bridge/claim-ppblz`}>Claim PPBLZ</Link>
              <Badge text="soon" />
            </StyledLinkTitle>
            <StyledLinkTitle
              isInactive={routerParams.bridgeState !== "mint-pepemon-avatars"}
            >
              <Link to={`/bridge/mint-pepemon-avatars`}>Mint</Link>
              <Badge text="soon" />
            </StyledLinkTitle>
            <StyledLinkTitle
              isInactive={routerParams.bridgeState !== "bid-on-pepesea"}
            >
              <Link to={`/bridge/bid-on-pepesea`}>Bid</Link>
              <Badge text="soon" />
            </StyledLinkTitle>
          </div>
        </StyledStoreHeader>
        <StyledStoreBody>
          {routerParams.bridgeState === "testnet" && (
            <BridgeSubview />
          )}
          {routerParams.bridgeState === "claim-ppblz" && (
            <>
              <h1>Claim PPBLZ</h1>
            </>
          )}
          {routerParams.bridgeState === "mint-pepemon-avatars" && (
            <>
              <h1>Mint Pepemon Avatars</h1>
            </>
          )}
          {routerParams.bridgeState === "bid-on-pepesea" && (
            <>
              <h1>Bid on Pepesea</h1>
            </>
          )}
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

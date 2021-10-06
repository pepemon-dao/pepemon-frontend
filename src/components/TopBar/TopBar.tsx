import "./TopBar.css";
import address from "../../assets/address.png";
import React, { useCallback } from "react";
import { useWeb3Modal, usePepemon, useTokenBalance } from "../../hooks";
import { Value } from "../index";
import {
  getPpblzAddress,
  getPpblzContract,
  getPpdexAddress,
  getPpdexContract,
} from "../../pepemon/utils";
import { getBalanceNumber } from "../../utils/formatBalance";

type props = {
  staking: boolean;
  ethChainId: number;
  setEthChainId: any;
};
const TopBar: React.FC<props> = ({ ethChainId, setEthChainId, staking }) => {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const { account } = usePepemon();
  const pepemon = usePepemon();
  const { chainId } = usePepemon();
  const ppblzBalance = useTokenBalance(
    getPpblzContract(pepemon) ? getPpblzContract(pepemon).address : null
  );
  const ppdexBalance = useTokenBalance(
    getPpdexContract(pepemon) ? getPpdexContract(pepemon).address : null
  );

  const handleUnlockClick = useCallback(() => {
    loadWeb3Modal();
  }, [loadWeb3Modal]);

  return (
    <div>
      {!account ? (
        <span onClick={handleUnlockClick} className="green-button">
          <p className="green-buttontext">CONNECT WALLET</p>
        </span>
      ) : (
        <div
          {...(!staking ? { className: "h-bar" } : { className: "h-bar-alt" })}
        >
          <div className="menu-text" >
            Ether
          </div>

          <div
            {...(!staking
              ? { className: "top-menu-bar" }
              : { className: "top-menu-bar-alt" })}
          >
            {ppblzBalance && (
              <div className="menu-text">
                {getBalanceNumber(ppblzBalance).toFixed(2)}$PPBLZ
              </div>
            )}
            {ppblzBalance && (
              <div className="menu-text">
                {getBalanceNumber(ppdexBalance).toFixed(2)}$PPDEX
              </div>
            )}
            <div className="menu-text">3 unique cards</div>
            <div className="green-text-addr">
              <p className="green-buttontext">
                {account.substr(0, 4)}.....{account.slice(-4)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;

import "./subscription.css";
import React, { useState } from "react";

import cover from "../../assets/staking-bg.png";
import becomepepbutton from "../../assets/becomepepbutton.png";
import Navigation from "../../components/Navigation/index";
import IbuttonPopover from "../../components/IbuttonPopover/index";

import WalletBar from "../../components/WalletBar/index";
import pokeball from "../../assets/pokeball-temp.png";
import dropdownarrow from "../../assets/dropdownarrow.png";

import plus from "../../assets/plus.png";
import minus from "../../assets/minus.png";
import stakebutton from "../../assets/stakebutton.png";
import provideliquiditybutton from "../../assets/provideliquiditybutton.png";
import ibutton from "../../assets/i.svg";
import enable from "../../assets/enable.png";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

function Subscription() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverOpen2, setPopoverOpen2] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
  const toggle2 = () => setPopoverOpen2(!popoverOpen2);

  return (
    <div className="main-container">
      <Navigation />
      <div className="container-wrap">
        <div
          style={{
            backgroundPosition: "center",
            backgroundImage: `url(${cover})`,
            height: "100%",
            width: "100%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <WalletBar staking={true} />

          <div className="main-container">
            <div className="text-container">
              <div style={{ marginTop: "59px" }}>
                <span className="Title">Subscription</span>
              </div>
              <div class="subscription-big-box">
                <div class="subscription-box-big-header">
                  <div class="header-sub-div">
                    <img src={pokeball} alt="logo" style={{ width: "14%" }} />

                    <span class="header-text">Pepemon One Subscription</span>
                  </div>
                  <div class="header-sub-div">
                    <span class="Show-more">Show more</span>
                    <img
                      src={dropdownarrow}
                      alt="logo"
                      style={{ width: "4%" }}
                    />
                  </div>
                </div>
                {/* <div class="subscription-box-big-body">
                  <div style={{ marginTop: "30px" }}>
                    <span class="number" style={{ marginLeft: "0" }}>
                      0 PPDEX
                    </span>
                  </div>

                  <div style={{ display: "flex" }}>
                    <p class="data-div-bold-text-big">Total value: $0</p>
                    <p class="Update">Update</p>
                  </div>

                  <div style={{ marginTop: "6px" }}>
                    <img src={provideliquiditybutton} className="enable" />
                  </div>
                </div>
            
             */}
              </div>
              <div class="subscription-big-box">
                <div class="subscription-box-big-header">
                  <div class="header-sub-div">
                    <img src={pokeball} alt="logo" style={{ width: "14%" }} />

                    <span class="header-text">Pepemon One Subscription</span>
                  </div>
                  <div class="header-sub-div">
                    <span class="Show-more">Show more</span>
                    <img
                      src={dropdownarrow}
                      alt="logo"
                      style={{ width: "4%" }}
                    />
                  </div>
                </div>
                {/* <div class="subscription-box-big-body">
                  <div style={{ marginTop: "30px" }}>
                    <span class="number" style={{ marginLeft: "0" }}>
                      0 PPDEX
                    </span>
                  </div>

                  <div style={{ display: "flex" }}>
                    <p class="data-div-bold-text-big">Total value: $0</p>
                    <p class="Update">Update</p>
                  </div>

                  <div style={{ marginTop: "6px" }}>
                    <img src={provideliquiditybutton} className="enable" />
                  </div>
                </div>
            
             */}
              </div>
              <div class="subscription-big-box">
                <div class="subscription-box-big-header">
                  <div class="header-sub-div">
                    <img src={pokeball} alt="logo" style={{ width: "14%" }} />

                    <span class="header-text">Pepemon One Subscription</span>
                  </div>
                  <div class="header-sub-div">
                    <span class="Show-more">Show more</span>
                    <img
                      src={dropdownarrow}
                      alt="logo"
                      style={{ width: "4%" }}
                    />
                  </div>
                </div>
                {/* <div class="subscription-box-big-body">
                  <div style={{ marginTop: "30px" }}>
                    <span class="number" style={{ marginLeft: "0" }}>
                      0 PPDEX
                    </span>
                  </div>

                  <div style={{ display: "flex" }}>
                    <p class="data-div-bold-text-big">Total value: $0</p>
                    <p class="Update">Update</p>
                  </div>

                  <div style={{ marginTop: "6px" }}>
                    <img src={provideliquiditybutton} className="enable" />
                  </div>
                </div>
            
             */}
              </div>
              <div class="subscription-big-box">
                <div class="subscription-box-big-header">
                  <div class="header-sub-div">
                    <img src={pokeball} alt="logo" style={{ width: "14%" }} />

                    <span class="header-text">Pepemon One Subscription</span>
                  </div>
                  <div class="header-sub-div">
                    <span class="Show-more">Show more</span>
                    <img
                      src={dropdownarrow}
                      alt="logo"
                      style={{ width: "4%" }}
                    />
                  </div>
                </div>
                <div class="subscription-box-big-body">
                  <span >
                    Get Exclusive NFTs! Provide 100 PPDEX (+ETH) on Uniswap LP,
                    stake these LP tokens and recieve a unique NFT every month.
                    Your LP tokens will be locked for a minimum 32 days.
                  </span>
                  <span class="PPBLZ-ETH-LP-staked">PPBLZ-ETH LP balance</span>
                  <span>4.00</span>
                  <span class="PPBLZ-ETH-LP-staked">PPBLZ-ETH LP staked</span>
                  <span>0.00</span>
                  <span class="-PPBLZ-ETH-LP-n">
  3.828 PPBLZ-ETH LP needed to subscribe
</span>
<span class="Buy-PPBLZ-ETH-LP">
  Buy PPBLZ-ETH LP
</span>

<div class="Rectangle"></div>
<span class="This-months-card">
  This months card:
</span>
<span class="Yugipepe">
  Yugipepe
</span>
<span class="Super-cool-discripti">
  Super cool discription about this card. Iuis aute irure dolor in reprehenderit in.
</span>
                </div>
                {/* <div class="subscription-box-big-body">
                  <div style={{ marginTop: "30px" }}>
                    <span class="number" style={{ marginLeft: "0" }}>
                      0 PPDEX
                    </span>
                  </div>

                  <div style={{ display: "flex" }}>
                    <p class="data-div-bold-text-big">Total value: $0</p>
                    <p class="Update">Update</p>
                  </div>

                  <div style={{ marginTop: "6px" }}>
                    <img src={provideliquiditybutton} className="enable" />
                  </div>
                </div>
            
             */}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscription;

import "./Staking.css";
import React, { useState } from "react";

import cover from "../../assets/staking-bg.png";
import becomepepbutton from "../../assets/becomepepbutton.png";
import Navigation from "../../components/Navigation/index";
import IbuttonPopover from "../../components/IbuttonPopover/index";

import WalletBar from "../../components/WalletBar/index";
import pokeball from "../../assets/pokeball-temp.png";
import plus from "../../assets/plus.png";
import minus from "../../assets/minus.png";
import stakebutton from "../../assets/stakebutton.png";
import provideliquiditybutton from "../../assets/provideliquiditybutton.png";
import ibutton from "../../assets/i.svg";
import enable from "../../assets/enable.png";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

function Staking() {
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
                <span className="Title">Staking</span>
              </div>
              <div className="row-box">
                <div className="staking-box-small">
                  <div className="staking-box-small-header">
                    <img src={pokeball} alt="logo" style={{ width: "10%" }} />

                    <span className="header-text">Stake PPBLZ</span>
                    <span className="header-number">87% APY</span>
                    <img id="Popover1" type="button" src={ibutton} alt="logo" />
                    <Popover
                      placement="bottom"
                      isOpen={popoverOpen}
                      target="Popover1"
                      toggle={toggle}
                    >
                      <IbuttonPopover onHide={toggle} button={"Buy PPBLZ"} />
                    </Popover>
                  </div>
                  <div className="staking-box-small-body">
                    <div className="staking-box-small-body-row">
                      <div className="data-div">
                        <span className="data-div-bold-text">
                          PPBLZ balance
                        </span>
                        <span className="number">46.600</span>
                      </div>
                      <div className="data-div">
                        <span className="data-div-bold-text">PPBLZ staked</span>
                        <span className="number">0</span>
                      </div>
                    </div>
                    <div style={{ marginTop: "32px" }}>
                      <img src={enable} className="enable" />
                      {/* <div
                        className="enable"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <div>
                          <img
                            src={minus}
                            style={{ marginRight: "20px" }}
                            className="enable"
                          />
                        </div>
                        <div>
                          <img src={plus} className="enable" />
                        </div>
                      </div>
               */}
                      {/* <div
                        className="enable"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          width: "590px",
                          height: "60px",
                          borderRadius: "10px",
                          border: "solid 1px #220245",
                        }}
                      >
                        <div className="max-contianer">
                          <span className="input-number">0.0</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <div className="max-contianer">
                            <span class="MAX">MAX</span>
                          </div>
                          <div
                           className="stake-button-conatiner"
                          >
                            <img
                              src={stakebutton}
                              className="stake"
                            />
                          </div>
                        </div>
                      </div>
                     */}
                    </div>
                  </div>
                </div>
                <div className="staking-box-small">
                  <div className="staking-box-small-header">
                    <img src={pokeball} alt="logo" style={{ width: "10%" }} />
                    <span className="header-text">Stake PPBLZ</span>
                    <span className="header-number">87% APY</span>
                    <img id="Popover2" type="button" src={ibutton} alt="logo" />
                    <Popover
                      placement="bottom"
                      isOpen={popoverOpen2}
                      target="Popover2"
                      toggle={toggle2}
                    >
                      <IbuttonPopover onHide={toggle2} button={"Buy PPBLZ-ETH"} />
                    </Popover>
              
                  </div>
                  <div className="staking-box-small-body">
                    <div className="staking-box-small-body-row">
                      <div className="data-div">
                        <span className="data-div-bold-text">
                          PPBLZ balance
                        </span>
                        <span className="number">46.600</span>
                      </div>
                      <div className="data-div">
                        <span className="data-div-bold-text">PPBLZ staked</span>
                        <span className="number">0</span>
                      </div>
                    </div>
                    <div style={{ marginTop: "32px" }}>
                      <img src={enable} className="enable" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="staking-big-box">
                <div class="staking-box-big-header">
                  <img src={pokeball} alt="logo" style={{ width: "5%" }} />

                  <span class="header-text">PPDEX Earned</span>
                </div>
                <div class="staking-box-big-body">
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
              </div>

              <div style={{ height: "200px" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Staking;

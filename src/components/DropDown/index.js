import React, { useState } from "react";
import dropdownarrow from "../../assets/dropdownarrow.png";
import pepemandercard from "../../assets/pepemandercard.png";
import pokeball from "../../assets/pokeball-temp.png";
import subscribetoclaim from "../../assets/subscribetoclaim.png";
import unsubscribe from "../../assets/unsubscribe.png";
import uparrow from "../../assets/uparrow.png";
import "./dropdown.css";


function DropDown(props) {
  const [dorpdown, setDorpdown] = useState(false);

  const toggle = () => setDorpdown(!dorpdown);

  return (
    <div
      className={
        dorpdown ? "subscription-big-box" : "subscription-big-box-dropclose"
      }
    >
      <div
        className={
          dorpdown
            ? "subscription-box-big-header-drop"
            : "subscription-box-big-header"
        }
        onClick={toggle}
      >
        <div className="header-sub-div">
          <img
            src={pokeball}
            alt="logo"
            style={{ width: "50px", height: "50px" }}
          />

          <span className="header-text">{props.heading}</span>
        </div>
        {dorpdown ? (
          <div className="header-sub-div">
            <span className="Show-more">Show less</span>
            <img
              src={uparrow}
              alt="logo"
              style={{
                width: "13px",
                height: "13px",
                alignSelf: "center",
              }}
            />
          </div>
        ) : (
          <div className="header-sub-div">
            <span className="Show-more">Show more</span>
            <img
              src={dropdownarrow}
              alt="logo"
              style={{
                width: "13px",
                height: "13px",
                alignSelf: "center",
              }}
            />
          </div>
        )}
      </div>
      {dorpdown && (
        <div className="subscription-box-big-body">
          <div className="leftside-body">
            <span className="data-div-bold-text" style={{ fontSize: "17px" }}>
              Get Exclusive NFTs! Provide 100 PPDEX (+ETH) on Uniswap LP, stake
              these LP tokens and recieve a unique NFT every month. Your LP
              tokens will be locked for a minimum 32 days.
            </span>
            <br />
            <br />
            <span className="data-div-bold-text">PPBLZ-ETH LP balance</span>
            <span className="Buy-PPBLZ">Buy PPBLZ-ETH LP</span>

            <br />
            <br />
            <span className="number">4.00</span>
            <br />
            <br />
            <span className="data-div-bold-text">PPBLZ-ETH LP staked</span>
            <br />
            <br />
            <span className="number">0.00</span>
            <br />
            <br />

            <span className="data-div-bold-text" style={{ fontSize: "16px" }}>
              3.828 PPBLZ-ETH LP needed to subscribe
            </span>

            {/* <img src={subscribeandstake} style={{ width: "58%", marginTop: "10px" }} />  */}

            {/* <img src={approvelp} style={{ width: "58%", marginTop: "10px" }} /> */}
            <br />
            <br />

            <div className="Youhaveanactivesubscription">
              <span className="active-subscription">
                You have an active <br />
                subscription!
              </span>
            </div>
            <br />
            <img
              src={unsubscribe}
              style={{ width: "28%", marginTop: "10px" }}
            />
          </div>

          <div className="rightside-body">
            <div className="Rectangle"></div>

            <div style={{ width: "51%" }}>
              <span className="This-months-card">THIS MONTHS CARD:</span>
              <br />
              <br />
              <span className="Yugipepe">Yugipepe</span> <br />
              <span
                className="data-div-bold-text"
                style={{ fontSize: "16px", marginLeft: "0px" }}
              >
                Super cool discription about this card. Iuis aute irure dolor in
                reprehenderit in.
              </span>
              <div
                style={{
                  display: "flex",
                  width: "253px",
                  height: "356px",
                  objectFit: "cover",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url(${pepemandercard})`,
                  marginTop: "14px",
                }}
              ></div>
              <img
                src={subscribetoclaim}
                style={{ width: "99%", marginTop: "25px" }}
              />
            </div>
          </div>
        </div>
      )}{" "}
      {/* <div className="subscription-box-big-body">
      <div style={{ marginTop: "30px" }}>
        <span className="number" style={{ marginLeft: "0" }}>
          0 PPDEX
        </span>
      </div>

      <div style={{ display: "flex" }}>
        <p className="data-div-bold-text-big">Total value: $0</p>
        <p className="Update">Update</p>
      </div>

      <div style={{ marginTop: "6px" }}>
        <img src={provideliquiditybutton} className="enable" />
      </div>
    </div>

 */}
    </div>
  );
}

export default DropDown;

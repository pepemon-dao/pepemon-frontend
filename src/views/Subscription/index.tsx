import React from "react";
import cover from "../../assets/staking-bg.png";
import DropDown from "../../components/DropDown/index";
import Navigation from "../../components/Navigation/index";
import TopBar from "../../components/TopBar/index";
import "./subscription.css";
const Subscription: React.FC<any> = ({ appChainId: chainId, setChainId }) => {
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
            backgroundRepeat: "repeat",
          }}
        >
          <TopBar  ethChainId={chainId}
          setEthChainId={setChainId} staking={true} />

          <div className="main-container">
            <div className="text-container">
              <div style={{ marginTop: "59px" }}>
                <span className="Title">Subscription</span>
              </div>
              <DropDown heading="Pepemon One Subscription" />
              <DropDown heading="Pepemon Two Subscription" />
              <DropDown heading="Pepemon Three Subscription" />
              <DropDown heading="Pepemon Four Subscription" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;

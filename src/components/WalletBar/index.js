import "./walletbar.css";
import address from "../../assets/address.png";

function WalletBar(props) {
  return (
    <div
      {...(!props.staking ? { className: "h-bar" } : { className: "h-bar-alt" })}
    >
      <span className="menu-text" style={{ marginTop: "20px" }}>
        Ether
      </span>

      <div
        {...(!props.staking
          ? { className: "top-menu-bar" }
          : { className: "top-menu-bar-alt" })}
      >
        <span className="menu-text">12.213 $PPBLZ </span>
        <span className="menu-text">98.596 $PPDEX</span>
        <span className="menu-text">3 unique cards</span>
        <img
          src={address}
          className=""
          alt="logo"
          style={{ marginTop: "5px" }}
        />
      </div>
    </div>
  );
}

export default WalletBar;

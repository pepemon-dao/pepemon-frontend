import "./navigation.css";
import group from "../../assets/group3x.png";
import cover from "../../assets/cover.png";
import pepemon from "../../assets/pepemon.png";
import homeactive from "../../assets/homeactive.png";
import homefade from "../../assets/homefade.png";
import becomepepbutton from "../../assets/becomepepbutton.png";
import address from "../../assets/address.png";
import buyyourbutton from "../../assets/buyyourbutton.png";
import stakingbutton from "../../assets/stakingbutton.png";

function Navigation() {
  return (
    <div className="menu-wrap">
      <img src={pepemon} className="pepemon-icon" alt="logo" />

      <div className="menu">
        <img src={homefade} className="menu-icon" alt="logo" />
        <img src={homefade} className="menu-icon" alt="logo" />
        <img src={homeactive} className="menu-icon" alt="logo" />
        <img src={homefade} className="menu-icon" alt="logo" />
        <img src={homefade} className="menu-icon" alt="logo" />
      </div>
    </div>
  );
}

export default Navigation;

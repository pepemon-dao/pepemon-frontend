import { Link } from "react-router-dom";
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
import { useHistory } from "react-router-dom"; // version 5.2.0

function Navigation() {
  let history = useHistory();

  return (
    <div className="menu-wrap">
        <Link to="/">
          <img
            src={pepemon}
            className="pepemon-icon"
            alt="logo"
          />
        </Link>

      <div className="menu">
        <Link to="/staking">
            <img
              src={homefade}
              className="menu-icon"
              alt="logo"
            />
        </Link>
        <img
          src={homefade}
          onClick={() => {
            history.push("./subscription");
          }}
          className="menu-icon"
          alt="logo"
        />
            <Link to="/store">
            <img
              src={homeactive}
              className="menu-icon"
              alt="logo"
            />
        </Link>
            <Link to="/">
            <img
              src={homefade}
              className="menu-icon"
              alt="logo"
            />
        </Link>
            <Link to="/">
            <img
              src={homefade}
              className="menu-icon"
              alt="logo"
            />
        </Link>
      </div>
    </div>
  );
}

export default Navigation;

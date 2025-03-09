import { AirCallLogoSvg } from "../icons/Icons.jsx";
import Menu from "../menu/Menu.jsx";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="hd-menu">
        <div className="hd-menu-logo">
          <AirCallLogoSvg />
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;

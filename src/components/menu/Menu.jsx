import { useContext } from "react";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import MenuContext from "../../context/menu/MenuContext.jsx";
import "./Menu.css";

const Menu = () => {
  const { menu, activateMenu } = useContext(MenuContext);

  const disableAhref = (e) => e.preventDefault();

  const changeTab = (idMenu) => {
    activateMenu(idMenu);
  };

  return (
    <div className="hd-menu-tabs">
      <ul className="hd-menu-ul">
        {menu.map((m) => (
          <li
            key={`menu-elm-${m.id}`}
            className={
              m.active ? "hd-menu-ul-li hd-menu-ul-li-on" : "hd-menu-ul-li"
            }
            onClick={() => changeTab(m.id)}
          >
            <a href="" onClick={disableAhref}>
              {m.label}
            </a>
          </li>
        ))}
        <li className="hd-menu-ul-li">
          <a href="" onClick={disableAhref}>
            <TuneOutlinedIcon sx={{ fontSize: "18px" }} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Menu;

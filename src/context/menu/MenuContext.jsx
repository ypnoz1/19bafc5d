import { createContext } from "react";
import { MenuLabel } from "../../constants/menu.jsx";

const MenuContext = createContext({
  activeLabel: MenuLabel.CALLS,
  menu: [],
  activateMenu: () => {},
});

export default MenuContext;

import { useState, Fragment } from "react";
import MenuContext from "./MenuContext.jsx";
import { MenuLabel } from "../../constants/menu.jsx";

const ContextualizeMenu = ({ children }) => {
  const [activeLabel, setActiveLabel] = useState(1);
  const [menu, setMenu] = useState([
    { id: 1, label: MenuLabel.CALLS, active: true },
    { id: 2, label: MenuLabel.ARCHIVE, active: false },
  ]);

  const activateMenu = (idMenu) => {
    const found = menu.find((m) => idMenu === m.id);
    if (found) {
      setActiveLabel(found.label);
      const copyMenu = menu.map((m) => ({
        ...m,
        active: idMenu === m.id ? true : false,
      }));
      setMenu(copyMenu);
    }
  };

  return (
    <MenuContext.Provider value={{ activeLabel, menu, activateMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export default ContextualizeMenu;

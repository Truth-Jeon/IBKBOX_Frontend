import { useState } from "react";
import { Link } from "react-router-dom";
import { urlCheck } from "modules/utils/Common";
import "assets/styles/style.css";

const NavItem = (props) => {
  const { menu, selected, setSelected } = props;
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <li className="title__text" onClick={() => setIsOpen(!isOpen)}>
        {menu.label}
        <img
          src={require(`assets/images/menu_long_arrow.png`).default}
          alt="menu arrow"
        />
      </li>
      {isOpen &&
        menu.nodes &&
        menu.nodes.map((node) => {
          const _node = { ...node };
          let icon = node.menuIconFilepath;
          let iconActive = _node.menuIconFilepath.split("_");
          iconActive.splice(1, 0, "_active");
          iconActive = iconActive.join("");
          const img = require(`assets/images/${icon}.png`).default;
          const imgActive = require(`assets/images/${iconActive}.png`).default;

          return (
            <Link to={node.menuType == "Page"? node.menuUrl:()=>{}}>
            <div
              className={
                selected == node.menuId
                  ? "left__menu__list active"
                  : "left__menu__list"
              }
              onClick={
                node.menuType == "Link"
                  ? () => {
                      window.open(urlCheck(node.menuUrl), "_blank");
                    }
                  : () => setSelected(node.menuId)
              }
            >
              <img src={img} alt="menu img" className="baseimg" />
              <img
                src={imgActive}
                alt="menu active img"
                className="activeimg"
              />
              <div className="left__menu__long">
                <p>{node.label}</p>
              </div>
            </div>
            </Link>
          );
        })}
    </>
  );
};

export default NavItem;

import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "modules/contexts/common/userContext";
import MenuContext from "modules/contexts/common/menuContext";
import { Button } from "react-bootstrap";

import Header from "components/header";
import Footer from "components/footer";
import Header_ from "components/common/Header";
import NavItem from "components/nav/NavItem";
import "assets/styles/style.css";
import "assets/styles/reset.css";

const MainLayout = (props) => {
  const [selected, setSelected] = useState("");
  const [menuActive, setMenuActive] = useState(false);
  const [mouseEnter, setMouseEnter] = useState(false);
  const userContext = useContext(UserContext);
  const menuContext = useContext(MenuContext);
  const { userInfo } = userContext.state;

  const menuControl = useCallback(() => {
    setMenuActive(!menuActive);
    setMouseEnter(true);
  }, [menuActive]);
  const mouseControl = useCallback(
    () => setMouseEnter(!menuActive),
    [mouseEnter]
  );

  const Logout = () => {
    userContext.actions.logout();
  };

  useEffect(() => {
    menuContext.actions.getMenuList();
  }, []);

  return (
    <>
      <div className={`wrap ${menuActive && mouseEnter ? `lnb_active` : ""}`}>
        <div className="wrap__container">
          <div
            className="left__menu short__left__menu"
            onMouseEnter={() => setMouseEnter(false)}
            onMouseLeave={() => setMouseEnter(true)}
          >
            <div className="left__menu__container">
              <div className="left__menu__header">
                <Link to={"/main"} onClick={() => setSelected("")}>
                  <img
                    src={require("assets/images/logo.png").default}
                    alt="logo"
                    className="s_logo"
                  />
                  <img
                    src={require("assets/images/logo_long.png").default}
                    alt="logo"
                    className="l_logo"
                  />
                </Link>
                <img
                  src={require("assets/images/hamburger.png").default}
                  alt="hamburger"
                  className="hamburger"
                  onClick={menuControl}
                />
              </div>

              <div className="left__menu__list">
                <img
                  src={require("assets/images/menuimg_1.png").default}
                  alt="menu img"
                />
                <div className="left__menu__long">
                  <Link to={`/main/dashboards`}>
                    <p>Dashboards</p>
                  </Link>
                  <img
                    src={require("assets/images/menu_long_arrow.png").default}
                    alt="menu arrow"
                  />
                </div>
              </div>
              <Link to={`/main/news`}>
                <div
                  className={
                    selected == "news"
                      ? "left__menu__list active"
                      : "left__menu__list"
                  }
                  onClick={() => setSelected("news")}
                >
                  <img
                    src={require("assets/images/menuimg_2.png").default}
                    alt="menu img"
                    className="baseimg"
                  />
                  <img
                    src={require("assets/images/menuimg_active2.png").default}
                    alt="menu active img"
                    className="activeimg"
                  />
                  <div className="left__menu__long">
                    <p>뉴스</p>
                  </div>
                </div>
              </Link>
              <ul>
                {menuContext.state.menuList.length &&
                  menuContext.state.menuList.map((menu) => {
                    return (
                      <>
                        <NavItem
                          menu={menu}
                          selected={selected}
                          setSelected={setSelected}
                        />
                      </>
                    );
                  })}
              </ul>
            </div>
          </div>

          <div className="main__content">
            <Header />
            <div>{props.children}</div>
            <Footer />
          </div>
        </div>
        {/* <Header_ /> */}
      </div>
    </>
  );
};

export default MainLayout;
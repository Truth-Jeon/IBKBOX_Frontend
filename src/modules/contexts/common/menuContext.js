import React, { useState, useCallback, useLayoutEffect } from "react";
import HttpAction from "modules/utils/HttpAction";

const MenuContext = React.createContext({
  state: { menuList: [] },
  actions: {
    getMenuList: () => {},
    createMenu: () => {},
    updateMenu: ()=>{}, 
    deleteMenu: ()=> {}
  },
});


const MenuProvider = ({ children }) => {
  const [menuList, setMenuList] = useState({});

  //메뉴 조회  
  const getMenuList = useCallback(() => {
    HttpAction({
      url: "admin/menu/all",
      method: "get",
    }).then((res) => {
      if (res.code === 200) {
        setMenuList(res.data);
      } else {
        alert("메뉴 로드에 실패했습니다.");
      }
    });
  }, []);

  //메뉴 생성
  const createMenu = useCallback((menu) => {
    HttpAction({
      url: "admin/menu",
      method: "post",
      data: {
        menuId: null,
        menuLevel: menu.menuLevel,
        menuName: menu.label,
        menuUrl: menu.menuUrl,
        parentMenuId: menu.parentMenuId,
        roleCode: menu.roleCode,
        useFlg: true,
        sortNum: menu.sortNum,
      }
    }).then((res) => {
      if (res.code === 200) {
        alert("메뉴 생성에 성공했습니다.");
        getMenuList();
      } else {
        alert("메뉴 생성에 실패했습니다.");
      }
    });
  }, []);

  //메뉴 수정
  const updateMenu = useCallback((menu) => {
    HttpAction({
      url: "admin/menu",
      method: "put",
      data: {
        menuId: menu.menuId,
        menuLevel: menu.menuLevel,
        menuName: menu.label,
        menuUrl: menu.menuUrl,
        parentMenuId: menu.parentMenuId,
        roleCode: ["ADMIN"],
        useFlg: menu.useFlg,
        sortNum: menu.sortNum,
      }
    }).then((res) => {
      if (res.code === 200) {
        alert("메뉴 수정에 성공했습니다.");
        getMenuList();
      } else {
        alert("메뉴 수정에 실패했습니다.");
      }
    });
  }, []);

  //메뉴 삭제
  const deleteMenu = useCallback((menu) => {
    HttpAction({
      url: "admin/menu",
      method: "delete",
      params: {
        menuId: menu.menuId
      }
    }).then((res) => {
      if (res.code === 200) {
        alert("메뉴 삭제에 성공했습니다.");
        getMenuList();
      } else {
        alert("메뉴 삭제에 실패했습니다.");
      }
    });
    console.timeEnd('calculatingTime');
  }, []);

  useLayoutEffect(() => {
    if (localStorage.getItem("jwt") !== null) {
      getMenuList();
    }
  }, []);

  const value = {
    state: { menuList },
    actions: { getMenuList, createMenu, updateMenu , deleteMenu },
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;

};

const { Consumer: MenuConsumer } = MenuContext;

export { MenuProvider, MenuConsumer };

export default MenuContext;



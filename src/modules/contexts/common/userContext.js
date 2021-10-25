import React, { useState, useLayoutEffect } from "react";

import HttpAction from "modules/utils/HttpAction";

//Context API 생성 초기화
const UserContext = React.createContext({
  state: { userInfo: {} },
  actions: {
    getUserInfo: () => {},
    logOut: () => {},
  },
});
const { Provider } = UserContext;

const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    loggedIn: false, //로그인 여부
    userMenu: [], //사용자 메뉴목록
    userType: false, //시스템 관리자 여부 체크
    userData: {}, //회원기본 정보
  });

  //컴포넌트에서 공통으로 사용하는 목록
  const getUserInfo = () => {
    HttpAction({
      url: "login",
      method: "get",
      fileused: true,
    }).then((res) => {
      if (res.code === 200) {
        const userdata = res.data;
        setUserInfo({
          loggedIn: true,
          userMenu: [],
          userType: userdata.systemUserFlg,
          userData: {
            id: userdata.userId,
            name: userdata.name,
            email: userdata.email,
            roles: userdata.roleCodes,
          },
        });
      } else {
        setUserInfo({
          loggedIn: false, //로그인 여부
          userMenu: [], //사용자 메뉴목록
          userType: false, //시스템 관리자 여부 체크
          userData: {}, //회원기본 정보
        });
        localStorage.removeItem("jwt");
        window.location.href = "/login";
      }
    });
  };

  //로그아웃
  const logout = () => {
    setUserInfo({
      loggedIn: false, //로그인 여부
      userMenu: [], //사용자 메뉴목록
      userType: false, //시스템 관리자 여부 체크
      userData: {}, //회원기본 정보
    });
    localStorage.removeItem("jwt");
    window.location.href = "/logout";
  };

  /*
    useEffect 대신 useLayoutEffect를 사용 : useEffect보다 랜더링 되기전에 실행되기때문
    */
  useLayoutEffect(() => {
    if (localStorage.getItem("jwt") !== null) {
      getUserInfo();
    }
  }, []);

  const value = {
    state: { userInfo },
    actions: { getUserInfo, logout },
  };

  return <Provider value={value}>{children}</Provider>;
};

export { UserContext, UserProvider };

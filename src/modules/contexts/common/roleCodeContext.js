import React, { useState, useCallback, useLayoutEffect } from "react";
import HttpAction from "modules/utils/HttpAction";

const RoleCodeContext = React.createContext({
  state: { roleCodes: [], roleCodeItems: [] },
  actions: {
    getRoleCodes: () => {},
    createRoleCode: () => {},
    updateRoleCode: () => {},
    deleteRoleCode: () => {},
  },
});

//
const RoleCodeProvider = ({ children }) => {
  const [roleCodes, setRoleCodes] = useState([]);
  const [roleCodeItems, setRoleCodeItems] = useState([]);

  //code list 조회
  const getRoleCodes = useCallback((pageInfo) => {
    HttpAction({
      url: "code/code-info/all",
      method: "get",
      params: {
        page: pageInfo && pageInfo.page,
        records: pageInfo && pageInfo.records,
      },
    }).then((res) => {
      if (res.code === 200) {
        setRoleCodes(res.data);
      } else {
      }
    });
  }, []);

  //code item list 조회
  const getRoleCodeItem = useCallback((comCode, pageInfo) => {
    HttpAction({
      url: "code/code-item/all",
      method: "get",
      params: {
        comCode: comCode,
        page: pageInfo && pageInfo.page,
        records: pageInfo && pageInfo.records,
      },
    }).then((res) => {
      if (res.code === 200) {
        setRoleCodeItems(res.data);
        console.log(res.data);
      } else {
        alert("공통 코드 로드에 실패했습니다.");
      }
    });
  }, []);

  //code 생성
  const createRoleCode = useCallback((code, pageInfo) => {
    HttpAction({
      url: "code/code-info",
      method: "post",
      data: {
        comCode: code.comCode,
        description: code.description,
        comCodeName: code.comCodeName,
        useFlg: code.useFlg,
      },
    }).then((res) => {
      if (res.code === 200) {
        alert("공통 코드 생성에 성공했습니다.");
        getRoleCodes(pageInfo);
      } else {
        alert("공통 코드 생성에 실패했습니다.");
      }
    });
  }, []);

  //code item 생성
  const createCodeItem = useCallback((codeItem, pageInfo) => {
    HttpAction({
      url: "code/code-items",
      method: "post",
      data: {
        comCode: codeItem.comCode,
        description: codeItem.description,
        itemCode: codeItem.itemCode,
        itemName: codeItem.itemName,
        refValue1: codeItem.refValue1,
        refValue2: codeItem.refValue2,
        refValue3: codeItem.refValue3,
        sortNum: codeItem.sortNum,
        useFlg: true,
      },
    }).then((res) => {
      if (res.code === 200) {
        alert("공통 코드 아이템 생성에 성공했습니다.");
        getRoleCodeItem(codeItem.comCode, pageInfo);
      } else {
        alert("공통 코드 아이템 생성에 실패했습니다.");
      }
    });
  }, []);

  //code 수정
  const updateRoleCode = useCallback((code, pageInfo) => {
    HttpAction({
      url: "code/code-info",
      method: "put",
      data: {
        comCode: code.comCode,
        comCodeName: code.comCodeName,
        description: code.description,
        useFlg: code.useFlg,
      },
    }).then((res) => {
      if (res.code === 200) {
        alert("공통 코드 수정에 성공했습니다.");
        getRoleCodes(pageInfo);
      } else {
        alert("공통 코드 수정에 실패했습니다.");
      }
    });
  }, []);

  //code item 수정
  const updateCodeItem = useCallback((codeItem, pageInfo) => {
    HttpAction({
      url: "code/code-items",
      method: "put",
      data: {
        comCode: codeItem.comCode,
        description: codeItem.description,
        itemCode: codeItem.itemCode,
        itemName: codeItem.itemName,
        refValue1: codeItem.refValue1,
        refValue2: codeItem.refValue2,
        refValue3: codeItem.refValue3,
        sortNum: codeItem.sortNum,
        useFlg: codeItem.useFlg,
      },
    }).then((res) => {
      if (res.code === 200) {
        alert("공통 코드 아이템 수정에 성공했습니다.");
        getRoleCodeItem(codeItem.comCode, pageInfo);
      } else {
        alert("공통 코드 아이템 수정에 실패했습니다.");
      }
    });
  }, []);

  //code useflg 수정
  const updateUseFlg = useCallback((code) => {
    HttpAction({
      url: "code/code-flg",
      method: "put",
      data: {
        comCode: code.comCode,
        itemCode: code.itemCode,
        useFlg: !code.useFlg,
      },
    }).then((res) => {
      if (res.code === 200) {
        getRoleCodes();
      } else {
        alert("수정에 실패했습니다.");
      }
    });
  }, []);

  //code 삭제
  const deleteRoleCode = useCallback((codeList, pageInfo) => {
    HttpAction({
      url: "code/code-info",
      method: "delete",
      params: {
        comCodes: `${codeList}`,
      },
    }).then((res) => {
      if (res.code === 200) {
        alert("공통 코드 삭제에 성공했습니다.");
        getRoleCodes(pageInfo);
      } else {
        alert("공통 코드 삭제에 실패했습니다.");
      }
    });
  }, []);

  //code item 삭제
  const deleteCodeItem = useCallback((comCode, itemList, pageInfo) => {
    HttpAction({
      url: "code/code-items",
      method: "delete",
      params: {
        comCode: comCode,
        itemCodes: `${itemList}`,
      },
    }).then((res) => {
      if (res.code === 200) {
        alert("공통 코드 삭제에 성공했습니다.");
        getRoleCodeItem(comCode, pageInfo);
      } else {
        alert("공통 코드 삭제에 실패했습니다.");
      }
    });
  }, []);

  const value = {
    state: { roleCodes, roleCodeItems },
    actions: {
      getRoleCodes,
      getRoleCodeItem,
      createRoleCode,
      createCodeItem,
      updateRoleCode,
      updateCodeItem,
      updateUseFlg,
      deleteRoleCode,
      deleteCodeItem,
    },
  };

  return (
    <RoleCodeContext.Provider value={value}>
      {children}
    </RoleCodeContext.Provider>
  );
};

const { Consumer: RoleCodeConsumer } = RoleCodeContext;

export { RoleCodeProvider, RoleCodeConsumer, RoleCodeContext };

export default RoleCodeContext;

import React, { useState, useCallback, useLayoutEffect } from "react";
import HttpAction from "modules/utils/HttpAction";

const DeptContext = React.createContext({
  state: { deptCode: [], roleCodeItems: [] },
  actions: {
    getDeptList: () => {},
    createRoleCode: () => {},
    updateRoleCode: () => {},
    deleteRoleCode: () => {},
  },
});


const DeptProvider = ({ children }) => {
  const [deptCode, setDeptCode] = useState([]);

  //부서 조회
  const getDeptList = useCallback((pageInfo) => {
    HttpAction({
      url: "/admin/dept/list",
      method: "get",
      params: {
        page: pageInfo && pageInfo.page,
        records: pageInfo && pageInfo.records
      }
    }).then((res) => {
      if (res.code === 200) {
        setDeptCode(res.data);
      } else {
      }
    });
  }, []);

  // 부서 생성
  const createDept = useCallback((deptCode, pageInfo) => {
    HttpAction({
      url: "/admin/dept",
      method: "post",
      data: {
        deptCode: deptCode.deptCode,
        deptName: deptCode.deptName,
        deptLevel: deptCode.deptLevel,
        parentDeptCode: deptCode.parentDeptCode,
      },
    }).then((res) => {
      if (res.code === 200) {
        alert("부서 생성에 성공했습니다.");
        getDeptList(pageInfo);
      } else {
        alert("부서 생성에 실패했습니다.");
      }
    });
  }, []);

  //부서 수정
  const updateDept = useCallback((deptCode, pageInfo) => {
    HttpAction({
      url: "/admin/dept",
      method: "put",
      data: {
        deptCode: deptCode.deptCode,
        deptName: deptCode.deptName,
        deptLevel: deptCode.deptLevel,
        parentDeptCode: deptCode.parentDeptCode,
      },
    }).then((res) => {
      if (res.code === 200) {
        alert("부서 수정에 성공했습니다.");
        getDeptList(pageInfo);
      } else {
        alert("부서 수정에 실패했습니다.");
      }
    });
  }, []);

  //부서 삭제
  const deleteDept = useCallback((deptCodeIdList, pageInfo) => {
    HttpAction({
      url: "/admin/dept",
      method: "delete",
      params: {
        deptCodes: `${deptCodeIdList}`,
      },
    }).then((res) => {
      if (res.code === 200) {
        alert("부서 삭제에 성공했습니다.");
        getDeptList(pageInfo);
      } else {
        alert("부서 삭제에 실패했습니다.");
      }
    });
  }, []);


  const value = {
    state: { deptCode },
    actions: { getDeptList,  createDept,  updateDept,  deleteDept },
  };

  return (
    <DeptContext.Provider value={value}>
      {children}
    </DeptContext.Provider>
  );
};

const { Consumer: DeptConsumer } = DeptContext;

export { DeptProvider, DeptConsumer, DeptContext };

export default DeptContext;

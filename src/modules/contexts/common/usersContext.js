import React, {useState, useCallback, useLayoutEffect} from "react";
import HttpAction from "modules/utils/HttpAction";

const UsersContext = React.createContext({
  state: { 
    userInfo : [],
    userItems: []
   },
  actions: {
      getUserList : () => {},
      createUsers : () => {},
      updateUsers : () => {},
      deleteUserList : () => {},
      listCheck : () => {},
  },
});

const { Provider } = UsersContext;

const UsersProvider = ({children}) => {
    // const [userInfo, setUserInfo] = useState([]); // 역할 리스트 데이터
    const [userInfo, setUserInfo] = useState({responsePage:{}, listData:[]}); // 역할 리스트 데이터
    const [userItems, setUserItems] = useState([]);


    //리스트체크 테스트
    const listCheck = (stateType, toggleAllFlg, checkedValue, index) => {
      
      const state = {
        'USER' : userInfo
      }[stateType];

      const setFunc = {
        'USER' : setUserInfo
      }[stateType];

      const temp = { ...state };
          const tempList = [...temp.listData];

          if (toggleAllFlg) {
              tempList.forEach(e => {
                  e.checkFlg = checkedValue;
              })
          } else {
              tempList[index].checkFlg = checkedValue;
          }

          temp.listData = tempList;
          setFunc(temp);
    }

    //컴포넌트에서 공통으로 사용하는 목록
    const getUserList = useCallback((requestPage = { page: 1, records: 10 })=>{ //사용자 리스트 목록 받아옴
      HttpAction({
          url: '/admin/user/list', method: 'get', params: {...requestPage}})
      .then((res) => {
          if(res.code === 200) {
          const pageResult = {};
          const userArr = [];

          pageResult.number = res.data.pageNum;
          pageResult.first = res.data.isFirstPage;
          pageResult.last = res.data.isLastPage;
          pageResult.totalPages = res.data.pages;

          res.data.list.forEach(e => {
              let userObj = { ...e, checkFlg: false };
              userArr.push(userObj);
          })

              setUserInfo({ responsePage: pageResult, listData: userArr });
          }else {
            alert("사용자 리스트 조회에 실패했습니다.")
          }
      }).catch(err => {
        console.log('유저 리스트 로딩에 문제가 발생했습니다');
        console.error(err);
      })
  } ,[]);

    const getUsers = useCallback((userId) => {
        HttpAction({
          url: '/admin/user',
          method: "get",
          params: {
            userId : userId,
          },
        }).then((res) => {
          if (res.code === 200) {
            setUserItems(res.data);
          } else {
            alert("사용자 로딩에 실패했습니다.");
          }
        });
      }, []);

    const createUsers = useCallback((createUser) => { //사용자 생성 시 데이터 보냄
        HttpAction({
          url: "/admin/user",
          method: "post",
          data: {
                userName: createUser.userName,
                userId: createUser.userId,
                password: createUser.password,
                email: createUser.email,
                deptCode: createUser.deptCode,
                mobile: createUser.mobile,
                address: createUser.address,
                postCode: createUser.postCode
          },
        }).then((res) => {
          if (res.code === 200) {
            alert("공통 코드 생성에 성공했습니다.");
            getUserList();
          } else {
            alert("공통 코드 생성에 실패했습니다.");
          }
        });
      }, []);

      const updateUsers = useCallback((updateUser) => { //사용자 수정 시 데이터 보냄
        HttpAction({
          url: "/admin/user",
          method: "put",
          data: {
            userName: updateUser.userName,
            userId: updateUser.userId,
            password: updateUser.password,
            email: updateUser.email,
            deptCode: updateUser.deptCode,
            mobile: updateUser.mobile,
            address: updateUser.address,
            postCode: updateUser.postCode
          },
        }).then((res) => {
          if (res.code === 200) {
            alert("사용자 수정에 성공했습니다.");
            getUserList();
          } else {
            alert("사용자 수정에 실패했습니다.");
          }
        });
      }, []);

    const deleteUserList = useCallback((userInfo) => { //사용자 삭제 시 데이터 보냄
        console.log("삭제 실행");
        console.log(`${userInfo}`);
        
        HttpAction({
          url: "/admin/user",
          method: "delete",
          params: {
            userId: `${userInfo[0]}`
          },
        }).then((res) => {
          if (res.code === 200) {
            alert("사용자 삭제에 성공했습니다.");
            getUserList();
          } else {
            alert("사용자 삭제에 실패했습니다.");
          }
        });
      }, []);
    
      useLayoutEffect(() => {
        if (localStorage.getItem("jwt") !== null) {
          getUserList();
        }
      }, []);

    const value = {
        state: {
            userInfo,
            userItems
        },
        actions: {
            getUserList,
            getUsers,
            createUsers,
            updateUsers,
            deleteUserList,
            listCheck
        },
    };

    return (
      <Provider value={value}>
      {children}
      </Provider>
    )
};

export { UsersProvider, UsersContext };
import React, { useCallback, useState } from 'react';
import HttpAction from 'modules/utils/HttpAction';

const RoleContext = React.createContext({
    state: {
        roleInfo: {},
        roleUserInfo: {},
        roleUserAddInfo: {},
        roleAlert: {}
    },
    actions: {
        getRoleList: () => { },
        getRole: () => { },
        saveRole: () => { },
        updateRole: () => { },
        deleteRoleList: () => { },

        getRoleUserList: () => { },
        addRoleUser: () => { },
        deleteRoleUser: () => { },

        listCheck: () => { },
        setRoleAlert: () => { },
    }
});
const { Provider } = RoleContext;

const RoleProvider = ({ children }) => {

    const [roleInfo, setRoleInfo] = useState({ responsePage: {}, listData: [] });
    const [roleUserInfo, setRoleUserInfo] = useState({ responsePage: {}, listData: [] });
    const [roleUserAddInfo, setRoleUserAddInfo] = useState({ responsePage: {}, listData: [] });

    const [roleAlert, setRoleAlert] = useState({ on: false, message: '' });

    // const listCheck2 = (checkedValue, checkedId, checkedList) => {

    //     const index = checkedList.indexOf(checkedId);

    //     if (checkedValue) {
    //         if (index === -1) {
    //             checkedList.push(checkedId);
    //         }
    //     } else {
    //         if (index !== -1) {
    //             checkedList = checkedList.splice(index, 1);
    //         }
    //     }

    //     return checkedList;
    // }

    const listCheck = (stateType, toggleAllFlg, checkedValue, index) => {

        const state = {
            'ROLE': roleInfo,
            'ROLE_USER': roleUserInfo,
            'ROLE_USER_ADD': roleUserAddInfo,
        }[stateType];

        const setFunc = {
            'ROLE': setRoleInfo,
            'ROLE_USER': setRoleUserInfo,
            'ROLE_USER_ADD': setRoleUserAddInfo,
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

    const getRoleList = useCallback((requestPage = { page: 1, records: 10 }) => {

        HttpAction({
            url: '/admin/role/list',
            method: 'get',
            params: {
                ...requestPage,
            }
        }).then((res) => {

            if (res.code === 200) {

                const pageResult = {};
                const roleArr = [];

                pageResult.number = res.data.pageNum;
                pageResult.first = res.data.isFirstPage;
                pageResult.last = res.data.isLastPage;
                pageResult.totalPages = res.data.pages;

                res.data.list.forEach(e => {
                    let roleObj = { ...e, checkFlg: false };
                    roleArr.push(roleObj);
                })

                setRoleInfo({ responsePage: pageResult, listData: roleArr });

            } else {
                setRoleAlert({ on: true, message: res.message });
            }
        });

    }, []);

    const getRole = async (roleCode) => {

        const result = {
            data: {}
        }

        await HttpAction({
            url: '/admin/role',
            method: 'get',
            params: {
                roleCode: roleCode
            }
        }).then(res => {
            if (res.code === 200) {
                result.data = res.data;
            } else {
                setRoleAlert({ on: true, message: res.message });
            }
        });

        return result.data;
    }

    const saveRole = (createRole) => {

        HttpAction({
            url: '/admin/role',
            method: 'post',
            data: {
                roleCode: createRole.roleCode,
                roleName: createRole.roleName,
            }
        }).then(res => {
            if (res.code === 200) {
                getRoleList();
            } else {
                setRoleAlert({ on: true, message: res.message });
            }
        });
    }

    const updateRole = (modifyRole) => {

        HttpAction({
            url: '/admin/role',
            method: 'put',
            data: {
                oldRoleCode: modifyRole.oldRoleCode,
                roleCode: modifyRole.roleCode,
                roleName: modifyRole.roleName,
            }
        }).then(res => {
            if (res.code === 200) {
                getRoleList();
            } else {
                setRoleAlert({ on: true, message: res.message });
            }
        });
    }

    const deleteRoleList = (roleInfo) => {

        let deleteList = [];

        roleInfo.forEach(e => {
            if (e.checkFlg) {
                deleteList.push(e.roleCode);
            }
        });

        HttpAction({
            url: '/admin/role',
            method: 'delete',
            params: {
                roleCodes: `${deleteList}`
            }
        }).then(res => {
            if (res.code === 200) {
                getRoleList();
            } else {
                setRoleAlert({ on: true, message: res.message });
            }
        });
    }

    // 역할 사용자 함수들
    const getRoleUserList = useCallback(async (roleCode, roleFlg, requestPage = { page: 1, records: 10 }) => {

        await HttpAction({
            url: '/admin/user/mapping/role',
            method: 'get',
            params: {
                ...requestPage,
                roleCode: roleCode,
                roleFlg: roleFlg
            }
        }).then(res => {
            if (res.code === 200) {

                const roleUserArr = [];
                const pageResult = {};

                pageResult.number = res.data.pageNum;
                pageResult.first = res.data.isFirstPage;
                pageResult.last = res.data.isLastPage;
                pageResult.totalPages = res.data.pages;

                res.data.list.forEach(e => {
                    let userRoleObj = { ...e, checkFlg: false };
                    roleUserArr.push(userRoleObj);
                });

                if (roleFlg) {
                    setRoleUserInfo({ responsePage: pageResult, listData: roleUserArr });
                } else {
                    setRoleUserAddInfo({ responsePage: pageResult, listData: roleUserArr });
                }

            } else {
                setRoleAlert({ on: true, message: res.message });
            }
        })
    }, []);

    const addRoleUser = (codeOrId, listInfo, type) => {
        const addList = [];

        if (type === 'ADD_USER') {
            listInfo.forEach(e => {
                if (e.checkFlg) {
                    addList.push({ roleCode: codeOrId, userId: e.userId });
                }
            });
        }

        HttpAction({
            url: '/admin/user/mapping/role',
            method: 'post',
            data: addList
        }).then(res => {

            if (type === 'ADD_USER') {

                if (res.code === 200) {
                    getRoleUserList(codeOrId, true);
                } else {
                    setRoleAlert({ on: true, message: res.message });
                }
            }
        });
    }

    const deleteRoleUser = (codeOrId, listInfo, type) => {

        const deleteList = [];
        const params = {};

        if (type === 'DELETE_USER') {

            params.roleCode = codeOrId;

            listInfo.forEach(e => {
                if (e.checkFlg) {
                    deleteList.push(e.userId);
                }
            });

            params.userIdList = `${deleteList}`
        }

        HttpAction({
            url: '/admin/user/mapping/role',
            method: 'delete',
            params: { ...params }

        }).then(res => {

            if (type === 'DELETE_USER') {

                if (res.code === 200) {
                    getRoleUserList(codeOrId, true);
                } else {
                    setRoleAlert({ on: true, message: res.message });
                }
            }
        });
    }

    const value = {
        state: {
            roleInfo, roleUserInfo, roleUserAddInfo,
            roleAlert,
        },
        actions: {
            getRoleList, getRole, saveRole, updateRole, deleteRoleList,
            getRoleUserList, addRoleUser, deleteRoleUser,

            listCheck, setRoleAlert
        }
    }

    return <Provider value={value}>{children}</Provider>
}

export { RoleContext, RoleProvider };

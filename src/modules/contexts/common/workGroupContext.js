import React, { useCallback, useState } from 'react';
import HttpAction from 'modules/utils/HttpAction';

const WorkGroupContext = React.createContext({
    state: {
        workGroupInfo: {},
        workGroupRoleInfo: {},
        workGroupRoleAddInfo: {},

        roleWorkGroupInfo: {},
        roleWorkGroupAddInfo: {},

        workGroupAlert: {}
    },
    actions: {
        getWorkGroupList: () => { },
        getWorkGroup: () => { },
        saveWorkGroup: () => { },
        updateWorkGroup: () => { },
        deleteWorkGroupList: () => { },

        getWorkGroupRoleList: () => { },
        addWorkGroupRole: () => { },
        deleteWorkGroupRole: () => { },

        getRoleWorkGroupList: () => { },

        listCheck: () => { },
        setWorkGroupAlert: () => { },
    }
});
const { Provider } = WorkGroupContext;

const WorkGroupProvider = ({ children }) => {

    const [workGroupInfo, setWorkGroupInfo] = useState({ responsePage: {}, listData: [] });

    // 워크그룹 페이지에서 해당 역할 리스트를 가져올 때
    const [workGroupRoleInfo, setWorkGroupRoleInfo] = useState({ responsePage: {}, listData: [] });
    const [workGroupRoleAddInfo, setWorkGroupRoleAddInfo] = useState({ responsePage: {}, listData: [] });

    // 역할 페이지에서 해당 워크그룹 리스트를 가져올 때
    const [roleWorkGroupInfo, setRoleWorkGroupInfo] = useState({ responsePage: {}, listData: [] });
    const [roleWorkGroupAddInfo, setRoleWorkGroupAddInfo] = useState({ responsePage: {}, listData: [] });

    const [workGroupAlert, setWorkGroupAlert] = useState({ on: false, message: '' });

    const listCheck = (stateType, toggleAllFlg, checkedValue, index) => {

        const state = {
            'WORKGROUP': workGroupInfo,
            'WORKGROUP_ROLE': workGroupRoleInfo,
            'WORKGROUP_ROLE_ADD': workGroupRoleAddInfo,

            'ROLE_WORKGROUP': roleWorkGroupInfo,
            'ROLE_WORKGROUP_ADD': roleWorkGroupAddInfo,
        }[stateType];

        const setFunc = {
            'WORKGROUP': setWorkGroupInfo,
            'WORKGROUP_ROLE': setWorkGroupRoleInfo,
            'WORKGROUP_ROLE_ADD': setWorkGroupRoleAddInfo,

            'ROLE_WORKGROUP': setRoleWorkGroupInfo,
            'ROLE_WORKGROUP_ADD': setRoleWorkGroupAddInfo,
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

    const getWorkGroupList = useCallback((requestPage = { page: 1, records: 10 }) => {

        HttpAction({
            url: '/admin/workgroup/list',
            method: 'get',
            params: requestPage
        }).then((res) => {

            if (res.code === 200) {

                const pageResult = {};
                const workGroupArr = [];

                pageResult.number = res.data.pageNum;
                pageResult.first = res.data.isFirstPage;
                pageResult.last = res.data.isLastPage;
                pageResult.totalPages = res.data.pages;

                res.data.list.forEach(e => {
                    workGroupArr.push({ ...e, checkFlg: false });
                })

                setWorkGroupInfo({ responsePage: pageResult, listData: workGroupArr });

            } else {
                setWorkGroupAlert({ on: true, message: res.message });
            }

        });

    }, []);

    const getWorkGroup = async (workGroupId) => {

        const result = {
            data: {}
        }

        await HttpAction({
            url: '/admin/workgroup',
            method: 'get',
            params: {
                workGroupId: workGroupId
            }
        }).then(res => {
            if (res.code === 200) {
                result.data = res.data;
            } else {
                setWorkGroupAlert({ on: true, message: res.message });
            }
        });

        return result.data;
    }

    const saveWorkGroup = (createWorkGroup) => {

        HttpAction({
            url: '/admin/workgroup',
            method: 'post',
            data: {
                workGroupName: createWorkGroup.workGroupName,
            }
        }).then(res => {
            if (res.code === 200) {
                getWorkGroupList();
            } else {
                setWorkGroupAlert({ on: true, message: res.message });
            }
        });
    }

    const updateWorkGroup = (modifyWorkGroup) => {

        HttpAction({
            url: '/admin/workgroup',
            method: 'put',
            data: {
                workGroupId: modifyWorkGroup.workGroupId,
                workGroupName: modifyWorkGroup.workGroupName,
            }
        }).then(res => {
            if (res.code === 200) {
                getWorkGroupList();
            } else {
                setWorkGroupAlert({ on: true, message: res.message });
            }
        });
    }

    const deleteWorkGroupList = (workGroupInfo) => {

        let deleteList = [];

        workGroupInfo.forEach(e => {
            if (e.checkFlg) {
                deleteList.push(e.workGroupId);
            }
        });

        HttpAction({
            url: '/admin/workgroup',
            method: 'delete',
            params: {
                workGroupIds: `${deleteList}`
            }
        }).then(res => {
            if (res.code === 200) {
                getWorkGroupList();
            } else {
                setWorkGroupAlert({ on: true, message: res.message });
            }
        });
    }

    // 워크그룹->역할 리스트
    const getWorkGroupRoleList = useCallback(async (workGroupId, workGroupFlg, requestPage = { page: 1, records: 10 }) => {

        await HttpAction({
            url: '/admin/workgroup/mapping/role',
            method: 'get',
            params: {
                ...requestPage,
                workGroupId: workGroupId,
                workGroupFlg: workGroupFlg
            }
        }).then(res => {

            if (res.code === 200) {

                const workGroupRoleArr = [];
                const pageResult = {};

                pageResult.number = res.data.pageNum;
                pageResult.first = res.data.isFirstPage;
                pageResult.last = res.data.isLastPage;
                pageResult.totalPages = res.data.pages;

                res.data.list.forEach(e => {
                    let workGroupRoleObj = { ...e, checkFlg: false };
                    workGroupRoleArr.push(workGroupRoleObj);
                });

                if (workGroupFlg) {
                    setWorkGroupRoleInfo({ responsePage: pageResult, listData: workGroupRoleArr });
                } else {
                    setWorkGroupRoleAddInfo({ responsePage: pageResult, listData: workGroupRoleArr });
                }

            } else {
                setWorkGroupAlert({ on: true, message: res.message });
            }
        })
    }, []);

    // 역할->워크그룹 리스트
    const getRoleWorkGroupList = useCallback(async (roleCode, roleFlg, requestPage = { page: 1, records: 10 }) => {

        const alert = {};

        await HttpAction({
            url: '/admin/workgroup/mapping/work-group',
            method: 'get',
            params: {
                ...requestPage,
                roleCode: roleCode,
                roleFlg: roleFlg
            }
        }).then(res => {

            if (res.code === 200) {

                const roleWorkGroupArr = [];
                const pageResult = {};

                pageResult.number = res.data.pageNum;
                pageResult.first = res.data.isFirstPage;
                pageResult.last = res.data.isLastPage;
                pageResult.totalPages = res.data.pages;

                res.data.list.forEach(e => {
                    let roleWorkGroupObj = { ...e, checkFlg: false };
                    roleWorkGroupArr.push(roleWorkGroupObj);
                });

                if (roleFlg) {
                    setRoleWorkGroupInfo({ responsePage: pageResult, listData: roleWorkGroupArr });
                } else {
                    setRoleWorkGroupAddInfo({ responsePage: pageResult, listData: roleWorkGroupArr });
                }

            } else {
                alert.on = true;
                alert.message = res.message;
            }
        });

        if (alert.on) {
            return alert;
        }

    }, []);

    const addWorkGroupRole = async (codeOrId, listInfo, type) => {
        const addList = [];

        if (type === 'ADD_ROLE') { // 워크그룹 페이지에서 역할을 추가할 때

            listInfo.forEach(e => {
                if (e.checkFlg) {
                    addList.push({ workGroupId: codeOrId, roleCode: e.roleCode });
                }
            });

        } else if (type === 'ADD_WORKGROUP') { // 역할페이지에서 워크그룹을 추가할 때

            listInfo.forEach(e => {
                if (e.checkFlg) {
                    addList.push({ roleCode: codeOrId, workGroupId: e.workGroupId });
                }
            });

        }

        const alert = {};

        await HttpAction({
            url: '/admin/workgroup/mapping/role',
            method: 'post',
            data: addList

        }).then(res => {

            if (type === 'ADD_ROLE') { // 워크그룹 페이지에서 역할을 추가할 때

                if (res.code === 200) {
                    getWorkGroupRoleList(codeOrId, true);
                } else {
                    setWorkGroupAlert({ on: true, message: res.message });
                }

            } else if (type === 'ADD_WORKGROUP') {

                if (res.code === 200) {
                    getRoleWorkGroupList(codeOrId, true);
                } else {
                    alert.on = true;
                    alert.message = res.message;
                }
            }
        });

        if (alert.on) {
            return alert;
        }
    }

    const deleteWorkGroupRole = async (codeOrId, listInfo, type) => {

        const deleteList = [];
        const params = {};

        if (type === 'DELETE_ROLE') { // 워크그룹 페이지에서 역할을 삭제할 때

            params.workGroupId = codeOrId;

            listInfo.forEach(e => {
                if (e.checkFlg) {
                    deleteList.push(e.roleCode);
                }
            });

            params.roleCodeList = `${deleteList}`;

        } else if (type === 'DELETE_WORKGROUP') { // 역할 페이지에서 워크그룹을 제거할 때

            params.roleCode = codeOrId;

            listInfo.forEach(e => {
                if (e.checkFlg) {
                    deleteList.push(e.workGroupId);
                }
            });

            params.workGroupIdList = `${deleteList}`;
        }

        console.log(params);

        const alert = {};

        await HttpAction({
            url: '/admin/workgroup/mapping/role',
            method: 'delete',
            params: { ...params }

        }).then(res => {

            if (type === 'DELETE_ROLE') {

                if (res.code === 200) {
                    getWorkGroupRoleList(codeOrId, true);
                } else {
                    setWorkGroupAlert({ on: true, message: res.message });
                }

            } else if (type === 'DELETE_WORKGROUP') {

                if (res.code === 200) {
                    getRoleWorkGroupList(codeOrId, true);
                } else {
                    alert.on = true;
                    alert.message = res.message;
                }
            }

        });

        if (alert.on) {
            return alert;
        }
    }


    const value = {
        state: {
            workGroupInfo, workGroupRoleInfo, workGroupRoleAddInfo,

            roleWorkGroupInfo, roleWorkGroupAddInfo,

            workGroupAlert,
        },
        actions: {
            getWorkGroupList, getWorkGroup, saveWorkGroup, updateWorkGroup, deleteWorkGroupList,
            getWorkGroupRoleList, addWorkGroupRole, deleteWorkGroupRole,

            getRoleWorkGroupList,
            listCheck, setWorkGroupAlert,
        }
    }

    return <Provider value={value}>{children}</Provider>
}

export { WorkGroupContext, WorkGroupProvider };

import React, { useState, useContext } from 'react';

import { WorkGroupContext } from 'modules/contexts/common/workGroupContext.js';
import Modal from 'components/modal/index.js';
import ModalTable from './ModalTable'

const RoleWorkGroupModal = ({ selectedRoleCode, setRoleModal, }) => {

    const [roleSubModal, setRoleSubModal] = useState('OFF');

    const useWorkGroupContext = useContext(WorkGroupContext);
    const { state, actions } = useWorkGroupContext;

    function openSubModal() {
        actions.getRoleWorkGroupList(selectedRoleCode, false)
            .then(() => {
                setRoleSubModal('ADD');
            });
    }

    function setPage(setPageInfo) {
        actions.getRoleWorkGroupList(selectedRoleCode, true, setPageInfo);
    }


    return (
        <>
            {
                {
                    'OFF': null,
                    'ADD': <RoleWorkGroupAddModal selectedRoleCode={selectedRoleCode} setRoleSubModal={setRoleSubModal} />
                }[roleSubModal]
            }

            <Modal
                isOpen={true}
                toggle={() => { setRoleModal('OFF'); }}
                size='xl'

                onClickSave={() => { setRoleModal('OFF'); }}
                onClickClose={() => { setRoleModal('OFF') }}
                saveBtnInable={true}
                saveBtnTitle="확인"

                children={
                    <ModalTable
                        subFlg={false}
                        tableTitle={`워크그룹 정보`}
                        headerTitle="역할-워크그룹 관리"
                        tableHeads={['워크그룹', '생성자', '생성일', '수정자', '수정일']}
                        showList={['workGroupName', 'createUserName', 'createDateTime', 'modifyUserName', 'modifyDateTime']}

                        actions={actions}
                        selectedRoleCode={selectedRoleCode}
                        openModal={openSubModal}

                        setPage={setPage}

                        checkedDelete={() => { actions.deleteWorkGroupRole(selectedRoleCode, state.roleWorkGroupInfo.listData, 'DELETE_WORKGROUP'); }}

                        stateInfo={state.roleWorkGroupInfo}
                        stateType='ROLE_WORKGROUP'
                    />

                }
            />
        </>
    )
}

const RoleWorkGroupAddModal = ({ selectedRoleCode, setRoleSubModal }) => {

    const useWorkGroupContext = useContext(WorkGroupContext);
    const { state, actions } = useWorkGroupContext;

    function setPage(setPageInfo) {
        actions.getRoleWorkGroupList(selectedRoleCode, false, setPageInfo);
    }

    return (
        <>
            <Modal
                isOpen={true}
                toggle={() => { setRoleSubModal('OFF'); }}
                headerTitle="추가 워크그룹 리스트"
                size='xl'

                onClickSave={() => {
                    actions.addWorkGroupRole(selectedRoleCode, state.roleWorkGroupAddInfo.listData, 'ADD_WORKGROUP');
                    setRoleSubModal('OFF');
                }}
                saveBtnInable={true}
                saveBtnTitle="추가"
                onClickClose={() => { setRoleSubModal('OFF') }}
                closeBtnInable={true}

                children={
                    <ModalTable
                        subFlg={true}
                        tableTitle={'추가 워크그룹 리스트'}
                        tableHeads={['워크그룹', '생성자', '생성일', '수정자', '수정일']}
                        showList={['workGroupName', 'createUserName', 'createDateTime', 'modifyUserName', 'modifyDateTime']}

                        actions={actions}
                        selectedRoleCode={selectedRoleCode}

                        setPage={setPage}

                        stateInfo={state.roleWorkGroupAddInfo}
                        stateType='ROLE_WORKGROUP_ADD'
                    />
                }
            />
        </>
    )
}

export default RoleWorkGroupModal;
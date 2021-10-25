import React, { useState, useContext } from 'react';

import { RoleContext } from 'modules/contexts/common/roleContext.js';
import Modal from 'components/modal/index.js';
import ModalTable from './ModalTable'

const RoleUserModal = ({ selectedRoleCode, setRoleModal, }) => {

    const [roleSubModal, setRoleSubModal] = useState('OFF');

    const useRoleContext = useContext(RoleContext);
    const { state, actions } = useRoleContext;

    function openSubModal() {
        actions.getRoleUserList(selectedRoleCode, false)
            .then(() => {
                setRoleSubModal('ADD');
            });
    }

    function setPage(setPageInfo) {
        actions.getRoleUserList(selectedRoleCode, true, setPageInfo);
    }

    return (
        <>
            {
                {
                    'OFF': null,
                    'ADD': <RoleUserAddModal selectedRoleCode={selectedRoleCode} setRoleSubModal={setRoleSubModal} />
                }[roleSubModal]
            }

            <Modal
                isOpen={true}
                toggle={() => { setRoleModal('OFF'); }}
                headerTitle="역할 사용자 관리"
                size='lg'

                onClickSave={() => { setRoleModal('OFF'); }}
                onClickClose={() => { setRoleModal('OFF') }}
                saveBtnInable={true}
                saveBtnTitle="확인"

                children={
                    <ModalTable
                        subFlg={false}
                        tableTitle={`${state.roleInfo.listData.find(e => e.roleCode === selectedRoleCode).roleName} 유저 정보`}
                        tableHeads={['사용자명', '사용자ID']}
                        showList={['userName', 'userId']}
                        actions={actions}
                        selectedRoleCode={selectedRoleCode}
                        openModal={openSubModal}

                        setPage={setPage}

                        checkedDelete={() => { actions.deleteRoleUser(selectedRoleCode, state.roleUserInfo.listData, 'DELETE_USER') }}

                        stateInfo={state.roleUserInfo}
                        stateType='ROLE_USER'
                    />

                }
            />
        </>
    )
}

const RoleUserAddModal = ({ selectedRoleCode, setRoleSubModal }) => {

    const useRoleContext = useContext(RoleContext);
    const { state, actions } = useRoleContext;

    function setPage(setPageInfo) {
        actions.getRoleUserList(selectedRoleCode, false, setPageInfo);
    }


    return (
        <>
            <Modal
                isOpen={true}
                toggle={() => { setRoleSubModal('OFF'); }}
                headerTitle="추가 사용자 리스트"
                size='lg'

                onClickSave={() => {
                    actions.addRoleUser(selectedRoleCode, state.roleUserAddInfo.listData, 'ADD_USER');
                    setRoleSubModal('OFF');
                }}
                saveBtnInable={true}
                saveBtnTitle="추가"
                onClickClose={() => { setRoleSubModal('OFF') }}
                closeBtnInable={true}

                children={
                    <ModalTable
                        subFlg={true}
                        tableTitle={'추가사용자 리스트'}
                        tableHeads={['사용자명', '사용자ID']}
                        showList={['userName', 'userId']}
                        actions={actions}

                        selectedRoleCode={selectedRoleCode}

                        setPage={setPage}

                        stateInfo={state.roleUserAddInfo}
                        stateType='ROLE_USER_ADD'
                    />
                }
            />
        </>
    )
}

export default RoleUserModal;
import React, { useState, useContext, useEffect, useRef } from 'react';

import { WorkGroupContext } from 'modules/contexts/common/workGroupContext.js';
import Modal from 'components/modal/index.js';
import ModalTable from './ModalTable';

const WorkGroupRoleModal = ({ selectedWorkGroupId, setWorkGroupModal, }) => {

    const [workGroupSubModal, setWorkGroupSubModal] = useState('OFF');

    const useWorkGroupContext = useContext(WorkGroupContext);
    const { state, actions } = useWorkGroupContext;

    function openSubModal() {
        actions.getWorkGroupRoleList(selectedWorkGroupId, false)
            .then(() => {
                setWorkGroupSubModal('ADD');
            });
    }

    function setPage(setPageInfo) {
        actions.getWorkGroupRoleList(selectedWorkGroupId, true, setPageInfo);
    }


    return (
        <>
            {
                {
                    'OFF': null,
                    'ADD': <WorkGroupRoleAddModal selectedWorkGroupId={selectedWorkGroupId} setWorkGroupSubModal={setWorkGroupSubModal} />
                }[workGroupSubModal]
            }

            <Modal
                isOpen={true}
                toggle={() => { setWorkGroupModal('OFF'); }}
                headerTitle="워크그룹 역할 관리"
                size='xl'

                onClickSave={() => { setWorkGroupModal('OFF'); }}
                onClickClose={() => { setWorkGroupModal('OFF') }}
                saveBtnInable={true}
                saveBtnTitle="확인"

                children={
                    <ModalTable
                        subFlg={false}
                        tableTitle={`${state.workGroupInfo.listData.find(e => e.workGroupId === selectedWorkGroupId).workGroupName} 역할 정보`}
                        tableHeads={['역할명', '역할코드', '생성자', '생성일', '수정자', '수정일']}
                        showList={['roleName', 'roleCode', 'createUserName', 'createDateTime', 'modifyUserName', 'modifyDatetime']}

                        actions={actions}
                        selectedWorkGroupId={selectedWorkGroupId}
                        openModal={openSubModal}

                        setPage={setPage}

                        checkedDelete={() => { actions.deleteWorkGroupRole(selectedWorkGroupId, state.workGroupRoleInfo.listData, 'DELETE_ROLE') }}

                        stateInfo={state.workGroupRoleInfo}
                        stateType='WORKGROUP_ROLE'
                    />

                }
            />
        </>
    )
}

const WorkGroupRoleAddModal = ({ selectedWorkGroupId, setWorkGroupSubModal }) => {

    const useWorkGroupContext = useContext(WorkGroupContext);
    const { state, actions } = useWorkGroupContext;

    function setPage(setPageInfo) {
        actions.getWorkGroupRoleList(selectedWorkGroupId, false, setPageInfo);
    }


    return (
        <>
            <Modal
                isOpen={true}
                toggle={() => { setWorkGroupSubModal('OFF'); }}
                headerTitle="추가 역할 리스트"
                size='xl'

                onClickSave={() => {
                    actions.addWorkGroupRole(selectedWorkGroupId, state.workGroupRoleAddInfo.listData, 'ADD_ROLE');
                    setWorkGroupSubModal('OFF');
                }}
                saveBtnInable={true}
                saveBtnTitle="추가"
                onClickClose={() => { setWorkGroupSubModal('OFF') }}
                closeBtnInable={true}

                children={
                    <ModalTable
                        subFlg={true}
                        tableTitle={'추가 역할 리스트'}
                        tableHeads={['역할명', '역할코드', '생성자', '생성일', '수정자', '수정일']}
                        showList={['roleName', 'roleCode', 'createUserName', 'createDateTime', 'modifyUserName', 'modifyDatetime']}

                        actions={actions}
                        selectedWorkGroupId={selectedWorkGroupId}

                        setPage={setPage}

                        stateInfo={state.workGroupRoleAddInfo}
                        stateType='WORKGROUP_ROLE_ADD'
                    />
                }
            />
        </>
    )
}

export default WorkGroupRoleModal;

import React, { useContext } from 'react';
import { RoleContext } from 'modules/contexts/common/roleContext.js';

import Modal from 'components/modal/index.js';

import "assets/styles/template/argon/scss/argon-dashboard-react.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

const RoleDeleteModal = ({ setRoleModal }) => {

    const useRoleContext = useContext(RoleContext);
    const { state, actions } = useRoleContext;

    // function modalClose() {
    //     setRoleModal('OFF');
    // }

    return (
        <Modal
            isOpen={true}
            toggle={() => { setRoleModal('OFF') }}
            headerTitle="삭제 확인"

            children={<p>해당 목록을 삭제하시겠습니까?</p>}

            onClickClose={() => { setRoleModal('OFF') }}
            onClickSave={() => {
                actions.deleteRoleList(state.roleInfo.listData);
                setRoleModal('OFF');
            }}
            saveBtnInable={true}
            closeBtnInable={true}
            saveBtnTitle="삭제"
        />
    );
}

export default RoleDeleteModal;
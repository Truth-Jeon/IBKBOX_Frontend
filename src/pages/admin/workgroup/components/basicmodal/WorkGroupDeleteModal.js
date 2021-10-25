import React, { useContext } from 'react';
import { WorkGroupContext } from 'modules/contexts/common/workGroupContext.js';

import Modal from 'components/modal/index.js';

import "assets/styles/template/argon/scss/argon-dashboard-react.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
    FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup,
} from "reactstrap";

const WorkGroupDeleteModal = ({ setWorkGroupModal }) => {

    const useWorkGroupContext = useContext(WorkGroupContext);
    const { state, actions } = useWorkGroupContext;

    return (

        <Modal
            isOpen={true}
            toggle={() => { setWorkGroupModal('OFF') }}
            headerTitle="삭제 확인"

            onClickClose={() => { setWorkGroupModal('OFF') }}
            onClickSave={() => {
                actions.deleteWorkGroupList(state.workGroupInfo.listData);
                setWorkGroupModal('OFF');
            }}
            saveBtnInable={true}
            closeBtnInable={true}
            saveBtnTitle="삭제"

            children={<p>해당 목록을 삭제하시겠습니까?</p>}
        />
    );
}

export default WorkGroupDeleteModal;
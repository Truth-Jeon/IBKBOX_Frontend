import React, { useContext } from 'react';
import { RoleContext } from 'modules/contexts/common/roleContext.js';

import Modal from 'components/modal/index.js';

import "assets/styles/template/argon/scss/argon-dashboard-react.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
    FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup,
} from "reactstrap";

const RoleDetailModal = ({ setRoleModal, selectedRoleData }) => {

    const useRoleContext = useContext(RoleContext);
    const { state, actions } = useRoleContext;

    const cancelModal = () => {

        const originElement = state.roleInfo.listData.find(e => e.roleCode === selectedRoleData.roleCode);

        for (let key in selectedRoleData) {
            if (selectedRoleData[key] !== originElement[key]) {
                actions.getRoleList();
            }
        }
        setRoleModal('OFF');
    }

    const inputList = ['역할코드', '역할명', '생성ID', '생성자', '생성일', '수정ID', '수정자', '수정일'];
    const inputKey = ['roleCode', 'roleName', 'createUserId', 'createUserName', 'createDateTime', 'modifyUserId', 'modifyUserName', 'modifyDateTime'];

    return (
        <Modal
            isOpen={true}
            toggle={cancelModal}
            headerTitle="역할 상세"

            onClickClose={cancelModal}
            onClickSave={cancelModal}

            saveBtnInable={true}
            saveBtnTitle="확인"

            children={
                <Form>
                    {
                        inputList.map((item, key) => {

                            return (
                                <FormGroup key={key}>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                {item}
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            type="text"
                                            defaultValue={
                                                inputKey[key] === 'createDateTime' || inputKey[key] === 'modifyDateTime'
                                                    ? selectedRoleData[inputKey[key]].split('T')[0]
                                                    : selectedRoleData[inputKey[key]]
                                            }
                                            readOnly={true}
                                            style={{ background: 'white' }}
                                        />
                                    </InputGroup>
                                </FormGroup>
                            )
                        })
                    }
                </Form>
            }
        />
    );
}

export default RoleDetailModal;
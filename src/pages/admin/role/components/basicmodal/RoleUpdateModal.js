import React, { useContext } from 'react';
import { RoleContext } from 'modules/contexts/common/roleContext.js';

import Modal from 'components/modal/index.js';

import "assets/styles/template/argon/scss/argon-dashboard-react.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
    FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup,
} from "reactstrap";

const RoleUpdateModal = ({ setRoleModal, selectedRoleData }) => {

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

    const updateData = {
        oldRoleCode: selectedRoleData.roleCode,
        roleCode: selectedRoleData.roleCode,
        roleName: selectedRoleData.roleName
    }

    const inputList = ['역할코드', '역할명'];
    const inputKey = ['roleCode', 'roleName'];

    // 표시되는 리스트 중 일부만 수정시키는 것으로 변경할 경우 disabled에 사용할 배열
    //const modifyList = ['역할코드', '역할명'];

    return (
        <Modal
            isOpen={true}
            toggle={cancelModal}
            headerTitle="역할 수정"

            onClickClose={cancelModal}
            onClickSave={() => {
                actions.updateRole(updateData);
                setRoleModal('OFF');
            }}

            saveBtnInable={true}
            closeBtnInable={true}
            saveBtnTitle="수정"

            children={
                <Form>
                    {
                        inputList.map((item, key) => {

                            // let disabled = true;
                            // if (modifyList.includes(item)) {
                            //     disabled = false;
                            // }

                            return (

                                <FormGroup key={key}>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText
                                            //style={disabled ? { backgroundColor: '#e9ecef' } : {}}
                                            >
                                                {item}
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            type="text"
                                            defaultValue={selectedRoleData[inputKey[key]]}
                                            //disabled={disabled}
                                            onChange={e => {
                                                updateData[inputKey[key]] = e.target.value;
                                            }}
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

export default RoleUpdateModal;
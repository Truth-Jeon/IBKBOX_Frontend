import React, { useContext } from 'react';
import { RoleContext } from 'modules/contexts/common/roleContext.js';

import Modal from 'components/modal/index.js';

import "assets/styles/template/argon/scss/argon-dashboard-react.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
    FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup,
} from "reactstrap";

const RoleCreateModal = ({ setRoleModal }) => {

    const useRoleContext = useContext(RoleContext);
    const { actions } = useRoleContext;

    const createRole = {
        roleCode: '', roleName: ''
    }

    const inputList = ['역할코드', '역할명'];
    const inputKey = ['roleCode', 'roleName'];

    return (
        <Modal
            isOpen={true}
            toggle={() => { setRoleModal('OFF') }}
            headerTitle="역할 추가"

            onClickClose={() => { setRoleModal('OFF') }}
            onClickSave={() => {
                if (createRole.roleCode.length !== 0) {
                    actions.saveRole(createRole);
                    setRoleModal('OFF');

                } else {
                    actions.setRoleAlert({ on: true, message: '역할 코드는 반드시 입력되야 합니다.' });
                    setRoleModal('OFF');
                }
            }}

            saveBtnInable={true}
            closeBtnInable={true}
            saveBtnTitle="추가"

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
                                            onChange={(e) => {
                                                createRole[inputKey[key]] = e.target.value;
                                            }}
                                        />
                                    </InputGroup>
                                </FormGroup>

                            );
                        })
                    }
                </Form>
            }
        />
    );
}

export default RoleCreateModal;
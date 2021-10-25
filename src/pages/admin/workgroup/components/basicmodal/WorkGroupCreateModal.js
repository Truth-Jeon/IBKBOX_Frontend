import React, { useContext } from 'react';
import { WorkGroupContext } from 'modules/contexts/common/workGroupContext.js';

import Modal from 'components/modal/index.js';

import "assets/styles/template/argon/scss/argon-dashboard-react.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
    FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup,
} from "reactstrap";

const WorkGroupCreateModal = ({ setWorkGroupModal }) => {

    const useWorkGroupContext = useContext(WorkGroupContext);
    const { actions } = useWorkGroupContext;

    const createWorkGroup = {
        workGroupName: ''
    }

    const inputList = ['워크그룹'];
    const inputKey = ['workGroupName'];

    return (
        <Modal
            isOpen={true}
            toggle={() => { setWorkGroupModal('OFF') }}
            headerTitle="워크그룹 추가"

            onClickClose={() => { setWorkGroupModal('OFF') }}
            onClickSave={() => {
                if (createWorkGroup.workGroupName.length !== 0) {
                    actions.saveWorkGroup(createWorkGroup);
                    setWorkGroupModal('OFF');

                } else {
                    actions.setRoleAlert({ on: true, message: '워크그룹명을 입력해 주세요.' });
                    setWorkGroupModal('OFF');
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
                                                createWorkGroup[inputKey[key]] = e.target.value;
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

export default WorkGroupCreateModal;
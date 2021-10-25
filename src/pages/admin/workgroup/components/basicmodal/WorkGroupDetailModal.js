import React, { useContext } from 'react';
import { WorkGroupContext } from 'modules/contexts/common/workGroupContext.js';

import Modal from 'components/modal/index.js';

import "assets/styles/template/argon/scss/argon-dashboard-react.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
    FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup,
} from "reactstrap";

const WorkGroupDetailModal = ({ setWorkGroupModal, selectedWorkGroupData }) => {

    const useWorkGroupContext = useContext(WorkGroupContext);
    const { state, actions } = useWorkGroupContext;

    const cancelModal = () => {

        const originElement = state.workGroupInfo.listData.find(e => e.workGroupId === selectedWorkGroupData.workGroupId);

        for (let key in selectedWorkGroupData) {
            if (selectedWorkGroupData[key] !== originElement[key]) {
                actions.getWorkGroupList();
            }
        }
        setWorkGroupModal('OFF');
    }

    const updateData = {
        workGroupId: selectedWorkGroupData.workGroupId,
        workGroupName: selectedWorkGroupData.workGroupName
    }

    const inputList = ['워크그룹ID', '워크그룹명', '생성ID', '생성자', '생성일', '수정ID', '수정자', '수정일'];
    const inputKey = ['workGroupId', 'workGroupName', 'createUserId', 'createUserName', 'createDateTime', 'modifyUserId', 'modifyUserName', 'modifyDateTime'];

    return (
        <Modal
            isOpen={true}
            toggle={cancelModal}
            headerTitle="워크그룹 수정"

            onClickClose={cancelModal}
            onClickSave={() => {
                actions.updateWorkGroup(updateData);
                setWorkGroupModal('OFF');
            }}
            saveBtnInable={true}
            closeBtnInable={true}
            saveBtnTitle="수정"

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
                                                    ? selectedWorkGroupData[inputKey[key]].split('T')[0]
                                                    : selectedWorkGroupData[inputKey[key]]
                                            }
                                            readOnly={true}
                                            style={{ background: 'white' }}
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

export default WorkGroupDetailModal;
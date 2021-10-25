import React, { useEffect, useRef, useContext, useState } from 'react';

import Alert from 'components/common/alert/Alert.js';
import Pagination from 'components/pagination/index.js';

import WorkGroupCreateModal from './components/basicmodal/WorkGroupCreateModal.js';
import WorkGroupDetailModal from './components/basicmodal/WorkGroupDetailModal.js';
import WorkGroupUpdateModal from './components/basicmodal/WorkGroupUpdateModal.js';
import WorkGroupDeleteModal from './components/basicmodal/WorkGroupDeleteModal.js';

import WorkGroupRoleModal from './components/tablemodal/WorkGroupRoleModal.js'

import { WorkGroupContext } from 'modules/contexts/common/workGroupContext.js';

import { Container, Row, Col } from 'react-bootstrap';
import "assets/styles/template/argon/scss/argon-dashboard-react.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Table,
    CardHeader,
    Button,
    CardFooter,
} from "reactstrap";

const WorkGroup = () => {

    // ContextAPI
    const useWorkGroupContext = useContext(WorkGroupContext);
    const { state, actions } = useWorkGroupContext;

    const [workGroupModal, setWorkGroupModal] = useState('OFF');

    // useRef 변수
    // ModifyRef
    const selectedWorkGroupId = useRef('');
    const selectedWorkGroupData = useRef({});

    // 수정, 사용자, 역할그룹 모달창 함수 (해당 코드의 정보 재갱신)
    function openWorkGroupDetailModal() {
        actions.getWorkGroup(selectedWorkGroupId.current).then((data) => {
            selectedWorkGroupData.current = data;
            setWorkGroupModal('DETAIL');
        });
    }

    function openWorkGroupUpdateModal() {
        actions.getWorkGroup(selectedWorkGroupId.current).then((data) => {
            selectedWorkGroupData.current = data;
            setWorkGroupModal('UPDATE');
        });
    }

    function openWorkGroupRoleModal() {
        actions.getWorkGroupRoleList(selectedWorkGroupId.current, true).then(() => {
            setWorkGroupModal('WORKGROUP_ROLE');
        });
    }

    // 리스트 갱신: 마운트 + updateCheck 변경 시
    useEffect(() => {
        actions.getWorkGroupList();
    }, [actions.getWorkGroupList]);

    const tableHeads = ['워크그룹명', '생성자', '생성일', '수정자', '수정일', ''];
    const showList = ['workGroupName', 'createUserName', 'createDateTime', 'modifyUserName', 'modifyDateTime'];
    const workGroupBtns = ['상세', '수정', '역할'];

    return (
        <>
            <Container>
                {/* WorkGroup Modals */}
                {
                    {
                        OFF: null,
                        CREATE: <WorkGroupCreateModal setWorkGroupModal={setWorkGroupModal} />,
                        DETAIL: <WorkGroupDetailModal setWorkGroupModal={setWorkGroupModal} selectedWorkGroupData={selectedWorkGroupData.current} />,
                        UPDATE: <WorkGroupUpdateModal setWorkGroupModal={setWorkGroupModal} selectedWorkGroupData={selectedWorkGroupData.current} />,
                        DELETE: <WorkGroupDeleteModal setWorkGroupModal={setWorkGroupModal} />,

                        WORKGROUP_ROLE: <WorkGroupRoleModal setWorkGroupModal={setWorkGroupModal} selectedWorkGroupId={selectedWorkGroupId.current} />

                    }[workGroupModal]
                }

                {/* Alert 창 */}
                {
                    state.workGroupAlert.on && <Alert alert={state.workGroupAlert} setAlert={actions.setWorkGroupAlert} />
                }

                <CardHeader className="border-0">
                    <Row className="align-items-center">
                        <Col sm="6">
                            <div className="col">
                                <h3 className="mb-0">워크 그룹 관리</h3>
                            </div>
                        </Col>
                        <Col sm="6">
                            <div className="col text-right">
                                <Button
                                    color="primary"
                                    size="sm"
                                    onClick={() => { setWorkGroupModal('CREATE'); }}>신규</Button>

                                <Button
                                    color="primary"
                                    size="sm"
                                    onClick={() => {
                                        if (state.workGroupInfo.listData.some((e) => e.checkFlg === true)) {
                                            setWorkGroupModal('DELETE');
                                        } else {
                                            actions.setWorkGroupAlert({ on: true, message: '삭제할 항목을 선택해주세요' });
                                        }
                                    }}>삭제</Button>
                            </div>
                        </Col>
                    </Row>
                </CardHeader>

                {/* WorkGroup List Table */}
                <Table className="align-items-center" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">
                                <div className="custom-control custom-control-alternative custom-checkbox">
                                    <input className="custom-control-input" id='customCheckRegister' type="checkbox"
                                        onChange={(event) => {
                                            actions.listCheck('WORKGROUP', true, event.target.checked);
                                        }} />
                                    <label className="custom-control-label" htmlFor='customCheckRegister'></label>
                                </div>
                            </th>
                            {
                                tableHeads.map((head, key) => {
                                    return (
                                        <th key={key} className="">
                                            {head}
                                        </th>
                                    );

                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            state.workGroupInfo.listData.map((e, key) => {
                                return (
                                    <tr key={key}>

                                        <td>
                                            <div className="custom-control custom-control-alternative custom-checkbox">
                                                <input className="custom-control-input" id={`customCheckRegister${key}`} type="checkbox"
                                                    onChange={(event) => {
                                                        actions.listCheck('WORKGROUP', false, event.target.checked, key);
                                                    }}
                                                    checked={e.checkFlg} />
                                                <label className="custom-control-label" htmlFor={`customCheckRegister${key}`}></label>
                                            </div>
                                        </td>
                                        {
                                            showList.map((objKeys, subKey) => {
                                                return (
                                                    <td key={subKey} className="">
                                                        <span className="">{
                                                            objKeys === 'createDateTime' || objKeys === 'modifyDateTime'
                                                                ? e[objKeys].split('T')[0]
                                                                : e[objKeys]
                                                        }</span>
                                                    </td>
                                                );
                                            })
                                        }
                                        <td className="text-right">
                                            <UncontrolledDropdown>
                                                <DropdownToggle
                                                    className="btn-icon-only text-light"
                                                    href="#pablo"
                                                    role="button"
                                                    size="sm"
                                                    color=""
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    <i className="fas fa-ellipsis-v" />
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-arrow" right>
                                                    {
                                                        workGroupBtns.map((item, key) => {
                                                            const modalBtn = {
                                                                0: openWorkGroupDetailModal,
                                                                1: openWorkGroupUpdateModal,
                                                                2: openWorkGroupRoleModal,
                                                            }[key];

                                                            return (
                                                                <DropdownItem
                                                                    key={key}
                                                                    onClick={() => {
                                                                        selectedWorkGroupId.current = e.workGroupId;
                                                                        modalBtn();
                                                                    }}
                                                                >
                                                                    {item}
                                                                </DropdownItem>
                                                            );
                                                        })
                                                    }
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>

                <CardFooter className="py-4">
                    <nav aria-label="...">
                        <Pagination pageInfo={state.workGroupInfo.responsePage} setPage={actions.getWorkGroupList} />
                    </nav>
                </CardFooter>

            </Container>

        </>
    )
}

export default WorkGroup;
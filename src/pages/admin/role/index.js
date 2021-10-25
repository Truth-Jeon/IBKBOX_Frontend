import React, { useEffect, useRef, useContext, useState } from 'react';

import Alert from 'components/common/alert/Alert.js';
import Pagination from 'components/pagination/index.js';

import RoleDetailModal from './components/basicmodal/RoleDetailModal';
import RoleCreateModal from './components/basicmodal/RoleCreateModal';
import RoleUpdateModal from './components/basicmodal/RoleUpdateModal';
import RoleDeleteModal from './components/basicmodal/RoleDeleteModal';

import RoleUserModal from './components/tablemodal/RoleUserModal';
import RoleWorkGroupModal from './components/tablemodal/RoleWorkGroupModal';

import { RoleContext } from 'modules/contexts/common/roleContext.js';
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


const Role = () => {

    // ContextAPI
    const useRoleContext = useContext(RoleContext);
    const useWorkGroupContext = useContext(WorkGroupContext);
    const { state, actions } = useRoleContext;

    const [roleModal, setRoleModal] = useState('OFF');

    // useRef 변수
    // ModifyRef
    const selectedRoleCode = useRef('');
    const selectedRoleData = useRef({});

    // 수정, 사용자, 역할그룹 모달창 함수 (해당 코드의 정보 재갱신)
    function openRoleDetailModal() {
        actions.getRole(selectedRoleCode.current).then((data) => {
            selectedRoleData.current = data;
            setRoleModal('DETAIL');
        });
    }

    function openRoleUpdateModal() {
        actions.getRole(selectedRoleCode.current).then((data) => {
            selectedRoleData.current = data;
            setRoleModal('UPDATE');
        });
    }

    function openRoleUserModal() {
        actions.getRoleUserList(selectedRoleCode.current, true)
            .then(() => {
                setRoleModal('ROLE_USER');
            });
    }

    async function openRoleGroupModal() {
        useWorkGroupContext.actions.getRoleWorkGroupList(selectedRoleCode.current, true)
            .then((alert) => {
                setRoleModal('ROLE_WORKGROUP');

                // if (typeof alert !== 'undefined') {
                //     actions.setRoleAlert(alert);
                // }
            });
    }

    useEffect(() => {
        actions.getRoleList();
    }, []);

    const tableHeads = ['역할코드', '역할명', '생성자', '생성일', '수정자', '수정일', ''];
    const showList = ['roleCode', 'roleName', 'createUserName', 'createDateTime', 'modifyUserName', 'modifyDateTime'];
    const roleBtns = ['상세', '수정', '사용자', '워크그룹'];

    const checkedList = [];

    return (
        <>

            <Container>
                {/* Role Modals */}
                {
                    {
                        OFF: null,
                        CREATE: <RoleCreateModal setRoleModal={setRoleModal} />,
                        DETAIL: <RoleDetailModal setRoleModal={setRoleModal} selectedRoleData={selectedRoleData.current} />,
                        UPDATE: <RoleUpdateModal setRoleModal={setRoleModal} selectedRoleData={selectedRoleData.current} />,
                        DELETE: <RoleDeleteModal setRoleModal={setRoleModal} />,

                        ROLE_USER: <RoleUserModal setRoleModal={setRoleModal} selectedRoleCode={selectedRoleCode.current} />,
                        ROLE_WORKGROUP: <RoleWorkGroupModal setRoleModal={setRoleModal} selectedRoleCode={selectedRoleCode.current} />
                    }[roleModal]
                }

                {/* Alert 창 */}
                {
                    state.roleAlert.on && <Alert alert={state.roleAlert} setAlert={actions.setRoleAlert} />
                }

                <CardHeader className="border-0">
                    <Row className="align-items-center">
                        <Col sm="6">
                            <div className="col">
                                <h3 className="mb-0">역할 관리</h3>
                            </div>
                        </Col>
                        <Col sm="6">
                            <div className="col text-right">
                                <Button
                                    color="primary"
                                    size="sm"
                                    onClick={() => { setRoleModal('CREATE'); }}>신규</Button>

                                <Button
                                    color="primary"
                                    size="sm"
                                    onClick={() => {
                                        if (state.roleInfo.listData.some((e) => e.checkFlg === true)) {
                                            setRoleModal('DELETE');
                                        } else {
                                            actions.setRoleAlert({ on: true, message: '삭제할 항목을 선택해주세요' });
                                        }
                                    }}>삭제</Button>
                            </div>
                        </Col>
                    </Row>
                </CardHeader>

                {/* Role List Table */}
                <Table className="align-items-center" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">
                                <div className="custom-control custom-control-alternative custom-checkbox">
                                    <input className="custom-control-input" id='customCheckRegister' type="checkbox"
                                        onChange={(event) => {
                                            actions.listCheck('ROLE', true, event.target.checked);
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
                            state.roleInfo.listData.map((e, key) => {
                                return (
                                    <tr key={key}>

                                        <td>
                                            <div className="custom-control custom-control-alternative custom-checkbox">
                                                {/* <input className="custom-control-input" id={`customCheckRegister${key}`} type="checkbox"
                                                    onChange={(event) => {
                                                        checkedList = actions.listCheck(event.target.checked, e.roleCode, checkedList);

                                                        console.log(checkedList);
                                                    }}
                                                />
                                                <label className="custom-control-label" htmlFor={`customCheckRegister${key}`}></label> */}


                                                <input className="custom-control-input" id={`customCheckRegister${key}`} type="checkbox"
                                                    onChange={(event) => {
                                                        actions.listCheck('ROLE', false, event.target.checked, key);
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
                                                        roleBtns.map((item, key) => {
                                                            const modalBtn = {
                                                                0: openRoleDetailModal,
                                                                1: openRoleUpdateModal,
                                                                2: openRoleUserModal,
                                                                3: openRoleGroupModal
                                                            }[key];

                                                            return (
                                                                <DropdownItem
                                                                    key={key}
                                                                    onClick={() => {
                                                                        selectedRoleCode.current = e.roleCode;
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
                        <Pagination pageInfo={state.roleInfo.responsePage} setPage={actions.getRoleList} />
                    </nav>
                </CardFooter>

            </Container>

        </>
    )
}

export default Role;
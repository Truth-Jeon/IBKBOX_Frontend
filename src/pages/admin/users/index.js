import React, { useContext , useRef, useEffect, useCallback, useState } from 'react';
import { UsersContext } from 'modules/contexts/common/usersContext';
import {
    Table,
    CardHeader,
    CardFooter,
    Button,
  } from "reactstrap";
  import { Row, Col, Container } from "react-bootstrap";
  import Modal from "components/modal";
  import UserCreateModal from 'pages/admin/users/UserCreateModal';
  import UserUpdateModal from 'pages/admin/users/UserUpdateModal';
  import UserDeleteModal from 'pages/admin/users/UserDeleteModal';
  import Pagination from 'components/pagination/index.js';

const Index = (props) => {
    //Context API
    const useUsersContext = useContext(UsersContext);
    const {state, actions} = useUsersContext;
    const [selectedUser, setSelectedUser] = useState({});
    const [newUser, setNewUser] = useState({ //사용자 생성 시 DB에 보낼 목록
                userName:'',
                userId: '',
                password: '',
                email: '',
                deptCode: '',
                mobile: '',
                address: '',
                postCode: ''
      });
    const [show, setShow] = useState(false); //사용자 생성 시 DB에 보낼 목록
    const [modalFormat, setModaFormat] = useState("");
    const modalClose = useCallback(() =>  setShow(false), []);
    const [checkItems, setCheckItems] = useState([]);

    const checkSingle = (checked, userId) => {
        if(checked) {
            setCheckItems([...checkItems, userId]);
        }else{
            setCheckItems(checkItems.filter((el) => el !== userId));
        }
    };
    const checkAll = (checked) => {
        if(checked){
            const userArray = [];
            useUsersContext.state.userInfo.listData.forEach((el) =>{
                userArray.push(el.userId)
            }
                
            );
            setCheckItems(userArray)
        } else {
            setCheckItems([]);
        }
    }

    const createUser = useCallback(() => {
        if(!newUser.userId) return alert('신규 사용자가 생성되지 않았습니다.');
        useUsersContext.actions.createUsers(newUser);
        setNewUser({
                userName:'',
                userId: '',
                password: '',
                email: '',
                deptCode: '',
                mobile: '',
                address: '',
                postCode: ''
        })
        setShow(false);
    },[newUser]);

    const updateUser = useCallback(() => { //사용자 수정
        useUsersContext.actions.updateUsers(selectedUser);
        setShow(false)
    },[selectedUser]);

    const deleteUser = useCallback(() => { //사용자 삭제
        useUsersContext.actions.deleteUserList(checkItems);
        setShow(false)
    }, [checkItems]);

    const modalComponent = { //각 버튼에 따른 모달 팝업창
        CREATE: ( //사용자 생성
            <Modal
                isOpen={show}
                toggle={modalClose}
                headerTitle={"신규 사용자 생성 ( * 부분 필수 입력 )"}
                onClickClose = {modalClose}
                onClickSave = {createUser}
                saveBtnInable
                closeBtnInable
            >
                <UserCreateModal user={newUser} setUser={setNewUser}/>
            </Modal>
        ),
        UPDATE: ( //사용자 수정
            <Modal
                isOpen={show}
                toggle={modalClose}
                headerTitle={"사용자 수정 ( * 부분 수정 불가 )"}
                onClickClose = {modalClose}
                onClickSave = {updateUser}
                saveBtnInable
                closeBtnInable
            >
                <UserUpdateModal user={selectedUser} setUser={setSelectedUser}/>
            </Modal>
        ),
        DELETE: ( //사용자 삭제
            <Modal
                isOpen={show}
                toggle={modalClose}
                headerTitle={"사용자 삭제"}
                onClickClose = {modalClose}
                onClickSave = {deleteUser}
                saveBtnInable
                closeBtnInable
            >
                <UserDeleteModal deleteList={checkItems}/>
            </Modal>
        )
    }
    
    const showList = ['userName', 'userId', 'email', 'mobile', 'address', 'postCode','deptCode'];
    return (
        <>
          {/* User List Table */}
          <Container>
            <CardHeader className="border-0">
                <Row className="align-items-center">
                <Col sm="6">
                    <div className="col">
                    <h3 className="mb-0 table__title">사용자 관리</h3>
                    </div>
                </Col>
                <Col sm="6">
                    <div className="col text-right">
                    <Button color="danger" type="button" outline onClick={() => { setModaFormat('CREATE'); setShow(true); }}>
                        사용자추가
                    </Button>
                    <Button color="danger" type="button" outline onClick={() => { setModaFormat('DELETE'); setShow(true); }}>
                        사용자삭제
                    </Button>
                    </div>
                </Col>
                </Row>
            </CardHeader>
            {modalFormat && modalComponent[modalFormat]}

            <Table className="align-items-center bc__table" responsive>
                            <thead className="thead-light">
                                <tr>
                                    <th>
                                    <div className="custom-control custom-control-alternative custom-checkbox bc__checkbox">
                                    <input
                                        className="custom-control-input"
                                        id={`allCheck`}
                                        type="checkbox"
                                        onChange={(e) => checkAll(e.target.checked)}
                                        />
                                        <label
                                        className="custom-control-label"
                                        htmlFor={`allCheck`}
                                        ></label>
                                    </div>
                                    </th>
                                    <th>이름</th>
                                    <th>ID</th>
                                    <th>이메일</th>
                                    <th>휴대폰번호</th>
                                    <th>주소</th>
                                    <th>우편번호</th>
                                    <th>부서코드</th>
                                    <th>설정</th>
                                </tr>
                            </thead>
                            <tbody>
                            { useUsersContext && useUsersContext.state.userInfo.listData.map((user, key) => { //데이터 받아서
                                    return (
                                        <tr key={key}>
                                            <td>
                                                <div className="custom-control custom-control-alternative custom-checkbox bc__checkbox">
                                                    <input
                                                        className="custom-control-input"
                                                        id={`customCheckRegister${key}`}
                                                        type="checkbox"
                                                        onChange={(e) =>
                                                        {   
                                                        checkSingle(e.target.checked, user.userId)}
                                                        }
                                                        checked={
                                                        checkItems.includes(user.userId) ? true : false
                                                        }
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor={`customCheckRegister${key}`}
                                                    ></label>
                                                </div>
                                            </td>
                                            {
                                                showList.map((objKeys, key) => { //데이터 받아서
                                                    return (
                                                          <td key={key}>
                                                          <span>{user[objKeys]}</span>
                                                          </td>
                                                        );
                                                    })
                                                }
                                                <td>
                                                    <div>
                                                        <Button
                                                                        color="danger"
                                                                        type="button"
                                                                        outline
                                                                        onClick={() => {
                                                                            setSelectedUser(user);
                                                                            setShow(true);
                                                                            setModaFormat("UPDATE");
                                                                        }}
                                                                    >
                                                                        수정
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                    }
                                </tbody>
            </Table>
            <CardFooter className="bc__pagination">
                <nav aria-label="...">
                    <Pagination pageInfo={state.userInfo.responsePage} setPage={actions.getUserList}/>
                    {/* 페이지네이션 */}
                </nav>
            </CardFooter>
        </Container>
                </>
    );
}

export default Index;
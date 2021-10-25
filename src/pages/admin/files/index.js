import React, { useEffect, useRef, useContext, useState } from 'react';

import Pagination from 'components/pagination/index.js';
import { FilesContext } from 'modules/contexts/common/filesContext.js';

import CreateFilesModal from './components/CreateFilesModal.js';
import DetailFilesModal from './components/DeleteFilesModal.js';
import DeleteFilesModal from './components/DetailFilesModal.js';

import { Container, Row, Col } from 'react-bootstrap';
import "assets/styles/template/argon/scss/argon-dashboard-react.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Table, CardHeader, Button, CardFooter, } from "reactstrap";

const Files = () => {

    // ContextAPI
    const useFilesContext = useContext(FilesContext);
    const { state, actions } = useFilesContext;

    //State
    const [filesModal, setFilesModal] = useState('OFF');

    // useRef 변수
    // ModifyRef
    const modifyId = useRef('');

    // 수정, 사용자, 역할그룹 모달창 함수 (해당 코드의 정보 재갱신)
    function openDetailModal() {
        actions.getFiles(modifyId.current).then((data) => {
            setFilesModal('DETAIL');
        });
    }

    useEffect(() => {
        actions.getFilesList();
    }, []);

    const tableHeads = ['제목', '생성자', '생성일', '수정자', '수정일', ''];
    const showList = ['title', 'createUserName', 'createDateTime', 'modifyUserName', 'modifyDateTime'];

    //const checkedList = [];

    return (
        <>
            <Container>
                {/* File Modals */}
                {
                    {
                        OFF: null,
                        CREATE: <CreateFilesModal setFilesModal={setFilesModal} />,
                        DETAIL: <DetailFilesModal setFilesModal={setFilesModal} />,
                        DELETE: <DeleteFilesModal setFilesModal={setFilesModal} />,
                    }[filesModal]
                }

                <CardHeader className="border-0">
                    <Row className="align-items-center">
                        <Col sm="6">
                            <div className="col">
                                <h3 className="mb-0">파일 관리</h3>
                            </div>
                        </Col>
                        <Col sm="6">
                            <div className="col text-right">
                                <Button
                                    color="primary"
                                    size="sm"
                                    onClick={() => { setFilesModal('CREATE'); }}>신규</Button>

                                <Button
                                    color="primary"
                                    size="sm"
                                    onClick={() => {
                                        if (state.filesListInfo.listData.some((e) => e.checkFlg === true)) {
                                            setFilesModal('DELETE');
                                        }
                                    }}>삭제</Button>
                            </div>
                        </Col>
                    </Row>
                </CardHeader>

                {/* File List Table */}
                <Table className="align-items-center" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">
                                <div className="custom-control custom-control-alternative custom-checkbox">
                                    <input className="custom-control-input" id='customCheckRegister' type="checkbox"
                                        onChange={(event) => {
                                            actions.fileListCheck(true, event.target.checked);
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
                            state.filesListInfo.listData.map((e, key) => {
                                return (
                                    <tr key={key}>

                                        <td>
                                            <div className="custom-control custom-control-alternative custom-checkbox">
                                                <input className="custom-control-input" id={`customCheckRegister${key}`} type="checkbox"
                                                    onChange={(event) => {
                                                        actions.fileListCheck(false, e.target.checked, key);
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

                                            <div className="bc__button__base">
                                                {/* <Button color="danger" outline type="button">
                                                    <Link
                                                        to={{
                                                            // pathname: "/admin/common/detail",
                                                            // state: {
                                                            //     comCode: code.comCode,
                                                            // },
                                                        }}
                                                    >
                                                        상세보기
                                                    </Link>
                                                </Button> */}
                                                <Button
                                                    color="danger"
                                                    outline
                                                    type="button"
                                                    onClick={() => {
                                                        openDetailModal();
                                                    }}
                                                >
                                                    상세보기
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>

                <CardFooter className="py-4">
                    {/* <nav aria-label="...">
                        <Pagination pageInfo={state.filesListInfo.responsePage} setPage={actions.getFilesList} />
                    </nav> */}
                </CardFooter>

            </Container>

        </>
    )
}

export default Files;
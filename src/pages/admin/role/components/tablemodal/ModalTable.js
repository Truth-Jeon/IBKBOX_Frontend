import React from 'react';
import Pagination from 'components/pagination/index.js';

import { Container, Row, Col } from 'react-bootstrap';
import "assets/styles/template/argon/scss/argon-dashboard-react.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Table, CardHeader, Button, CardFooter } from "reactstrap";

const ModalTable = (props) => {

    const { subFlg, tableTitle, tableHeads, showList, setPage,
        checkedDelete, stateInfo, stateType, openModal, actions } = props;

    return (
        <>
            {
                Object.keys(stateInfo.listData).length === 0
                    ? <>
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>해당 검색결과가 없습니다.</div>

                        {!subFlg &&
                            <div className="col text-center">
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        openModal();
                                    }}>추가
                                </Button>
                            </div>
                        }
                    </>
                    : <>
                        <Container>
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <Col sm="6">
                                        <div className="col">
                                            <h3 className="mb-0">{tableTitle}</h3>
                                        </div>
                                    </Col>

                                    {
                                        !subFlg &&
                                        <Col sm="6">
                                            <div className="col text-right">
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                    onClick={() => {
                                                        openModal();
                                                    }}>추가
                                                </Button>
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                    onClick={checkedDelete}>삭제
                                                </Button>
                                            </div>
                                        </Col>
                                    }
                                </Row>
                            </CardHeader>

                            <Table className="align-items-center" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">
                                            <div className="custom-control custom-control-alternative custom-checkbox">
                                                <input className="custom-control-input" id={`modalTableCheckRegister${stateType}`} type="checkbox"
                                                    onChange={(event) => {
                                                        actions.listCheck(stateType, true, event.target.checked);
                                                    }}
                                                />
                                                <label className="custom-control-label" htmlFor={`modalTableCheckRegister${stateType}`}></label>
                                            </div>
                                        </th>
                                        {
                                            tableHeads.map((head, key) => {
                                                return (
                                                    <th key={key}>
                                                        {head}
                                                    </th>
                                                );
                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        stateInfo.listData.map((e, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>
                                                        <div className="custom-control custom-control-alternative custom-checkbox">
                                                            <input className="custom-control-input" id={`modalTableCheckRegister${stateType}${key}`} type="checkbox"
                                                                onChange={(event) => {
                                                                    actions.listCheck(stateType, false, event.target.checked, key);
                                                                }}
                                                                checked={e.checkFlg}
                                                            />
                                                            <label className="custom-control-label" htmlFor={`modalTableCheckRegister${stateType}${key}`}></label>
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
                                                            )
                                                        })
                                                    }

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>

                            <CardFooter className="py-4">
                                <nav aria-label="...">
                                    <Pagination pageInfo={stateInfo.responsePage} setPage={setPage} />
                                </nav>
                            </CardFooter>
                        </Container>
                    </>
            }
        </>
    )
};
export default ModalTable;
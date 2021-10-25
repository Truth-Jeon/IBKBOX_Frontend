import React, { useContext, useState, useCallback, useEffect} from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import {
  Table,
  CardHeader,
  CardFooter,
  Button,
} from "reactstrap";
import "assets/styles/template/argon/scss/argon-dashboard-react.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Modal from "components/modal";
import Pagination from "components/pagination";

import RolCodeContext from "modules/contexts/common/roleCodeContext";
import Toggle from "components/toggle";
import ComCodeCUModal from "pages/admin/common/components/ComCodeCUModal";
import ComCodeDeleteModal from "pages/admin/common/components/ComCodeDeleteModal";
import { CONSTANTS, dateTimeFormat } from "modules/utils/Common";

const Index = (props) => {
  const roleCodeContext = useContext(RolCodeContext);
  const [selectedCode, setSelectedCode] = useState({});
  const [newCode, setNewCode] = useState({
    comCode: "",
    description: "",
    comCodeName: "",
    useFlg: true,
  });
  const [show, setShow] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const [modalFormat, setModaFormat] = useState("");
  const handleClose = useCallback(() => setShow(false), []);
  const [checkItems, setCheckItems] = useState([]);

  //단일 선택
  const handleSingleCheck = (checked, comCode) => {
    if (checked) {
      setCheckItems([...checkItems, comCode]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== comCode));
    }
  };

  //전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      const comCodeArray = [];
      roleCodeContext.state.roleCodes.forEach((el) =>
        comCodeArray.push(el.comCode)
      );
      setCheckItems(comCodeArray);
    } else {
      setCheckItems([]);
    }
  };

  //코드 생성 이벤트
  const createRoleCode = useCallback(() => {
    if (!newCode.comCode) return alert("신규 생성을 위한 코드를 입력하세요");
    roleCodeContext.actions.createRoleCode(newCode,pageInfo);
    setNewCode({
      comCode: "",
      description: "",
      comCodeName: "",
      useFlg: true,
    });
    setShow(false);
  }, [newCode]);
  
  //코드 수정 이벤트
  const updateRoleCode = useCallback(() => {
    roleCodeContext.actions.updateRoleCode(selectedCode,pageInfo);
    setShow(false);
  }, [selectedCode]);

  //코드 삭제 이벤트
  const deleteRoleCode = useCallback(() => {
    roleCodeContext.actions.deleteRoleCode(checkItems,pageInfo);
    setShow(false);
  }, [checkItems]);



  const modalComponent = {
    CREATE: (
      <Modal
        isOpen={show}
        toggle={handleClose}
        headerTitle={"신규 공통 코드 생성"}
        onClickClose={handleClose}
        onClickSave={createRoleCode}
        saveBtnInable
        closeBtnInable
      >
        <ComCodeCUModal code={newCode} setCode={setNewCode} />
      </Modal>
    ),
    UPDATE: (
      <Modal
        isOpen={show}
        toggle={handleClose}
        headerTitle={"공통 코드 수정"}
        onClickClose={handleClose}
        onClickSave={updateRoleCode}
        saveBtnInable
        closeBtnInable
      >
        <ComCodeCUModal code={selectedCode} setCode={setSelectedCode} />
      </Modal>
    ),
    DELETE: (
      <Modal
        isOpen={show}
        toggle={handleClose}
        headerTitle={"공통 코드 삭제"}
        onClickClose={handleClose}
        onClickSave={deleteRoleCode}
        saveBtnInable
        closeBtnInable
      >
        <ComCodeDeleteModal deleteList={checkItems} />
      </Modal>
    ),
  };

  useEffect(() => {
    roleCodeContext.actions.getRoleCodes()
  }, []);

  useEffect(() => {
    setPageInfo({
      number: roleCodeContext.state.roleCodes.pageNum,
      first: roleCodeContext.state.roleCodes.isFirstPage,
      last: roleCodeContext.state.roleCodes.isLastPage,
      totalPages: roleCodeContext.state.roleCodes.pages,
    });
  }, [roleCodeContext]);

  return (
    <>
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <Col sm="6">
            <div className="col">
              <h3 className="mb-0 table__title">공통 코드 관리</h3>
            </div>
          </Col>
          <Col sm="6">
            <div className="col text-right">
              <Button
                color="danger" type="button" outline
                onClick={() => {
                  setModaFormat("CREATE");
                  setShow(true);
                }}
              >
                역할추가
              </Button>
              <Button
                color="danger" type="button" outline
                onClick={() => {
                  setModaFormat("DELETE");
                  setShow(true);
                }}
              >
                선택삭제
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
                  onChange={(e) => handleAllCheck(e.target.checked)}
                />
                <label
                  className="custom-control-label"
                  htmlFor={`allCheck`}
                ></label>
              </div>
            </th>
            <th>코드</th>
            <th>코드명</th>
            <th>설명</th>
            <th>사용여부</th>
            <th>생성자</th>
            <th>생성일자</th>
            <th>수정자</th>
            <th>수정일자</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {roleCodeContext.state.roleCodes.list &&
            roleCodeContext.state.roleCodes.list.map((code, index) => {
              return (
                <tr>
                  <td>
                    <div className="custom-control custom-control-alternative custom-checkbox bc__checkbox">
                      <input
                        className="custom-control-input"
                        id={`customCheckRegister${index}`}
                        type="checkbox"
                        onChange={(e) =>
                          handleSingleCheck(e.target.checked, code.comCode)
                        }
                        checked={
                          checkItems.includes(code.comCode) ? true : false
                        }
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={`customCheckRegister${index}`}
                      ></label>
                    </div>
                  </td>
                  <td>{code.comCode}</td>
                  <td>{code.comCodeName}</td>
                  <td>{code.description}</td>
                  <td>
                    <Toggle
                      onChange={(e) =>
                        roleCodeContext.actions.updateUseFlg(code)
                      }
                      useFlg={code.useFlg}
                    />
                  </td>
                  <td>{code.createUserName}</td>
                  <td>
                    {dateTimeFormat(code.createDateTime, CONSTANTS.FULLDATE)}
                  </td>
                  <td>{code.modifyUserName}</td>
                  <td>
                    {dateTimeFormat(code.modifyDateTime, CONSTANTS.FULLDATE)}
                  </td>
                  <td>
                    <div className="bc__button__base">
                      <Button color="danger" outline type="button">
                        <Link
                          to={{
                            pathname: "/admin/common/detail",
                            state: {
                              comCode: code.comCode,
                            },
                          }}
                        >
                          상세보기
                        </Link>
                      </Button>
                      <Button
                        color="danger"
                        outline
                        type="button"
                        onClick={() => {
                          setSelectedCode(code);
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
            })}
        </tbody>
      </Table>

      <CardFooter className="bc__pagination">
        <nav aria-label="...">
         <Pagination 
          pageInfo={pageInfo}
          setPage={roleCodeContext.actions.getRoleCodes}
         />
        </nav>
      </CardFooter>
    </>
  );
};
export default Index;

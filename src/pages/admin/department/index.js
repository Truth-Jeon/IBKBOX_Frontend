import React, { useContext, useState, useCallback, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Table, CardHeader, CardFooter, Button } from "reactstrap";
import "assets/styles/template/argon/scss/argon-dashboard-react.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Modal from "components/modal";
import Pagination from "components/pagination";
import DeptContext from "modules/contexts/common/deptContext";
import DeptCUModal from "pages/admin/department/components/DeptCUModal";
import DeptDeleteModal from "pages/admin/department/components/DeptDeleteModal";
import { CONSTANTS, dateTimeFormat } from "modules/utils/Common";

const Index = (props) => {
  const deptContext = useContext(DeptContext);
  const [pageInfo, setPageInfo] = useState({});

  const [selectedDept, setselectedDept] = useState({});
  const [newDept, setNewDept] = useState({
    comCode: "",
    description: "",
    comCodeName: "",
    useFlg: true,
  });
  const [show, setShow] = useState(false);
  const [modalFormat, setModaFormat] = useState("");
  const [checkItems, setCheckItems] = useState([]);

  const handleClose = useCallback(() => setShow(false), []);

  //체크 리스트 관리
  const handleSingleCheck = (checked, deptCode) => {
    if (checked) {
      setCheckItems([...checkItems, deptCode]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== deptCode));
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      const deptArray = [];
      deptContext.state.deptCode.list.forEach((el) =>
        deptArray.push(el.deptCode)
      );
      setCheckItems(deptArray);
    } else {
      setCheckItems([]);
    }
  };

  const updateDept = useCallback(() => {
    deptContext.actions.updateDept(selectedDept, pageInfo);
    setShow(false);
  }, [selectedDept]);

  const createDept = useCallback(() => {
    deptContext.actions.createDept(newDept, pageInfo);
    setNewDept({
      comCode: "",
      description: "",
      comCodeName: "",
      useFlg: true,
    });
    setShow(false);
  }, [newDept]);

  const deleteWorkGroup = useCallback(() => {
    deptContext.actions.deleteDept(checkItems, pageInfo);
    setShow(false);
  }, [checkItems]);

  useEffect(() => {
    deptContext.actions.getDeptList();
  }, []);

  useEffect(() => {
    setPageInfo({
      number: deptContext.state.deptCode.pageNum,
      first: deptContext.state.deptCode.isFirstPage,
      last: deptContext.state.deptCode.isLastPage,
      totalPages: deptContext.state.deptCode.pages,
    });
  }, [deptContext]);

  const modalComponent = {
    CREATE: (
      <Modal
        isOpen={show}
        toggle={handleClose}
        headerTitle={"신규 공통 코드 생성"}
        onClickClose={handleClose}
        onClickSave={createDept}
        saveBtnInable
        closeBtnInable
      >
        <DeptCUModal deptCode={newDept} setDeptCode={setNewDept} />
      </Modal>
    ),
    UPDATE: (
      <Modal
        isOpen={show}
        toggle={handleClose}
        headerTitle={"부서 코드 수정"}
        onClickClose={handleClose}
        onClickSave={updateDept}
        saveBtnInable
        closeBtnInable
      >
        <DeptCUModal deptCode={selectedDept} setDeptCode={setselectedDept} />
      </Modal>
    ),
    DELETE: (
      <Modal
        isOpen={show}
        toggle={handleClose}
        headerTitle={"부서 코드 삭제"}
        onClickClose={handleClose}
        onClickSave={deleteWorkGroup}
        closeBtnInable
        saveBtnInable
      >
        <DeptDeleteModal deleteList={checkItems} />
      </Modal>
    ),
  };

  return (
    <>
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <Col sm="6">
            <div className="col">
              <h3 className="mb-0">부서 코드 관리</h3>
            </div>
          </Col>
          <Col sm="6">
            <div className="col text-right">
              <Button
                color="danger"
                type="button"
                outline
                onClick={() => {
                  setModaFormat("CREATE");
                  setShow(true);
                }}
              >
                부서 코드추가
              </Button>
              <Button
                color="danger"
                type="button"
                outline
                onClick={() => {
                  setModaFormat("DELETE");
                  checkItems.length > 0
                    ? setShow(true)
                    : alert("삭제할 코드를 선택하세요");
                }}
              >
                선택삭제
              </Button>
            </div>
          </Col>
        </Row>
      </CardHeader>
      {modalFormat && modalComponent[modalFormat]}

      <Table className="bc__table" responsive>
        <thead>
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
            <th>부서 코드</th>
            <th>부서 코드명</th>
            <th>부서 코드 레벨</th>
            <th>상위부서 코드</th>
            <th>생성자</th>
            <th>생성일자</th>
            <th>수정자</th>
            <th>수정일자</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {deptContext.state.deptCode.list &&
            deptContext.state.deptCode.list.map((deptCode, index) => {
              return (
                <tr>
                  <td>
                    <div className="custom-control custom-control-alternative custom-checkbox bc__checkbox">
                      <input
                        className="custom-control-input"
                        id={`customCheckRegister${index}`}
                        type="checkbox"
                        onChange={(e) =>
                          handleSingleCheck(e.target.checked, deptCode.deptCode)
                        }
                        checked={
                          checkItems.includes(deptCode.deptCode) ? true : false
                        }
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={`customCheckRegister${index}`}
                      ></label>
                    </div>
                  </td>
                  <td>{deptCode.deptCode}</td>
                  <td>{deptCode.deptName}</td>
                  <td>{deptCode.deptLevel}</td>
                  <td>{deptCode.parentDeptCode}</td>
                  <td>{deptCode.createUserName}</td>
                  <td>
                    {dateTimeFormat(
                      deptCode.createDateTime,
                      CONSTANTS.FULLDATE
                    )}
                  </td>
                  <td>{deptCode.modifyUserName}</td>
                  <td>
                    {dateTimeFormat(
                      deptCode.modifyDateTime,
                      CONSTANTS.FULLDATE
                    )}
                  </td>
                  <td>
                    <div className="bc__button__base">
                      <Button
                        color="danger"
                        outline
                        type="button"
                        onClick={() => {
                          setselectedDept(deptCode);
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
        <Pagination
          pageInfo={pageInfo}
          setPage={deptContext.actions.getDeptList}
        />
      </CardFooter>
    </>
  );
};
export default Index;

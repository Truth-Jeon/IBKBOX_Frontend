import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";

import Modal from "components/modal";
import { Button, Row, Col, InputGroup, Form } from "react-bootstrap";
import {
  InputGroupAddon,
  InputGroupText,
  Input,
  Label,
  FormGroup,
  Table,
  CardFooter,
} from "reactstrap";

import { RoleCodeContext } from "modules/contexts/common/roleCodeContext";
import ComCodeItemCUModal from "pages/admin/common/components/ComCodeItemCUModal";
import Pagination from "components/pagination";
import ComCodeDeleteModal from "./components/ComCodeDeleteModal";

const CommonDetail = (props) => {
  const [selectedCodeItem, setSelectedCodeItem] = useState({
    comCode: props.location.state.comCode,
    description: "",
    itemCode: "",
    itemName: "",
    refValue1: "",
    refValue2: "",
    refValue3: "",
    sortNum: 0,
    useFlg: true,
    selectedIndex: 0,
  });
  const [newCodeItem, setNewCodeItem] = useState({
    comCode: props.location.state.comCode,
    description: "",
    itemCode: "",
    itemName: "",
    refValue1: "",
    refValue2: "",
    refValue3: "",
    sortNum: 0,
    useFlg: true,
  });
  const [show, setShow] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const [modalFormat, setModaFormat] = useState("");
  const [checkItems, setCheckItems] = useState([]);
  const handleClose = useCallback(() => setShow(false), []);
  const roleCodeContext = useContext(RoleCodeContext);

  //생성 버튼 이벤트
  const createCodeItem = () => {
    roleCodeContext.actions.createCodeItem(newCodeItem, pageInfo);
    setShow(false);
  };

  //삭제 버튼 이벤트
  const deleteCodeItem = () => {
    roleCodeContext.actions.deleteCodeItem(
      props.location.state.comCode,
      checkItems,
      pageInfo
    );
    setShow(false);
  };

  //단일 선택
  const handleSingleCheck = (checked, itemCode) => {
    if (checked) {
      setCheckItems([...checkItems, itemCode]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== itemCode));
    }
  };

  // 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      const codeItemArray = [];
      roleCodeContext.state.roleCodeItems.list.forEach((el) =>
        codeItemArray.push(el.itemCode)
      );
      setCheckItems(codeItemArray);
    } else {
      setCheckItems([]);
    }
  };

  const getCodeItem = (pageInfo) => {
    roleCodeContext.actions.getRoleCodeItem(
      props.location.state.comCode,
      pageInfo
    );
  };

  useEffect(() => {
    roleCodeContext.actions.getRoleCodeItem(
      props.location.state.comCode,
      pageInfo
    );
  }, []);

  useEffect(() => {
    setPageInfo({
      number: roleCodeContext.state.roleCodeItems.pageNum,
      first: roleCodeContext.state.roleCodeItems.isFirstPage,
      last: roleCodeContext.state.roleCodeItems.isLastPage,
      totalPages: roleCodeContext.state.roleCodeItems.pages,
    });
  }, [roleCodeContext]);

  const modalComponent = {
    CREATE: (
      <Modal
        isOpen={show}
        toggle={handleClose}
        headerTitle={"신규 공통 코드 생성"}
        onClickClose={handleClose}
        onClickSave={createCodeItem}
        saveBtnInable
        closeBtnInable
      >
        <ComCodeItemCUModal
          codeItem={newCodeItem}
          setCodeItem={setNewCodeItem}
        />
      </Modal>
    ),
    UPDATE: (
      <Modal
        isOpen={show}
        toggle={handleClose}
        headerTitle={"공통 코드 수정"}
        onClickClose={handleClose}
        onClickSave={handleClose}
        saveBtnInable
        closeBtnInable
      >
        <ComCodeItemCUModal
          code={selectedCodeItem}
          setCode={setSelectedCodeItem}
        />
      </Modal>
    ),
    DELETE: (
      <Modal
        isOpen={show}
        toggle={handleClose}
        headerTitle={"공통 코드 삭제"}
        onClickClose={handleClose}
        onClickSave={deleteCodeItem}
        saveBtnInable
        closeBtnInable
      >
        <ComCodeDeleteModal deleteList={checkItems} />
      </Modal>
    ),
  };

  useLayoutEffect(() => {
    if (localStorage.getItem("jwt") !== null) {
      roleCodeContext.actions.getRoleCodeItem(props.location.state.comCode);
    }
  }, []);

  return (
    <div className="full__container">
      <Row>
        <Col lg="6">
          {modalFormat && modalComponent[modalFormat]}
          <Table hover>
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
                <th>아이템코드</th>
                <th>아이템명</th>
                <th>사용여부</th>
              </tr>
            </thead>
            <tbody>
              {roleCodeContext.state.roleCodeItems.list &&
                roleCodeContext.state.roleCodeItems.list.map((ele, index) => {
                  return (
                    <tr
                      onClick={() => {
                        setSelectedCodeItem({ ...ele });
                      }}
                    >
                      <td>
                        <div className="custom-control custom-control-alternative custom-checkbox bc__checkbox">
                          <input
                            className="custom-control-input"
                            id={`customCheckRegister${index}`}
                            type="checkbox"
                            onChange={(e) =>
                              handleSingleCheck(e.target.checked, ele.itemCode)
                            }
                            checked={
                              checkItems.includes(ele.itemCode) ? true : false
                            }
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={`customCheckRegister${index}`}
                          ></label>
                        </div>
                      </td>
                      <td>{ele.itemCode}</td>
                      <td>{ele.itemName}</td>
                      <td>{ele.useFlg ? "Y" : "N"}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <CardFooter className="bc__pagination">
            <nav aria-label="...">
              <Pagination pageInfo={pageInfo} setPage={getCodeItem} />
            </nav>
          </CardFooter>
          {modalFormat && modalComponent[modalFormat]}
          <Button
            className="btn-outline-danger"
            onClick={() => {
              setShow(true);
              setModaFormat("CREATE");
            }}
          >
            신규
          </Button>

          <Button
            className="btn-outline-danger"
            onClick={() => {
              setModaFormat("DELETE");
              setShow(true);
              setSelectedCodeItem({
                comCode: selectedCodeItem.comCode,
                description: "",
                itemCode: "",
                itemName: "",
                refValue1: "",
                refValue2: "",
                refValue3: "",
                sortNum: 0,
                useFlg: true,
              });
            }}
          >
            삭제
          </Button>
        </Col>
        <Col lg="6">
          <Row>
            <Col>
              <Form.Group controlId="formid" className="form__mt">
                <Form.Label>아이템코드</Form.Label>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Enter Item Code"
                    type="text"
                    value={selectedCodeItem.itemCode}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formid">
                <Form.Label>아이템명</Form.Label>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="0"
                    type="text"
                    value={selectedCodeItem.itemName}
                    placeholder="Enter Item Name"
                    onChange={(e) => {
                      setSelectedCodeItem({
                        ...selectedCodeItem,
                        itemName: e.target.value,
                      });
                    }}
                  />
                </InputGroup>
              </Form.Group>

              <FormGroup className="mb-3">
                <Form.Label>사용여부</Form.Label>
                <FormGroup check>
                  <Row>
                    <Col>
                      <Label check>
                        <Input
                          type="radio"
                          name="radio1"
                          checked={selectedCodeItem.useFlg === true}
                          onChange={(e) =>
                            setSelectedCodeItem({
                              ...selectedCodeItem,
                              useFlg: true,
                            })
                          }
                        />
                        사용
                      </Label>
                    </Col>
                    <Col>
                      <Label check>
                        <Input
                          type="radio"
                          name="radio2"
                          checked={selectedCodeItem.useFlg === false}
                          onChange={(e) =>
                            setSelectedCodeItem({
                              ...selectedCodeItem,
                              useFlg: false,
                            })
                          }
                        />
                        비사용
                      </Label>
                    </Col>
                  </Row>
                </FormGroup>
              </FormGroup>

              <Form.Group controlId="formid">
                <Form.Label>설명</Form.Label>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="textarea"
                    placeholder="Enter Code Description"
                    value={selectedCodeItem.description}
                    onChange={(e) => {
                      setSelectedCodeItem({
                        ...selectedCodeItem,
                        description: e.target.value,
                      });
                    }}
                    rows="4"
                  />
                </InputGroup>
              </Form.Group>
              <Button
                className="btn-outline-danger"
                onClick={() => {
                  if (selectedCodeItem.itemName) {
                    roleCodeContext.actions.updateCodeItem(selectedCodeItem);
                    setSelectedCodeItem({
                      comCode: selectedCodeItem.comCode,
                      description: "",
                      itemCode: "",
                      itemName: "",
                      refValue1: "",
                      refValue2: "",
                      refValue3: "",
                      sortNum: 0,
                      useFlg: true,
                    });
                  } else alert("수정할 아이템을 선택하세요");
                }}
              >
                저장
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CommonDetail;

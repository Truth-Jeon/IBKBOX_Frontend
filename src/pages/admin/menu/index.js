import React, { useContext, useState } from "react";
import TreeMenu from "react-simple-tree-menu";
import {
  Button,
  Modal,
  InputGroup,
  FormControl,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import { InputGroupAddon, InputGroupText, Input, CardHeader } from "reactstrap";

import MenuContext from "modules/contexts/common/menuContext";
import {
  ListWrapper,
  ListItemWrapper,
  DetailWrapper,
  DetailDiv,
} from "components/tree/Node";

const Index = (props) => {
  const [selectedMenu, setSelectedMenu] = useState({
    menuId: "",
    menuLevel: 0,
    label: "",
    menuUrl: "",
    parentMenuId: "",
    roleCode: [],
    useFlg: true,
    sortNum: 0,
    openNodes: [],
  });
  const [menuName, setMenuName] = useState("신규 최상위 메뉴");
  const menuContext = useContext(MenuContext);
  const [show, setShow] = useState(false);

  const topLevelMenuCreate = () => {
    menuContext.actions.createMenu({
      menuId: "",
      menuLevel: 0,
      label: menuName,
      menuUrl: "",
      parentMenuId: "",
      roleCode: [],
      sortNum: menuContext.state.menuList.length + 1,
      useFlg: true,
    });
    menuContext.actions.getMenuList();
    setShow(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="full__container">
      <Row>
        <Col lg="6">
          <TreeMenu
            cacheSearch
            data={menuContext.state.menuList}
            debounceTime={125}
            disableKeyboard={false}
            hasSearch
            onClickItem={function noRefCheck(e) {
              setSelectedMenu({
                menuId: e.menuId,
                menuLevel: e.menuLevel,
                label: e.label,
                menuUrl: e.menuUrl,
                parentMenuId: e.parentMenuId,
                roleCode: e.roleCode,
                useFlg: true,
                sortNum: e.sortNum,
                openNodes: e.openNodes,
              });
            }}
            resetOpenNodesOnDataUpdate={false}
          >
            {({ items }) => (
              <ListWrapper>
                {items.map(
                  ({
                    reset,
                    level = 0,
                    hasNodes,
                    isOpen,
                    searchTerm,
                    openNodes,
                    toggleNode,
                    matchSearch,
                    focused,
                    style,
                    ...props
                  }) => (
                    <ListItemWrapper level={level} focused={focused} {...props}>
                      <DetailWrapper>
                        <div>
                          {hasNodes && (
                            <div
                              onClick={(e) => {
                                hasNodes && toggleNode && toggleNode();
                                e.stopPropagation();
                              }}
                            >
                              <span style={{ marginRight: 8 }}>
                                {isOpen ? "-" : "+"}
                              </span>
                            </div>
                          )}
                        </div>
                        <DetailDiv hasNodes={!hasNodes}>
                          <span>{props.label}</span>
                          <div>
                            {level < 2 ? (
                              <Button
                                onClick={() => {
                                  menuContext.actions.createMenu({
                                    menuId: "",
                                    menuLevel: props.menuLevel + 1,
                                    label: "신규 하위 메뉴",
                                    menuUrl: "",
                                    parentMenuId: props.menuId,
                                    roleCode: [],
                                    sortNum: 999,
                                    useFlg: true,
                                  });
                                }}
                                disabled={props.menuLevel < 2 ? false : true}
                                variant="danger"
                              >
                                추가
                              </Button>
                            ) : null}
                            <Button
                              onClick={() => {
                                hasNodes
                                  ? alert(
                                      "하위 메뉴가 있는 메뉴는 삭제할 수 없습니다."
                                    )
                                  : menuContext.actions.deleteMenu({
                                      menuId: props.menuId,
                                    });
                              }}
                              variant="danger"
                            >
                              삭제
                            </Button>
                          </div>
                        </DetailDiv>
                      </DetailWrapper>
                    </ListItemWrapper>
                  )
                )}
              </ListWrapper>
            )}
          </TreeMenu>
          <Button onClick={handleShow}>신규</Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>신규 메뉴 생성</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Label htmlFor="basic-url">
                생성할 메뉴 명을 입력하세요.
              </Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="신규 메뉴 명을 입력하세요"
                  aria-label="menuId"
                  aria-describedby="basic-addon1"
                  value={menuName}
                  onChange={(e) => setMenuName(e.target.value)}
                />
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={topLevelMenuCreate}>
                Save Changes
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
        <Col lg="6">
            <div className="menu__info">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col sm="6">
                    <div className="col">
                      <h3 className="mb-0 table__title">Menu Infomation</h3>
                    </div>
                  </Col>
                </Row>
              </CardHeader>

              <Row>
                <Col>
                  <Form>
                    <Form.Group controlId="formid" className="form__mt">
                      <Form.Label>Menu Name</Form.Label>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Enter Menu title"
                          type="text"
                          value={selectedMenu.label}
                          onChange={(e) => {
                            setSelectedMenu({
                              ...selectedMenu,
                              label: e.target.value,
                            });
                          }}
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formid">
                      <Form.Label>Memu Level</Form.Label>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="0"
                          type="text"
                          value={selectedMenu.menuLevel}
                          onChange={(e) => {
                            setSelectedMenu({
                              ...selectedMenu,
                              menuLevel: e.target.value,
                            });
                          }}
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formid">
                      <Form.Label>Memu Url</Form.Label>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Enter Menu Url"
                          type="text"
                          value={selectedMenu.menuUrl}
                          onChange={(e) => {
                            setSelectedMenu({
                              ...selectedMenu,
                              menuUrl: e.target.value,
                            });
                          }}
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formid">
                      <Form.Label>Sort Level</Form.Label>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="0"
                          type="text"
                          value={selectedMenu.sortNum}
                          onChange={(e) => {
                            setSelectedMenu({
                              ...selectedMenu,
                              sortNum: e.target.value,
                            });
                          }}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Button
                      type="button"
                      className="btn-outline-danger"
                      onClick={() => {
                        selectedMenu.menuId
                          ? menuContext.actions.updateMenu(selectedMenu)
                          : alert("수정할 메뉴를 선택하세요");
                        setSelectedMenu({
                          menuId: "",
                          label: "",
                          roleCode: "",
                          sortNum: 0,
                          parentMenuId: "",
                          menuUrl: "",
                          menuLevel: 0,
                          openNodes: [],
                        });
                        console.log(selectedMenu);
                      }}
                    >
                      저장
                    </Button>
                    <Button
                      type="button"
                      className="btn-outline-danger"
                      onClick={() => {
                        if (selectedMenu.menuId) {
                          if (!selectedMenu.openNodes)
                            menuContext.actions.deleteMenu(selectedMenu);
                          else
                            alert(
                              "하위 메뉴가 있는 메뉴는 삭제할 수 없습니다."
                            );
                        } else alert("삭제할 메뉴를 선택하세요");
                        setSelectedMenu({
                          menuId: "",
                          label: "",
                          roleCode: "",
                          sortNum: 0,
                          parentMenuId: "",
                          menuUrl: "",
                          menuLevel: 0,
                        });
                      }}
                    >
                      삭제
                    </Button>
                  </Form>
                </Col>
              </Row>
            </div>
          </Col>
      </Row>
    </div>
  );
};
export default Index;

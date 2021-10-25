import React,{ useState, useContext, useEffect } from "react";
import {Container, Row, Col, Form} from 'react-bootstrap';
import ReactDatetime from "react-datetime";

import Toggle from "components/toggle";
import {
    Modal,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Table,
    Alert,
    Badge,
    CardHeader,
    Button,
    Pagination,
    CardFooter,
    PaginationItem,
    PaginationLink
  } from "reactstrap";

const Index = (props) => {
    const [show, setShow] = useState(false);

    return (
        <>
        <Container>
            <CardHeader className="border-0">
                <Row className="align-items-center">
                    <Col sm="6">
                  <div className="col">
                    <h3 className="mb-0 table__title">로그 관리</h3>
                  </div>
                  </Col>
                  <Col sm="6">
                  <div className="col text-right bc__button__base">
                    <Button
                      color="danger"
                      onClick={() => setShow(!show)}
                      outline
                      type="button"
                    >
                      역할추가
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => setShow(!show)}
                      outline
                      type="button"
                    >
                      선택삭제
                    </Button>
                  </div>
                  </Col>
                </Row>
              </CardHeader>

            <Table className="align-items-center bc__table" responsive>
                <thead className="thead-light">
                    <tr>
                        <th style={{width:"30px"}}></th>
                        <th scope="col">역할코드</th>
                        <th scope="col">역할명</th>
                        <th scope="col">생성자</th>
                        <th scope="col">생성일</th>
                        <th scope="col">수정자</th>
                        <th scope="col">수정일</th>
                        <th scope="col">옵션</th>
                        <th scope="col" />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className="custom-control custom-control-alternative custom-checkbox bc__checkbox">
                                <input className="custom-control-input" id="customCheckRegister1" type="checkbox"/>
                                <label className="custom-control-label" htmlFor="customCheckRegister1"></label>
                            </div>
                        </td>
                        <td>
                            ADMIN
                        </td>
                        <td>
                            관리자
                        </td>
                        <td>
                            붐코
                        </td>
                        <td>
                            2021-07-22
                        </td>
                        <td>
                            붐코
                        </td>
                        <td>
                            2021-07-22
                        </td>
                        <td>
                          <Toggle />
                        </td>
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
                                <DropdownItem
                                onClick={() => setShow(!show)}
                                >
                                수정
                                </DropdownItem>
                                <DropdownItem
                                onClick={() => setShow(!show)}
                                >
                                사용자
                                </DropdownItem>
                                <DropdownItem
                                onClick={() => setShow(!show)}
                                >
                                역할그룹
                                </DropdownItem>
                            </DropdownMenu>
                            </UncontrolledDropdown>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="custom-control custom-control-alternative custom-checkbox bc__checkbox">
                                <input className="custom-control-input" id="customCheckRegister2" type="checkbox"/>
                                <label className="custom-control-label" htmlFor="customCheckRegister2"></label>
                            </div>
                        </td>
                        <td>
                            ADMIN
                        </td>
                        <td>
                            관리자
                        </td>
                        <td>
                            붐코
                        </td>
                        <td>
                            2021-07-22
                        </td>
                        <td>
                            붐코
                        </td>
                        <td>
                            2021-07-22
                        </td>
                        <td>
                          <Toggle />
                        </td>
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
                                <DropdownItem
                                onClick={() => setShow(!show)}
                                >
                                수정
                                </DropdownItem>
                                <DropdownItem
                                onClick={() => setShow(!show)}
                                >
                                사용자
                                </DropdownItem>
                                <DropdownItem
                                onClick={() => setShow(!show)}
                                >
                                역할그룹
                                </DropdownItem>
                            </DropdownMenu>
                            </UncontrolledDropdown>
                        </td>
                    </tr>
                </tbody>
            </Table>

            <CardFooter className="py-4 bc__pagination">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-center mb-0"
                    listClassName="justify-content-center mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>





            {/* Modal */}
            <Modal
            className="modal-dialog-centered"
            isOpen={show}
            toggle={() => setShow(!show)}
            >
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                역할 추가 & 삭제
                </h5>
                <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => setShow(!show)}
                >
                <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="modal-body">


                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                          <i className="ni ni-email-83" />
                      </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Email" type="email" />
                  </InputGroup>
                </FormGroup>

                <FormGroup controlId="exampleForm.ControlSelect1">
                  <Form.Label>Example select</Form.Label>
                  <Form.Control as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </FormGroup>


                <FormGroup>
                <Input
                  id="exampleFormControlTextarea1"
                  placeholder="Write a large text here ..."
                  rows="3"
                  type="textarea"
                />
                </FormGroup>

                <FormGroup>
                  <div className="custom-control custom-checkbox mb-3">
                    <input
                      className="custom-control-input"
                      defaultChecked
                      id="customCheck1"
                      type="checkbox"
                    />
                    <label className="custom-control-label" htmlFor="customCheck1">
                      체크박스
                    </label>
                  </div>
                </FormGroup>

                <FormGroup>
                  <div className="custom-control custom-radio mb-3">
                    <input
                      className="custom-control-input"
                      id="customRadio5"
                      name="custom-radio-2"
                      type="radio"
                    />
                    <label className="custom-control-label" htmlFor="customRadio5">
                      Unchecked
                    </label>
                  </div>
                </FormGroup>

                <FormGroup>
                  <Button color="default" type="button">Default</Button>
                  <Button color="primary" type="button">Primary</Button>
                  <Button color="secondary" type="button">Secondary</Button>
                  <Button color="info" type="button">Info</Button>
                  <Button color="success" type="button">Success</Button>
                  <Button color="danger" type="button">Danger</Button>
                  <Button color="warning" type="button">Warning</Button>
                </FormGroup>

                <FormGroup>
                  <Button color="default" outline type="button">Default</Button>
                  <Button color="primary" outline type="button">Primary</Button>
                  <Button color="secondary" outline type="button">Secondary</Button>
                  <Button color="info" outline type="button">Info</Button>
                  <Button color="success" outline type="button">Success</Button>
                  <Button color="danger" outline type="button">Danger</Button>
                  <Button color="warning" outline type="button">Warning</Button>
                </FormGroup>

                <FormGroup>
                  <Badge
                    className="badge-default"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Default
                  </Badge>
                  <Badge
                    color="primary"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Primary
                  </Badge>
                  <Badge
                    color="secondary"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Secondary
                  </Badge>
                  <Badge color="info" href="#pablo" onClick={e => e.preventDefault()}>
                    Info
                  </Badge>
                  <Badge
                    color="success"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Success
                  </Badge>
                  <Badge color="danger" href="#pablo" onClick={e => e.preventDefault()}>
                    Danger
                  </Badge>
                  <Badge
                    color="warning"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Warning
                  </Badge>
                </FormGroup>

                <FormGroup>
                  <Alert className="alert-default">
                    <strong>Default!</strong> This is a default alert—check it out!
                  </Alert>
                  <Alert color="primary">
                    <strong>Primary!</strong> This is a primary alert—check it out!
                  </Alert>
                  <Alert color="secondary">
                    <strong>Secondary!</strong> This is a secondary alert—check it out!
                  </Alert>
                  <Alert color="info">
                    <strong>Info!</strong> This is a info alert—check it out!
                  </Alert>
                  <Alert color="success">
                    <strong>Success!</strong> This is a success alert—check it out!
                  </Alert>
                  <Alert color="danger">
                    <strong>Danger!</strong> This is a danger alert—check it out!
                  </Alert>
                  <Alert color="warning">
                    <strong>Warning!</strong> This is a warning alert—check it out!
                  </Alert>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-calendar-grid-58" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <ReactDatetime
                      inputProps={{
                        placeholder: "날짜를 선택해주세요."
                      }}
                      timeFormat={false}
                      onChange={e => console.log(e.year(), e.month(), e.date())}
                    />
                  </InputGroup>
                </FormGroup>

            </div>
            <div className="modal-footer">
                <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={() => setShow(!show)}
                >
                닫기
                </Button>
                <Button color="primary" type="button">
                반영하기
                </Button>
            </div>
            </Modal>





        </Container>
        </>
    )
};
export default Index;
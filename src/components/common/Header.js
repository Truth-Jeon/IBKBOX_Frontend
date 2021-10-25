import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, DropdownButton, Dropdown, Button, Modal, Navbar, Nav, NavDropdown, Form, FormControl, ButtonGroup } from 'react-bootstrap';
import { UserContext } from 'modules/contexts/common/userContext';
import { BsPeopleCircle, BsFillGrid3X3GapFill } from "react-icons/bs";

const Header = () => {
    const userContext = useContext(UserContext);
    const Logout = () => {
        userContext.actions.logout();
    }

    return (
        <>
            <header className="header">
                <Container>
                    <Navbar expand="lg" className="ml-auto">
                        <Navbar.Brand>
                            <Link to={"/"}>
                                <img src="/images/ibk_logo.png" className="header-logo" />
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="align-content-start mr-auto">
                                <NavDropdown title="예제메뉴1" id="basic-nav-dropdown1">
                                    {/* <NavDropdown.Item><Link to={"../../pages/news/news.js"}>뉴스</Link></NavDropdown.Item> */}
                                    <NavDropdown.Item>메뉴1-1</NavDropdown.Item>
                                    <NavDropdown.Item>메뉴1-2</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="예제메뉴2" id="basic-nav-dropdown2">
                                    <NavDropdown.Item>메뉴2-1</NavDropdown.Item>
                                    <NavDropdown.Item>메뉴2-2</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="예제메뉴3" id="basic-nav-dropdown2">
                                    <NavDropdown.Item>메뉴3-1</NavDropdown.Item>
                                    <NavDropdown.Item>메뉴3-2</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <ButtonGroup className="align-content-start ml-auto bc__header__btn">
                                {
                                    userContext.state.userInfo.loggedIn ?
                                        <>
                                            {
                                                userContext.state.userInfo.userType ?
                                                    <>
                                                        <DropdownButton as={ButtonGroup} title="관리자메뉴" id="bg-nested-dropdown">
                                                            <Dropdown.Item eventKey="1"><Link to={"/admin"}>대시보드</Link></Dropdown.Item>
                                                            <Dropdown.Item eventKey="2"><Link to={"/admin/org"}>조직도</Link></Dropdown.Item>
                                                            <Dropdown.Item eventKey="3"><Link to={"/admin/weather"}>날씨</Link></Dropdown.Item>
                                                            <Dropdown.Item eventKey="4"><Link to={"/admin/users"}>사용자 관리</Link></Dropdown.Item>
                                                            <Dropdown.Item eventKey="5"><Link to={"/admin/menu"}>메뉴 관리</Link></Dropdown.Item>
                                                            <Dropdown.Item eventKey="6"><Link to={"/admin/role"}>역할 관리</Link></Dropdown.Item>
                                                            <Dropdown.Item eventKey="7"><Link to={"/admin/workgroup"}>워크그룹 관리</Link></Dropdown.Item>
                                                            <Dropdown.Item eventKey="8"><Link to={"/admin/common"}>공통 관리</Link></Dropdown.Item>
                                                            <Dropdown.Item eventKey="9"><Link to={"/admin/log"}>로그 관리</Link></Dropdown.Item>
                                                            <Dropdown.Item eventKey="10"><Link to={"/admin/department"}>부서 관리</Link></Dropdown.Item>
                                                            <Dropdown.Item eventKey="11"><Link to={"/admin/files"}>파일</Link></Dropdown.Item>
                                                            <Dropdown.Item eventKey="12"><Link to={"/admin/news"}>뉴스</Link></Dropdown.Item>
                                                        </DropdownButton>
                                                    </>
                                                    :
                                                    <></>
                                            }
                                            <Link to={"/member/mypage"} className="bc__header__mypage">
                                                <Button>{userContext.state.userInfo.userData.id}</Button>
                                            </Link>
                                            <Button onClick={Logout}>로그아웃</Button>
                                        </>
                                        :
                                        <Link to={"/login"}>
                                            <Button variant="danger">로그인</Button>
                                        </Link>
                                }
                            </ButtonGroup>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
            </header>
        </>
    )
};

export default Header;
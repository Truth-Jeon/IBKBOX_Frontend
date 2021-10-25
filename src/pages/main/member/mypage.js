import React,{ useContext, useState, useEffect, useRef } from 'react';
import {Container, Row, Col, Form, Button, Alert, InputGroup, FormControl} from 'react-bootstrap';
import HttpAction from 'modules/utils/HttpAction';
import { UserContext } from 'modules/contexts/common/userContext';
import { DefaultAlert } from 'components/common/MessageAlert';
import { InputGroupAddon, InputGroupText, Input, CardHeader } from 'reactstrap';
import { Link } from "react-router-dom";

//에디터
import 'assets/styles/utils/toastui-editor.min.css';
import { Editor } from '@toast-ui/react-editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

//
const Mypage = (props) => {
    const userContext = useContext(UserContext);
    const [ myInfo, setMyInfo ] = useState({});

    //객체관련
    const emailInput = useRef();
    const nameInput = useRef();
    const mobileInput = useRef();
    const addrInput = useRef();
    const passwordInput = useRef();

    //모달 호출관련
    const [ alertState, setAlertState ] = useState(false); //모달 노출여부
    const [ alertMessage, setAlertMessage ] = useState(''); //모달 메시지
    const ModalToggle = () => setAlertState(!alertState); //닫기버튼

    //에디터
    const editorRef = useRef();
    const defaultvalue = "<h1><b>기본내용입니다.</b></h1>";
    const handleClickButton = () => {
      alert(editorRef.current.getInstance().getHTML());
      console.log(editorRef.current.getInstance().getHTML());
    };

    const userUpdate = () => {

      //
      if(myInfo.email === "" ){ emailInput.current.focus(); return;}
      if(myInfo.userName === "" ){ nameInput.current.focus(); return;}
      if(myInfo.mobile === "" ){ mobileInput.current.focus(); return;}
      if(myInfo.address === "" ){ addrInput.current.focus(); return;}
      if(myInfo.password === "" ){ passwordInput.current.focus(); return;}

      //
      HttpAction({
        url : `admin/user`,
        method: "put",
        data: myInfo,
        }).then((res)=>{
            if(res.code === 200){
                ModalToggle();
                setAlertMessage('수정이 완료되었습니다.');
            }else{
                setAlertMessage(res.message);
            }
        });
    }

    useEffect(() => {
        HttpAction({
            url : `admin/user`,
            method: "get",
            params: {
                userId : userContext.state.userInfo.userData.id
            },
        }).then((res)=>{
            if(res.code === 200){
                let userdata = res.data;
                userdata.password = ""; //현재구조상 패스워드를 무조건 넣어야하는데, 기존에 암호화된 패스워드를 넣게 되면 계속 패스워드가 생신되는 문제가 있음
                setMyInfo(userdata);
            }else{
                ModalToggle();
                setAlertMessage(res.message);
            }
        })
    }, []);

    return (
       <>
        <Container>
            <CardHeader className="border-0">
                <Row className="align-items-center">
                    <Col sm="6">
                        <div className="col">
                            <h3 className="mb-0 table__title">마이페이지</h3>
                        </div>
                    </Col>
                    <Col sm="6">
                        <Link to={"/member/history"}>파일업로드</Link>
                    </Col>
                </Row>
              </CardHeader>

              <Form.Row className="align-items-center my-3">
                <Col sm={12} md={6}>
                    <Form.Group as={Col}>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-email-83" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input
                            type="text"
                            placeholder="아이디"
                            disabled
                            defaultValue={myInfo.userId}
                            />
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                    <Form.Group as={Col}>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-email-83" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input
                            type="email"
                            placeholder="이메일"
                            defaultValue={myInfo.email}
                            onChange={e => setMyInfo({...myInfo, email: e.target.value})}
                            ref={emailInput}
                            />
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                    <Form.Group as={Col}>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-email-83" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input
                            type="text"
                            placeholder="이름"
                            defaultValue={myInfo.userName}
                            onChange={e => setMyInfo({...myInfo, userName: e.target.value})}
                            ref={nameInput}
                            />
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                    <Form.Group as={Col}>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-email-83" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input
                            type="text"
                            placeholder="휴대폰"
                            defaultValue={myInfo.mobile}
                            onChange={e => setMyInfo({...myInfo, mobile: e.target.value})}
                            ref={mobileInput}
                            />
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                    <Form.Group as={Col}>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-email-83" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input
                            type="text"
                            placeholder="주소"
                            defaultValue={myInfo.address}
                            onChange={e => setMyInfo({...myInfo, address: e.target.value})}
                            ref={addrInput}
                            />
                        </InputGroup>

                    </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                    <Form.Group as={Col}>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-email-83" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input
                            type="password"
                            placeholder="비밀번호"
                            onChange={e => setMyInfo({...myInfo, password: e.target.value})}
                            ref={passwordInput}
                            />
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Form.Row>


            <Form.Row className="align-items-center my-3">
                <Col>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Editor
                            initialValue={defaultvalue}
                            placeholder="내용을 작성해주세요."
                            previewStyle="vertical"
                            height="400px"
                            initialEditType="wysiwyg"
                            plugins={[colorSyntax]}
                            useCommandShortcut={true}
                            ref={editorRef}
                            />
                    </Form.Group>
                </Col>
            </Form.Row>

            <Form.Row className="align-items-center my-3">
                <Col>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Button className="btn-outline-danger" variant="primary" onClick={userUpdate}>저장</Button>
                    </Form.Group>
                </Col>
            </Form.Row>
        </Container>
        </>
    )
};
export default Mypage;
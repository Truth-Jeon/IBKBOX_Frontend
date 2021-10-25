import React,{ useEffect, useState, useRef } from 'react';
import { FileDrop } from 'react-file-drop';
import { Button, Card, Container, Row, Col, Alert } from "react-bootstrap";

/*
    props 예시
    const fconfig = {
      maxsize : 1073741824, // 첨부 용량 제한, 1073741824 = 1GB
      length : 10, //파일 업로드 갯수
      allow : [] //업로드 허용 확장자
    }
*/
const FileUpload = (props) => {

    //기본값 설정
    const max_file_len = props.config.length === undefined ? 5 : props.config.length; //기본 5개
    const max_file_size = props.config.maxsize === undefined ? 52428800 : props.config.maxsize; //기본 50MB
    const max_file_allow = props.config.allow.length === 0 ? ['png', 'jpeg'] : props.config.allow; //기본 확장자

    //UI관련 처리 변수 목록
    let [controlNumber, setControlNumber] = useState(0); //파일 관리번호(삭제시 기준점이 되는 번호)
    const [renderTotal, setRenderTotal] = useState({ //렌더링될 전체 정보값
        len : 0, //파일 갯수
        size : 0 //파일 합계 용량
    });

    const [renderData, setRenderData] = useState([]); //선택된 파일 정보 목록
    const fileInputRef = useRef(null); //클릭하여 파일정보를 받기 위한 useRef

    //안내 모달관련
    const [showModal, setShowModal] = useState({
        show : false,
        message : ""
    });

    //Fn1. 선택된 전체용량 확인
    const getTotalSize = () =>{
        let total_size = 0;
        renderData.map((obj, dex) => {
            total_size+=obj.osize;
        });
        return total_size;
    }

    //Fn2. 용량 단위 변환
    const getfileSize = (x) => {
        var s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
        var e = Math.floor(Math.log(x) / Math.log(1024));

        //-isInfinite 처리
        if(!isFinite(e)){ return 0; }
        return (x / Math.pow(1024, e)).toFixed(2) + " " + s[e];
    };

    //Fn3. 등록된 파일 삭제
    const listDelete = (cnumber) =>{
        setRenderData(renderData.filter(data => data.cnumber !== cnumber));
    }

    //Fn4. 파일정보 처리
    const fileHandler = (files, event) => {

        //
        const filelen = files.length;

        //object->array로 변환
        Object.entries(files).map((item, index) => {

            //chk1. 옵션기준 파일 수 제한 조건 체크
            if(renderData.length >= max_file_len){
                setShowModal({
                    show : true,
                    message : `파일은 최대 ${max_file_len}개입니다.`
                });
                return true;
            }

            //chk1. 옵션기준 파일 용량 제한 체크
            const chksize = item[1].size + getTotalSize();
            if(chksize >= max_file_size){
                setShowModal({
                    show : true,
                    message : `업로드 최대 용량은 ${getfileSize(max_file_size)} 입니다.`
                });
                return true;
            }

            //관리번호 조정
            let nextNumber = controlNumber;
            if(filelen > 1){
                nextNumber = controlNumber;
            }else{
                nextNumber = controlNumber+index;
            }

            const fname = item[1].name; //파일명
            const finfo = {
                cnumber: nextNumber, //관리번호
                name: fname, //파일명
                rsize: getfileSize(item[1].size), //랜더링을 위한 단위변환
                osize: item[1].size, //원본 사이즈 byte
                ext: fname.substring(fname.lastIndexOf('.')+1, fname.length).toLowerCase(), //파일확장자
                object : item[1] //전달받은 file object정보
            };

            //랜더링정보 업데이트
            renderData.push(finfo);
            setRenderData(renderData);

            //관리번호 업데이트
            controlNumber++;
            setControlNumber(controlNumber);

            //용량정보 업데이트
            setRenderTotal({
                len : renderData.length,
                size : getTotalSize()
            })
        });
    };

    //STEP1. 클릭으로 들어오는 경우 핸들러 처리
    const onTargetClick = () => {
        fileInputRef.current.click();
    }
    //STEP2. 이벤트가 발생될때 기존 핸들러와 연동
    const onFileInputChange = (event) => {
        const { files } = event.target;
        fileHandler(files, 'click');
    }

    //삭제가 발생될때 상단 상태변화 다시 렌더링
    useEffect(() => {
        setRenderTotal({
            len : renderData.length,
            size : getTotalSize()
        })

        //부모에게 값 전달
        props.setReturn(renderData);
    },[renderData,controlNumber]);

    return (
        <>
        <div>
            <Card>
                <Card.Header>
                    <Container fluid="md">
                        <Row>
                            <Col className="text-md-left" sm={4}>
                                <b>파일 업로드</b>
                            </Col>
                            <Col className="text-md-right" sm={8}>
                                <small className="ml-auto">파일 제한 <b>{renderTotal.len}/{max_file_len}개</b> , 용량 제한 <b>{getfileSize(renderTotal.size)}/{getfileSize(max_file_size)}</b></small>
                            </Col>
                        </Row>
                    </Container>
                </Card.Header>
                <Card.Body>
                    <FileDrop
                        onTargetClick={onTargetClick}
                        onDrop={(files, event) => fileHandler(files, event)}
                    >
                        <h4 className="file-drop-info">클릭 혹은 파일을 여기로 옮겨주세요.</h4>
                    </FileDrop>
                    <input onChange={onFileInputChange} ref={fileInputRef} type="file" className="file-drop-hidden"/>
                </Card.Body>
                <Card.Footer>

                    {
                        showModal.show
                        ?
                        <Alert variant="danger" onClose={() => setShowModal({show : false})} dismissible>
                            <Alert.Heading>안내 문구</Alert.Heading>
                            <p>{showModal.message}</p>
                        </Alert>
                        :
                        <></>
                    }

                    <Container fluid="md">
                        {
                            renderData.map((data, index) => {
                                return(
                                    <Row className="mt-2" key={index}>
                                        <Col className="text-md-left">
                                            <b>{data.name}</b>{'  '}<small>{data.rsize}</small>
                                        </Col>
                                        <Col className="text-md-right">
                                            <Button variant="primary" size="sm" onClick={()=>listDelete(data.cnumber)}>
                                            삭제
                                            </Button>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    </Container>
                </Card.Footer>
            </Card>
        </div>
        </>
    );
};
export default FileUpload;
import React,{ useContext, useState, useEffect } from 'react';
import HttpAction from 'modules/utils/HttpAction';
import FileUpload from 'components/common/FileUpload';
/*
전체용량제한
파일갯수
파일확장자제한
*/
const Mypage = (props) => {
    const fconfig = {
      maxsize : 1073741824, // 첨부 용량 제한, 1073741824 = 1GB
      length : 10, //파일 업로드 갯수
      allow : [] //업로드 허용 확장자
    }

    //정보받아오기
    const [filedata, setFileData]= useState({});

    //컴포넌트에서 값전달 받기
    const fileReturnData = (data) =>{
      setFileData({data});
    }

    //전송
    const filesumbit = () => {

      const formData = new FormData();
      filedata.data.map((file) => {
        formData.append("file", file.object);
      });

      HttpAction({
        url: "file",
        method: "post",
        fileused: true,
        body: formData
      }).then((data)=>{
        console.log(data);
      })
    };
    return (
      <>
        <div>
          <FileUpload config={fconfig} setReturn={fileReturnData}></FileUpload>
          <button onClick={filesumbit}>전송</button>

          <br></br><br></br><br></br>
          <p>결과 : {JSON.stringify(filedata)}</p>
        </div>
      </>
    );
};
export default Mypage;
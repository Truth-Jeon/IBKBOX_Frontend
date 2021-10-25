import React, { useContext, useState } from 'react';
import HttpAction from 'modules/utils/HttpAction';
import FileUpload from 'components/common/FileUpload';
import Modal from 'components/modal/index.js';
import { FilesContext } from 'modules/contexts/common/filesContext.js';

const CreateFilesModal = ({ setFilesModal }) => {
    const useFilesContext = useContext(FilesContext);
    const { actions } = useFilesContext;

    const fconfig = {
        maxsize: 1073741824, // 첨부 용량 제한, 1073741824 = 1GB
        length: 10, //파일 업로드 갯수
        allow: [] //업로드 허용 확장자
    }

    //정보받아오기
    const [filedata, setFileData] = useState({});

    //컴포넌트에서 값전달 받기
    const fileReturnData = (data) => {
        setFileData({ data });
    }

    //전송
    const filesumbit = () => {

        const formData = new FormData();
        filedata.data.map((file) => {

            actions.saveFiles(file);
            //console.log(filedata);
            //formData.append("file", file.object);
            //console.log(formData);
        });
        //actions.saveFiles(formData);
    };

    return (
        <Modal
            isOpen={true}
            toggle={() => { setFilesModal('OFF') }}
            headerTitle="파일 추가"

            onClickClose={() => { setFilesModal('OFF') }}
            onClickSave={filesumbit}
            saveBtnInable={true}
            closeBtnInable={true}
            saveBtnTitle="전송"

            children={
                <>
                    <div>
                        <FileUpload config={fconfig} setReturn={fileReturnData}></FileUpload>
                        {/* <br></br><br></br><br></br>
                        <p>결과 : {JSON.stringify(filedata)}</p> */}
                    </div>
                </>
            }
        />
    );
}

export default CreateFilesModal;
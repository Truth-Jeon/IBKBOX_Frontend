import React, { useEffect, useState, useRef } from 'react';

import 'assets/styles/reset.css'
import 'assets/styles/login.css'
import 'assets/styles/tooltip.css'
import 'assets/styles/join.css'
import 'assets/styles/selfAuth.css'
import 'assets/styles/terms.css'


const Terms = ({ joinProps }) => {

    // props
    const { setStepKey, joinData, setJoinData, setValidationModal, setAgreementModal } = joinProps;

    // 팝업
    const [agreeAlert, setAgreeAlert] = useState(true);

    // 전체 동의 Ref

    // 약관 리스트

    useEffect(() => {
        // API로 약관 내용 가져올 때 사용
    }, []);

    // 위에서 리스트를 뽑고 우선 임시로 세팅함
    const [agreementList, setAgreementList] = useState([
        {
            title: 'BOX 이용약관 동의',
            contents: '임시 약관내용', necessary: true, checked: joinData.termsNecessaryChecked,
        },
        {
            title: '개인(신용)정보, 고유식별정보 수집ㆍ이용 동의',
            contents: '임시 약관내용', necessary: true, checked: joinData.termsNecessaryChecked,
        },
        {
            title: '개인정보 제3자 제공 동의(상품서비스 안내 등)',
            contents: '임시 약관내용', necessary: false, checked: joinData.selectableTermPersonalInform,
        },
        {
            title: '개인(신용)정보 수집ㆍ이용 동의(상품서비스 안내 등)',
            contents: '임시 약관내용', necessary: false, checked: joinData.selectableTermCreditInform,
        },
        {
            title: '상품서비스 안내 수신 동의',
            contents: '임시 약관내용', necessary: false, checked: joinData.selectableTermProductService,
        },
    ]);

    const confirm = () => {

        // 필수 항목에서 동의가 안되는 부분이 있는 경우
        if (agreementList.some(e => e.necessary === true && e.checked === false)) {
            // 약관 체크 팝업
            return;
        }

        setJoinData({
            ...joinData,
            termsNecessaryChecked: true,
            selectableTermPersonalInform: agreementList[2].checked,
            selectableTermCreditInform: agreementList[3].checked,
            selectableTermProductService: agreementList[4].checked
        });
        setStepKey('ACCOUNT');
    }

    return (
        <>
            <p className="join__title">약관인증</p>
            <div className='join__same__box'>
                <div className="title">
                    <input type="checkbox" id="box1"
                        checked={
                            // 선택이 안 된 항목이 있는지 확인(있으면 true가 반환되므로) 
                            !agreementList.some(e => e.checked === false)
                        }
                        onChange={event => {
                            let temp = [...agreementList];
                            temp.forEach(e => {
                                e.checked = event.target.checked;
                            });
                            setAgreementList(temp);
                        }}
                    /><label htmlFor="box1"><p>전체동의</p></label>
                </div>

                {
                    agreeAlert &&
                    <div className="explane">
                        <div className="text">
                            <img src="/images/ex_mark.png" alt="Exclamation mark" />
                            <p>
                                IBK BOX 이용약관   ㅣ   개인(신용)정보 수집ㆍ이용 동의   ㅣ   개인정보 제3자 제공 동의(상품서비스 안내 등)   ㅣ   상품서비스 안내(선택) 등 에 모두 동의합니다.
                            </p>
                        </div>
                        <img src="/images/blue_close.png" alt="close btn" onClick={() => { setAgreeAlert(false) }} />
                    </div>
                }


                <div className="agree">

                    {
                        agreementList.map((e, key) => {

                            return (
                                <div className="agree__group" key={key}>
                                    <div className="checkbox__text">
                                        <input type="checkbox"
                                            id={`box2${key + 2}`}
                                            checked={e.checked}
                                            onChange={event => {
                                                let temp = [...agreementList];
                                                temp[key].checked = event.target.checked;
                                                setAgreementList(temp);
                                            }}
                                        />
                                        <label htmlFor={`box2${key + 2}`}>{`${e.necessary ? '[필수]' : '[선택]'} ${e.title}`}
                                        </label>
                                    </div>
                                    <div className="agree__text">
                                        {e.contents}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>


                {/* 동의에 체크가 다 되었으면 확인버튼에 check-on class 붙여주세요. */}
                <div className="button__group">
                    <button className="btn-confirm prev" onClick={() => { setStepKey('SELF_AUTH') }}>이전</button>
                    <button className={
                        `btn-confirm check ${
                        // 필수 항목에서 동의가 안되는 부분이 있는 경우 체크
                        agreementList.some(e => e.necessary === true && e.checked === false) ? '' : 'check-on'}`}
                        onClick={confirm}>확인</button>
                </div>
            </div>
        </>
    )
}
export default Terms;


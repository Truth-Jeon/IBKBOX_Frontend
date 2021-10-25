import React, { useRef } from 'react';

import 'assets/styles/reset.css'
import 'assets/styles/login.css'
import 'assets/styles/tooltip.css'
import 'assets/styles/join.css'
import 'assets/styles/selfAuth.css'
import 'assets/styles/terms.css'
import 'assets/styles/account.css'
import 'assets/styles/register.css'


const Register = ({ joinProps }) => {

    // props
    const { setStepKey, joinData, setJoinData, setValidationModal, setAgreementModal } = joinProps;

    // 사업자번호 입력 함수
    const bzNumRef = useRef();

    // 사업자번호 입력 임시 정규식
    const bzPattern = /\d{3}-\d{4}-\d{4}/;

    const setBzNum = (event) => {

        // const value = event.target.value;
        // const keyCode = event.keyCode; // 8, 46 >> backspace, delete

        // const inputBoxValue = bzNumRef.current.value;

        // if (keyCode !== 8 && keyCode !== 46) {
        //     if (inputBoxValue.length === 3 || inputBoxValue.length === 6) {
        //         bzNumRef.current.value = inputBoxValue + '-';
        //     }
        // }

        // let temp = { ...joinData };

        // temp.bzNum = value.replace(/[^0-9]/g, '');
        // setJoinData(temp);
    }

    console.log(joinData.bzNum);

    return (
        <>
            <p className="join__title">사업자 정보등록</p>
            <div className='join__same__box'>
                <div className="join__same__box__cover">
                    <p className="register__subtit">
                        사업자 회원 등록을 위해 사업자 정보를 확인합니다.
                    </p>
                    <p className="register__tit">
                        사업자등록번호 <span>입력</span>
                    </p>

                    {/* input태그에 값이 있으면 addclass active 해주시고
                                값이 없으면 active class 빼주세요. */}

                    <input type="text" placeholder="“-”없이 숫자만 입력하세요."
                        maxLength='12'
                        ref={bzNumRef}
                        onChange={event => {
                            setBzNum(event);
                        }} />
                    <div className="title">
                        <input type="checkbox" id="box1"
                        /><label htmlFor="box1"><p>전체동의</p></label>
                    </div>
                    <div className="explane">
                        <div className="text">
                            <img src="/images/ex_mark.png" alt="Exclamation mark" />
                            <p>사업자  등록번호가 없는 예비창업자인 경우 예비창업자를 선택하세요.</p>
                        </div>
                        <img src="/images/blue_close.png" alt="close btn" />
                    </div>

                    {/* 입력이 다 되었으면 확인버튼에 check-on class 붙여주세요. */}
                    <div className="button__group btn-mt30">
                        <button className="btn-confirm prev" onClick={() => { setStepKey('ACCOUNT') }}>이전</button>
                        <button className="btn-confirm check" onClick={() => { setStepKey('FOUNDED') }}>확인</button>
                    </div>
                </div>
            </div>



            <div className="skip">
                <div className="skip__btn">
                    <img src="/images/skip_ellipsis.png" alt="skip btn" />
                    <div className="tooltip__container selfauth1 tooltip__list">
                        <div className="tooltip_box">
                            <img src="/images/ex_mark_yellow.png" alt="느낌표" className="ex_mark" />
                            <p className="tooltip__text">
                                사업자 등록에 어려움이 있는 경우 추후<br />
                                <span>회사괸라 메뉴를 통해 등록</span>할 수 있습니다.
                            </p>
                        </div>
                        <div className="tooltip_box">
                            <img src="/images/ex_mark_yellow.png" alt="느낌표" className="ex_mark" />
                            <p className="tooltip__text">
                                사업자 정보는 <span>나이스 평가 정보(주)</span>를<br />
                                통해 확인합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Register;


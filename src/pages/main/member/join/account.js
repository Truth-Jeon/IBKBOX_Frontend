import React, { useEffect, useRef, useState } from 'react';
//import HttpAction from 'modules/utils/HttpAction';

import 'assets/styles/reset.css'
import 'assets/styles/login.css'
import 'assets/styles/tooltip.css'
import 'assets/styles/join.css'
import 'assets/styles/selfAuth.css'
import 'assets/styles/terms.css'
import 'assets/styles/account.css'


const Account = ({ joinProps }) => {

    // props
    const {
        setStepKey, joinData, setJoinData,
        idCheck, setIdCheck, emailCustomDomain, setEmailCustomDomain,
        setValidationModal, setAgreementModal } = joinProps;


    // 기존 사이트에서는 필드가 채워져 있는지만 확인하고
    // 이후 다음 버튼을 눌렀을 때 비밀번호와 비밀번호 확인의 값이 같은지 체크 
    const [pwCheck, setPwCheck] = useState('');

    // API에서 가져오는 이메일 리스트
    const [emailList, setEmailList] = useState(['naver.com', 'daum.net', 'google.com', 'boomco.org']);

    // 공백체크를 위한 state >> 아이디 중복확인에만 필요
    const [showNullCheck, setShowNullCheck] = useState(false);

    // focus 등을 위한 Ref
    const idRef = useRef();
    const pwRef = useRef();
    const pwCheckRef = useRef();
    const mailRef = useRef();

    // 임시 validation list
    const idPattern = /^[a-zA-Z0-9_-]{6,15}$/;
    const pwPattern = /(?=.*[a-zA-ZS])(?=.*?[#?!@$%^&*-]).{8,12}/;
    const mailPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

    const inputChange = (key, value) => {

        if (key !== 'emailDomain') {
            let temp = { ...joinData };
            temp[key] = value;
            setJoinData(temp);

        } else {
            let temp = { ...joinData };

            if (value === 'default') {
                temp.emailDomain = '';
            } else {
                temp.emailDomain = value;
            }

            setJoinData(temp);
        }
    }

    const idDuplicationCheck = () => {

        setShowNullCheck(true);

        if (joinData.userid === '') {
            return;
        }

        if (!idPattern.test(joinData.userid)) {
            // 아이디 validation 팝업
            idRef.current.focus();
            return;
        }

        let check = false;

        // api 호출해서 id 중복확인하는 로직 삽입
        check = true;

        if (check) {
            setIdCheck(true);

        } else {
            // 이미 중복 체크 완료한 상태(idCheck가 true)에서 다시 눌렀을 때 그 사이 아이디가 중복되는 문제가 발생할 경우 대비
            setIdCheck(false);
        }
    }

    const confirm = () => {
        // 임시
        if (joinData.joinType) {
            setStepKey('REGISTER')
        } else {

            // 회원등록 API 호출 >> 아이디 중복 발생 시 idCheck false 처리 및 못 넘어가게 처리
            // 사업자의 경우 founded 이후 최종 제출 시 setStep으로 account 컴포넌트로 이동 및 idCheck false처리

            setStepKey('FINISH')
        }


        // if (idCheck && joinData.userpw !== '' && pwCheck !== '' && joinData.emailId !== '' && joinData.emailDomain !== '') {

        //     if (!mailPattern.test(`${joinData.emailId}@${joinData.emailDomain}`)) {
        //         // 이메일 validation 팝업
        //         mailRef.current.focus();
        //         return;
        //     }

        //     if (!pwPattern.test(joinData.userpw)) {
        //         // 비밀번호 validation
        //         pwRef.current.focus();
        //         return;
        //     }

        //     if (joinData.userpw !== pwCheck) {
        //         // 비밀번호 일치 확인 팝업
        //         pwCheckRef.current.focus();
        //         return;
        //     }

        //     if (joinData.joinType) {
        //         setStepKey('REGISTER')
        //     } else {

        //         // 회원등록 API 호출 >> 아이디 중복 발생 시 idCheck false 처리 및 못 넘어가게 처리
        //         // 사업자의 경우 founded 이후 최종 제출 시 setStep으로 account 컴포넌트로 이동 및 idCheck false처리
        //         setStepKey('FINISH')
        //     }
        // }
    }

    return (
        <>
            <p className="join__title">{joinData.joinType ? '관리자계정등록' : '계정등록'}</p>
            <div className='join__same__box'>
                <div className='input__group'>
                    <div className='input__group__cover'>
                        <div className='input__box'>
                            <p>아이디</p>
                            <div className="id_cover">
                                <input type="text" placeholder="아이디 6~15자리 입력"
                                    style={showNullCheck && joinData.userid === '' ? { borderColor: 'red' } : {}}
                                    defaultValue={joinData.userid}
                                    ref={idRef}
                                    onChange={(e) => {
                                        inputChange('userid', e.target.value);
                                        if (idCheck) { // 중복체크 완료 후 변동이 있을 때 재 검사를 위함
                                            setIdCheck(false);
                                        }
                                    }} />

                                <button onClick={idDuplicationCheck}
                                    style={
                                        // 중복확인 체크 유무 표시에 대한 스타일은 문의가 필요함
                                        idCheck ? { backgroundColor: '#E6E6E6' } : {}
                                    }
                                >{idCheck ? '확인완료' : '중복확인'}</button>
                            </div>
                        </div>
                    </div>
                    <div className='input__group__cover inputgroup__three email'>
                        <div className='input__box'>
                            <p>이메일</p>
                            <div className='phone'>
                                <input type="text" defaultValue={joinData.emailId}
                                    ref={mailRef}
                                    onChange={e => {
                                        inputChange('emailId', e.target.value);
                                    }} />
                                <span>@</span>
                                <input type="text"
                                    style={emailCustomDomain ? {} : { display: 'none' }}
                                    defaultValue={emailCustomDomain ? joinData.emailDomain : ''}
                                    onChange={e => {
                                        inputChange('emailDomain', e.target.value);
                                    }}
                                />
                                <select defaultValue={emailCustomDomain ? 'default' : joinData.emailDomain}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === 'default') {
                                            setEmailCustomDomain(true);
                                        } else {
                                            setEmailCustomDomain(false);
                                        }
                                        inputChange('emailDomain', e.target.value);
                                    }}>
                                    <option value='default'>직접입력</option>
                                    {
                                        emailList.map((e, key) => {
                                            return (
                                                <option key={key} value={e}>{e}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='input__group__cover'>
                        <div className='input__box'>
                            <p>비밀번호</p>
                            <input type="password" placeholder="영문,숫자,특수문자 포함 8~12자리 입력"
                                ref={pwRef}
                                defaultValue={joinData.userpw}
                                onChange={e => {
                                    inputChange('userpw', e.target.value);
                                }} />
                        </div>
                    </div>
                    <div className='input__group__cover'>
                        <div className='input__box'>
                            <p>비밀번호 확인</p>
                            <input type="password" placeholder="영문,숫자,특수문자 포함 8~12자리 입력"
                                ref={pwCheckRef}
                                onChange={e => {
                                    setPwCheck(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* 입력이 다 되었으면 확인버튼에 check-on class 붙여주세요. */}
                <div className='button__group btn-mt30'>
                    <button className="btn-confirm prev" onClick={() => { setStepKey('TERMS') }}>이전</button>
                    <button
                        className={`btn-confirm check ${(idCheck && joinData.userpw !== '' && pwCheck !== '' && joinData.emailId !== '' && joinData.emailDomain !== '') ? 'check-on' : ''}`}
                        onClick={confirm}>확인</button>
                </div>
            </div>
        </>
    )
}
export default Account;


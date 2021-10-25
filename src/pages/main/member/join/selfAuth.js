import React, { useState, useRef, useEffect } from 'react';

import SelfAuthModal from 'pages/main/member/join/selfAuthModal';

import 'assets/styles/reset.css'
import 'assets/styles/login.css'
import 'assets/styles/tooltip.css'
import 'assets/styles/join.css'
import 'assets/styles/selfAuth.css'
import 'assets/styles/common.css'


const SelfAuth = ({ joinProps }) => {

    //===============================================

    // props
    const { setStepKey, joinData, setJoinData, setValidationModal, setAgreementModal } = joinProps;

    // 팝업

    // 이미 가입된 경우 뜨는 모달
    const [authModal, setAuthModal] = useState(false);

    const [agreeAlert, setAgreeAlert] = useState(true);

    //===============================================

    // 타이머
    const initialTime = useRef(60 * 3);
    const timer = useRef(null);

    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);

    //===============================================

    // 필수 입력사항 공백 체크 (input 입력 후 + 인증번호 전송 버튼 클릭 후 활성화)
    const [showNullCheck, setShowNullCheck] = useState({
        username: false,
        birth: false,
        phoneNumber: false,
        mobileProvider: false,
    });

    //===============================================

    // 동의사항
    const checkAllRef = useRef();

    const [agreementList, setAgreementList] = useState([
        {
            title: '개인정보이용 동의',
            checked: joinData.authAgreementCheck, contentsChecked: false
        },
        {
            title: '고객식별정보처리 동의',
            checked: joinData.authAgreementCheck, contentsChecked: false
        },
        {
            title: '통신사이용약관 동의',
            checked: joinData.authAgreementCheck, contentsChecked: false
        },
        {
            title: '서비스이용약관 동의',
            checked: joinData.authAgreementCheck, contentsChecked: false
        }
    ]);

    //===============================================

    const [mobileProviderList, setMobileProviderList] = useState([
        { name: 'KT', value: '0' }, { name: 'SKT', value: '1' }, { name: 'LGU', value: '2' }, { name: '알뜰폰', value: '3' }
    ]);

    //===============================================

    // 인증번호 전송 관련 (input validation)

    // 포커싱 등을 위한 ref
    const usernameRef = useRef();
    const birthRef = useRef();
    const phoneNumRef = useRef();
    const authNumRef = useRef();

    // 정규식 (임시 테스트용)
    const birthPattern = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/;
    const phonePattern = /01[016789][^0][0-9]{2,3}[0-9]{3,4}/;

    // 인증번호 전송 후 disable 처리
    const [disableCheck, setDisableCheck] = useState(joinData.authAgreementCheck);

    // 인증번호 input state
    const [authNumber, setAuthNumber] = useState('');

    //===============================================

    // input 항목 onChange

    const inputChange = (key, value) => {

        // 첫 입력 후에 입력창 위의 필수 입력항목 validation 표시 활성화
        if (key !== 'gender' && key !== 'foreign') {
            if (!showNullCheck[key]) {
                const temp = { ...showNullCheck };
                temp[key] = true;
                setShowNullCheck(temp);
            }
        }

        const temp = { ...joinData };
        temp[key] = value;
        setJoinData(temp);
    }

    //===============================================

    // 타이머
    const padNum = (num) => {
        return String(num).padStart(2, '0');
    }

    const setTimer = () => {
        initialTime.current = 60 * 3;
        setMin(padNum(parseInt(initialTime.current / 60)));
        setSec(padNum(initialTime.current % 60));

        timer.current = setInterval(() => {
            initialTime.current -= 1;
            setMin(padNum(parseInt(initialTime.current / 60)));
            setSec(padNum(initialTime.current % 60));

            if (initialTime.current <= 0) {
                clearInterval(timer.current);
            }
        }, 1000);
    }

    useEffect(() => {
        return () => { if (timer.current !== null) { clearInterval(timer.current); } }
    }, []);

    //===============================================

    // 인증번호 전송 버튼
    const sendAuthNum = () => {

        if (!checkAllRef.current.checked) {
            // 모달 띄우는 것으로 예상
            return;
        }

        setShowNullCheck({
            username: true,
            birth: true,
            phoneNumber: true,
            mobileProvider: true,
        });

        if (joinData.username === '') {
            // 모달 띄우는 것으로 예상
            usernameRef.current.focus();
            return;
        }

        if (!birthPattern.test(joinData.birth)) {
            // 모달 띄우는 것으로 예상
            birthRef.current.focus();
            return;
        }

        if (!phonePattern.test(joinData.phoneNumber)) {
            // 모달 띄우는 것으로 예상
            phoneNumRef.current.focus();
            return;
        }


        if (timer.current !== null) {
            clearInterval(timer.current);
        }
        setTimer();
        setDisableCheck(true);
        authNumRef.current.focus();
    }

    //===============================================

    // 확인 버튼
    // api  추가 후 조건 변경
    const confirm = () => {
        setJoinData({
            ...joinData,
            authAgreementCheck: checkAllRef.current.checked
        });
        setStepKey('TERMS');
        // if ((disableCheck && authNumber.length === 6)) {
        //     joinData.current = {
        //         ...joinData.current,
        //         ...joinData,
        //         authAgreementCheck: checkAllRef.current.checked
        //     }
        //     setStepKey('TERMS');
        // }
    }

    //===============================================


    return (
        <>
            {
                authModal && <SelfAuthModal />
            }

            <div className="join__width">
                <p className="join__title">본인인증</p>
                <div className='join__same__box'>
                    <div className="title">
                        <input type="checkbox" id="box1"
                            checked={
                                // 선택이 안 된 항목이 있는지 확인(있으면 true가 반환되므로) 
                                !agreementList.some(e => e.checked === false)
                            }
                            ref={checkAllRef}
                            disabled={disableCheck}
                            onChange={
                                (event) => {
                                    let temp = [...agreementList];
                                    temp.forEach(e => {
                                        e.checked = event.target.checked;
                                    });
                                    setAgreementList(temp);
                                }
                            }
                        /><label htmlFor="box1"><p>전체동의</p></label>
                    </div>

                    {/* 관련법률 & 규정 알림창 */}
                    {
                        agreeAlert &&
                        <div className="explane">
                            <div className="text">
                                <img src="/images/ex_mark.png" alt="Exclamation mark" />
                                <p>관련법률 및 규정에 따라 아래 사항에 대한 동의가 필요합니다.</p>
                            </div>
                            <img src="/images/blue_close.png" alt="close btn" onClick={() => { setAgreeAlert(false) }} />
                        </div>
                    }

                    <div className="agreement">
                        <ul>
                            {
                                agreementList.map((e, key) => {
                                    return (
                                        <li key={key} className={key > 1 ? 'mt10' : ''}>
                                            <div className="checkbox__text">

                                                <input type="checkbox" id={`box${key + 2}`}
                                                    onChange={(event) => {
                                                        let temp = [...agreementList];
                                                        temp[key].checked = event.target.checked;
                                                        setAgreementList(temp);
                                                    }}
                                                    checked={e.checked}
                                                    disabled={disableCheck}
                                                /><label htmlFor={`box${key + 2}`}>{e.title}</label>

                                            </div>
                                            <div className={e.contentsChecked ? "view" : 'view'}
                                                onClick={() => {
                                                    let temp = [...agreementList];
                                                    temp[key].contentsChecked = true;
                                                    setAgreementList(temp);
                                                }}
                                            >{e.contentsChecked ? '확인완료' : '내용보기'}</div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                    <div className='input__group'>

                        <div className='input__group__cover'>
                            <div className='input__box'>
                                <p>
                                    이름
                                    {
                                        (joinData.username === '' && showNullCheck.username) &&
                                        <span style={{ color: 'red' }}>필수 입력항목 입니다.</span>
                                    }
                                </p>
                                <input type="text" placeholder="이름 직접입력"
                                    ref={usernameRef}
                                    defaultValue={joinData.username}
                                    onChange={(e) => { inputChange('username', e.target.value); }}
                                    disabled={disableCheck} />
                            </div>
                        </div>

                        <div className='input__group__cover inputgroup__two'>
                            <div className='input__box'>
                                <p>내외국인</p>
                                <div className="people">
                                    <div className={joinData.foreign ? '' : "active"}
                                        onClick={() => {
                                            if (!disableCheck) {
                                                inputChange('foreign', false);
                                            }
                                        }}>내국인</div>
                                    <div className={!joinData.foreign ? '' : "active"}
                                        onClick={() => {
                                            if (!disableCheck) {
                                                inputChange('foreign', true);
                                            }
                                        }}>외국인</div>
                                </div>
                            </div>

                            <div className='input__box'>
                                <p>성별</p>
                                <div className="people">
                                    <div className={joinData.gender === 'M' ? "active" : ''}
                                        onClick={() => {
                                            if (!disableCheck) {
                                                inputChange('gender', 'M');
                                            }
                                        }}>남자</div>
                                    <div className={joinData.gender === 'W' ? "active" : ''}
                                        onClick={() => {
                                            if (!disableCheck) {
                                                inputChange('gender', 'W');
                                            }
                                        }}>여자</div>
                                </div>
                            </div>
                        </div>

                        <div className='input__group__cover'>
                            <div className='input__box'>
                                <p>
                                    생년월일
                                    {
                                        (joinData.birth === '' && showNullCheck.birth) &&
                                        <span style={{ color: 'red' }}>필수 입력항목 입니다.</span>
                                    }
                                </p>
                                <input placeholder="YYYYMMDD"
                                    type="text"
                                    ref={birthRef}
                                    defaultValue={joinData.birth}
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        if (isNaN(value)) {
                                            // 추후 정규식 교체
                                            value = value.replace(/[^0-9]/g, '');
                                            //value = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                                            birthRef.current.value = value;
                                        }
                                        inputChange('birth', e.target.value);
                                    }}
                                    disabled={disableCheck} />
                            </div>
                        </div>

                        <div className='input__group__cover inputgroup__three'>
                            <div className='input__box'>
                                <p>
                                    휴대전화
                                    {
                                        ((joinData.mobileProvider === 'default' || joinData.phoneNumber === '') && (showNullCheck.mobileProvider || showNullCheck.phoneNumber)) &&
                                        <span style={{ paddingRight: '122px', color: 'red' }}>필수 입력항목 입니다.</span>
                                    }
                                </p>
                                <div className='phone'>
                                    <select defaultValue={joinData.mobileProvider}
                                        onChange={(e) => { inputChange('mobileProvider', e.target.value); }}
                                        disabled={disableCheck}
                                        style={joinData.mobileProvider !== 'default' ? { color: 'black' } : {}}>
                                        <option disabled value='default'>선택</option>
                                        {
                                            mobileProviderList.map((e, key) => {
                                                return (
                                                    <option key={key} value={e.value}>{e.name}</option>
                                                )
                                            })
                                        }
                                    </select>

                                    <input placeholder="-없이 입력"
                                        type="text"
                                        ref={phoneNumRef}
                                        defaultValue={joinData.phoneNumber}
                                        onChange={(e) => {
                                            let value = e.target.value;
                                            if (isNaN(value)) {
                                                // 추후 정규식 교체
                                                value = value.replace(/[^0-9]/g, '');
                                                //value = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                                                phoneNumRef.current.value = value;
                                            }
                                            inputChange('phoneNumber', value);
                                        }}
                                        disabled={disableCheck} />

                                    <button onClick={() => { sendAuthNum(); }}>인증번호 전송</button>
                                </div>
                            </div>
                        </div>

                        <div className='input__group__cover'>
                            <div className='input__box'>
                                <p>
                                    인증번호
                                    {
                                        (timer.current !== null) &&
                                        <span>{min} : {sec}</span>
                                    }
                                </p>
                                <input type="text" placeholder="인증번호 6자리 입력"
                                    ref={authNumRef}
                                    defaultValue={authNumber}
                                    maxLength='6'
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        if (isNaN(value)) {
                                            // 추후 정규식 교체
                                            value = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                                            authNumRef.current.value = value;
                                        }
                                        setAuthNumber(value);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 입력이 다 되면 확인 버튼 .btn-confirm 에 addclass btn-on 해주세요. */}
                    <button className={
                        (disableCheck && authNumber.length === 6) ? 'btn-confirm btn-on' : 'btn-confirm'
                    } onClick={confirm}>확인</button>
                </div>
            </div>

            {
                <div className="skip">
                    <div className="skip__btn">
                        <img src="/images/skip_ellipsis.png" alt="skip btn" />
                        <div className="tooltip__container selfauth1">
                            <div className="tooltip_box">
                                <img src="/images/ex_mark_yellow.png" alt="느낌표" className="ex_mark" />
                                <p className="tooltip__text">
                                    회원가입을 위해 <span>본인확인</span>이 필요합니다.<br />
                                    본인명의가 아닐경우 인증이 이루어지지<br />
                                    않습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
        //     </div>
        // </div>
    )
}
export default SelfAuth;


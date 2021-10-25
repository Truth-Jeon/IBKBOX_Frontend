import React, { useState, useRef } from 'react';

import 'assets/styles/reset.css'
import 'assets/styles/login.css'
import 'assets/styles/tooltip.css'
import 'assets/styles/join.css'

import JoinProgress from 'pages/main/member/join/joinProgress';
import SelfAuth from 'pages/main/member/join/selfAuth';
import Terms from 'pages/main/member/join/terms';
import Account from 'pages/main/member/join/account';
import Register from 'pages/main/member/join/register';
import Founded from 'pages/main/member/join/founded';
import Finish from 'pages/main/member/join/finish';

const Join = () => {

    //===============================================

    // state
    const [hovered, setHovered] = useState(0);
    const [stepKey, setStepKey] = useState('ENTER');

    // 회원등록 공통 모달
    const [validationModal, setValidationModal] = useState(false);
    const [agreementModal, setAgreementModal] = useState(false);

    // 등록 정보
    // useRef로 가려 했지만 validation 감지를 위해 state로 재변경
    const [joinData, setJoinData] = useState({

        joinType: true, // true 기업회원, false 개인회원

        // 본인인증 관련
        username: '',
        birth: '',
        mobileProvider: 'default',
        phoneNumber: '',
        foreign: false, // false 내국인, true 외국인
        gender: 'M', // M 남 W 여
        authAgreementCheck: false, // 본인인증 동의 체크


        // 약관동의 관련
        termsNecessaryChecked: false,
        selectableTermPersonalInform: false,// 개인정보 제3자 제공 동의(상품서비스 안내 등)
        selectableTermCreditInform: false,// 개인(신용)정보 수집ㆍ이용 동의(상품서비스 안내 등)
        selectableTermProductService: false,// 상품서비스 안내 수신 동의

        // 계정등록 관련
        userid: '',
        userpw: '',
        emailId: '',
        emailDomain: '',
        emailSelectType: 'default',

        // 사업자정보등록 관련
        bzNum: '',
        isPrep: false, // 예비창업자인지 체크
        field: '',
        region: 'default',
        dueDate: '',
    });

    // 아이디 중복체크 확인용
    const [idCheck, setIdCheck] = useState(false);
    const [emailCustomDomain, setEmailCustomDomain] = useState(true); // true : 이메일 도메인 직접 입력

    const joinProps = {
        setStepKey,

        joinData,
        setJoinData,

        idCheck,
        setIdCheck,

        emailCustomDomain,
        setEmailCustomDomain,

        setValidationModal,
        setAgreementModal
    }

    // 컴포넌트 ENUM
    // props로 건네줄 부분이 중복되므로 context로 한번에 처리할지 논의
    const step = {
        SELF_AUTH: <SelfAuth joinProps={joinProps} />,
        TERMS: <Terms joinProps={joinProps} />,
        ACCOUNT: <Account joinProps={joinProps} />,
        REGISTER: <Register joinProps={joinProps} />,
        FOUNDED: <Founded joinProps={joinProps} />,
        FINISH: <Finish joinProps={joinProps} />,
    }


    //===============================================

    const enterPage = () => (
        <div className='bg__wrap join__wrap'>
            <div className='join__container'>
                <div
                    className={hovered === 1 ? 'join__card active' : 'join__card none_active'}
                    onMouseOver={(e) => { setHovered(1) }}
                    onMouseOut={(e) => { setHovered(0) }}
                    onClick={() => { setStepKey('SELF_AUTH'); setJoinData({ ...joinData, joinType: true }); }}
                >
                    <div className='join__card__inner'>
                        <p className='join__card__title'>
                            기업회원,예비창업자
                        </p>
                        <p className='join__card__text'>
                            사업체를 운영하고 있거나 <br />창업을 준비하고 있습니다.
                        </p>
                        <img src="/images/join_man.png" alt="img" className="img_default" />
                        <img src="/images/join_man_active.png" alt="img" className="img_active" />
                    </div>
                </div>

                <div
                    className={hovered === 2 ? 'join__card active' : 'join__card none_active'}
                    onMouseOver={(e) => { setHovered(2) }}
                    onMouseOut={(e) => { setHovered(0) }}
                    onClick={() => { setStepKey('SELF_AUTH'); setJoinData({ ...joinData, joinType: false }); }}
                >
                    <div className='join__card__inner'>
                        <p className='join__card__title'>
                            개인회원
                        </p>
                        <p className='join__card__text'>
                            개인,회사직원으로 BOX를<br /> 이용할 계획입니다.
                        </p>
                        <img src="/images/join_girl.png" alt="img" className="img_default" />
                        <img src="/images/join_girl_active.png" alt="img" className="img_active" />
                    </div>
                </div>
            </div>
        </div>
    )

    const enterJoin = () => (
        <div className='bg__wrap join__wrap auth1__wrap'>
            <div className='join__container'>
                <div className="join__width">

                    <JoinProgress progress={stepKey} joinType={joinData.joinType} />
                    {
                        step[stepKey]
                    }
                </div>
            </div>
        </div>
    )


    //===============================================

    return (
        <div>
            {
                validationModal && <div></div>
            }
            {
                agreementModal && <div></div>
            }
            <div className="long__logo">
                <img src="/images/logo_long.png" alt="logo long" />
            </div>
            {
                stepKey === 'ENTER' ? enterPage() : enterJoin()
            }

        </div>
    )
}

export default Join;
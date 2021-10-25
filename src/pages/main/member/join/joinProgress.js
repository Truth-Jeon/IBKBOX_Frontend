import 'assets/styles/joinprogress.css'

function JoinProgress({ progress, joinType }) {

    const step = {
        SELF_AUTH: 'step1',
        TERMS: 'step2',
        ACCOUNT: 'step3',
        REGISTER: 'step4',
        FOUNDED: 'step4',
        FINISH: 'step5',
    }

    return (
        <div className={`list__box ${step[progress]} ${joinType ? '' : 'personal'}`}>
            <div className="list__box__inner">
                <ul>
                    <li>
                        <div>
                            <div className="circle"></div>
                            <span>
                                {
                                    joinType ? '관리자본인인증' : '본인인증'
                                }
                            </span>
                        </div>

                    </li>
                    <li>
                        <div>
                            <div className="circle"></div>
                            <span>
                                약관동의
                            </span>
                        </div>

                    </li>
                    <li>
                        <div>
                            <div className="circle"></div>
                            <span>
                                {
                                    joinType ? '관리자계정등록' : '계정등록'
                                }
                            </span>
                        </div>

                    </li>
                    {
                        joinType &&
                        <li>
                            <div>
                                <div className="circle"></div>
                                <span>
                                    사업자정보등록
                                </span>
                            </div>
                        </li>
                    }
                    <li>
                        <div>
                            <div className="circle"></div>
                            <span>
                                가입완료
                            </span>
                        </div>

                    </li>
                </ul>
            </div>
        </div>
    )
}

export default JoinProgress



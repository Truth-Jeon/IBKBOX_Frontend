import React from 'react';
import { useHistory } from 'react-router-dom';

import 'assets/styles/reset.css'
import 'assets/styles/login.css'
import 'assets/styles/tooltip.css'
import 'assets/styles/join.css'
import 'assets/styles/selfAuth.css'
import 'assets/styles/terms.css'
import 'assets/styles/account.css'
import 'assets/styles/register.css'
import 'assets/styles/founded.css'
import 'assets/styles/joinFinish.css'



const Finish = () => {

    const history = useHistory();

    return (
        <>
            <p className="join__title">가입완료</p>
            <div className='join__finish'>
                <div className="join__finish__inner">
                    <p className="join__finish__tit">
                        <span>기업회원 가입</span>이 완료되었습니다.
                    </p>
                    <p className="join__finish__subtit">
                        BOX플랫폼의 다양한 서비스를 경험해보세요.
                    </p>
                    <button onClick={() => {
                        // joinData를 post해야할 로직
                        history.push('/login');
                    }}>홈으로</button>
                </div>
            </div>

        </>
    )
}
export default Finish;


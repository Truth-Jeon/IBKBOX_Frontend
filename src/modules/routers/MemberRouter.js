import React, { useContext, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/common/Loading';
import MainLayout from 'layouts/MainLayout';
import { UserContext } from 'modules/contexts/common/userContext';
import LoginLayout from 'layouts/LoginLayout';
//
const Mypage = lazy(() => import('pages/main/member/mypage'));
const History = lazy(() => import('pages/main/member/history'));

const Join = lazy(() => import('pages/main/member/join/join'));


const MemberRouter = (props) => {
    const { match, location } = props;

    const userContext = useContext(UserContext);

    const loggedIn = userContext.state.userInfo.loggedIn;

    const joinPage = () => (
        <LoginLayout>
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route exact path={`${match.url}/join`} component={() => <Join {...props} />} />
                </Switch>
            </Suspense>
        </LoginLayout>
    )

    const mypage = () => (
        <MainLayout>
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route exact path={`${match.url}/mypage`} component={() => <Mypage {...props} />} />
                    <Route exact path={`${match.url}/history`} component={() => <History {...props} />} />
                </Switch>
            </Suspense>
        </MainLayout>
    )

    const redirection = () => <Redirect to={'/login'} />



    // join(회원등록 페이지)의 경우는 로그인 정보 없는 경우 리디렉션을 피하기 위해 location.pathname으로 체크하는 로직 추가
    //if (location.pathname === '/member/join') {
    return (
        <>
            {
                location.pathname.indexOf('/member/join') !== -1
                    ? joinPage()
                    : (!loggedIn || loggedIn === undefined)
                        ? redirection() : mypage()
            }

        </>
    )

    // } else if (!userContext.state.userInfo.loggedIn || userContext.state.userInfo.loggedIn === undefined) {
    //     return (
    //         <Redirect to={'/login'} />
    //     )

    // } else {
    //     return (
    //         <MainLayout>
    //             <Suspense fallback={<Loading />}>
    //                 <Switch>
    //                     <Route exact path={`${match.url}/mypage`} component={() => <Mypage {...props} />} />
    //                     <Route exact path={`${match.url}/history`} component={() => <History {...props} />} />
    //                 </Switch>
    //             </Suspense>
    //         </MainLayout>
    //     )
    // }

    // return (
    //     <MainLayout>
    //         <Suspense fallback={<Loading />}>
    //             <Switch>
    //                 <Route exact path={`${match.url}/mypage`} component={() => <Mypage {...props} />} />
    //                 <Route exact path={`${match.url}/history`} component={() => <History {...props} />} />
    //             </Switch>
    //         </Suspense>
    //     </MainLayout>
    // )
}


export default MemberRouter;
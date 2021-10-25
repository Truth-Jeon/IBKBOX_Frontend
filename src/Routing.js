import React, {useContext, lazy, Suspense} from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/common/Loading';

//라우터목록
const LoginRouter = lazy(() => import('modules/routers/LoginRouter'));
const AdminRouter = lazy(() => import('modules/routers/AdminRouter'));
const MainRouter = lazy(() => import('modules/routers/MainRouter'));
const MemberRouter = lazy(() => import('modules/routers/MemberRouter'));
// const MenuList = lazy(() => import('modules/routers/MenuList'));

//
const Routing = (props) => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loading/>}>
                <Switch>
                    <Route path="/login" component={props => <LoginRouter {...props} />}/>
                    <Route path="/logout" component={props => <LoginRouter {...props} />}/>
                    <Route path="/main" component={props => <MainRouter {...props} />}/>
                    <Route path="/member" component={props => <MemberRouter {...props} />}/>
                    <Route path="/admin" component={props => <AdminRouter {...props} />} />
                    <Redirect path="/" to="/login" />
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
}

export default Routing;
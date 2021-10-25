import React, { useContext, lazy, Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/common/Loading';
import AdminLayout from 'layouts/AdminLayout';
import { UserContext } from 'modules/contexts/common/userContext';
//
const AdminHome = lazy(() => import('pages/admin'));
const Common = lazy(() => import('pages/admin/common'));
const CommonDetail = lazy(() => import('pages/admin/common/detail'));
const Log = lazy(() => import('pages/admin/log'));
const Menu = lazy(() => import('pages/admin/menu'));
const Role = lazy(() => import('pages/admin/role'));
const RoleGroup = lazy(() => import('pages/admin/workgroup'));
const Users = lazy(() => import('pages/admin/users'));
const Department = lazy(() => import('pages/admin/department'));
const Org = lazy(() => import('pages/admin/org'));
const Weather = lazy(() => import('pages/admin/weather'));
const Files = lazy(() => import('pages/admin/files'));

const AdminRouter = (props) => {
    const { match } = props;
    const userContext = useContext(UserContext);
    if (!userContext.state.userInfo.userType || userContext.state.userInfo.userType === undefined) {
        return <Redirect to={'/main'} />
    }
    return (
        <>
            <AdminLayout>
                <Suspense fallback={<Loading />}>
                    <Switch>
                        <Route exact path={`${match.url}`} component={() => <AdminHome {...props} />} />
                        <Route exact path={`${match.url}/common`} component={() => <Common {...props} />} />
                        <Route exact path={`${match.url}/common/detail`} component={() => <CommonDetail {...props} />} />
                        <Route exact path={`${match.url}/log`} component={() => <Log {...props} />} />
                        <Route exact path={`${match.url}/menu`} component={() => <Menu {...props} />} />
                        <Route exact path={`${match.url}/role`} component={() => <Role {...props} />} />
                        <Route exact path={`${match.url}/workgroup`} component={() => <RoleGroup {...props} />} />
                        <Route exact path={`${match.url}/users`} component={() => <Users {...props} />} />
                        <Route exact path={`${match.url}/department`} component={() => <Department {...props} />} />
                        <Route exact path={`${match.url}/org`} component={() => <Org {...props} />} />
                        <Route exact path={`${match.url}/files`} component={() => <Files {...props} />} />
                        <Route exact path={`${match.url}/weather`} component={() => <Weather {...props} />} />
                    </Switch>
                </Suspense>
            </AdminLayout>
        </>
    )
}

export default AdminRouter;
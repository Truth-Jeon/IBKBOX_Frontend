import React, { lazy, Suspense, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Loading from "components/common/Loading";
import LoginLayout from "layouts/LoginLayout";
import { UserContext } from "modules/contexts/common/userContext";

//
const Login = lazy(() => import("pages/login"));
const Logout = lazy(() => import("pages/logout"));
// const Terms = lazy(() => import("pages/join/terms"));

const MainRouter = (props) => {
  const { match } = props;
  const userContext = useContext(UserContext);
  if (userContext.state.userInfo.loggedIn) {
    return <Redirect to={"/main"} />;
  }
  return (
    <LoginLayout>
      <Suspense fallback={<Loading />}>
        <Switch>
          {match.url == "/login" ? (
            <Route
              exact
              path={`${match.url}`}
              component={() => <Login {...props} />}
            />
          ) : (
            <Route
              exact
              path={`${match.url}`}
              component={() => <Logout {...props} />}
            />
          )
          }
        </Switch>
      </Suspense>
    </LoginLayout>
  );
};

export default MainRouter;


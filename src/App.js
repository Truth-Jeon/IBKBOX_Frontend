import React from "react";
import Routing from "Routing";
import { RoleProvider } from "modules/contexts/common/roleContext";
import { WorkGroupProvider } from "modules/contexts/common/workGroupContext";
import { UserProvider } from "modules/contexts/common/userContext";
import { UsersProvider } from "modules/contexts/common/usersContext";
import { RoleCodeProvider } from "modules/contexts/common/roleCodeContext";
import { DeptProvider } from "modules/contexts/common/deptContext";
import { MenuProvider } from "modules/contexts/common/menuContext";
import { FilesProvider } from "modules/contexts/common/filesContext";

import Loading from "components/common/Loading";

//Provider list
const CommonProvider = ({ contexts, children }) =>
  contexts.reduce(
    (prev, context) =>
      React.createElement(context, {
        children: prev,
      }),
    children
  );

const App = () => {
  return (
    <CommonProvider
      contexts={[
        UserProvider,
        RoleProvider,
        MenuProvider,
        RoleCodeProvider,
        UsersProvider,
        DeptProvider,
        WorkGroupProvider,
        FilesProvider,
      ]}
    >
      <Loading />
      <Routing />
    </CommonProvider>
  );
};

export default App;

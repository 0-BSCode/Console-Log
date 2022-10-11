import React, { ReactElement, ReactNode } from "react";
import { useAuthContext } from "src/context/authContext";
import Navbar from "./navbar";

const Layout = ({ children }: { children: ReactNode }): ReactElement => {
  const { currUser } = useAuthContext();

  return (
    <>
      {currUser && <Navbar />}
      <main>{children}</main>
    </>
  );
};

export default Layout;

import { useRouter } from "next/router";
import React, { ReactElement, ReactNode } from "react";
import { useAuthContext } from "src/context/authContext";
import Navbar from "./navbar";

const Layout = ({ children }: { children: ReactNode }): ReactElement => {
  const router = useRouter();
  const { currUser } = useAuthContext();

  return (
    <>
      {currUser && router.route !== "/" && <Navbar />}
      <main>{children}</main>
    </>
  );
};

export default Layout;

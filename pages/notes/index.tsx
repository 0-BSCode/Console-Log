import React from "react";
import { NextPage } from "next";
import PageHeader from "src/components/_common/pageHeader";
import NotesTable from "src/components/notes/Table";

const Dashboard: NextPage = () => {
  return (
    <>
      <PageHeader />
      <NotesTable />
    </>
  );
};

export default Dashboard;

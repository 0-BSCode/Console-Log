import React from "react";
import { NextPage } from "next";
import CreateNote from "src/components/notes/note/Create";
import PageHeader from "src/components/_common/pageHeader";

const CreateNotePage: NextPage = () => {
  return (
    <>
      <PageHeader title={"Create Note"} />
      <CreateNote />
    </>
  );
};

export default CreateNotePage;

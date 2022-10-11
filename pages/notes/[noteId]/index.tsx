import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

const ViewNotePage: NextPage = () => {
  const router = useRouter();
  const noteId = router?.query?.noteId as string;

  if (!noteId) router.push("/notes");

  return <div>ViewNotePage</div>;
};

export default ViewNotePage;

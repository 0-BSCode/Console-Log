import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import NoteView from "src/components/notes/note/View";
import { Spinner } from "@chakra-ui/react";
import PageHeader from "src/components/_common/pageHeader";

const ViewNotePage: NextPage = () => {
  const router = useRouter();
  const noteId = (router?.query?.noteId as string) || "";

  useEffect(() => {
    if (router.isReady && !noteId.length) router.push("/notes");
  }, [noteId, router]);

  if (!router.isReady) return <Spinner />;

  return (
    <>
      <PageHeader title={"View Note"} />
      <NoteView noteId={noteId} />
    </>
  );
};

export default ViewNotePage;

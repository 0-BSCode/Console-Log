import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import NoteView from "src/components/notes/note/View";

const ViewNotePage: NextPage = () => {
  const router = useRouter();
  const noteId = router?.query?.noteId as string;

  if (!noteId) router?.push("/notes");

  return <NoteView noteId={noteId} />;
};

export default ViewNotePage;

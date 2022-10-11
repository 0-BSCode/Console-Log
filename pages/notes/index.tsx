import React, { useState } from "react";
import { NextPage } from "next";
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { Note } from "@prisma/client";
import { useAuthContext } from "src/context/authContext";
import { Progress } from "@chakra-ui/react";
import PageHeader from "src/components/_common/pageHeader";
import NotesTable from "src/components/notes/Table";

const GetNotesQuery = gql`
  query GetNotesQuery {
    notes {
      id
      title
      description
      content
    }
  }
`;

const CreateNoteMutation = gql`
  mutation CreateNoteMutation(
    $title: String!
    $description: String
    $content: String
  ) {
    createNote(title: $title, description: $description, content: $content) {
      id
    }
  }
`;

const DeleteNoteMutation = gql`
  mutation DeleteNoteMutation($noteId: String!) {
    deleteNote(noteId: $noteId) {
      id
    }
  }
`;

const EditNoteMutation = gql`
  mutation UpdateNoteMutation(
    $noteId: String!
    $title: String
    $description: String
    $content: String
  ) {
    updateNote(
      noteId: $noteId
      title: $title
      description: $description
      content: $content
    ) {
      id
      title
      content
      description
    }
  }
`;

const Dashboard: NextPage = () => {
  const { signOut } = useAuthContext();

  const [createNoteParams, setCreateNoteParams] = useState<Partial<Note>>({
    title: "",
    description: "",
    content: "",
  });

  const [editNoteParams, setEditNoteParams] = useState<Partial<Note>>({
    title: "",
    description: "",
    content: "",
  });

  const [editNoteId, setEditNoteId] = useState<string>();

  const { data, loading, error, fetchMore } = useQuery(GetNotesQuery, {
    fetchPolicy: "network-only",
    onError: (e) => {
      console.error(e.message);
    },
  });

  const [createNoteMutation, createNoteMutationState] = useMutation(
    CreateNoteMutation,
    {
      onCompleted: () => {
        fetchMore({});
      },
    }
  );

  const [editNoteMutation, editNoteMutationState] = useMutation(
    EditNoteMutation,
    {
      onCompleted: () => {
        setEditNoteId("");
        fetchMore({});
      },
    }
  );

  const [deleteNoteMutation, deleteNoteMutationState] = useMutation(
    DeleteNoteMutation,
    {
      onCompleted: () => {
        fetchMore({});
      },
    }
  );

  if (loading) return <Progress size="xs" isIndeterminate />;

  return (
    <div>
      <PageHeader />
      <NotesTable />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createNoteMutation({
            variables: {
              title: createNoteParams.title,
              description: createNoteParams.description,
              content: createNoteParams.content,
            },
          });
        }}
      >
        <input
          type={"text"}
          placeholder={"Title"}
          value={createNoteParams.title}
          onChange={(e) =>
            setCreateNoteParams({
              ...createNoteParams,
              title: e.target.value,
            })
          }
        />
        <input
          type={"text"}
          placeholder={"Description"}
          value={createNoteParams.description}
          onChange={(e) =>
            setCreateNoteParams({
              ...createNoteParams,
              description: e.target.value,
            })
          }
        />
        <input
          type={"text"}
          placeholder={"Content"}
          value={createNoteParams.content}
          onChange={(e) =>
            setCreateNoteParams({
              ...createNoteParams,
              content: e.target.value,
            })
          }
        />
        <button>CREATE</button>
      </form>
      <button
        onClick={(e) => {
          e.preventDefault();
          signOut.execute();
        }}
      >
        LOG OUT
      </button>
    </div>
  );
};

export default Dashboard;

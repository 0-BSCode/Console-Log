import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "src/context/userContext";
import { NextPage } from "next";
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { Note } from "@prisma/client";

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

const LogOutQuery = gql`
  query LogOut {
    logout {
      id
    }
  }
`;

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useContext(UserContext);
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
    onCompleted: (data) => {
      console.log("FINDMANY NOTES QUERY COMPLETE");
      console.log(data);
    },
  });

  const [createNoteMutation, createNoteMutationState] = useMutation(
    CreateNoteMutation,
    {
      onCompleted: () => {
        console.log("NOTE CREATED");
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

  const [logOut, logOutQueryState] = useLazyQuery(LogOutQuery, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      console.log("LOGGED OUT DONE");
      router.push("/");
      setCurrentUser({});
    },
  });

  const notes: Note[] = data?.notes || [];

  useEffect(() => {
    fetchMore({});
  }, []);

  console.log(`LOGOUT LOADING: ${logOutQueryState.loading}`);
  console.log(`CREATENOTE LOADING: ${createNoteMutationState.loading}`);

  if (loading) return <p>Fetching notes...</p>;

  return (
    <div>
      {currentUser && <h1>Welcome, {currentUser.username}</h1>}

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
          logOut();
        }}
      >
        LOG OUT
      </button>
      <ul>
        {notes.length &&
          notes.map((note) => (
            <li key={note.id}>
              {note.id !== editNoteId ? (
                <>
                  <h3>{note.title}</h3>
                  <h6>{note?.description}</h6>
                  <p>{note?.content}</p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteNoteMutation({
                        variables: {
                          noteId: note.id,
                        },
                      });
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setEditNoteId(note.id);
                      setEditNoteParams({
                        title: note.title,
                        description: note.description,
                        content: note.content,
                      });
                    }}
                  >
                    Edit
                  </button>
                </>
              ) : (
                <>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      editNoteMutation({
                        variables: {
                          noteId: editNoteId,
                          ...editNoteParams,
                        },
                      });
                    }}
                  >
                    <input
                      type={"text"}
                      placeholder={"Title"}
                      value={editNoteParams.title}
                      onChange={(e) =>
                        setEditNoteParams({
                          ...editNoteParams,
                          title: e.target.value,
                        })
                      }
                    />
                    <input
                      type={"text"}
                      placeholder={"Description"}
                      value={editNoteParams.description}
                      onChange={(e) =>
                        setEditNoteParams({
                          ...editNoteParams,
                          description: e.target.value,
                        })
                      }
                    />
                    <input
                      type={"text"}
                      placeholder={"Content"}
                      value={editNoteParams.content}
                      onChange={(e) =>
                        setEditNoteParams({
                          ...editNoteParams,
                          content: e.target.value,
                        })
                      }
                    />
                    <button type={"submit"}>Edit</button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setEditNoteId("");
                      }}
                    >
                      CANCEL
                    </button>
                  </form>
                </>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Dashboard;

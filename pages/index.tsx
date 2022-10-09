import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useContext, useEffect } from "react";
import { useAuthContext } from "src/context/authContext";
import { useRouter } from "next/router";
import { PartialUser } from "types/user";

const defaultParams: PartialUser = {
  username: "",
  password: "",
  email: "",
};

const Home: NextPage = () => {
  const router = useRouter();
  const { signUp, signIn, currUser } = useAuthContext();

  const [createUserParams, setCreateUserParams] =
    useState<PartialUser>(defaultParams);

  const [findUserParams, setFindUserParams] =
    useState<PartialUser>(defaultParams);

  useEffect(() => {
    if (currUser) {
      router.push("/dashboard");
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn.execute({
              email: findUserParams.email,
              password: findUserParams.password,
            });
          }}
        >
          <input
            type={"text"}
            placeholder={"Username"}
            value={findUserParams.username}
            onChange={(e) =>
              setFindUserParams({
                ...findUserParams,
                username: e.target.value,
              })
            }
          />
          <input
            type={"email"}
            placeholder={"Email"}
            value={findUserParams.email}
            onChange={(e) =>
              setFindUserParams({
                ...findUserParams,
                email: e.target.value,
              })
            }
          />
          <input
            type={"password"}
            placeholder={"Password"}
            value={findUserParams.password}
            onChange={(e) =>
              setFindUserParams({
                ...findUserParams,
                password: e.target.value,
              })
            }
          />
          <button>LOG IN</button>
        </form>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            signUp.execute({ ...createUserParams });
          }}
        >
          <input
            type={"text"}
            placeholder={"Username"}
            value={createUserParams.username}
            onChange={(e) =>
              setCreateUserParams({
                ...createUserParams,
                username: e.target.value,
              })
            }
          />
          <input
            type={"email"}
            placeholder={"Email"}
            value={createUserParams.email}
            onChange={(e) =>
              setCreateUserParams({
                ...createUserParams,
                email: e.target.value,
              })
            }
          />
          <input
            type={"password"}
            placeholder={"Password"}
            value={createUserParams.password}
            onChange={(e) =>
              setCreateUserParams({
                ...createUserParams,
                password: e.target.value,
              })
            }
          />
          <button>REGISTER</button>
        </form>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;

/*
OBSTACLE
1. User authentication upon resource request
  - way to authenticate user whenever the request a resource

*/

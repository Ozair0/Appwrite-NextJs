import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { account } from "@/appwrite/appwrite";
import TodoForm from "@/components/TodoForm";
import Todos from "@/components/Todos";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState();
  useEffect(() => {
    const getData = account.get();
    getData.then(
      function (res) {
        // console.log(res);
        // @ts-ignore
        setUserDetails(res);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);
  const logOut = (e: any) => {
    e.preventDefault();
    const logout = account.deleteSession("current");
    logout.then(
      function (res) {
        console.log(res);
        router.push("login");
      },
      function (error) {
        console.log(error);
      }
    );
  };
  return (
    <>
      <Head>
        <title>AppWrite Learn</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {userDetails ? (
          <>
            <div className="min-h-min max-w-7xl mx-auto shadow-md flex justify-between text-right py-3 px-3 mt-2 rounded-md">
              <div>
                {/* @ts-ignore */}
                <p className="text-xl">Hello, {userDetails.name}</p>
              </div>
              <div>
                <button
                  onClick={(e) => logOut(e)}
                  className="bg-red-400 text-white p-1 rounded-md"
                >
                  Logout
                </button>
              </div>
            </div>
            <TodoForm />
            <Todos />
          </>
        ) : (
          <p className="mt-4">
            Please Login To see Profile{" "}
            <Link href="/login">
              <span className="bg-blue-300 p-2 cursor-pointer text-white rounded-md">
                Login
              </span>
            </Link>
          </p>
        )}
      </main>
    </>
  );
}

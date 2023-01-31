import React, { useEffect, useState } from "react";
import { client, database } from "@/appwrite/appwrite";
import { useOnceCall } from "@/util/useOnceCall";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    loadTodos();
  }, []);
  const loadTodos = () => {
    const promise = database.listDocuments(
      "63d79155d0c161524b08",
      "63d7917359673dea7b95"
    );

    promise.then(
      function (response) {
        // @ts-ignore
        setTodos(response.documents);
        // console.log(response.documents); // Success
        setLoader(false);
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };
  const handleDelete = (id: any, e: any) => {
    e.preventDefault();
    const promise = database.deleteDocument(
      "63d79155d0c161524b08",
      "63d7917359673dea7b95",
      id
    );
    promise.then(
      function (response) {
        // console.log(response); // Success
        // loadTodos();
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  useOnceCall(() => {
    client.subscribe(
      "databases.63d79155d0c161524b08.collections.63d7917359673dea7b95.documents",
      (res) => {
        console.log("test: ", res.events);
        if (
          res.events.includes(
            "databases.63d79155d0c161524b08.collections.63d7917359673dea7b95.documents.*.create"
          ) ||
          res.events.includes(
            "databases.63d79155d0c161524b08.collections.63d7917359673dea7b95.documents.*.delete"
          )
        ) {
          loadTodos();
        }
      }
    );
  });

  return (
    <div className="max-w-7xl mx-auto">
      <p className="text-xl font-bold mb-2">Todo List</p>
      {loader ? (
        <p>Loading ...</p>
      ) : (
        <div>
          {todos.length > 0 ? (
            todos.map((item) => (
              <div
                // @ts-ignore
                key={item.$id}
                className="p-4 flex items-center justify-between border-b-2 bg-gray-100 rounded-lg mb-1"
              >
                <div>
                  {/* @ts-ignore */}
                  <p>{item.todo}</p>
                </div>
                <div>
                  <span
                    // @ts-ignore
                    onClick={(e) => handleDelete(item.$id, e)}
                    className="text-red-400 cursor-pointer"
                  >
                    Delete
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No todos available!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Todos;

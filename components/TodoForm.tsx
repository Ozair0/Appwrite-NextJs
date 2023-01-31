import React, { useState } from "react";
import { database } from "@/appwrite/appwrite";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const promise = database.createDocument(
      "63d79155d0c161524b08",
      "63d7917359673dea7b95",
      "unique()",
      {
        todo,
        done: false,
      }
    );

    promise.then(
      function (response) {
        // console.log(response); // Success
        setTodo("");
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };
  return (
    <div className="max-w-7xl mx-auto mt-10">
      <form action="" className="flex justify-center mb-10">
        <input
          type="text"
          name=""
          id=""
          value={todo}
          placeholder="Enter Todo"
          className="border p-2 w-2/3 rounded-md"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button
          className="bg-purple-500 p-2 text-white ml-2 rounded-md"
          type="submit"
          onClick={handleSubmit}
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default TodoForm;

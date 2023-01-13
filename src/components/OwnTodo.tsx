import React, { ChangeEvent, useEffect, useState } from "react";

type Props = {};

type Todo = {
  id: number | string;
  title: string;
  isCompleted: boolean;
};

function OwnTodo({}: Props) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<"all" | "active" | "complete">(
    "all"
  );

  const addTodo = () => {
    let newTodo: Todo = {
      id: new Date().getTime(),
      title: title,
      isCompleted: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  };

  const deleteTodo = (id: number | string) => {
    let updateTodos: Todo[] = [...todos].filter((todo: Todo) => todo.id !== id);
    setTodos(updateTodos);
  };

  const completeTodo = (id: number | string) => {
    let completeTodos: Todo[] = todos.map((todo: Todo) => {
      if (id === todo.id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });

    setTodos(completeTodos);
  };

  useEffect(() => {}, [search])

  return (
    <div>
      <div>
        <input
          type="text"
          className="border rounded border-red-500 m-2 px-2 p-1"
          value={title}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setTitle(event.target.value)
          }
        />
        <button
          onClick={addTodo}
          className=" m-2 p-1 border rounded border-blue-500 bg-blue-400"
        >
          Add
        </button>
      </div>
      <div>
        <input
          type="search"
          className="border rounded border-red-500 m-2 px-2 p-1"
          placeholder="Search..."
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSearch(event.target.value)
          }
        />
        <select
          name="select"
          id=""
          className="border rounded border-blue-500 bg-blue-400 p-1"
          onChange={(event: ChangeEvent<any>) =>
            setSelected(event.target.value)
        }
        >
          <option value="all">All</option>
          <option value="complete">complete</option>
          <option value="active">active</option>
        </select>
      </div>

      {todos.length > 0 &&
        selected === "all" &&
        search === "" &&
        todos.map((todo: Todo) => {
          return (
            <div
              key={todo.id}
              className="w-[400px] border rounded border-gray-800 m-2 mx-auto"
            >
              <h2
                style={
                  todo.isCompleted ? { textDecoration: "line-through" } : {}
                }
              >
                {todo.title}
              </h2>
              <button
                onClick={() => completeTodo(todo.id)}
                className="border rounded border-green-500 bg-green-500 p-1 my-2 mx-2"
              >
                complete
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="border rounded border-orange-500 bg-orange-500 p-1"
              >
                Del
              </button>
            </div>
          );
        })}
      {todos.length > 0 &&
        selected === "all" &&
        search.length > 0 &&
        todos
          .filter((todo: Todo) =>
            todo.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((todo: Todo) => {
            return (
              <div
                key={todo.id}
                className="w-[400px] border rounded border-gray-800 m-2 mx-auto"
              >
                <h2
                  style={
                    todo.isCompleted ? { textDecoration: "line-through" } : {}
                  }
                >
                  {todo.title}
                </h2>
                <button
                  onClick={() => completeTodo(todo.id)}
                  className="border rounded border-green-500 bg-green-500 p-1 my-2 mx-2"
                >
                  complete
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="border rounded border-orange-500 bg-orange-500 p-1"
                >
                  Del
                </button>
              </div>
            );
          })}
      {todos.length > 0 &&
        selected === "complete" &&
        todos
          .filter((todo: Todo) => todo.isCompleted)
          .map((todo: Todo) => {
            return (
              <div
                key={todo.id}
                className="w-[400px] border rounded border-gray-800 m-2 mx-auto"
              >
                <h2
                  style={
                    todo.isCompleted ? { textDecoration: "line-through" } : {}
                  }
                >
                  {todo.title}
                </h2>
                <button
                  onClick={() => completeTodo(todo.id)}
                  className="border rounded border-green-500 bg-green-500 p-1 my-2 mx-2"
                >
                  complete
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="border rounded border-orange-500 bg-orange-500 p-1"
                >
                  Del
                </button>
              </div>
            );
          })}
          {todos.length > 0 &&
        selected === "active" &&
        todos
          .filter((todo: Todo) => !todo.isCompleted)
          .map((todo: Todo) => {
            return (
              <div
                key={todo.id}
                className="w-[400px] border rounded border-gray-800 m-2 mx-auto"
              >
                <h2
                  style={
                    todo.isCompleted ? { textDecoration: "line-through" } : {}
                  }
                >
                  {todo.title}
                </h2>
                <button
                  onClick={() => completeTodo(todo.id)}
                  className="border rounded border-green-500 bg-green-500 p-1 my-2 mx-2"
                >
                  complete
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="border rounded border-orange-500 bg-orange-500 p-1"
                >
                  Del
                </button>
              </div>
            );
          })}
        
    </div>
  );
}

export default OwnTodo;

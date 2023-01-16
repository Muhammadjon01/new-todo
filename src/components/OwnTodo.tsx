import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/reactRedux";
import {
  addTodo as add,
  deleteTodo as remove,
  editTodo,
  handleChange,
  TTodo,
} from "../reducers/todos";

type Props = {};

function OwnTodo({}: Props) {
  // const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState<string>("");
  const [editInput, setEditInput] = useState<string>("hidden");
  const [editInitialValue, setEditInitialValue] = useState<string>("");
  const title = useAppSelector((state) => state.todos.title);
  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();

  const [selected, setSelected] = useState<"all" | "active" | "complete">(
    "all"
  );

  const addTodo = () => {
    dispatch(add());
  };

  const completeTodo = (id: string | number) => {};

  const deleteTodo = (id: string | number) => {
    dispatch(remove(id));
  };

  useEffect(() => {}, [search]);

  return (
    <div>
      <div>
        <input
          type="text"
          className="border rounded border-red-500 m-2 px-2 p-1"
          value={title}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            dispatch(handleChange(event.target.value))
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
        todos.map((todo: TTodo) => {
          return (
            <div
              key={todo.id}
              className="w-[400px] border rounded border-gray-800 m-2 mx-auto"
            >
              <h2
                style={todo.complete ? { textDecoration: "line-through" } : {}}
              >
                {todo.title}
              </h2>
              <button
                onClick={() => completeTodo(todo.id)}
                className="border border-slate-400 bg-white"
              >
                complete
              </button>
              <button
                onClick={() => {
                  setEditInput("flex flex-row space-x-2 items-center");
                  setEditInitialValue(todo.title);
                }}
                className="border rounded border-slate-500 bg-slate-500 p-1 my-2 mx-2"
              >
                Edit
              </button>
              <div className={editInput}>
                <input
                  value={editInitialValue}
                  onChange={(e) => setEditInitialValue(e.target.value)}
                  className="border rounded border-slate-500 p-1 my-2 mx-2"
                />
                <button
                  onClick={() => {
                    dispatch(
                      editTodo({ key1: todo.id, key2: editInitialValue })
                    );
                    console.log("Hi");
                  }}
                  className="bg-slate-300 px-2 py-1"
                >
                  Save
                </button>
              </div>

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
          .filter((todo: TTodo) =>
            todo.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((todo: TTodo) => {
            return (
              <div
                key={todo.id}
                className="w-[400px] border rounded border-gray-800 m-2 mx-auto"
              >
                <h2
                  style={
                    todo.complete ? { textDecoration: "line-through" } : {}
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
          .filter((todo: TTodo) => todo.complete)
          .map((todo: TTodo) => {
            return (
              <div
                key={todo.id}
                className="w-[400px] border rounded border-gray-800 m-2 mx-auto"
              >
                <h2
                  style={
                    todo.complete ? { textDecoration: "line-through" } : {}
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
          .filter((todo: TTodo) => !todo.complete)
          .map((todo: TTodo) => {
            return (
              <div
                key={todo.id}
                className="w-[400px] border rounded border-gray-800 m-2 mx-auto"
              >
                <h2
                  style={
                    todo.complete ? { textDecoration: "line-through" } : {}
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

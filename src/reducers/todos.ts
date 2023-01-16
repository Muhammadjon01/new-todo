import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TTodo = {
  id: number | string;
  title: string;
  complete: boolean;
};

interface ITodos {
  todos: TTodo[] | [];
  title: string;
}

const initialState: ITodos = {
  todos: [],
  title: "",
};

export const slice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    handleChange: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.title = payload;
    },

    addTodo: (state) => {
      let todo: TTodo = {
        id: new Date().getTime(),
        title: state.title,
        complete: false,
      };

      state.todos.push(todo as never);
    },

    deleteTodo: (state, action: PayloadAction<string | number>) => {
      state.todos = state.todos.filter(
        (todo: TTodo) => todo.id !== action.payload
      );
    },
    editTodo: (
      state,
      action: PayloadAction<{
        key1: string | number;
        key2: string;
      }>
    ) => {
      state.todos = state.todos.map((todo: TTodo) => {
        if (todo.id === action.payload.key1) {
          todo.title = action.payload.key2;
        }
        return todo;
      });
    },
  },
});

export const { handleChange, addTodo, deleteTodo, editTodo } = slice.actions;

export default slice.reducer;

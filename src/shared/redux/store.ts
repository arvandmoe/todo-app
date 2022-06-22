import { Todo } from './../models/Todo';
import { configureStore } from '@reduxjs/toolkit'
import todoReducer from "modules/todos/store/todoSlice";

export const store = configureStore({
    reducer: {
        todos: todoReducer,
    }
})

export interface RootState {
    todos: { data : Todo[]},
}
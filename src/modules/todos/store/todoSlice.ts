import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Todo } from 'shared/models/Todo'

export const initialState = { data: [] as Todo[] }


const todoSlice = createSlice({
    name: 'todo',
    initialState: { data: [] as Todo[] },
    reducers: {
        initTodos(state, action: PayloadAction<Todo[]>) {
            state.data = action.payload
        },
        addTodo(state, action: PayloadAction<Todo>) {
            state.data.push(action.payload)
        },
        deleteTodo(state, action: PayloadAction<number>) {
            let newData = state.data.filter(todo => todo.id !== action.payload)
            state.data = newData
        },
        toggleTodo(state, action: PayloadAction<number>) {
            let todo = state.data.find((todo) => todo.id === action.payload)
            if (todo) todo.completed = !todo?.completed
        }

    }
})

export const { initTodos, addTodo, deleteTodo, toggleTodo } = todoSlice.actions
export default todoSlice.reducer
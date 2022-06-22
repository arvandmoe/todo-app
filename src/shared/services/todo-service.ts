import { AddTodoDto } from './../models/Todo';
import { axiosClient } from 'common/network/axios-client';
import { Todo } from 'models/Todo';

const addTodo = async (todoDto: AddTodoDto) => {
    const response = await axiosClient.post<Todo>('todos', todoDto)
    return response.data
}

const deleteTodo = async (todoId: number) => {
    const response = await axiosClient.delete<Todo>(`todos/${todoId}`)
    return response.data
}

const toggleTodo = async (todoId: number, completed: boolean) => {
    const response = await axiosClient.patch<Todo>(`todos/${todoId}`, { completed: completed })
    return response.data
}

const TodoService = {
    addTodo,
    deleteTodo,
    toggleTodo
}

export default TodoService

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

const TodoService = {
    addTodo,
    deleteTodo
}

export default TodoService

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddTodoDto, Todo } from 'shared/models/Todo';
import { RootState } from "shared/redux/store";
import TodoService from "shared/services/todo-service";
import { addTodo, deleteTodo, initTodos, toggleTodo } from '../store/todoSlice';



const useTodo = (initialTodos: Todo[]) => {

    const todoState = useSelector((state: RootState) => state.todos);
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const todos = todoState.data.length > 0 ? todoState.data : initialTodos;
    let leftTodosCount: number = todos.filter(todo => !todo.completed).length;


    useEffect(() => {
        dispatch(initTodos(initialTodos))
    }, [])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value)
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (input !== "") {
            const todoDto: AddTodoDto = { title: input, completed: false }
            const todo = await TodoService.addTodo(todoDto)
            dispatch(addTodo(todo))
            setInput("")
        }
    }

    const onDeleteTodo = async (todoId: number) => {
        dispatch(deleteTodo(todoId))
        await TodoService.deleteTodo(todoId)
    }

    const onTickTodo = async (todoId: number, currCompleted: boolean) => {
        dispatch(toggleTodo(todoId))
        await TodoService.toggleTodo(todoId, !currCompleted)
    }

    return { leftTodosCount, todos, input, handleInputChange, onSubmit, onDeleteTodo, onTickTodo }
}

export default useTodo
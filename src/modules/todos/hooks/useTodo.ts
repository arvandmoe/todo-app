import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FILTER } from "shared/constants/todo-filter";
import { AddTodoDto, Todo } from 'shared/models/Todo';
import { RootState } from "shared/redux/store";
import TodoService from "shared/services/todo-service";
import { addTodo, clearCompletedTodos, deleteTodo, initTodos, toggleTodo } from '../store/todoSlice';


const useTodo = (initialTodos: Todo[]) => {

    const todoState = useSelector((state: RootState) => state.todos);
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();
    const [filter, setFilter] = useState(router.query.filter ?? FILTER.ALL);

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

    const onFilterButton = (newFilter: string) => {
        if (Object.values(FILTER).includes(newFilter)) {
            setFilter(newFilter)
            router.push(router.pathname, { query: { filter: newFilter } })
        }
    }

    const onClearCompletedButton = () => {
        dispatch(clearCompletedTodos())
        // delete each completed todo manually
        // TODO: does json-server include a collection patch request to do this at once?!
        todos.filter(todo => todo.completed).forEach((todo) => {
            TodoService.deleteTodo(todo.id)
        })
    }

    return { leftTodosCount, input, todos, filter, onFilterButton, handleInputChange, onSubmit, onDeleteTodo, onTickTodo, onClearCompletedButton }
}

export default useTodo
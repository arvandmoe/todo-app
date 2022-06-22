import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Todo } from 'shared/models/Todo';
import { RootState } from "shared/redux/store";
import { addTodo, initTodos } from '../store/todoSlice';



const useTodo = (initialTodos: Todo[]) => {

    const todoState = useSelector((state: RootState) => state.todos);
    const todos = todoState.data.length > 0 ? todoState.data : initialTodos;
    const [input, setInput] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initTodos(initialTodos))
    }, [])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value)
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (input !== "") {
            const todo: Todo = { id: 4, title: input, completed: false }
            dispatch(addTodo(todo))
            setInput("")
        }
    }

    return { todos, input, handleInputChange, onSubmit }
}

export default useTodo
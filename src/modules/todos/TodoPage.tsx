import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { BASE_URL } from 'shared/constants'
import { Todo } from 'shared/models/Todo'

const TodoPage: NextPage<{ todos: Todo[] }> = ({ todos }) => {
  return (
    <>
      <div>Todos: </div>
      {todos.map((todo) => {
        return <div>{todo.title}</div>
      })}
    </>
  )
}

export default TodoPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetch(`${BASE_URL}/todos`)
  const data: Todo[] = await res.json()

  return {
    props: {
      todos: data,
    },
  }
}

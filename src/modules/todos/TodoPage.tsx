import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { BASE_URL } from 'shared/constants'
import { Todo } from 'shared/models/Todo'
import useTodo from './hooks/useTodo'
import styles from './TodoPage.module.scss'

const TodoPage: NextPage<{ todos: Todo[] }> = ({ todos: initialTodos }) => {
  const { todos, input, handleInputChange, onSubmit } = useTodo(initialTodos)

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Todo</h1>
        <div className={styles.box}>
          <div className={styles.bar} />
          <form onSubmit={onSubmit}>
            <input
              placeholder="What needs to be done?"
              className={styles.input}
              value={input}
              onChange={handleInputChange}
            />
          </form>
          {todos.map((todo) => {
            return (
              <div key={todo.id} className={styles.item}>
                <p>{todo.title}</p>
                <span>&#10006;</span>
              </div>
            )
          })}
          <div className={styles.optionsContainer}>
            <div className={styles.leftItems}>3 items left</div>
            <div>
              <button className={styles.btn + ' ' + styles.active}>All</button>{' '}
              <button className={styles.btn}>Active</button>
            </div>
            <button className={styles.btnClear}>Clear Completed</button>
          </div>
        </div>
      </main>
    </div>
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

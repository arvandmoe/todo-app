import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { BASE_URL } from 'shared/constants'
import { FILTER } from 'shared/constants/todo-filter'
import { Todo } from 'shared/models/Todo'
import useTodo from './hooks/useTodo'
import styles from './TodoPage.module.scss'

const TodoPage: NextPage<{ todos: Todo[] }> = ({ todos: initialTodos }) => {
  const {
    leftTodosCount,
    input,
    todos,
    filter,
    onFilterButton,
    handleInputChange,
    onSubmit,
    onDeleteTodo,
    onTickTodo,
  } = useTodo(initialTodos)

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo</title>
        <link rel="icon" href="/favicon.ico" />
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
          {todos
            .filter((todo) => {
              if (filter === FILTER.ACTIVE) return !todo.completed
              else return true
            })
            .map((todo) => {
              return (
                <div key={todo.id} className={styles.item}>
                  <p className={todo.completed ? styles.done : ''}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => onTickTodo(todo.id, todo.completed)}
                    />
                    {todo.title}
                  </p>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => onDeleteTodo(todo.id)}
                  >
                    &#10006;
                  </span>
                </div>
              )
            })}
          {todos.length === 0 && (
            <div className={styles.item}>
              <p>No todos in here!</p>
            </div>
          )}
          <div className={styles.optionsContainer}>
            <div className={styles.leftItems}>{leftTodosCount} items left</div>
            <div>
              <button
                className={
                  filter === FILTER.ALL ? styles.btnActive : styles.btn
                }
                onClick={() => onFilterButton(FILTER.ALL)}
              >
                All
              </button>{' '}
              <button
                className={
                  filter === FILTER.ACTIVE ? styles.btnActive : styles.btn
                }
                onClick={() => onFilterButton(FILTER.ACTIVE)}
              >
                Active
              </button>
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
  const res = await fetch(`${BASE_URL}todos`)
  const data: Todo[] = await res.json()

  return {
    props: {
      todos: data,
    },
  }
}

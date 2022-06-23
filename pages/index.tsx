import type { NextPage } from 'next'
import Head from 'next/head'
import { Card } from 'shared/components'
import { ROUTES } from 'shared/constants/routes'
import styles from 'styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SnappShop Todo</title>
        <meta name="description" content="An Awsome Todo App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://snappshop.ir/">SnappShop</a> Todo
        </h1>
        <p className={styles.description}>
          Follow the link to open{' '}
          <a
            href="https://github.com/mdkhaki/todo-app"
            className={styles.link}
            target="_blank"
          >
            project repo
          </a>
        </p>
        <div className={styles.grid}>
          <Card
            href={ROUTES.TODOS}
            title="Todo"
            description="Click to see todo-app on todos route"
          />
          <Card
            href={ROUTES.ABOUT}
            title="About"
            description="Learn more about assignment"
          />
        </div>
      </main>
    </div>
  )
}

export default Home

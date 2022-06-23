import type { NextPage } from 'next'
import Head from 'next/head'
import { Card } from 'shared/components'
import styles from 'styles/Home.module.scss'

const AboutPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>About</title>
        <meta name="description" content="An Awsome Todo App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Requirements</h1>
        <br />

        <div className={styles.grid}>
          <Card
            title="SSR"
            blankTarget={true}
            href={
              'https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props'
            }
            description="Used nextjs to render todos server-side, just for fun"
          />
          <Card
            title="Typescript"
            blankTarget
            href={'https://www.typescriptlang.org/'}
            description="Prevent bugs and never waste time to fix theme, you know..."
          />
          <Card
            title="Redux"
            blankTarget
            href={'https://redux.js.org/'}
            description="Used @redux/toolkit to manage local state,opinionated redux"
          />
          <Card
            title="Persisted"
            blankTarget
            href={'https://www.npmjs.com/package/json-server'}
            description="Todos are persisted using json-server, share across everyone!"
          />
        </div>
      </main>
    </div>
  )
}

export default AboutPage

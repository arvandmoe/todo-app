import React, { FC } from 'react'
import styles from './Card.module.scss'
import Link from 'next/link'

interface CardProps {
  href: string
  title: string
  description: string
}

const Card: FC<CardProps> = ({ href, title, description: desc }) => {
  return (
    <div className={styles.grid}>
      <Link href={`/${href}`}>
        <a className={styles.card}>
          <h2>{title} &rarr;</h2>
          <p>{desc}</p>
        </a>
      </Link>
    </div>
  )
}

export default Card

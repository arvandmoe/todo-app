import React, { FC } from 'react'
import styles from './Card.module.scss'
import Link from 'next/link'

interface CardProps {
  href: string
  title: string
  description: string
  blankTarget?: boolean
}

const Card: FC<CardProps> = ({
  href,
  title,
  description,
  blankTarget = false,
}) => {
  const card = (
    <a className={styles.card} href={href} target={blankTarget ? '_blank' : ''} rel="noreferrer">
      <h2>{title} &rarr;</h2>
      <p>{description}</p>
    </a>
  )

  if (blankTarget) return card

  return (
    <div className={styles.grid}>
      <Link href={`/${href}`}>{card}</Link>
    </div>
  )
}

export default Card

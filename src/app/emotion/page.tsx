import React from 'react'
import style from './emotion.module.css'

interface Emotion {
  className?: string
}

const Page: React.FC<Emotion> = () => {
  return (
    <div>
      <div className={style.snowflakes} aria-hidden="true">
        <div className="intro">
          {' '}
          Find 250+ Ready to use demo at{' '}
          <a href="https://codeconvey.com">Codeconvey.com</a>
        </div>
        <div className={style.snowflake}>❅</div>
        <div className={style.snowflake}>❅</div>
        <div className={style.snowflake}>❆</div>
        <div className={style.snowflake}>❄</div>
        <div className={style.snowflake}>❅</div>
        <div className={style.snowflake}>❆</div>
        <div className={style.snowflake}>❄</div>
        <div className={style.snowflake}>❅</div>
        <div className={style.snowflake}>❆</div>
        <div className={style.snowflake}>❄</div>
      </div>
    </div>
  )
}

export default Page

import React from 'react'
import style from '../emotion.module.css'

interface Emotion {
  className?: string
}

const Page: React.FC<Emotion> = () => {
  return (
    <div className="z-[-50]">
      <div className={style.snowflakes} aria-hidden="true">
        <div className="intro">
          <a href="https://codeconvey.com"></a>
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

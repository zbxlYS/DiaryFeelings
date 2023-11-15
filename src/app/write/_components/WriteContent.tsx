/*
  Write title, Content Component
*/
'use client'

import React, { useEffect, useState } from 'react'
import '../../write/write.css'
import emotion from '../../write/3_love.png'
import Image from 'next/image'

const WriteContent = () => {
  // get today's date
  const today = new Date()
  const formattedDate = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`

  // select date from calendar
  const [value, onChange] = useState(new Date())

  return (
    /* write content area */
    <div className="write-cont">
      <textarea placeholder="content"></textarea>
    </div>
  )
}

export default WriteContent

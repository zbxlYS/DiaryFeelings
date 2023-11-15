/*
  Write title Component
*/
'use client'

import React, { useEffect, useState } from 'react'
import '../../write/write.css'
import 'react-datepicker/dist/react-datepicker.css'
import SelectDate from './SelectDate'
import SelectEmotion from './SelectEmotion'

const WriteTitle = () => {
  return (
    /* selelct emtion, date, title */

    <div className="write-header">
      <SelectEmotion />
      <SelectDate />
    </div>
  )
}

export default WriteTitle

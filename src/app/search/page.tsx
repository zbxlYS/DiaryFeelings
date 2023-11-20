'use client'

import { useTheme } from 'next-themes'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { userInfo } from '@/app/lib/atoms/atom'
import axios from 'axios'
import { IDiary } from '../types/type'
import { useSearchParams } from 'next/navigation'

const Search = () => {
  const params = useSearchParams()
  const id = params.get('userId') as string
  const keyword = params.get('keyword') as string
  const [total, setTotal] = useState(6)
  const [view, setView] = useState<IDiary[]>([])
  const getDiary = async () => {
    const result = await axios.get(
      `/api/search?userId=${id}&keyword=${keyword}`,
    )
    const data = result.data
    console.log(data)
    setTotal((prev) => data.total)
    setView((prev) => data.result)
  }
  useEffect(() => {
    getDiary()
  }, [])
  return (
    <div className="flex flex-wrap w-[1280px] justify-start mt-[30px]">
      {id}
    </div>
  )
}

export default Search

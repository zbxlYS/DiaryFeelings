'use client'

import React, { ChangeEvent, useEffect, forwardRef, useState } from 'react'
import axios from 'axios'
import { IDiary } from '../types/type'
import { useSearchParams } from 'next/navigation'
import DiaryLayout from './_component/DiaryLayout'
import Pagination from '../diary/_components/Pagination'

const Search = () => {
  const params = useSearchParams()
  const curDate = new Date()
  curDate.setFullYear(curDate.getFullYear() - 1)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(6)
  const [view, setView] = useState<IDiary[]>([])
  const [search, setSearch] = useState(false)
  const curPage = params.get('page') as string

  const id = params.get('userId') as string
  const keyword = params.get('keyword') as string

  useEffect(() => {
    setPage((prev) => Number(curPage))
  }, [curPage])

  useEffect(() => {})

  const getDiary = async () => {
    const result = await axios.get(
      `/api/search?userId=${id}&keyword=${keyword}&page=${curPage}`,
    )
    const data = result.data
    setTotal((prev) => data.total)
    setView((prev) => data.result)

    data.result.length != 0 ? setSearch(true) : setSearch(false)
  }

  useEffect(() => {
    getDiary()
  }, [id, keyword])

  return (
    <div className="w-full h-full mt-[20px] flex flex-col justify-center items-center">
      <div className=" h-[50px] rounded-md flex justify-around items-center self-start ml-[110px] mb-[50px]">
        <div>
          "{keyword}" 에 대한 검색 결과 ({total}개)
        </div>
      </div>
      <div className="flex flex-wrap w-[1280px] justify-start mt-[30px]">
        {search ? (
          view.map((data: IDiary, index: number) => (
            <DiaryLayout key={data.diary_number} data={data} />
          ))
        ) : (
          <div>검색 결과가 없어요😥 검색어를 다시 한 번 확인해 주세요</div>
        )}
      </div>
      <Pagination total={total} limit={6} page={page} />
    </div>
  )
}
export default Search

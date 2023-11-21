'use client'
import { notFound } from 'next/navigation'
interface Props {
  id: string
}

const DiaryDetail = ({ params }: { params: Props }) => {
  const num = parseInt(params.id)
  // 숫자로 변환했는데 NaN이면 없는 페이지.
  if (isNaN(num)) {
    notFound()
  }
  return <div>자세히 보기</div>
}

export default DiaryDetail

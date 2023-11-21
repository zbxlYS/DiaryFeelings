'use client'

interface Props {
  id: string
}

const DiaryDetail = ({ params }: { params: Props }) => {
  console.log(params.id)
  return <div>자세히 보기</div>
}

export default DiaryDetail

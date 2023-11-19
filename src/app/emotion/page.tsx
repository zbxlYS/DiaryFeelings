'use client'

import React, { useState, useRef, useEffect } from 'react'
import BarChart from './_components/BarChart'
import Snow from './_components/Snow'
import {
  Avatar,
  Image,
  Button,
  Textarea,
  Link,
  Tooltip,
  Switch,
} from '@nextui-org/react'
import { useRecoilState } from 'recoil'
import { userInfo } from '@/app/lib/atoms/atom'
import { IDiary } from '@/app/types/type'
import { useMediaQuery } from 'react-responsive'
import axios from 'axios'
import { DoughnuChart } from './_components/DoughnuChart'

// img 상태의 타입을 정의하는 인터페이스

interface IImg {
  image_src: string
  diary_title: string
  updated_at: string
  diary_content: string // 이 부분을 추가
  user_name: string // 이 부분을 추가
  user_id: string // 이 부분을 추가
  // 추가적인 필요한 속성들을 여기에 추가
}
interface ImageGalleryProps {
  showCount: number
}
const emotionImg: {
  [key: string]: string | { src: string; text?: string; emo?: string }
} = {
  행복: { src: '/3_love.png', text: '늘 행복해 :)', emo: '행복' },
  놀람: { src: '/happy.png', text: '엄마야!', emo: '놀람' },
  분노: { src: '/angry.png', text: '너무 화가난다아', emo: '분노' },
  슬픔: { src: '/sad.png', text: '너무 슬퍼 :(', emo: '슬픔' },
  불안: { src: '/depress.png', text: '너무 불안불안..', emo: '불안' },
  중립: { src: '/nothinking.png', text: '나는 아무생각이없어', emo: '중립' },
  // 추가적인 감정과 이미지 경로는 여기에 계속 추가하세요
}
function formatDateString(dateString: string): string {
  const formattedDate = dateString.substring(0, 10) // "yyyy-mm-dd" 부분 추출
  return formattedDate
}
const page = () => {
  const [user, setUser] = useRecoilState(userInfo)
  const [view, setView] = useState<IDiary[]>([])
  const [imgView, setImgView] = useState<IImg[]>([]) // 일기 이미지주소
  const [datePart, setDatePart] = useState<string>() //시간
  console.log(emotionImg.놀람)

  // API 주소를 env 파일에서 가져오기
  console.log(imgView)
  // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 fetchData 함수 호출
  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      // API 주소를 절대 경로로 쓰기
      const response = await axios.get<{
        imgrows: IImg[]
        result: IDiary[]
      }>(`/api/emotion`)
      const data = response.data // Axios already parses the JSON

      if (response.status === 200) {
        // Handle successful response
        console.log('Data:', data.result)
        console.log('imgrows', data.imgrows)
        setDatePart(
          new Date(data.result[0].created_at).toISOString().split('T')[0],
        )
        // view 상태를 업데이트하기
        setView(data.result)
        // const imgViewtest = data.imgrows.slice(0, 6).map((img) => img.image_src)
        setImgView(data.imgrows)
      } else {
        // Handle API error
        console.error('API error:', data)
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Network error:', error)
    }
  }

  // 이미지 개수
  const isLargeScreen = useMediaQuery({ minWidth: 2300 })
  // 화면 크기가 1500px 이상이고 1900px 미만인지 확인하는 변수
  const isMediumScreen = useMediaQuery({ minWidth: 1500, maxWidth: 1800 })
  const isSmallScreen = useMediaQuery({ minWidth: 1024, maxWidth: 1499 })
  const isSSmallScreen = useMediaQuery({ maxWidth: 1000 })
  // 보여줄 이미지 개수를 상태로 관리하는 변수
  const [showCount, setShowCount] = useState(5)
  const maxLength = 30
  // 화면 크기가 변경될 때마다 보여줄 이미지 개수를 업데이트하는 함수
  useEffect(() => {
    if (isLargeScreen) {
      setShowCount(5)
    } else if (isMediumScreen) {
      setShowCount(4)
    } else if (isSmallScreen) {
      setShowCount(3)
    } else if (isSSmallScreen) {
      setShowCount(2)
    }
  }, [isLargeScreen, isMediumScreen, isSmallScreen])
  // 그래프 함수

  const [graph, setGraph] = useState<boolean>(true)
  const graphclick = () => {
    setGraph(!graph)
  }
  return (
    <>
      <Snow></Snow>
      <div className="h-[160vh]">
        {/* 일기목록 */}
        <div className="flex flex-col items-center ">
          <h1 className="w-auto flex items-start justify-start mt-20 mb-9 text-xxxl">
            ✏️ 최근 일기목록
          </h1>
          <span className="opacity-70">
            최근 5일동안 작성한 일기를 볼수 있어요
          </span>
          {/* 최근 일기목록  */}
          <div className="w-5/6 h-[23rem] flex flex-row justify-center  mt-5 overscroll-none ">
            {/* =============================
              
              일기 내용 들어갈 부분
              - 이미지
              - 제목
              - 내용
              - 유저 이미지
              - 유저 네임
              - 날짜 

              =============================
          */}
            {imgView.slice(0, showCount).map(
              (src, index) =>
                // 보여줄 이미지 개수만큼만 렌더링하기
                index < showCount && (
                  <div
                    key={index}
                    className="w-[20rem] h-[20rem] bg-white mb-10 rounded-2xl ml-4 mr-5  mt-5 shadow-lg border border-neutral-200 hover:scale-105 transition-transform duration-400 overscroll-none"
                  >
                    <Image
                      isZoomed
                      src={src.image_src}
                      className="w-[20rem] h-[10rem] rounded-none"
                    />
                    <div className="mt-3 ml-4 mr-4">
                      <h1 className="text-lg mb-2">{src.diary_title}</h1>

                      <span className="opacity-70">
                        {src.diary_content.length > maxLength
                          ? src.diary_content.slice(0, maxLength) + '...'
                          : src.diary_content}
                      </span>
                      <div className="flex flex-row mt-2">
                        <div className="w-10 h-10 rounded-full border mr-4 mt-1"></div>
                        <div className="flex flex-col">
                          <span>{src.user_name}</span>
                          <span className="opacity-70 mb-3">
                            {formatDateString(src.updated_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
            )}
            {/* 일기 내용 끝  */}
          </div>

          {/* =============================

                사용자 정보 부분 
                
              ===========================*/}
        </div>
        <div className="flex justify-center items-center flex-col mt-10 mb-10">
          <h1 className="text-xxl">{user.name}님 감정정보 </h1>
          <span className="max-w-[30rem] mt-10 opacity-70">
            아래는 최근 한 달 동안의 감정을 기록하는 내용입니다: 한 달 동안의
            다양한 경험과 감정을 기록해보세요. :)
          </span>
        </div>
        {/* 사용자 컨테이너*/}
        <div className="flex justify-center flex-row ">
          <div className="flex flex-row justify-center w-5/6">
            {/* 사용자 정보  */}

            <div className="flex flex-col justify-center ">
              <div className="w-11/12 min-w-[18rem] mr-10 bg-white opacity-90 rounded-xl shadow-xl border border-neutral-200">
                <div className="flex items-center flex-col">
                  <Avatar
                    src="/yuumi.jpg"
                    className="w-[10rem] h-[10rem] text-large m-10"
                  />
                </div>

                <h1 className="text-xl ml-5 mb-1">{user.name} 님</h1>
                <span className="ml-5 opacity-80 ">{user.id}</span>
                <div className="mt-3">
                  <Textarea
                    label="Description"
                    variant="bordered"
                    placeholder="다짐과 목표를 적어보세요"
                    disableAnimation
                    disableAutosize
                    classNames={{
                      base: 'max-w-xs',
                      input: 'resize-y min-h-[10rem]',
                    }}
                  />
                </div>
                <div className="flex justify-end">
                  <Button color="primary" variant="flat" radius="sm" size="sm">
                    변경
                  </Button>
                </div>
                <div className="flex justify-center mt-10 mb-5">
                  <Button
                    color="default"
                    variant="faded"
                    className="flex justify-end items-center "
                  >
                    <Link href="#" color="foreground" showAnchorIcon>
                      정보 수정하기
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            {/* 막대그래프 차트 */}

            <div
              className={`w-8/12 max-w-[65rem] min-w-[40rem]   flex items-center justify-center bg-white opacity-90 rounded-xl shadow-xl relative  border border-neutral-200 ${
                graph ? '' : 'h-[50rem]'
              }`}
            >
              <div className="absolute top-0 left-0">
                <Switch defaultSelected onClick={graphclick}>
                  그래프 변경
                </Switch>
              </div>
              <div
                className={`absolute top-10 w-full ${
                  graph
                    ? ''
                    : 'h-[40rem] flex flex-col justify-center items-center mt-10 ml-10 mr-10'
                } `}
              >
                {graph ? <BarChart></BarChart> : <DoughnuChart></DoughnuChart>}
                <div
                  className={`flex flex-row ml-10 just justify-around ${
                    graph ? '' : 'mt-5 ml-3 mr-3'
                  }`}
                >
                  {' '}
                  {Object.entries(emotionImg).map(([key, value]) => (
                    <>
                      {' '}
                      <Tooltip
                        key={key}
                        placement="top"
                        content={
                          typeof value === 'string' ? key : value.text || key
                        }
                        color="default"
                        delay={0}
                        closeDelay={0}
                        motionProps={{
                          variants: {
                            exit: {
                              opacity: 0,
                              transition: {
                                duration: 0.1,
                                ease: 'easeIn',
                              },
                            },
                            enter: {
                              opacity: 1,
                              transition: {
                                duration: 0.15,
                                ease: 'easeOut',
                              },
                            },
                          },
                        }}
                      >
                        <Image
                          src={typeof value === 'string' ? value : value.src}
                          className="w-full mt-1 "
                          width={70}
                          height={70}
                        ></Image>
                      </Tooltip>
                      {graph ? (
                        ''
                      ) : (
                        <span className="mt-5 mr-3 opacity-90">
                          {typeof value === 'string' ? (
                            ''
                          ) : (
                            <span>{value.emo}</span>
                          )}
                        </span>
                      )}
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page

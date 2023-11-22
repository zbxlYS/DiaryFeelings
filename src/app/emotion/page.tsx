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
  diary_userEmo: string
  diary_number: string
  image_src: string
  diary_title: string
  updated_at: string
  diary_content: string // 이 부분을 추가
  user_name: string // 이 부분을 추가
  user_id: string // 이 부분을 추가
  src: string
  // 추가적인 필요한 속성들을 여기에 추가
}
type EmotionImg = {
  [key: string]: {
    src?: string | any | undefined | null
    text?: string
    emo?: string
  }
}

// 사용자 감정 모음
const emotionImg: EmotionImg = {
  행복: { src: '/3_love.png', text: '늘 행복해 :)', emo: '행복' },
  놀람: { src: '/happy.png', text: '엄마야!', emo: '놀람' },
  분노: { src: '/angry.png', text: '너무 화가난다아', emo: '분노' },
  슬픔: { src: '/sad.png', text: '너무 슬퍼 :(', emo: '슬픔' },
  불안: { src: '/depress.png', text: '너무 불안불안..', emo: '불안' },
  중립: { src: '/nothinking.png', text: '나는 아무생각이없어', emo: '중립' },
}

// 사용자 날씨 정보
const weather: EmotionImg = {
  맑음: { src: '/cloudy.png', emo: '맑음' },
  흐림: { src: '/cloudy.png', emo: '흐림' },
  눈: { src: '/cloudy.png', emo: '눈' },
  비: { src: '/cloudy.png', emo: '비' },
  바람: { src: '/cloudy.png', emo: '바람' },
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
  // console.log(emotionImg.놀람)
  // console.log('imgView', imgView)
  // console.log(user)

  // API 주소를 env 파일에서 가져오기
  // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 fetchData 함수 호출
  useEffect(() => {
    if (user.id) {
      fetchData()
    }
  }, [user.id])

  async function fetchData() {
    if (!user.id) return
    try {
      // API 주소를 절대 경로로 쓰기
      const response = await axios.get<{
        imgrows: IImg[]
        result: IDiary[]
      }>(`/api/emotion?userId=${user.id}`)
      const data = response.data // Axios already parses the JSON

      if (response.status === 200) {
        // Handle successful response

        // console.log('Data:', data.result)
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
  const isLargeScreen = useMediaQuery({ minWidth: 2100 })
  // 화면 크기가 1500px 이상이고 1900px 미만인지 확인하는 변수
  const isMediumScreen = useMediaQuery({ minWidth: 1600, maxWidth: 2000 })
  const isSmallScreen = useMediaQuery({ minWidth: 1024, maxWidth: 1599 })
  const SmallScreen = useMediaQuery({ maxWidth: 1023 })
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
    } else if (SmallScreen) {
      setShowCount(2)
    }
  }, [isLargeScreen, isMediumScreen, isSmallScreen, SmallScreen])
  // 그래프 함수

  const [graph, setGraph] = useState<boolean>(true)
  const graphclick = () => {
    setGraph(!graph)
  }

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNextButtonClick = () => {
    // 현재 인덱스가 이미지 배열 길이보다 작을 때만 다음 일기로 이동
    if (currentIndex < imgView.length - showCount) {
      setCurrentIndex(currentIndex + 1)
    }
  }
  const handlePrevButtonClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <>
      <Snow></Snow>
      <div className="h-[160vh] ">
        {/* 일기목록 */}
        <div className="flex flex-col items-center ">
          <h1 className="w-auto flex items-start justify-start mt-20 mb-9 text-xxxl">
            ✏️ 최근 일기목록
          </h1>
          <span className="opacity-70">
            최근 5일동안 작성한 일기를 볼수 있어요
          </span>
          {/* 최근 일기목록  */}
          <div className={'h-[23rem] flex flex-row justify-center mt-5 '}>
            <div className="flex flex-row mt-5 opacity-60 hover:opacity-100">
              <button>
                <Image
                  src="/arrow-left.png"
                  className="w-7 "
                  onClick={handlePrevButtonClick}
                ></Image>
              </button>
            </div>

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

            {imgView.slice(currentIndex, currentIndex + showCount).map(
              (src, index) =>
                // 보여줄 이미지 개수만큼만 렌더링하기
                index < showCount && (
                  <div
                    key={src.diary_number}
                    className="relative w-[20rem] h-[21rem] bg-white mb-10 rounded-2xl ml-4 mr-5  mt-5 shadow-lg border border-neutral-200  hover:scale-105 transition-transform duration-400 cursor-grab "
                  >
                    <div className="absolute right-3 top-[8.3rem] flex items-center justify-center  w-14 h-14 border border-neutral-100 rounded-full z-50 bg-white">
                      <Image
                        // 추가할곳
                        src={
                          // src.diary_userEmo
                          //   ? emotionImg[src.diary_userEmo]?.src
                          //   : '/happy.png'
                          '/happy.png'
                        }
                        className="w-12 h-12"
                      ></Image>
                    </div>
                    <Image
                      isZoomed
                      radius="none"
                      src={src.image_src}
                      className="w-[20rem] h-[10rem] rounded-t-xl"
                    />
                    {/* 사용자 이모지  */}

                    <div className="mt-4 ml-4 mr-4">
                      <h1 className="text-lg mb-5">{src.diary_title}</h1>
                      <span className="opacity-70 overflow-x-auto ">
                        {src.diary_content.length > maxLength
                          ? src.diary_content.slice(0, maxLength) + '...'
                          : src.diary_content}
                      </span>
                      {/* 일기 날씨  추가할곳*/}{' '}
                      <div className="absolute right-4 mb-10 w-12 h-12 ">
                        <Image
                          src={
                            // src.diary_weather
                            //   ? weathre[src.diary_weather]?.src
                            //   : '/happy.png'
                            '/cloudy.png'
                          }
                        ></Image>{' '}
                      </div>
                      <div className="flex flex-row mt-5">
                        <div className="flex flex-row ">
                          {/* 일기 날짜 */}
                          <span className="opacity-70 mb-3">
                            {formatDateString(src.updated_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
            )}
            <div className="flex flex-row mt-5 opacity-60 hover:opacity-100">
              <button>
                <Image
                  src="/arrow-right.png"
                  className="w-7 opacity-50 ml"
                  onClick={handleNextButtonClick}
                ></Image>
              </button>
            </div>

            {/* 일기 내용 끝  */}
          </div>
          {/* 버튼을 눌렀을 때 다음 일기로 넘어가기 */}

          {/* =============================

                사용자 정보 부분 
                
              ===========================*/}
        </div>
        <div className="flex justify-center items-center flex-col mt-16 mb-10">
          <h1 className="text-xxl">{user.name}님 감정정보 </h1>
          <span className="max-w-[30rem] mt-7 opacity-70">
            아래는 최근 한 달 동안의 감정을 기록하는 내용입니다: 한 달 동안의
            다양한 경험과 감정을 기록해보세요. :)
          </span>
        </div>
        {/* 사용자 컨테이너*/}
        <div className="flex justify-center flex-row ">
          <div className="flex flex-row justify-center w-5/6">
            {/* 사용자 정보  */}

            <div className="flex flex-col justify-center ">
              <div className="w-11/12 min-w-[18rem] h-[44rem] mr-10 bg-white opacity-90 rounded-xl shadow-xl border border-neutral-200">
                <div className="flex items-center flex-col">
                  <Avatar
                    src="/yuumi.jpg"
                    className="w-[10rem] h-[10rem] text-large m-10"
                  />
                </div>

                <h1 className="text-xl ml-5 mb-1">{user.name} 님</h1>
                <span className="ml-5 opacity-70 ">{user.id}</span>
                <div className="mt-3">
                  <Textarea
                    label="Description"
                    variant="bordered"
                    placeholder="다짐과 목표를 적어보세요"
                    disableAnimation
                    disableAutosize
                    classNames={{
                      base: 'max-w-xs',
                      input: 'resize-y min-h-[13rem]',
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
              className={`w-8/12 max-w-[65rem] min-w-[40rem] flex items-center justify-center bg-white opacity-90 rounded-xl shadow-xl relative  border border-neutral-200 ${
                graph ? '' : 'h-[44rem]'
              }`}
            >
              <div className="absolute top-0 left-0 flex flex-row mt-4 ml-4">
                <Switch
                  defaultSelected
                  onClick={graphclick}
                  color="secondary"
                  className="opacity-70"
                ></Switch>
                <h1 className="text-sm mt-1 opacity-80">그래프변경</h1>
              </div>
              <div
                className={`absolute w-full ${
                  graph
                    ? 'top-[5rem]'
                    : 'top-12 h-[35rem] flex flex-col justify-center items-center mt-10 ml-10 mr-10'
                } `}
              >
                {graph ? (
                  <BarChart view={view}></BarChart>
                ) : (
                  <DoughnuChart view={view}></DoughnuChart>
                )}
                <div
                  className={`flex flex-row ml-10 just justify-around ${
                    graph ? '' : 'mt-5 ml-3 mr-3'
                  }`}
                >
                  {' '}
                  {Object.entries(emotionImg).map(([key, value]) => (
                    <React.Fragment key={key}>
                      {' '}
                      <Tooltip
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
                    </React.Fragment>
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

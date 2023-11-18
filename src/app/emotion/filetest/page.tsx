// 'use client'
// import React from 'react'
// import Carousel from 'react-multi-carousel'
// import 'react-multi-carousel/lib/styles.css'
// import MovieCard from '../_components/MovieCard'

// interface Movie {
//   id: number
//   // 다른 필드들도 추가할 수 있습니다.
// }

// interface MovieSlideProps {
//   name: string
//   movies: Movie[]
// }

// const MovieSlide: React.FC<MovieSlideProps> = ({ name, movies }) => {
//   const responsive = {
//     superLargeDesktop: {
//       breakpoint: { max: 4000, min: 3000 },
//       items: 5,
//     },
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 5,
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 2,
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1,
//     },
//   }

//   return (
//     <div className="movie-slide">
//       <h1></h1>
//     </div>
//   )
// }

// export default MovieSlide
// import React, { useState, useRef } from 'react'
// import axios from 'axios'
// import { useSession } from 'next-auth/react'
// import Snow from '../_components/Snow'
// import { Input, Textarea, Button } from '@nextui-org/react'
// const Page = () => {
//   const { data: session } = useSession()

//   //제목
//   const titleRef = useRef<HTMLInputElement>(null)
//   // 내용
//   const contentRef = useRef<HTMLTextAreaElement>(null)

//   const send = async () => {
//     const formData = new FormData()

//     // titleRef.current와 contentRef.current가 null이 아닌지 확인
//     if (titleRef.current && contentRef.current) {
//       formData.append('title', titleRef.current.value)
//       formData.append('content', contentRef.current.value)
//       formData.append('id', session?.user?.id as string)

//       console.log(formData)

//       try {
//         const response = await axios.patch('/api/diary', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         })
//         // 서버 응답을 처리할 수 있는 코드 추가
//         console.log(response.data)
//       } catch (error) {
//         // 오류 처리
//         console.error('Error:', error)
//       }
//     } else {
//       console.warn('titleRef.current or contentRef.current is null')
//     }
//   }

//   return (
//     <div>
//       <Snow />
//       <div className="flex w-[15rem] flex-wrap md:flex-nowrap gap-4 mb-5">
//         {' '}
//         <Input type="email" label="Title" ref={titleRef} />
//       </div>
//       <div className="w-full grid grid-cols-12 gap-4 mb-5">
//         <Textarea
//           variant="bordered"
//           label="Description"
//           labelPlacement="outside"
//           placeholder="Enter your description"
//           className="col-span-12 md:col-span-6 mb-6 md:mb-0 "
//           ref={contentRef}
//         />
//       </div>
//       <div className="flex flex-wrap gap-4 items-center">
//         <Button color="default" variant="bordered" onClick={send}>
//           Bordered
//         </Button>{' '}
//       </div>
//     </div>
//   )
// }

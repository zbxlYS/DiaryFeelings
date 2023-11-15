// MyApp.tsx
'use client'
import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import moment, { MomentInput } from 'moment'
import Modal from 'react-modal'
import axios from 'axios'

function MyApp() {
  const [value, onChange] = useState<Date | Date[]>(new Date())
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [emotionSticker, setEmotionSticker] = useState<string>('')

  const imageSrc = './KakaoTalk_20231109_164231435.png'

  useEffect(() => {
    const fetchUserDataFromDB = async () => {
      try {
        const dateValue = Array.isArray(value)
          ? (value as Date[])[0]
          : (value as Date)
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/test/`,
          {
            data: moment(dateValue).format('YYYY-MM-DDTHH:mm:ss'),
          },
        )
        const data = await response.data

        // data.result

        const userEmotionData = data.emotion

        setEmotionSticker(userEmotionData)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserDataFromDB()
  }, [value])

  const showSticker = () => {
    return !!emotionSticker
  }

  const getStickerSrc = () => {
    return emotionSticker || imageSrc
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (
    <div>
      <Calendar
        onChange={onChange as any}
        formatDay={(locale, date) => moment(date).format('DD')}
        value={value as any}
        minDetail="month"
        maxDetail="month"
        navigationLabel={undefined as any}
        showNeighboringMonth={false}
        className="mx-auto w-full text-sm border-b"
        tileContent={({ date, view }: any) => {
          let html: JSX.Element[] = []

          if (showSticker()) {
            html.push(
              <img
                key={date.toString()}
                src={getStickerSrc()}
                alt="Custom Image"
                className="h-8 w-8 ml-1"
                onClick={openModal}
              />,
            )
          }

          return (
            <div className="flex justify-center items-center absoluteDiv">
              {html}
            </div>
          )
        }}
      />
      <div className="text-gray-500 mt-4">
        {moment(value as Date).format('YYYY년 MM월 DD일')}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Custom Image Modal"
      >
        <img src={getStickerSrc()} alt="Custom Image" />
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
  )
}

export default MyApp

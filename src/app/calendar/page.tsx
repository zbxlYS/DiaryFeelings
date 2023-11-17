// Page.tsx
"use client"
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 
import './test.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type ModalCalendarProps = {
  isOpen: boolean;
  closeModal: () => void;
};

interface YourEmotionDataItem {
  user_id: string;
  date: string;
  diary_emotion: string | { [key: string]: string };
}

const ModalCalendar: React.FC<ModalCalendarProps> = ({ isOpen, closeModal }) => {
  const [emotionData, setEmotionData] = useState<YourEmotionDataItem[]>([]);
  const [value, onChange] = useState<Value>(new Date());
  const router = useRouter();

  const fetchDataFromDatabase = async () => {
    try {
      const response = await axios.get<{ result: YourEmotionDataItem[] }>('/api/cal');
      const { result } = response.data;
      console.log(result)
      const emotionDataArray = result || [];
      console.log('Emotion data from API:', emotionDataArray);
      setEmotionData(emotionDataArray.map((item: any) => ({
        ...item,
        date: moment(item.diary_userDate).format('YYYY-MM-DD'),
        diary_emotion: typeof item.diary_emotion === 'string' ? JSON.parse(item.diary_emotion) : item.diary_emotion
      })));
    } catch (error) {
      console.error('Error fetching data from the database:', error);
    }
  };

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  const dayClick = (value: Date, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const formattedDate = moment(value).format('YYYY-MM-DD');
    router.push(`/write?date=${formattedDate}`);
    closeModal();
  };

  const getEmotionImage = (emotionValue: string | { [key: string]: string }): string | null => {
    if (typeof emotionValue === 'string') {
      const emotionImages: { [key: string]: string } = {
        "행복": './happy.png',
        "분노": './angry.png',
        "우울": './depress.png',
        "슬픔": './sad.png',
        "불안": './nervous.png',
        "중립": './nothinking.png',
        "기쁨": './joy.png'
      };
  
      return emotionImages[emotionValue] || null;
    } else if (typeof emotionValue === 'object') {
      const key = Object.keys(emotionValue)[0];
      const emotionImages: { [key: string]: string } = {
        "행복": './happy.png',
        "분노": './angry.png',
        "우울": './depress.png',
        "슬픔": './sad.png',
        "불안": './nervous.png',
        "중립": './nothinking.png',
        "기쁨": './joy.png'
      };
  
      return emotionImages[key] || null;
    }
  
    return null;
  };

  const handleMarking = (date: Date, view: any) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    
    
    const matchingEmotion = emotionData.find((x) => x.date === formattedDate);
    
    if (matchingEmotion) {
      const emotionValue = matchingEmotion.diary_emotion;
  
      if (typeof emotionValue === 'object') {
        const key = Object.keys(emotionValue)[0];
        const emotionImages: { [key: string]: string } = {
          "행복": './happy.png',
          "분노": './angry.png',
          "우울": './depress.png',
          "슬픔": './sad.png',
        };
  
        if (emotionImages[key]) {
          const html = (
            <div className='dot' key={formattedDate} onClick={() => handleImageClick(formattedDate)}>
              <img src={emotionImages[key]} alt={`${formattedDate}의 이미지`} />
            </div>
          );
  
          return (
            <div className='dot-img'>
              {html}
            </div>
          );
        }
      }
    }
  
    return <div className='dot-img'></div>;
  };
  
  

  const handleImageClick = (date: string) => {
    if (date === moment().format('YYYY-MM-DD')) {
      router.push(`/write?date=${date}`);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Calendar Modal"
    >
      <div>
        <Calendar
          onChange={onChange}
          value={value}
          locale="ko"
          calendarType="gregory"
          formatDay={(locale, date) => moment(date).format('DD')}
          onClickDay={(value, event) => dayClick(value, event)}
          showNeighboringMonth={false}
          tileContent={({ date, view }) => handleMarking(date, view)}
        />
      </div>

      <button
        className="text-2xl p-4"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
        onClick={closeModal}
      >
        x
      </button>
    </Modal>
  );
};

const Page: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button className="text-2xl p-4" onClick={openModal}>
        달력 열기
      </button>

      <ModalCalendar isOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
};

export default Page;

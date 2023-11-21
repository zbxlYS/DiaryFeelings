// Calendar.tsx
"use client"
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import './cal.css';
import { useTheme } from '../context/themeContext';

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
  const { theme } = useTheme();
  const [emotionData, setEmotionData] = useState<YourEmotionDataItem[]>([]);
  const [value, onChange] = useState<Value>(new Date());
  const router = useRouter();

  const fetchDataFromDatabase = async () => {
    try {
      const response = await axios.get<{ result: YourEmotionDataItem[] }>('/api/cal');
      const { result } = response.data;
      console.log(result)
      const emotionDataArray = result || [];
      console.log('API에서 가져온 감정 데이터:', emotionDataArray);
      setEmotionData(emotionDataArray.map((item: any) => ({
        ...item,
        date: moment(item.diary_userDate).format('YYYY-MM-DD'),
        diary_emotion: typeof item.diary_emotion === 'string' ? JSON.parse(item.diary_emotion) : item.diary_emotion
      })));
    } catch (error) {
      console.error('데이터베이스에서 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  const getDestinationUrl = (formattedDate: string) => {
    const matchingEmotion = emotionData.find((x) => x.date === formattedDate);

    if (matchingEmotion) {
      return `/diary?date=${formattedDate}`; // return `/diary/${matchingEmotion.id}`;
    } else {
      return `/write?date=${formattedDate}`;
    }
  };



  const dayClick = (value: Date, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const formattedDate = moment(value).format('YYYY-MM-DD');
    const destinationUrl = getDestinationUrl(formattedDate);
    router.push(destinationUrl);
    closeModal();
  };

const handleMarking = (date: Date, view: 'month' | 'year' | 'decade') => {
  // "century" 값을 포함한 다른 view 값에 대한 처리를 제외합니다.
  if (view !== "month") {
    return null;
  }

  const formattedDate = moment(date).format('YYYY-MM-DD');
  const matchingEmotion = emotionData.find((x) => x.date === formattedDate);

  // 일치하는 감정 데이터가 있고, 현재 보고 있는 뷰가 'month'일 때만 처리합니다.
  if (matchingEmotion) {
    const emotionValue = matchingEmotion.diary_emotion;

    // 감정 데이터가 객체 형태인 경우 처리합니다.
    if (typeof emotionValue === 'object') {
      const key = Object.keys(emotionValue)[0];
      const emotionImages: { [key: string]: string } = {
        "행복": './happy.png',
        "분노": './angry.png',
        "우울": './depress.png',
        "슬픔": './sad.png',
        "불안": './nervous.png',
        "중립": './nothinking.png',
        "기쁨": './joy.png',
        "사랑": './3_love.png'
      };

      if (emotionImages[key]) {
        const html = (
          <div className='dot' key={formattedDate}>
            <img src={emotionImages[key]} alt={`${formattedDate}의 이미지`} />
          </div>
        );
        return <div className='dot-img'>{html}</div>;
      }
    }
  }

  return null;
};

const handleImageClick = (date: string) => {
  const matchingEmotion = emotionData.find((x) => x.date === date);

  if (matchingEmotion) {
    const diaryId = matchingEmotion.user_id; 
    if (diaryId) {
      router.push(`/diary?id=${diaryId}`);
    } else {
      router.push(`/write?date=${date}`);
    }
  } else {
    router.push(`/write?date=${date}`);
  }
};



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Calendar Modal"
      className={theme === 'dark' ? 'dark-mode' : ''}
    >
      <div className={theme === 'dark' ? 'dark-mode' : ''}>
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

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleButtonClick = () => {
    setModalIsOpen(!modalIsOpen);
  };

  useEffect(() => {
    openModal();
  }, []);

  return (
    <div>
      <ModalCalendar isOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
};

export default Page;

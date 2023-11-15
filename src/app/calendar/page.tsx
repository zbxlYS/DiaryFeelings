// Page.tsx
"use client"
import React, { useState } from 'react';
import Modal from 'react-modal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import './test.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const ModalCalendar: React.FC<{ isOpen: boolean; closeModal: () => void }> = ({ isOpen, closeModal }) => {
  const [value, onChange] = useState<Value>(new Date());
  const mark = ['2023-11-24', '2023-12-18', '2024-01-03', '2024-02-04', '2024-04-14', '2024-07-20', '2024-07-28'];
  const router = useRouter();

  const dayClick = (value: Date, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(moment(value).format('YYYY-MM-DD'));
  };

  const handleMarking = (date: Date, view: any) => {
    const html = [];
    if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
      html.push(
        <div className='dot' key={moment(date).format('YYYY-MM-DD')}>
          <img
            src='./kkomul.png'
            alt='kkomul'
            onClick={() => handleImageClick(moment(date).format('YYYY-MM-DD'))}
          />
        </div>
      );
    }
    return <div className='dot-img'>{html}</div>;
  };

  const handleImageClick = (date: string) => {
    router.push(`/write?date=${date}`);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel='Calendar Modal'>
      <div>
       
        <Calendar
          onChange={onChange}
          value={value}
          locale='ko'
          calendarType='gregory'
          formatDay={(locale, date) => moment(date).format('DD')}
          onClickDay={(value, event) => dayClick(value, event)}
          showNeighboringMonth={false}
          tileContent={({ date, view }) => handleMarking(date, view)}
        />
      </div>
     <button
        className='text-2xl p-4'
        style={{ position: 'absolute', top: '10px', right: '10px' }}
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

  return (
    <div>
      <button className='text-2xl p-4' onClick={openModal}>
        달력 열기
      </button>
    
      <ModalCalendar isOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
};

export default Page;

/*
  Write title, Content Component
*/
"use client";

import React, { useEffect, useState } from "react";
import "../../write/write.css";
import emotion from "../../write/3_love.png";
import imagebtn from "../../../../public/image.svg";
import stickerbtn from "../../../../public/sticker.svg";
import calbtn from "../../../../public/calendar.svg";
import Image from "next/image";

const WriteContent = () => {
  // get today's date
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;

  // select date from calendar
  const [value, onChange] = useState(new Date());

  return (
    <div className="write-box">
      {/* left sidebar */}
      <div className="write-sidebar">
        <Image src={imagebtn} alt="image"></Image>
        <Image src={stickerbtn} alt="sticker"></Image>
        <Image src={calbtn} alt="calendar"></Image>
      </div>
      {/* write diary title, content */}
      <div className="write-container">
        {/* selelct emtion, date, title */}
        <div className="write-header">
          <Image className="write-select-img" src={emotion} alt="emotion" />
          <div className="write-tit">
            <div className="write-date">{formattedDate}</div>
            <textarea placeholder="title"></textarea>
          </div>
        </div>
        {/* write content area */}
        <div className="write-cont">
          <textarea placeholder="content"></textarea>
        </div>
      </div>
      {/* diary register button */}
      <div className="write-btn-box">
        <button className="write-btn">일기 등록</button>
      </div>
    </div>
  );
};

export default WriteContent;

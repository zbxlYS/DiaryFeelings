/*
  select date component
*/
"use client";

import React, { useEffect, useState } from "react";
import "../../write/write.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SelectDate = () => {
  // select date from calendar
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  return (
    <div className="write-tit">
      {/* select date */}
      <DatePicker
        className="write-date"
        dateFormat="yyyy.MM.dd" // format of edate
        shouldCloseOnSelect // select date close calendar
        minDate={new Date("2000-01-01")} // can't select before minDate
        maxDate={new Date()} // can't select after maxDate
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        showPopperArrow={false}
      />
      <textarea placeholder="title"></textarea>
    </div>
  );
};

export default SelectDate;

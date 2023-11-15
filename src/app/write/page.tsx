import React from "react";
import WriteContent from "./_components/WriteContent";
import WriteTitle from "./_components/WriteTitle";
import "../write/write.css";
import SideBar from "./_components/SideBar";
const WriteDiary = () => {
  return (
    <div>
      <div className="write-box">
        {/* left sidebar */}
        <SideBar />
        {/* write diary title, content */}
        <div className="write-container">
          {/* selelct emtion, date, title component*/}
          <WriteTitle />
          {/* write content component */}
          <WriteContent />
        </div>
        {/* diary register button */}
        <div className="write-btn-box">
          <button className="write-btn">일기 등록</button>
        </div>
      </div>
    </div>
  );
};

export default WriteDiary;

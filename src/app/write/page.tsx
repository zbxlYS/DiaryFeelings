import React from 'react'
import WriteContent from './_components/WriteContent'
import WriteTitle from './_components/WriteTitle'
const WriteDiary = () => {
  return (
    <div>
      <div className="write-box">
        {/* left sidebar */}
        <div className="write-sidebar">
          <div>img</div>
          <div>sticker</div>
          <div>calendar</div>
          <div>aiImg</div>
        </div>
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
  )
}

export default WriteDiary

'use client'
import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e4e4e4;
  background-color: #f8f9fa;
  padding: 0.3rem 0;
  margin: 0.1rem 0;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const FooterMessage = styled.div`
//   font-weight: bold;
//   font-size: 0.9rem;
//   color: #545e6f;
//   margin-bottom: 0.3rem;
//   margin-left: 0.6rem;
// `;

// const FooterContact = styled.div`
//   font-size: 0.9rem;
//   color: #545e6f;
//   margin: 0.6rem;
// `;



const FooterCopyright = styled.div`
  font-size: 0.9rem;
  color: #545e6f;
  margin: 0.1rem;


a {
    color: blue; /* 원하는 색상으로 변경하세요. */
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <InnerContainer>
        <FooterCopyright>Created with by {''}
        <a href="https://github.com/JS-A-CoreProject/DiaryFeelings" target="_blank" rel="noopener noreferrer">
         Relu Molu
        </a> -인공지능사관학교 ReluMolu에 대해 알고 싶으면 {''}
        <a href="https://github.com/JS-A-CoreProject/DiaryFeelings" target="_blank" rel="noopener noreferrer">
            여기
        </a>를 클릭하세요.  저는 신현진입니다. 훈남이니까 연락주세요 010-9813-5413</FooterCopyright>
      </InnerContainer>
    </FooterWrapper>
  );
};

export default Footer;
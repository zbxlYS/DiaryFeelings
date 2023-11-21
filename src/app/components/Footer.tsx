'use client'
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitterSquare, faInstagramSquare, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';


const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  background-color: white;
  user-select: none;
`;

const TopSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: row; /* 가로로 정렬 */
`;

const Logo = styled.p`
  font-size: 30px;
  font-family: cursive;
  font-style: italic;
  font-weight: 900;
  color: rgb(186, 214, 23);
  margin: 15px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin: 10px 5px;
  text-align: center;
  min-height: 100px; /* 원하는 최소 높이 값으로 설정 */
`;

const H3 = styled.h3`
  font-size: 25px;
  color: #000000;
  margin-bottom: 10px;
  font-weight: 800;
`;

const SectionUl = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
`;

const Li = styled.li`
  margin-bottom: 7px;
`;

const A = styled.a`
  text-decoration: none;

  &:hover {
    color: rgb(219, 153, 26);
  }
`;

const SubscribeForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SubscribeInput = styled.input`
  width: 300px;
  height: 30px;
  color: black;
  text-align: center;
  font-size: 17px;

  &:focus {
    outline: 1.5px solid rgb(219, 153, 26);
  }
`;

const SubscribeSubmit = styled.input`
  margin: 9px auto;
  padding: 8px 20px;
  font-size: 17px;
  background-color: rgb(219, 153, 26);
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: rgb(240, 106, 10);
  }
`;

const HR = styled.hr`
  width: 80%;
  margin: 20px;
  color: rgb(219, 153, 26);
`;

const SocialIcons = styled.div`
  display: flex;
  width: 250px;

  margin: 5px;
  justify-content: space-evenly;
`;

const SectionWithReducedMargin = styled(Section)`
  margin-bottom: 5px; /* 간격을 조절하려는 값으로 설정 */
`;

const Icon = styled(FontAwesomeIcon)`
  color: inherit; /* 기본 아이콘 색상 유지 */
  font-size: 35px;
`;
const CopyrightSpan = styled.span`
  margin: 10px;
`;

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <TopSection>
        <Section className="about-section">
          <Logo>로고</Logo>
          <Section>
            <H3>대표이사</H3>
            <p>신현진, 곽한솔 </p>
          </Section>
          <Section>
            <H3>연락처</H3>
            <p>고객센터: 1588-1588</p>
            <p>대표이사:010-9813-5413</p>
            <p>companyemail@email.com</p>
          </Section>
        </Section>
        <SectionWithReducedMargin className="info-section">
          <H3>법률 관련</H3>
          <SectionUl>
            <Li><A href="#">서비스 약관</A></Li>
            <Li><A href="#">개인정보처리지침</A></Li>
            <Li><A href="#">이메일무단수집거부</A></Li>
            <Li><A href="#">저작권 정보</A></Li>
          </SectionUl>
        </SectionWithReducedMargin>
        <Section className="links-section">
          <H3>커뮤니티</H3>
          <SectionUl>
            <Li><A href="#">GitHub</A></Li>
            <Li><A href="#">블로그</A></Li>
            <Li><A href="#">가이드</A></Li>
            <Li><A href="#">자주 묻는 질문</A></Li>
          </SectionUl>
        </Section>
        <Section className="subscribe-section">
          <H3>SNS</H3>
          <SocialIcons>
           <A href="https://www.facebook.com/"><Icon icon={faFacebookSquare} /></A>
           <A href="https://twitter.com/"><Icon icon={faTwitterSquare} /></A>
           <A href="https://www.instagram.com/"><Icon icon={faInstagramSquare} /></A>
           <A href="https://www.youtube.com/"><Icon icon={faYoutubeSquare} /></A>
      </SocialIcons>
        </Section>
      </TopSection>
      <HR />
     
      <CopyrightSpan> CopyRight &copy; website.com 2023</CopyrightSpan>
    </FooterWrapper>
  );
};

export default Footer;
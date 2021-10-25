import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    width: 60px;
    height: 60px;
    background: #3982d8;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    position: fixed;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
`

const Button = styled.button`
    width: 60px;
    height: 60px;
    background: #3982d8;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border: none
`

const TextWrapper = styled.div`
    position: absolute;
    bottom: 75px;
    left: -200px;
    background: #fff;
    box-shadow: 0px 10px 20px 0px rgba(16, 53, 137, 0.2);
    border-radius: 20px;
    padding: 20px;
    text-align: left;
`
const TitleText = styled.p`
    font-size: 18px;
    letter-spacing: -0.05em;
    font-weight: 600;
    color: #565360;
`
const DescriptionText = styled.p`
    margin-top: 10px;
    font-size: 14px;
    color: #565360;
    letter-spacing: -0.05em;
    line-height: 20px;
`

const HightLightText = styled.span`
      background: #fffc00;
`

const TailDiv = styled.div`
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 0px 0px 11px 11px;
    border-color: #fff transparent;
    display: block;
    z-index: 10000;
    bottom: 64px;
    right: 40px;
    transform: rotate(-90deg);
`

const Index = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <Container>
      <Button 
          onClick={()=>setVisible(!visible)}
      >
        <img
          src={require("assets/images/skip_ellipsis.png").default}
          alt="skip btn"
        />
        {visible?
        <>
        <TextWrapper>
            <TitleText>보안 프로그램</TitleText>
            <DescriptionText>
              안전한 서비스 이용을 위하여
              <br />
              <HightLightText>필수 보안프로그램</HightLightText>을 설치하세요.
            </DescriptionText>
            <Link href="#">
              바로가기
              <img
                src={
                  require("assets/images/tooltip_right_arrow.png").default
                }
                alt="tooltip arrow"
              />
            </Link>
        </TextWrapper>
        <TailDiv/>
        </>: null}
      </Button>
    </Container>
  );
};

export default Index;

import React from "react";
import styled from "styled-components";

const ToggleWrapper = styled.label`
  margin-bottom: 0px;
  justify-content: center;
  align-items: center;
`;

const ToggleInput = styled.input`
  position: absolute;
  left: -9999px;
  top: -9999px;

  &:checked + span {
    background-color: #3982d8;

    &:before{
      left: calc(100% - 2px);
      transform: translateX(-100%);
    }
  }
`;

const Slider = styled.span`
  display: flex;
  cursor: pointer;
  width: 50px;
  height: 25px;
  margin-right:0px;
  border-radius: 100px;
  background-color: #bfbfbf;
  position: relative;
  transition: background-color 0.2s;

  &:before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 21px;
    height: 21px;
    border-radius: 45px;
    transition: 0.2s;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 35, 11 0.2);
  }
`;


const Toggle = ({onChange, useFlg}) => {
  return (
    <ToggleWrapper>
      <ToggleInput type="checkbox" onChange={onChange} checked={useFlg}/>
      <Slider/>
    </ToggleWrapper>
  );
};


export default Toggle
import styled from "styled-components";


const DEFAULT_PADDING = 16;
const ICON_SIZE = 8;
const LEVEL_SPACE = 16;

export const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #ccc;
  padding: 0 5px 0 5px;
`;

export const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border-radius: 0.25rem;

  .justify-content {
    justify-content: space-between !important;
  }
`;

export const ListItemWrapper = styled.li`
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  padding-left: ${(props) =>
    DEFAULT_PADDING + ICON_SIZE + props.level * LEVEL_SPACE + "px"};
  box-shadow: ${(props) => (props.focused ? "0px 0px 5px 0px #222" : "none")};
  ${(props) => (props.focused ? "color: white;" : "")};
  ${(props) => (props.focused ? "background-color: #179ed3;" : "")};
  ${(props) => (props.focused ? "border-bottom: none;" : "")};
  z-index: ${({ focused }) => (focused ? 9 : "unset")};
  cursor: pointer;
`;

export const DetailWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const DetailDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${props=>props.hasNodes? `padding-left: 18px;`:null}
`;


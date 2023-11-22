import styled from "styled-components";

export const HeaderContainer = styled.div`
  /* height: 10vh; */
  border: solid 1px #000;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  margin-top: 15px;
  border-radius: 50px;
  padding: 10px;
  width: 70%;
  background-color: #fff;
`;

export const HeaderLink = styled.li`
  font-size: 20px;
  font-weight: bold;
  opacity: 0.6;
  transition: 0.3s;

  &:hover {
    opacity: 1;
    padding: 16px;
    background-color: #eee;
    border-radius: 20px;
  }
`;

export const HeaderNome = styled.p`
  font-size: 20px;
  font-weight: bold;
  opacity: 0.6;
`;

export const LoginLink = styled.p`
  font-size: 20px;
  font-weight: bold;
  opacity: 0.6;
  transition: 0.3s;

  &:hover {
    opacity: 1;
    padding: 16px;
    background-color: #eee;
    border-radius: 20px;
  }
`;

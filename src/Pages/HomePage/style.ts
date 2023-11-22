import styled from "styled-components";

export const Container = styled.div`
  background-image: url("src/assets/home-image.jpg");
  background-size: cover;
  background-position: center center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  color: #edefeb;
  font-family: "Inter Tight", sans-serif;
  font-size: 5rem;
`;

export const Subtitle = styled.h3`
  color: #edefeb;
  font-family: "Inter Tight", sans-serif;
  font-size: 1.4rem;
`;

export const Sub = styled.h3`
  font-family: "Inter Tight", sans-serif;
  font-size: 1.2rem;
`;

export const TextContainer = styled.div`
  width: 70%;
  margin-top: 10rem;
`;

export const PedidoButton = styled.button`
  border-radius: 30px;
  width: 150px;
  height: 60px;
  font-size: 18px;
  font-weight: bold;
  outline: none;
  border: none;
  cursor: pointer;
  color: #757b62;
`;

export const GaleriaTitle = styled.h1`
  font-family: "Inter Tight", sans-serif;
  font-size: 5rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const FaqCard = styled.div`
  background: #edefeb;
  width: 60%;
  padding: 1rem 2rem;
  border-radius: 2rem;
  cursor: pointer;
`;

export const FaqTitle = styled.h3`
  font-family: "Inter Tight", sans-serif;
  color: #320707;
  font-size: 2rem;
`;

export const FaqSubTitle = styled.h3`
  font-family: "Inter Tight", sans-serif;
  color: #320707;
  font-size: 1.2rem;
`;

export const FooterTitle = styled.h2`
  font-family: "Inter Tight", sans-serif;
  color: #320707;
`;

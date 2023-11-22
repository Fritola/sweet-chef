import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  border-radius: 2rem;
`;

export const CardContainer = styled.div`
  display: flex;
`;

export const CardImage = styled.img`
  height: 300px;
  object-fit: cover;
  border-radius: 2rem;
`;

export const CardTitle = styled.h5`
  font-family: "Inter Tight";
  font-size: 2.5rem;
`;

export const CardSubtitle = styled.h6`
  font-family: "Inter Tight";
  font-size: 1.4rem;
`;

export const CardButton = styled.button`
  padding: 15px;
  background-color: #c8e5ed !important;
  border-color: #c8e5ed !important;
  color: #2d7589 !important;
  border-radius: 50px;
  width: 120px;
  border: none;
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 25px;
`;

export const ResumoContainer = styled.div`
  background: #fff;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-radius: 20px;
`;

export const ResumoTitle = styled.h3`
  font-family: "Inter Tight";
  font-size: 2.5rem;
`;

export const ResumoPreco = styled.h3`
  font-family: "Inter Tight";
  font-size: 1.4rem;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  align-items: center;
`;

export const SectionContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

export const SectionTitle = styled.h5`
  font-family: "Inter Tight";
  font-size: 4rem;
  font-weight: bold;
`;

export const SectionSubtitle = styled.h5`
  font-family: "Inter Tight";
  font-size: 1.4rem;
  margin-bottom: 25px;
`;

export const ContainerOptions = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  overflow: scroll;
  margin-bottom: 20px;
`;

export const PedidoButton = styled.button`
  padding: 15px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  color: #000;

  a: {
    color: #000;
  }
`;

export const PaymentSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* max-width: 300px; */
  margin: 20px auto;
  font-family: "Arial", sans-serif;

  label {
    margin-bottom: 8px;
  }

  select {
    padding: 8px;
    margin-bottom: 16px;
  }

  div {
    background-color: #f0f0f0;
    padding: 12px;
    border-radius: 4px;

    p {
      margin: 0;
    }
  }
`;

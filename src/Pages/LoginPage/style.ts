import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Garante que a página ocupe a altura inteira da tela */
  background-color: #eee;
`;

export const Container = styled.div``;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  /* gap: 5px; */
  padding: 30px;
  align-items: center;
`;

export const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
  background-color: #fff;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  max-width: 250px;
  margin-top: 20px;
`;

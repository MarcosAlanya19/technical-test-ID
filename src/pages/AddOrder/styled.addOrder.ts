import { Link } from "react-router-dom";
import styled from "styled-components";

export const Form = styled.div`
  display: flex;
  margin: 5% auto;
  height: 100%;
  justify-content: center;
  align-items: center;

  button {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
    width: 100%;
  }

  label {
    display: block;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 0 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 20rem;
`;

export const PlateContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: start;
  align-items: center;
  margin-bottom: 0.625rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0 0.5rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem 0 0.5rem 0.5rem;
  border: 0.0625rem solid #ccc;
  border-radius: 0.25rem;
  resize: none;
`;

export const LinkStyled = styled(Link)`
  background-color: #f44336;
  color: white;
  padding: 10px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: center;
  text-decoration: none;
`;

export const BtnGroup = styled.div`
  display: grid;
  gap: 1rem;
`;

export const ErrorLabel = styled.label`
  background-color: red;
  color: white;
  font-size: 0.875rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
  text-align: center;
  padding: 0.25rem 0;
`;

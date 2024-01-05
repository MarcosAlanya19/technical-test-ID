import { EStatus } from "@/interface/order.interface";
import { ReactNode } from "react";
import styled from "styled-components";

// ----- CARD -----
export const CardContainer = styled.div`
  background-color: #fff;
  border: 0.0625rem solid #ddd;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-0.3125rem);
  }
`;

// ----- ACTIONSBUTTONS -----
export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.625rem;
  width: 100%;
`;

export const getActionButtonStyles = (name: ReactNode) => {
  let backgroundColor = '#f44336';

  if (name === EStatus.COMPLETADO) {
    backgroundColor = '#4caf50';
  } else if (name === EStatus.PROCESO) {
    backgroundColor = '#3a89c9';
  }

  return backgroundColor;
};

export const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.875rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: ${(props) => getActionButtonStyles(props.children)};

  &:hover {
    background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), ${(props) => getActionButtonStyles(props.children)};
  }
`;
// ------ CARD CONTENT -----
export const ContentContainer = styled.div`
  padding: 1rem;
`;

export const SeparatorLine = styled.div`
  border-top: 1px solid #ccc;
  margin: 5px 0 10px 0;
`;

export const CardName = styled.div`
  display: flex;
`;

export const CardNumber = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin-right: 0.4rem;
`;

export const CardTitle = styled.h2`
  font-size: 1.1rem;
`;

export const CardParragraft = styled.p`
  font-size: 0.8;
  margin-bottom: 0.5rem;
  width: 100%;
`;

export const ContainerParragraft = styled.div`
  width: 100%;
  margin: 1rem 0;
`

export const StatusSpan = styled.span`
  background-color: #4caf50;
  text-transform: uppercase;
  color: #fff;
  font-size: 0.875rem;
  padding: 0.125rem 0.8rem;
  border-radius: 1rem;
  background-color:${(props) => (props.children === EStatus.PENDIENTE ? `#f44336;` : props.children === EStatus.PROCESO ? `#3a89c9;` : `#4caf50`)}; // Cambiado a #000000
`;

// ----- CARDHEADER -----
export const HeaderContainer = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
  text-align: center;
  padding: 1rem;
  font-weight: 700;
  font-size: 1.4rem;
`;

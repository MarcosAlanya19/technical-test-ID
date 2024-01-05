import { Tab } from '@headlessui/react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const HomeContainer = styled.div`
  padding: 1.25rem;
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const BtnStyled = styled(Link)`
  text-decoration: none;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  font-weight: 700;
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 0.3125rem;
  cursor: pointer;
  margin-right: 2rem;
  transition: background-color 0.3s ease;

  @media screen and (max-width: 767px) {
    margin-right: 0rem;
    padding: 0.625rem 1rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.primary_hover};
  }
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: baseline;
  grid-gap: 2rem;


  /* @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  } */
`;

export const MessageContainer = styled.div`
  padding: 10px;
  background-color: #f2f2f2;
  color: #333;
  text-align: center;
  margin-top: 10px;
  font-weight: 500;
`;

export const StyledComponent = styled.div`
  width: 100%;
  padding: 2rem 0.5rem;

  @media screen and (min-width: 640px) {
    padding: 2rem 0rem;
  }
`;

export const StyledTabList = styled(Tab.List)`
  display: flex;
  gap: 0.25rem;
  border-radius: 0.5rem;
  background-color: rgba(13, 42, 87, 0.2);
  padding: 0.25rem;
  margin-bottom: 1rem;

  @media screen and (min-width: 640px) {
    gap: 0;
  }
`;
export const StyledTab = styled(Tab)<{ selected: boolean }>`
  width: 100%;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 0.5rem;
  padding: 0.625rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;

  ${(props) =>
    props.selected
      ? css`
          background-color: white;
          color: #000;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        `
      : css`
          color: #00000060;
          &:hover {
            background-color: rgba(255, 255, 255, 0.12);
            color: white;
          }
        `}

  &:focus {
    outline: none;
    ring: 2px solid #93c5fd;
  }
`;

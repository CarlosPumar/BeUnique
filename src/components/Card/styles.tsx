import styled from 'styled-components';

interface ElementProps {
  isSelected?: boolean;
}

export const Element = styled.div<ElementProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  border-radius: 2.5px;
  width: 3rem;
  height: 3rem;
  ${({ isSelected }) =>
    isSelected &&
    `
    border: 1px solid #14b9ff;
  `};
`;

export const Image = styled.img`
  height: 2rem;
`;

import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  margin-top: 5px;
`;

export const DeleteButton = styled.button`
  &:hover {
    cursor: pointer;
  }
  all: unset;
  position: absolute;
  right: 3px;
  top: -10px;
  background-color: red;
  color: white;
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

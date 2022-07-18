import styled from "styled-components";

const SELECTED = `background-color: lightgray;`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
`;

export const Button = styled.span`
  display: inline-block;
  padding: 4px;

  min-height: 30px;
  border: 1px solid black;
`;

export const SelectOptionContainer = styled.li<{ isSelected: boolean }>`
  ${({ isSelected }) => isSelected && `${SELECTED}`}

  :hover {
    ${SELECTED}
  }
`;

import styled from 'styled-components';

export const ToolbarWrapper = styled.div`
  margin-bottom: 1.875rem;
  margin-top: 1.875rem;
`;

export const Cell = styled.div`
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  gap: 20%;
  border-radius: 10%;

  & .anticon-delete:hover {
    color: var(--error-color);
  }
`;

import styled from 'styled-components';
import { Typography } from 'antd';

export const Container = styled.div`
  justify-content: center;
  display: flex;
`;

export const FormDiv = styled.div`
  width: 70%;
  justify-content: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

export const SwitchButton = styled.div`
  display: flex;
  flex-direction: col;
  justify-items: stretch;
`;

export const WrapperButton = styled.div`
  display: flex;
  flex-direction: col;
  column-gap: 1.5rem;
  margin-top: 2rem;
`;

export const SelectWrapper = styled.div`
  display: flex;
  align-items: end;
  padding-bottom: 12px;
`;

export const Title = styled(Typography.Text)`
  font-weight: 7400;
  font-size: 0.9rem;
  display: block;
  color: var(--primary-color);
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 5px;
`;

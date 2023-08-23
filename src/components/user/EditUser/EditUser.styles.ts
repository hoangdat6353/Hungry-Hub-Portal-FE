import { Typography } from 'antd';
import styled from 'styled-components';

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
`;

export const WrapperButton = styled.div`
  display: flex;
  flex-direction: col;
  column-gap: 1.5rem;
`;

export const Title = styled(Typography.Text)`
  font-weight: 7400;
  font-size: 0.9rem;
  display: block;
  color: var(--primary-color);
  cursor: pointer;
`;

export const WrapperTitle = styled.div`
  justify-content: end;
  display: flex;
`;

export const ButtonInput = styled.div`
  display: flex;
  align-items: end;
  padding-top: 33.14px;
  padding-left: 10px;
`;

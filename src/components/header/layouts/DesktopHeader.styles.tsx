import styled from 'styled-components';
import { Typography } from 'antd';
import { media } from '@app/styles/themes/constants';
export const Text = styled(Typography.Text)`
  font-size: 4rem;
  font-weight: 800;
  font-family: 'Open Sans', sans-serif;

  & > a {
    display: block;
  }

  @media only screen and ${media.md} {
    font-size: 0.9rem;
  }
`;

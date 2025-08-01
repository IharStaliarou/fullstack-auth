import { Layout } from 'antd';
import { styled } from 'styled-components';

const Component = styled(Layout.Footer)`
  text-align: center;
  color: #fff;
  background-color: #4096ff;
`;

export const Footer = () => {
  return <Component></Component>;
};

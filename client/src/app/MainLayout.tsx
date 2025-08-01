import { Layout } from 'antd';
import { styled } from 'styled-components';

const Component = styled(Layout)`
  width: 100%;
  height: 100vh;
`;

interface IMainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: IMainLayoutProps) => {
  return <Component>{children}</Component>;
};

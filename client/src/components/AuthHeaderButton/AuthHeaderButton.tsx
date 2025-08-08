import { Button, Flex } from 'antd';
import styled from 'styled-components';

const Component = styled(Flex)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

interface IAuthHeaderButtonProps {
  showModal: () => void;
}
export const AuthHeaderButton = ({ showModal }: IAuthHeaderButtonProps) => {
  return (
    <Component>
      <Button variant='outlined' color='danger' onClick={showModal}>
        Log in
      </Button>
    </Component>
  );
};

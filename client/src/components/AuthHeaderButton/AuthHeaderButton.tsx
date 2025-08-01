import { Button, Flex, Typography } from 'antd';

interface IAuthHeaderButtonProps {
  showModal: () => void;
}
export const AuthHeaderButton = ({ showModal }: IAuthHeaderButtonProps) => {
  return (
    <Flex align='center' justify='space-between' style={{ height: '100%' }}>
      <Typography.Text>Auth</Typography.Text>
      <Button variant='outlined' color='danger' onClick={showModal}>
        Log in
      </Button>
    </Flex>
  );
};

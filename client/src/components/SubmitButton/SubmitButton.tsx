import { Button, Form } from 'antd';

interface ISubmitButtonProps {
  title: string;
}

export const SubmitButton = ({ title = '' }: ISubmitButtonProps) => {
  return (
    <Form.Item label={null}>
      <Button type='primary' htmlType='submit'>
        {title}
      </Button>
    </Form.Item>
  );
};

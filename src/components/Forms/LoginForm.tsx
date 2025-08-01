import { Form, Input, Button, type FormProps } from 'antd';
import type { LoginTypes } from '@/shared/types/auth.types';

export const LoginForm = () => {
  const handleFinish: FormProps<LoginTypes>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  return (
    <Form
      name='login'
      initialValues={{ remember: true }}
      onFinish={handleFinish}
      autoComplete='off'
      style={{ margin: '20px 0 10px 0' }}
    >
      <Form.Item<LoginTypes>
        label='Username'
        name='username'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<LoginTypes>
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

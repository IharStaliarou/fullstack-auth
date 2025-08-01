import { Form, Input, Button, type FormProps } from 'antd';
import type { SignUpTypes } from '@/shared/types/auth.types';
import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3000/api',
  params: {},
  withCredentials: true,
});

export const SignUpForm = () => {
  const handleFinish: FormProps<SignUpTypes>['onFinish'] = async (values) => {
    try {
      const { data } = await http.post('/auth/signup', values);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      name='signup'
      initialValues={{ remember: true }}
      onFinish={handleFinish}
      autoComplete='off'
      style={{ margin: '20px 0 10px 0' }}
    >
      <Form.Item<SignUpTypes>
        label='Username'
        name='username'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<SignUpTypes>
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<SignUpTypes>
        label='Repeat password'
        name='passwordRepeat'
        rules={[{ required: true, message: 'Please repeat your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<SignUpTypes>
        label='First name'
        name='firstName'
        rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<SignUpTypes>
        label='Last name'
        name='lastName'
        rules={[{ required: true, message: 'Please input your last name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<SignUpTypes>
        label='Email'
        name='email'
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<SignUpTypes>
        label='Phone'
        name='phone'
        rules={[{ required: true, message: 'Please input your phone!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label={null}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

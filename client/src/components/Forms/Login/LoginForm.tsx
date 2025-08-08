import {
  Form,
  Input,
  type FormProps,
  type FormInstance,
  notification,
} from 'antd';
import type { ILogin } from '@/shared/interfaces/auth.interfaces';
import { regexpPatterns } from '@/shared/utils/regexp/regexpPatterns';
import { SubmitButton } from '@/components/SubmitButton/SubmitButton';
import useAuthStore from '@/store/auth.store';

interface ILoginFormProps {
  form: FormInstance;
  onCancel: () => void;
}

export const LoginForm = ({ form, onCancel }: ILoginFormProps) => {
  const [, contextHolder] = notification.useNotification();

  const { login } = useAuthStore();

  const handleFinish: FormProps<ILogin>['onFinish'] = async (logInData) => {
    login(logInData).then((accessToken) => {
      if (accessToken) {
        form.resetFields();
        onCancel();
      }
    });
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name='login'
        initialValues={{ remember: true }}
        onFinish={handleFinish}
        autoComplete='off'
        style={{ margin: '20px 0 10px 0' }}
      >
        <Form.Item<ILogin>
          label='Username'
          name='userName'
          rules={[
            { required: true, message: 'Please input your username!' },
            {
              min: 2,
              max: 20,
              message: 'Enter correct username',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ILogin>
          label='Password'
          name='password'
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 8, message: 'Password must be at least 8 characters long' },
            {
              pattern: regexpPatterns.PASSWORD,
              message: 'Enter correct password.',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <SubmitButton title='Log in' />
      </Form>
    </>
  );
};

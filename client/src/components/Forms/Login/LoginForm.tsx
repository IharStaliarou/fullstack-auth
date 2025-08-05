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
import { http } from '@/services/http.services';
import { handleHttpError } from '@/shared/utils/errors/handle-http-error';

interface ILoginFormProps {
  form: FormInstance;
}

export const LoginForm = ({ form }: ILoginFormProps) => {
  const [api, contextHolder] = notification.useNotification();

  const handleFinish: FormProps<ILogin>['onFinish'] = async (values) => {
    try {
      const { data } = await http.post('/auth/signup', values);

      api.success({
        message: 'Success!',
        description: 'You have successfully signed up.',
      });
    } catch (error: unknown) {
      handleHttpError(error, api);
    }
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
          name='username'
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

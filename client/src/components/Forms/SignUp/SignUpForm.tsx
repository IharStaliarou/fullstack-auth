import { Form, Input, type FormProps, notification, FormInstance } from 'antd';
import type { ISignUp } from '@/shared/interfaces/auth.interfaces';
import { httpService } from '@/services/http.services';
import { regexpPatterns } from '@/shared/utils/regexp/regexpPatterns';
import { SubmitButton } from '@/components/SubmitButton/SubmitButton';
import { handleHttpError } from '@/shared/utils/errors/handle-http-error';

interface ISignUpFormProps {
  form: FormInstance;
}

export const SignUpForm = ({ form }: ISignUpFormProps) => {
  const [api, contextHolder] = notification.useNotification();
  const handleFinish: FormProps<ISignUp>['onFinish'] = async (values) => {
    try {
      const { data } = await httpService.post('/auth/signup', values);

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
        name='signup'
        initialValues={{ remember: true }}
        onFinish={handleFinish}
        autoComplete='off'
        style={{ margin: '20px 0 10px 0' }}
      >
        <Form.Item<ISignUp>
          label='Username'
          name='username'
          rules={[
            { required: true, message: 'Please input your username!' },
            {
              min: 2,
              max: 20,
              message: 'Username must be between 2 and 20 chars',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ISignUp>
          label='Password'
          name='password'
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 8, message: 'Password must be at least 8 characters long' },
            {
              pattern: regexpPatterns.PASSWORD,
              message:
                'Password must include at least one lowercase letter, one uppercase letter, one number and one special character',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<ISignUp>
          label='Repeat password'
          name='repeatPassword'
          rules={[
            { required: true, message: 'Please repeat your password!' },
            {
              pattern: regexpPatterns.PASSWORD,
              message:
                'Repeat password must include at least one lowercase letter, one uppercase letter, one number and one special character',
            },
            {
              validator: (_, value) => {
                const password = form.getFieldValue('password');
                if (value !== password) {
                  return Promise.reject('Passwords do not match');
                } else if (!value) {
                  return Promise.reject('Please repeat your password');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<ISignUp>
          label='First name'
          name='firstName'
          rules={[
            { required: true, message: 'Please input your first name!' },
            {
              min: 2,
              max: 20,
              message: 'First name must be between 2 and 20 chars',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ISignUp>
          label='Last name'
          name='lastName'
          rules={[
            { required: true, message: 'Please input your last name!' },
            {
              min: 2,
              max: 20,
              message: 'Last name must be between 2 and 20 chars',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ISignUp>
          label='Email'
          name='email'
          rules={[
            { required: true, message: 'Please input your email!' },
            {
              pattern: regexpPatterns.EMAIL,
              message: 'Enter correct email',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ISignUp>
          label='Phone'
          name='phone'
          rules={[
            { required: true, message: 'Please input your phone!' },
            {
              min: 12,
              max: 12,
              message: 'Phone must be 12 characters',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <SubmitButton title='Sign up' />
      </Form>
    </>
  );
};

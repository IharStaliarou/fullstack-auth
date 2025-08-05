import { NotificationInstance } from 'antd/es/notification/interface';
import { AxiosError } from 'axios';

export const handleHttpError = (
  error: unknown,
  api: NotificationInstance,
  defaultMessage = 'Unexpected error occurred. Please try again later.'
) => {
  let errorMessage = defaultMessage;

  if (error instanceof AxiosError) {
    const responseErrorMessage = error.response.data.message;

    if (responseErrorMessage) {
      errorMessage = Array.isArray(responseErrorMessage)
        ? responseErrorMessage.join(', ')
        : responseErrorMessage;
    } else if (error.message) {
      errorMessage = error.message;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  api.error({
    message: 'Sign up error',
    description: errorMessage,
  });
};

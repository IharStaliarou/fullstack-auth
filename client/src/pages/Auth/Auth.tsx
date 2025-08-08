import { Modal, Segmented } from 'antd';
import { LoginForm } from '@/components/Forms/Login/LoginForm';
import { SignUpForm } from '@/components/Forms/SignUp/SignUpForm';
import type { EntranceTypes } from '@/shared/interfaces/auth.interfaces';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';

const ENTRANCE_OPTIONS = [
  { label: 'Log in', value: 'login' },
  { label: 'Sign up', value: 'signup' },
];

interface IAuthProps {
  isModalOpen: boolean;
  cancelModal: () => void;
}

export const Auth = ({ isModalOpen, cancelModal }: IAuthProps) => {
  const [form] = useForm();

  const [entrance, setEntrance] = useState<EntranceTypes>('login');

  const handleChangeEntrance = (value: EntranceTypes) => {
    setEntrance(value);
  };

  const modalTitle = entrance === 'login' ? 'Log in' : 'Sign up';
  return (
    <Modal
      title={modalTitle}
      footer={null}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isModalOpen}
      onCancel={cancelModal}
      width='400px'
    >
      <Segmented
        options={ENTRANCE_OPTIONS}
        block
        onChange={(value) => handleChangeEntrance(value as EntranceTypes)}
      />

      {entrance === 'login' && <LoginForm form={form} onCancel={cancelModal} />}
      {entrance === 'signup' && (
        <SignUpForm form={form} onCancel={cancelModal} />
      )}
    </Modal>
  );
};

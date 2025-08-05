import { Modal, Segmented } from 'antd';
import { LoginForm } from '@/components/Forms/Login/LoginForm';
import { SignUpForm } from '@/components/Forms/SignUp/SignUpForm';
import type { EntranceTypes } from '@/shared/interfaces/auth.interfaces';
import { useForm } from 'antd/es/form/Form';

const ENTRANCE_OPTIONS = [
  { label: 'Log in', value: 'login' },
  { label: 'Sign up', value: 'signup' },
];

interface IAuthProps {
  isModalOpen: boolean;
  cancelModal: () => void;
  onChangeEntrance: (value: EntranceTypes) => void;
  entrance: EntranceTypes;
}

export const Auth = ({
  isModalOpen,
  cancelModal,
  onChangeEntrance,
  entrance,
}: IAuthProps) => {
  const [form] = useForm();

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
        onChange={(value) => onChangeEntrance(value as EntranceTypes)}
      />

      {entrance === 'login' && <LoginForm form={form} />}
      {entrance === 'signup' && <SignUpForm form={form} />}
    </Modal>
  );
};

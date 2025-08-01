import { Modal, Segmented } from 'antd';
import { LoginForm } from '@/components/Forms/LoginForm';
import { SignUpForm } from '@/components/Forms/SignUpForm';
import type { EntranceTypes } from '@/shared/types/auth.types';

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
  return (
    <Modal
      title='Login'
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

      {entrance === 'login' && <LoginForm />}
      {entrance === 'signup' && <SignUpForm />}
    </Modal>
  );
};

import { Layout } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

import { Auth } from '@/pages/Auth/Auth';
import type { EntranceTypes } from '@/shared/interfaces/auth.interfaces';
import { AuthHeaderButton } from '../AuthHeaderButton/AuthHeaderButton';

const Component = styled(Layout.Header)`
  text-align: center;
  color: #fff;
  height: 64;
  padding-inline: 48;
  line-height: 64px;
  background-color: #4096ff;
`;

export const Header = () => {
  const [entrance, setEntrance] = useState<EntranceTypes>('login');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangeEntrance = (value: EntranceTypes) => {
    setEntrance(value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const cancelModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Component>
      <AuthHeaderButton showModal={showModal} />

      <Auth
        entrance={entrance}
        isModalOpen={isModalOpen}
        onChangeEntrance={handleChangeEntrance}
        cancelModal={cancelModal}
      />
    </Component>
  );
};

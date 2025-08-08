import { Layout, MenuProps, Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Auth } from '@/pages/Auth/Auth';
import useAuthStore from '@/store/auth.store';
import useUserStore from '@/store/user.store';
import DropDown from '../Dropdown/Dropdown';
import { AuthHeaderButton } from '../AuthHeaderButton/AuthHeaderButton';

const Component = styled(Layout.Header)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffffff;
`;

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuth, authUser, logout, isLoading } = useAuthStore();
  const { fetchUserById, selectedUser } = useUserStore();

  const authUserId = authUser?.userId;
  const authUserFullName = !isLoading ? (
    `${selectedUser?.firstName} ${selectedUser?.lastName}`
  ) : (
    <Spin />
  );

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Profile',
      extra: '⌘P',
    },
    {
      key: '2',
      label: 'Settings',
      extra: '⌘B',
    },
    {
      key: '3',
      label: 'Logout',
      onClick: () => {
        if (window.confirm('Are you sure you want to logout?')) {
          logout();
        }
      },
    },
    {
      type: 'divider',
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const cancelModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (authUserId) {
      fetchUserById(authUserId);
    }
  }, [authUserId, fetchUserById]);

  return (
    <Component>
      <Typography.Text>Auth</Typography.Text>

      {isAuth ? (
        <DropDown items={items} authUserFullName={authUserFullName} />
      ) : (
        <AuthHeaderButton showModal={showModal} />
      )}

      <Auth isModalOpen={isModalOpen} cancelModal={cancelModal} />
    </Component>
  );
};

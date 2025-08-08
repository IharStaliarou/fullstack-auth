import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Space } from 'antd';

interface IDropDownProps {
  items: MenuProps['items'];
  authUserFullName: string | React.ReactElement;
}

const DropDown = ({ items, authUserFullName }: IDropDownProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Dropdown menu={{ items }} onOpenChange={() => setHovered(!hovered)}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {authUserFullName}
          <DownOutlined
            style={{
              transform: `rotate(${hovered ? 180 : 0}deg)`,
              transition: 'transform 0.2s ease-in',
            }}
          />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropDown;

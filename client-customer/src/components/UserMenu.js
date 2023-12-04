import React, { useState } from 'react';
import { Popover, Avatar, Text, Button } from "@nextui-org/react";

const UserMenu = ({ avatar, name }) => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('customer');
    window.location.href = '/login';
  };

  const MenuList = () => (
    <div>
      <Text p>Option 1</Text>
      <Text p>Option 2</Text>
      <Button auto primary onClick={handleLogout}>Logout</Button>
    </div>
  );

  return (
    <Popover
      visible={visible}
      onVisibleChange={handleVisibleChange}
      placement="bottomStart"
      content={<MenuList />}>
      <Avatar src={avatar} size="small" />
      <Text>{name}</Text>
    </Popover>
  );
};

export default UserMenu;
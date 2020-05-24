import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import roles from '../constants/roles';

const UserContext = createContext<object | null>(null);

export const getGuestUser = (): any => {
  return {
    id: -1,
    firstName: 'Anon',
    activeRoles: [roles.GUEST],
  };
};

export const UserProvider = (props: any) => {
  const { user, children } = props;
  const [activeUser, setUser] = useState(user || getGuestUser());
  const handleSetUser = (user: any) => {
    setUser(user || getGuestUser());
  };

  const handleLogout = () => {
    setUser(getGuestUser());
  };

  return (
    <UserContext.Provider
      value={{
        user: activeUser,
        logout: handleLogout,
        setUser: handleSetUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.object,
};

export default UserContext;

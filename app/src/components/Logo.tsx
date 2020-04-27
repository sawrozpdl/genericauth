import React from 'react';

const Logo = (props: any) => {
  return (
    <img
      alt="Logo"
      width="45"
      height="45"
      src="/images/logos/logo-auth.svg"
      {...props}
    />
  );
};

export default Logo;

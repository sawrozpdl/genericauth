import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserContext from '../../context/UserContext';
import routes from '../../constants/routes';
import roles from '../../constants/roles';
import { interpolate } from '../../utils/string';

const RouteWithLayout = (props: any) => {
  const { layout: Layout, allow, component: Component, ...rest } = props;
  const user: any = useContext(UserContext);
  console.log('you are: ', user);
  if (
    user &&
    allow.length &&
    user.activeRoles.some((val: string) => allow.indexOf(val) === -1)
  ) {
    let redirectTo = routes.HOME;
    if (allow.includes(roles.GUEST)) {
      redirectTo = interpolate(routes.USER_ACCOUNT, {
        appName: user.activeApp,
        username: user.username,
      });
    }
    return <Redirect to={redirectTo} />;
  }

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  exact: PropTypes.any,
  allow: PropTypes.any,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default RouteWithLayout;

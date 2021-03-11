import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { capitalize } from '@material-ui/core';
import { Route, Redirect } from 'react-router-dom';

import roles from '../constants/roles';
import routes from '../constants/routes';
import LoadingScreen from './LoadingScreen';
import { interpolate } from '../utils/string';
import UserContext from '../context/UserContext';

const RouteWithLayout = (props: any) => {
  const { layout: Layout, allow, component: Component, ...rest } = props;
  const userCtx: any = useContext(UserContext);
  const { user } = userCtx;
  if (
    user &&
    allow.length &&
    allow.some((val: string) => user.activeRoles.indexOf(val) === -1)
  ) {
    let redirectTo = routes.HOME;
    if (allow.includes(roles.GUEST)) {
      redirectTo = interpolate(routes.USER_ACCOUNT, {
        username: user.username,
      });
    }
    return <Redirect to={redirectTo} />;
  }

  if (user && user.activeApp) document.title = capitalize(user.activeApp);

  return (
    <Route
      {...rest}
      render={(matchProps) =>
        user ? (
          <Layout {...matchProps}>
            <Component {...matchProps} />
          </Layout>
        ) : (
          <LoadingScreen />
        )
      }
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

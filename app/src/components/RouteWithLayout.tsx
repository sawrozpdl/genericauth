import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserContext from '../context/UserContext';
import routes from '../constants/routes';
import roles from '../constants/roles';
import { interpolate } from '../utils/string';
import LoadingScreen from './LoadingScreen';

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
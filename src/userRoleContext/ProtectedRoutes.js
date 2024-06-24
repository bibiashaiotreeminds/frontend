import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserRole } from './userLoginPermission';

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const { role } = useUserRole(); // Get the current user's role from context

  return (
    <Route
      {...rest} // Pass the rest of the props to Route
      render={(props) =>
        roles.includes(role) ? (
          <Component {...props} /> // Render the component if the role is included in the roles array
        ) : (
          <Redirect to="/unauthorized" /> // Redirect to an unauthorized page if the role is not allowed
        )
      }
    />
  );
};

export default ProtectedRoute;

import React from 'react';
import { Route } from 'react-router-dom'
 
const RouteLayout = ({ component: Component, ...rest }) => {
 
  return (
    <Route {...rest} render={matchProps => (
        <Component {...matchProps} />
    )} />
  )
};
 
export default RouteLayout;

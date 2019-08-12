import React from 'react';
import { Route, Redirect } from 'react-router-dom'
 
const RouteLayout = ({ component: Component, ...rest }) => {
  console.log("RouteLayout");
  //todo: logic for validate user 
 
  return (
    <Route {...rest} render={matchProps => (
        <Component {...matchProps} />
    )} />
  )
};
 
export default RouteLayout;

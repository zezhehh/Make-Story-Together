import React from 'react';
import SiderLayout from './containers/sider';
import Profile from './containers/profile';
import Explore from './containers/explore';
import Group from './containers/group';
import Story from './containers/story';
import PageNotFound from './containers/notfound'
import RouteLayout from "./containers/layout";
import HeaderLayout from './containers/header';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Layout } from 'antd';
import './styles/layout.css';
import 'antd/dist/antd.css';

class App extends React.Component {

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Router>
          <SiderLayout />
          <Layout>
            <HeaderLayout />
            <Switch>
              <Route exact path="/">
                <Redirect to="/explore" />
              </Route>
              <Route path="/profile" component={Profile} />
              <RouteLayout path="/explore" component={Explore} />
              <RouteLayout path="/group" component={Group} />
              <RouteLayout path="/story" component={Story} />
              <Route component={PageNotFound} />
            </Switch>
          </Layout>
        </Router>
      </Layout>
    );
  }
}

export default App;

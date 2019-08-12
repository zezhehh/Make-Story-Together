import React from 'react';
import SiderLayout from './components/sider';
import Login from './components/login';
import Explore from './components/explore';
import Group from './components/group';
import Story from './components/story';
import PageNotFound from './components/notfound'
import RouteLayout from "./components/layout";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { Layout } from 'antd';
import './styles/layout.css';
import 'antd/dist/antd.css';


class App extends React.Component {

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Router>
          <SiderLayout />
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login" component={Login} />
            <RouteLayout path="/explore" component={Explore} />
            <RouteLayout path="/group" component={Group} />
            <RouteLayout path="/story" component={Story} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </Layout>
    );
  }
}

export default App;

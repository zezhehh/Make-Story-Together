import React from 'react';
import SiderLayout from './containers/sider';
import Profile from './containers/profile';
import Explore from './containers/explore';
import Group from './containers/group';
import Story from './containers/story';
import PageNotFound from './containers/notfound'
import HeaderLayout from './containers/header';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Layout } from 'antd';
import './styles/layout.css';
import 'antd/dist/antd.css';
const { Content } = Layout;

class App extends React.Component {

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Router>
          <SiderLayout />
          <Layout>
            <HeaderLayout />
            <Content style={{ marginTop: '40px'}}>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/explore" />
                </Route>
                <Route path="/profile" component={Profile} />
                <Route path="/explore" component={Explore} />
                <Route path="/group" component={Group} />
                <Route path="/story" component={Story} />
                <Route component={PageNotFound} />
              </Switch>
            </Content>
          </Layout>
        </Router>
      </Layout>
    );
  }
}

export default App;

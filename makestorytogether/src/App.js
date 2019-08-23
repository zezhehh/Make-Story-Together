import React from 'react';
import SiderLayout from './containers/sider';
import Profile from './containers/profile';
import Explore from './containers/explore';
import GroupList from './components/group/groupList';
import GroupDetail from './components/group/groupDetail';
import StoryList from './components/story/storyList';
import StoryDetail from './components/story/storyDetail';
import Writing from './containers/writing';
import PageNotFound from './containers/notfound'
import HeaderLayout from './containers/header';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Layout, BackTop } from 'antd';
import { retrieveInfo } from "./actions/writers";
import { verifyToken } from './api/writers';
import { connect } from 'react-redux';
import ScrollToTop from './containers/scrollToTop';
import './styles/layout.css';
import 'antd/dist/antd.css';
import 'rc-texty/assets/index.css';
const { Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.retrieveLocal();
  }
  retrieveLocal = () => {
    let username = localStorage.getItem('username');
    let screen_name = localStorage.getItem('screen_name');
    let token = localStorage.getItem('token');
    if (token === null) {
      return
    }
    verifyToken(token)
    .then((newToken) => {
      if (newToken === null) localStorage.clear();
      this.props.retrieveInfo({
        username,
        screen_name,
        token: newToken
      })
    });
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Router>
          <ScrollToTop>
            <SiderLayout />
            <Layout>
              <HeaderLayout />
              <Content style={{ marginTop: '40px', background: '#f0f2f5'}}>
                <Switch>
                  <Route exact path="/">
                    <Redirect to="/explore" />
                  </Route>
                  <Route path="/profile" component={Profile} />
                  <Route path="/explore" component={Explore} />
                  <Route exact path="/group" component={GroupList} />
                  <Route exact path='/group/:groupID' component={GroupDetail} />
                  <Route exact path="/story" component={StoryList} />
                  <Route exact path="/story/:storyID" component={StoryDetail} />
                  <Route exact path="/just-writing!" component={Writing} />
                  <Route component={PageNotFound} />
                </Switch>
              </Content>
            </Layout>
          </ScrollToTop>
        </Router>
        <BackTop />
      </Layout>
    );
  }
}
// export default connect(null, {logIn, signUp, retrieveInfo})(Login);
export default connect(null, {retrieveInfo})(App);

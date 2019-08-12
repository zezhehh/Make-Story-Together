
import React from 'react';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
// const { SubMenu } = Menu;

class SiderLayout extends React.Component {
    state = {
      collapsed: false,
    };
  
    onCollapse = collapsed => {
      this.setState({ collapsed });
    };
  
    render() {
      return (
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Icon type="pie-chart" />
                <span>Explore</span>
              </Menu.Item>
              <Menu.Item key="9">
                <Icon type="file" />
                <span>Account</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="desktop" />
                <span>Story</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="user" />
                <span>Group</span>
              </Menu.Item>
              {/* <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    <span>Groups</span>
                  </span>
                }
              >
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu> */}
            </Menu>
          </Sider>
      );
    }
  }
  
  export default SiderLayout;
  
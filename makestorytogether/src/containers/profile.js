import React from 'react';
import { connect } from "react-redux";
import { STATUS } from '../actions/writers';
import Login from '../components/account/login';
import { Tabs } from 'antd';
import Characters from '../components/account/characters';
import '../styles/profile.css';

const { TabPane } = Tabs;

class Profile extends React.Component {
    onChange = (key) => {
        console.log(key)
    }

    render() {
        return (
            <div className='profile'> 
                {
                    this.props.status === STATUS.ANONYMOUS ? 
                    <Login /> : (
                        <Tabs defaultActiveKey="info" onChange={this.onChange}>
                            <TabPane tab="Info" key="info">
                            Content of Tab Pane 1
                            </TabPane>
                            <TabPane tab="Characters" key="characters">
                                <Characters />
                            </TabPane>
                            <TabPane tab="Liked" key="liked">
                            Content of Tab Pane 3
                            </TabPane>
                        </Tabs>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.writers.status,
        username: state.writers.username,
        screen_name: state.writers.screen_name,
        token: state.writers.token
    }
}

export default connect(mapStateToProps)(Profile);

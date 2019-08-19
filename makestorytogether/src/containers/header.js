import React from 'react';
import { connect } from "react-redux";
import { STATUS, logOut } from '../actions/writers';
import { createGroup } from '../actions/groups';
import { createStory } from '../actions/stories';
import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';
import '../styles/layout.css';
const { Header } = Layout;


class HeaderLayout extends React.Component {
    handleNewGroup = () => {
        this.props.createGroup();
    }

    handleNewStory = () => {
        this.props.createStory();
    }

    handleLogOut = () => {
        this.props.logOut()
        localStorage.clear();
    }

    render() {
        return (
            <Header className="mst-header" style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#fff', padding: 0 }}>
                <div className='float-left'>
                    {
                        this.props.status === STATUS.ANONYMOUS ? 
                        null : (
                        <div>
                            <Link to='/group'>
                                <Button onClick={this.handleNewGroup} size='small'>
                                    New Group
                                </Button>
                            </Link>
                            <Link to='/story'>
                                <Button onClick={this.handleNewStory} size='small'>
                                    New Story
                                </Button>
                            </Link>
                        </div>
                        )
                    }
                </div>
                <div className='float-right'>
                    <span style={{ margin: "2px" }}>{this.props.screenName}</span>
                    {
                        this.props.status === STATUS.ANONYMOUS ? 
                        (<Button href='/profile' size='small'>Login</Button>) : (
                        <Button href='/profile' size='small' onClick={this.handleLogOut}>Logout</Button>)
                    }
                </div>
                
            </Header>
        );
    }
    
}

const mapStateToProps = (state) => {
    return {
        status: state.writers.status,
        screenName: state.writers.screen_name
    }
}

export default connect(mapStateToProps, {logOut, createGroup, createStory})(HeaderLayout);

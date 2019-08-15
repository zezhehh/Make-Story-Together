import React from 'react';
import { connect } from "react-redux";
import { STATUS, logOut } from '../actions/writers';
import { createGroup } from '../actions/groups';
import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';
import '../styles/layout.css';
const { Header } = Layout;


class HeaderLayout extends React.Component {
    handleNewGroup = () => {
        this.props.createGroup();
    }

    render() {
        return (
            <Header className="mst-header" style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#fff', padding: 0 }}>
                <div className='float-left'>
                    {
                        this.props.status === STATUS.ANONYMOUS ? 
                        null : (
                        <Link to='/group'>
                            <Button onClick={this.handleNewGroup} size='small'>
                                New Group
                            </Button>
                        </Link>)
                    }
                </div>
                <div className='float-right'>
                    <span style={{ margin: "2px" }}>{this.props.screenName}</span>
                    {
                        this.props.status === STATUS.ANONYMOUS ? 
                        (<Button href='/profile' size='small'>Login</Button>) : (
                        <Button size='small' onClick={() => this.props.logOut()}>Logout</Button>)
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

export default connect(mapStateToProps, {logOut, createGroup})(HeaderLayout);

import React from 'react';
import { connect } from "react-redux";
import { STATUS, logOut } from '../actions/writers';
import { Layout, Button } from 'antd';
import '../styles/layout.css';
const { Header } = Layout;


class HeaderLayout extends React.Component {
    render() {
        return (
            <Header className="mst-header" style={{ zIndex: 1, width: '100%', background: '#fff', padding: 0 }}>
                <div style={{ float: 'right' }}>
                    <span style={{ margin: "2px" }}>{this.props.screen_name}</span>
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
        screen_name: state.writers.screen_name,
    }
}

export default connect(mapStateToProps, {logOut})(HeaderLayout);

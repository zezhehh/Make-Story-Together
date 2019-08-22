import React from 'react';
import { connect } from "react-redux";
import { STATUS } from '../actions/writers';
import Login from '../components/account/login';

class Profile extends React.Component {

    render() {
        return (
            <div> 
                {
                    this.props.status === STATUS.ANONYMOUS ? 
                    <Login /> : "hello"
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

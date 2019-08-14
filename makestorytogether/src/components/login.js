import React from 'react';
import { connect } from "react-redux";
import { Input, Button, Icon } from 'antd';
import { logIn, signUp } from "../actions/writers";
import { signInPost, registerPost } from '../api/writers';
import '../styles/login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signup: false,
            screen_name: "",
            username: "",
            password: "",
            fail: false,
            errorMsg: {
                'error': null,
                'username': null,
                'password': null,
                'screen_name': null
            }
        };
    }

    clearErrorMsg = () => {
        this.setState({
            fail: false,
            errorMsg: {
                'error': null,
                'username': null,
                'password': null,
                'screen_name': null
            }
        });
    }

    setErrorMsg = (msg) => {
        this.setState({fail: true, errorMsg: {
            ...this.state.errorMsg,
            ...msg
        }});
    }

    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handleChangeScreenName = (e) => {
        this.setState({
            screen_name: e.target.value
        })
    }

    handleLogin = () => {
        signInPost(this.state.username, this.state.password).then(
            (response) => {
                this.clearErrorMsg();
                if (response.success) {
                    this.props.logIn(response.username, response.screen_name, response.token);
                } else {
                    this.setErrorMsg(response.message);
                }
            }
        );
    }

    handleSignUp = () => {
        registerPost(this.state.screen_name, this.state.username, this.state.password).then(
            (response) => {
                this.clearErrorMsg();
                if (response.success) {
                    this.props.signUp(this.state.username, this.state.password);
                } else {
                    this.setErrorMsg(response.message);
                }

            }
        )
    }

    render() {
        return (
            <div className="login-input">
                {
                    this.state.signup ? (
                    <div>
                        <Input
                            className={this.state.errorMsg.screen_name === null && this.state.errorMsg.error === null ? (null) : ("fail")}
                            placeholder="Screen name" 
                            value={this.state.screen_name} 
                            onChange={this.handleChangeScreenName}
                        />
                        {this.state.errorMsg.screen_name}
                    </div>
                    ) : (null)
                }
                <div>
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        className={this.state.errorMsg.username === null && this.state.errorMsg.error === null ? (null) : ("fail")}
                        placeholder="Username" 
                        value={this.state.username} 
                        onChange={this.handleChangeUsername}
                    />
                    {this.state.errorMsg.username}
                </div>
                <div>
                    <Input.Password
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        className={this.state.errorMsg.password === null && this.state.errorMsg.error === null ? (null) : ("fail")}
                        placeholder="Password"
                        value={this.state.password} 
                        onChange={this.handleChangePassword}
                        onPressEnter={this.state.signup ? this.handleSignUp : this.handleLogin}
                    />
                    {this.state.errorMsg.password}
                </div>
                {this.state.errorMsg.error}
                {!this.state.signup ? (
                <div>
                    <div><Button type='primary' onClick={this.handleLogin}>Login</Button></div>
                    <div><Button onClick={() => this.setState({signup:true})}>Go to Sign Up</Button></div>
                </div>
                ) : (
                <div>
                    <div><Button type='primary' onClick={this.handleSignUp}>Sign Up</Button></div>
                    <div><Button onClick={() => this.setState({signup:false})}>Go to Login</Button></div>
                </div>
                )}
            </div>
        )
    }
}

export default connect(null, {logIn, signUp})(Login);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { userService } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }
    //handle event onchange of input username
    handleOnChangeUserName = (event) => {
        this.setState({
            ...this.state,
            userName: event.target.value,
        })
    }
    //handle event onchange of input password
    handleOnChangePassword = (event) => {
        this.setState({
            ...this.state,
            password: event.target.value,
        })
    }
    // handle event onClick of button login 
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            const data = await userService.handleLogin(this.state.userName, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.userInfo)
            }
        }
        catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message,
                    })
                }
            }
        }

    }
    //handle event onClick show password
    handleOnShowHidePassword = () => {
        console.log(!this.state.isShowPassword)
        this.setState({
            ...this.state,
            isShowPassword: !this.state.isShowPassword
        })
    }
    render() {

        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 login-text">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>User name:</label>
                            <input type="text"
                                className="form-control"
                                value={this.state.userName}
                                onChange={(event) => this.handleOnChangeUserName(event)}
                                placeholder="Enter your user name" />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className="custom-input-password" >
                                <input className="form-control"
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    placeholder="Enter your password" />
                                <span onClick={() => { this.handleOnShowHidePassword() }}>
                                    <i className={this.state.isShowPassword ? "far fa-eye-slash" : "fa fa-eye"}></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12 ">
                            <button className="btn-login"
                                onClick={() => { this.handleLogin() }}>
                                Login
                            </button>
                        </div>
                        <div className="col-12 ">
                            <span className="forgot-password">Forgot your password?</span>
                        </div>
                        <div className="col-12 mt-3 text-center ">
                            <span className="login-other-text">Or login with:</span>
                        </div>
                        <div className="col-12  login-social ">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React, {Component} from 'react';

export default class AuthGateway extends Component{
    constructor(){
        super();
        this.state = {
            registerForm: {
                username: "",
                password: ""
            },
            loginForm: {
                username: "",
                password: ""
            }
        }
    }
    handleRegisterInput = (e) => {
        this.setState({
            registerForm: {
                ...this.state.registerForm,
                [e.currentTarget.name] : e.currentTarget.value
            }
        })
    }
    handleRegister = (e) => {
        e.preventDefault();
        this.props.handleRegister(this.state.registerForm);
    }
    handleLoginInput = (e) => {
        this.setState({
            loginForm: {
                ...this.state.loginForm,
                [e.currentTarget.name] : e.currentTarget.value
            }
        })
    }
    handleLogin = (e) => {
        e.preventDefault();
        this.props.handleLogin(this.state.loginForm);
    }
    render(){
        return(
            <div>
                {this.props.error.length > 0 ? 
                <p>{this.props.error}</p>:
                null}
                <form onSubmit={this.handleRegister}>
                    <h5>REGISTER AS A NEW USER</h5>
                    username: <input type="text" name="username" onChange={this.handleRegisterInput}/>
                    password: <input type="text" name="password" onChange={this.handleRegisterInput}/>
                    <input type="submit"/>
                </form>
                <form onSubmit={this.handleLogin}>
                    <h5>LOGIN</h5>
                    username: <input type="text" name="username" onChange={this.handleLoginInput}/>
                    password: <input type="text" name="password" onChange={this.handleLoginInput}/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}
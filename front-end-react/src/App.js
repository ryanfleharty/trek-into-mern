import React, { Component } from 'react';
import './App.css';
import AuthGateway from './AuthGateway/AuthGateway';
import EpisodesContainer from './EpisodesContainer/EpisodesContainer';

class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedIn: false,
      currentUser: {
        username: '',
        password: ''
      },
      error: ""
    }
  }
  handleLogin = async (formData) => {
    const newUser = await fetch("http://localhost:9001/auth/login", {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const response = await newUser.json();
    console.log(response);
    if(response.status === 200){
      this.setState({
        loggedIn: true,
        currentUser: response.data
      })
    }
  }
  handleRegister = async (formData) => {
    const newUser = await fetch("http://localhost:9001/users", {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const response = await newUser.json();
    console.log(response);
    if(response.status === 200){
      this.setState({
        loggedIn: true,
        currentUser: response.data
      })
    }else if(response.status === 500){
      console.log(response.data);
      if(response.data.code === 11000){
        this.setState({
          error: "INVALID DUPLICATE USER NAME"
        })
      }else{
              this.setState({
        error: response.data.message
          })
      }

    }
  }
  render() {
    return (
      <div className="App">
        <EpisodesContainer />
        {/* <AuthGateway error={this.state.error} handleRegister={this.handleRegister} handleLogin={this.handleLogin}/>
        } */}
      </div>
    );
  }
}

export default App;

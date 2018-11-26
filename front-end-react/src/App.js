import React, { Component } from 'react';
import './App.css';
import AuthGateway from './AuthGateway/AuthGateway';
import EpisodesContainer from './EpisodesContainer/EpisodesContainer';
import { connect } from 'react-redux';
class App extends Component {
  constructor(){
    super();
    this.state = {
      error: ""
    }
  }
  render() {
    return (
      <div className="App">
      { this.props.loggedIn ?
        <EpisodesContainer />
        :
        <AuthGateway error={this.state.error} />
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return{
    loggedIn : state.auth.loggedIn
  }
}
export default connect(mapStateToProps)(App);
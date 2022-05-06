import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from "./header"
import Oauth from "./routes/oauth"
import Home from "./routes/home"

class App extends React.Component{

  constructor(props){
    super(props)

    this.state={
      localStorage: null,
      connection: null
    }
  }

  update_localStorage = (localStorage) => {
    this.setState({localStorage})
  }

  componentDidMount = () => {
    const baseurl = localStorage.getItem("baseurl")
    const clientid = localStorage.getItem("clientid")
    const clientsecret = localStorage.getItem("clientsecret")
    if ( baseurl == null || clientid == null || clientsecret == null ){
      this.update_localStorage(false)
    }else{
      this.update_localStorage(true)
    }
  }

  
  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            {this.state.localStorage === false 
              ?
                <>
                  /**No Local Storage Information */
                  <Route path="/" element={<Oauth localStorage={this.state.localStorage} update_localStorage = {this.update_localStorage} />} />
                  <Route path="/*" element={<Oauth localStorage={this.state.localStorage} update_localStorage = {this.update_localStorage} />} />
                </>
              :
                <>
                  <Route path="/" element={<Home localStorage={this.state.localStorage} />} />
                </>
            }
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

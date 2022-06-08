import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles/main.css';
import Header from './header'


import Oauth from "./routes/oauth"
import Home from "./routes/home"
import { getRefreshToken } from './api/tokens';
import { getUsername } from './api/get';
import Budgets from './routes/budgets';

function App() {

  const [loading, setLoading ] = useState(true)
  const [ access ] = useState( localStorage.getItem("access") ? localStorage.getItem("access") : "" )
  const [ refresh ] = useState( localStorage.getItem("refresh") ? localStorage.getItem("refresh") : "" )
  const [ baseUrl, setBaseurl ] = useState( localStorage.getItem("baseurl") ? localStorage.getItem("baseurl") : "" )
  const [ time ] = useState (localStorage.getItem("time") ? localStorage.getItem("time") : "" )
  const [ username, setUsername] = useState("")

  useEffect(() => {
    if( access !== null && typeof access !== "undefined" && access !== "undefined" && access !== ""){
      if( Date.now() - time > 1036800 ){
        //Checking if the Token is older than 13 Days. 1036800
        getRefreshToken(refresh, baseUrl, setUsername)
      }else{
        getUsername(baseUrl, access, setUsername)
      }
    } else {
      if(!window.location.pathname.includes("oauth")){
        window.location.replace("/oauth")
      }
    }
  }, [access, baseUrl, refresh, time])

  return (
    <div className="App">    
      <Header username={username} />
      <div id="headerSpacer"></div>
      <div className='page'>
        <Routes>
          <Route exact path="/" element={<Home username={username} baseUrl={baseUrl} access={access} />} />
          <Route path="/budgets" element={<Budgets baseUrl={baseUrl} access={access} />} />
          <Route path="/oauth" element={<Oauth baseUrl={baseUrl} setBaseurl={setBaseurl}  />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

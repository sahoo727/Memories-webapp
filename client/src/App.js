import React from 'react';
import {Container} from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { gapi } from 'gapi-script'

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

function App() {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "272077959906-uae6fs2hurddh2c1qpc2abur54p867f2.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });
  
  return (
    <BrowserRouter>
      <Container maxWidth='lg'>
        <Navbar/>
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/auth' exact element={<Auth/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
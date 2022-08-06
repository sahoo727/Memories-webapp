import React from 'react';
import {Container} from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { gapi } from 'gapi-script'

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

function App() {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "272077959906-uae6fs2hurddh2c1qpc2abur54p867f2.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });

  const user = JSON.parse(localStorage.getItem('profile'));
  
  return (
    <BrowserRouter>
      <Container maxWidth='xl'>
        <Navbar/>
        <Routes>
          <Route path='/' exact element={<Navigate to="/posts" />} />
          <Route path='/posts' exact element={<Home/>} />
          <Route path='/posts/search' exact element={<Home/>} />
          <Route path='/posts/:id' exact element={<PostDetails/>} />
          <Route path='/auth' exact element={(!user ? <Auth/> : <Navigate to="/posts" />)} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
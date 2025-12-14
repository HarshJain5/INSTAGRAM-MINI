import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Contextapi } from './contextapi/ContextApi';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Dashboard from './components/Dashboard';
import { useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import CreatePost from './components/pages/CreatePost';
import Feed from './components/pages/Feed';
import PostDetail from './components/pages/PostDetail';
import Profile from './components/pages/Profile';
import Footer from './components/Footer';
import Users from './components/pages/Users';

function App() {
  const [loginName,setLoginName]=useState(localStorage.getItem('loginName'))
  return (  
    <Contextapi.Provider value={{loginName,setLoginName}}>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
  <Route path='/create' element={
    <ProtectedRoute>
      <CreatePost />
    </ProtectedRoute>
  }
  />
  <Route path='/feed' element={
    <ProtectedRoute>
      <Feed />
    </ProtectedRoute>
  }
  />
  <Route path='/post/:id' element={
    <ProtectedRoute>
      <PostDetail />
    </ProtectedRoute>
  }
  />
  <Route path='/profile/:id' element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
  />
  <Route path='/allusers' element={
    <ProtectedRoute>
      <Users />
    </ProtectedRoute>
  }
  />
      </Routes>
      <Footer />
    </Router>
    </Contextapi.Provider>
   );
}

export default App;
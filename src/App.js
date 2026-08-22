import React from 'react';import {Routes,Route,Navigate} from 'react-router-dom';import {AuthProvider} from './context/AuthContext';import {ConfigProvider} from './context/ConfigContext';import {LangProvider} from './context/LangContext';import Header from './components/Header';import BottomNav from './components/BottomNav';import Popup from './components/Popup';import Login from './pages/Login';import Register from './pages/Register';import Home from './pages/Home';import Mine from './pages/Mine';import Team from './pages/Team';import Projects from './pages/Projects';import Deposit from './pages/Deposit';import Withdraw from './pages/Withdraw';import AboutPage from './pages/AboutPage';import AdminDashboard from './pages/AdminDashboard';import Settings from './pages/Settings';
export default function App(){
  return(
  <AuthProvider><ConfigProvider><LangProvider>
  <div className="min-h-screen bg-gray-100 font-cairo">
  <Header/><Popup/>
  <Routes>
  <Route path="/login"element={<Login/>}/><Route path="/register"element={<Register/>}/>
  <Route path="/"element={<Home/>}/><Route path="/mine"element={<Mine/>}/><Route path="/team"element={<Team/>}/>
  <Route path="/projects"element={<Projects/>}/><Route path="/deposit"element={<Deposit/>}/>
  <Route path="/withdraw"element={<Withdraw/>}/><Route path="/about"element={<AboutPage/>}/>
  <Route path="/admin"element={<AdminDashboard/>}/><Route path="/settings"element={<Settings/>}/>
  <Route path="*"element={<Navigate to="/register"/>}/>
  </Routes>
  <BottomNav/>
  </div>
  </LangProvider></ConfigProvider></AuthProvider>);
}

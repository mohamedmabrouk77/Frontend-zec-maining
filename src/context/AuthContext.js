import React,{createContext,useContext,useState,useEffect} from 'react';import axios from 'axios';
const API = process.env.REACT_APP_API_URL || 'https://backen-zec-maining.vercel.app/api';
const AuthContext=createContext();
export function AuthProvider({children}){
  const [user,setUser]=useState(null);const [loading,setLoading]=useState(true);
  useEffect(()=>{const s=localStorage.getItem('zecUser');if(s)setUser(JSON.parse(s));setLoading(false);},[]);
  const login=async(u,p)=>{const{data}=await axios.post(`${API}/auth/login`,{username:u,password:p});localStorage.setItem('zecUser',JSON.stringify(data));setUser(data);return data;};
  const register=async(d)=>{const{data}=await axios.post(`${API}/auth/register`,d);localStorage.setItem('zecUser',JSON.stringify(data));setUser(data);return data;};
  const logout=()=>{localStorage.removeItem('zecUser');setUser(null);};
  const headers=()=>user?{Authorization:`Bearer ${user.token}`}:{};
  return <AuthContext.Provider value={{user,login,register,logout,headers,loading}}>{children}</AuthContext.Provider>;
}
export const useAuth=()=>useContext(AuthContext);

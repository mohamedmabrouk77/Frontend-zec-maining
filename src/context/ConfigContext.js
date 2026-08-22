import React,{createContext,useContext,useState,useEffect} from 'react';import axios from 'axios';import {useAuth} from './AuthContext';
const API = process.env.REACT_APP_API_URL || 'https://backen-zec-maining.vercel.app/api';
const def={logo:'https://placehold.co/80x80/10b981/ffffff?text=ZEC',appName:'ZEC Mining',primaryColor:'#0d9488',secondaryColor:'#14b8a6',aboutText:'ZEC MINING هي منصة تعدين احترافية.',contactEmail:'support@zec-mining.com',telegram:'https://t.me/zec_mining',phone:'+20 1101908275',address:'دبي، الإمارات العربية المتحدة',tickerText:'ZEC: $78.99 | الناتج اليومي: 21.66%'};
const Ctx=createContext();
export function ConfigProvider({children}){
  const [cfg,setCfg]=useState(def);const [slides,setSlides]=useState([]);const [plans,setPlans]=useState([]);const [popups,setPopups]=useState([]);const {headers}=useAuth();
  useEffect(()=>{fetchAll();},[]);
  useEffect(()=>{document.documentElement.style.setProperty('--primary-color',cfg.primaryColor);document.documentElement.style.setProperty('--secondary-color',cfg.secondaryColor);},[cfg]);
  const fetchAll=async()=>{try{const[{data:s},{data:sl},{data:pl},{data:po}]=await Promise.all([axios.get(`${API}/settings`),axios.get(`${API}/slides`),axios.get(`${API}/plans`),axios.get(`${API}/popups`)]);setCfg(s);setSlides(sl);setPlans(pl);setPopups(po);}catch(e){console.log('defaults');}};
  const updateCfg=async(d)=>{const{data}=await axios.put(`${API}/settings`,d,{headers:headers()});setCfg(data);};
  const addSlide=async(d)=>{const{data}=await axios.post(`${API}/slides`,d,{headers:headers()});setSlides([...slides,data]);};
  const delSlide=async(id)=>{await axios.delete(`${API}/slides/${id}`,{headers:headers()});setSlides(slides.filter(s=>s._id!==id));};
  const addPlan=async(d)=>{const{data}=await axios.post(`${API}/plans`,d,{headers:headers()});setPlans([...plans,data]);};
  const delPlan=async(id)=>{await axios.delete(`${API}/plans/${id}`,{headers:headers()});setPlans(plans.filter(p=>p._id!==id));};
  return <Ctx.Provider value={{cfg,setCfg:updateCfg,slides,addSlide,delSlide,plans,addPlan,delPlan,popups,refresh:fetchAll}}>{children}</Ctx.Provider>;
}
export const useConfig=()=>useContext(Ctx);

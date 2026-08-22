import React from 'react';import {useNavigate,useLocation} from 'react-router-dom';import {motion} from 'framer-motion';import {Settings,ArrowRight} from 'lucide-react';import {useConfig} from '../context/ConfigContext';import {useLang} from '../context/LangContext';
export default function Header(){
  const{cfg}=useConfig();const{t}=useLang();const navigate=useNavigate();const loc=useLocation();
  const hide=['/login','/register'].includes(loc.pathname);
  if(hide)return null;
  return(
  <motion.header initial={{y:-60}}animate={{y:0}}transition={{type:'spring',stiffness:100}}className="sticky top-0 z-50 shadow-lg"style={{backgroundColor:cfg.primaryColor}}>
  <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between text-white">
  <div className="flex items-center gap-2">
  <motion.img whileHover={{scale:1.1,rotate:5}}src={cfg.logo}alt="logo"className="w-10 h-10 rounded-xl bg-white p-1 object-cover shadow-md"/>
  <span className="font-bold text-lg">{cfg.appName}</span>
  </div>
  <motion.button whileTap={{scale:0.9}}onClick={()=>navigate('/settings')}className="p-2 hover:bg-white/10 rounded-lg transition"><Settings className="w-5 h-5"/></motion.button>
  </div>
  </motion.header>);
}

import React from 'react';import {useNavigate} from 'react-router-dom';import {motion} from 'framer-motion';import {ArrowRight,LogIn,UserCog,Info,Globe} from 'lucide-react';import {useAuth} from '../context/AuthContext';import {useConfig} from '../context/ConfigContext';import {useLang} from '../context/LangContext';
export default function Settings(){
  const{user,logout}=useAuth();const{cfg}=useConfig();const{t,toggle,lang}=useLang();const nav=useNavigate();
  return(
  <motion.div initial={{opacity:0}}animate={{opacity:1}}className="pb-24 max-w-lg mx-auto p-4">
  <div className="flex items-center gap-2 mb-6"><button onClick={()=>nav(-1)}className="p-2 hover:bg-gray-200 rounded-lg"><ArrowRight className="w-5 h-5"/></button><h1 className="text-xl font-bold">{t.settings}</h1></div>
  <div className="space-y-3">
  <motion.div whileHover={{x:-4}}onClick={()=>toggle()}className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer border border-gray-100"><div className="flex items-center gap-3"><Globe className="w-5 h-5"style={{color:cfg.primaryColor}}/><span className="font-semibold text-sm">{lang==='ar'?'English':'العربية'}</span></div><ArrowRight className="w-4 h-4 text-gray-400"/></motion.div>
  {!user&&<motion.div whileHover={{x:-4}}onClick={()=>nav('/login')}className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer border border-gray-100"><div className="flex items-center gap-3"><LogIn className="w-5 h-5"style={{color:cfg.primaryColor}}/><span className="font-semibold text-sm">{t.login}</span></div><ArrowRight className="w-4 h-4 text-gray-400"/></motion.div>}
  {user?.isAdmin&&<motion.div whileHover={{x:-4}}onClick={()=>nav('/admin')}className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer border border-gray-100"><div className="flex items-center gap-3"><UserCog className="w-5 h-5"style={{color:cfg.primaryColor}}/><span className="font-semibold text-sm">{t.admin}</span></div><ArrowRight className="w-4 h-4 text-gray-400"/></motion.div>}
  <motion.div whileHover={{x:-4}}onClick={()=>nav('/about')}className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer border border-gray-100"><div className="flex items-center gap-3"><Info className="w-5 h-5"style={{color:cfg.primaryColor}}/><span className="font-semibold text-sm">{t.aboutUs}</span></div><ArrowRight className="w-4 h-4 text-gray-400"/></motion.div>
  {user&&<motion.button whileTap={{scale:0.97}}onClick={()=>{logout();nav('/login');}}className="w-full bg-red-50 text-red-500 py-3 rounded-xl font-bold border border-red-100 mt-4">{t.logout}</motion.button>}
  </div>
  </motion.div>);
}

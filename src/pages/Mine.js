import React,{useState,useEffect} from 'react';import {useNavigate} from 'react-router-dom';import {motion} from 'framer-motion';import {CreditCard,Database,Banknote,BarChart3,MoreHorizontal,LogOut} from 'lucide-react';import {useAuth} from '../context/AuthContext';import {useConfig} from '../context/ConfigContext';import {useLang} from '../context/LangContext';import {LoadingPage} from '../components/Skeleton';
export default function Mine(){
  const [load,setLoad]=useState(true);const {user,logout}=useAuth();const {cfg}=useConfig();const {t}=useLang();const nav=useNavigate();
  useEffect(()=>{setTimeout(()=>setLoad(false),1000);},[]);
  if(load)return<LoadingPage/>;
  const acts=[{icon:CreditCard,label:t.deposit,color:'bg-blue-100 text-blue-600',path:'/deposit'},{icon:Database,label:t.deposit,color:'bg-teal-100 text-teal-600',path:'/deposit'},{icon:Banknote,label:t.withdraw,color:'bg-purple-100 text-purple-600',path:'/withdraw'},{icon:BarChart3,label:t.records,color:'bg-orange-100 text-orange-600',path:'/mine'}];
  return(
  <motion.div initial={{opacity:0}}animate={{opacity:1}}className="pb-24 max-w-lg mx-auto">
  <div className="text-white p-6 rounded-b-3xl relative overflow-hidden"style={{background:`linear-gradient(135deg,${cfg.primaryColor},${cfg.secondaryColor})`}}>
  <motion.div animate={{rotate:360}}transition={{duration:20,repeat:Infinity,ease:'linear'}}className="absolute -top-10 -left-10 w-40 h-40 rounded-full border-[20px] border-white/10"/>
  <p className="text-white/80 text-sm">{t.welcomeBack},</p><p className="font-bold text-xl">{user?.username||user?.phone||'+201101908275'}</p>
  <div className="flex justify-between mt-4 text-center relative z-10">
  <motion.div initial={{y:20,opacity:0}}animate={{y:0,opacity:1}}transition={{delay:0.2}}><p className="text-white/70 text-xs">{t.balance} (USDT)</p><p className="text-2xl font-bold">{user?.balance||0}</p></motion.div>
  <motion.div initial={{y:20,opacity:0}}animate={{y:0,opacity:1}}transition={{delay:0.3}}><p className="text-white/70 text-xs">{t.depositAmount} (USDT)</p><p className="text-2xl font-bold">{user?.deposit||0}</p></motion.div>
  </div>
  </div>
  <div className="grid grid-cols-4 gap-2 p-4">{acts.map((a,i)=>(<motion.div key={i}whileHover={{y:-4}}whileTap={{scale:0.9}}onClick={()=>nav(a.path)}className="flex flex-col items-center gap-1 cursor-pointer"><div className={`w-12 h-12 rounded-2xl ${a.color} flex items-center justify-center shadow-sm`}><a.icon className="w-5 h-5"/></div><span className="text-xs text-gray-600 font-medium">{a.label}</span></motion.div>))}</div>
  <div className="mx-4 space-y-3">
  <motion.div whileHover={{x:-4}}className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer border border-gray-100"><span className="font-semibold text-sm">{t.changePassword}</span><MoreHorizontal className="w-5 h-5 text-gray-400"/></motion.div>
  <motion.div whileHover={{x:-4}}onClick={()=>{logout();nav('/login');}}className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer border border-red-100"><span className="font-semibold text-sm text-red-500">{t.logout}</span><LogOut className="w-5 h-5 text-red-400"/></motion.div>
  </div>
  </motion.div>);
}

import React from 'react';import {NavLink,useLocation} from 'react-router-dom';import {motion} from 'framer-motion';import {Home,Briefcase,Users,Heart} from 'lucide-react';import {useLang} from '../context/LangContext';
const items=[{to:'/',icon:Home,label:'home'},{to:'/projects',icon:Briefcase,label:'projects'},{to:'/team',icon:Users,label:'team'},{to:'/mine',icon:Heart,label:'me'}];
export default function BottomNav(){
  const{t}=useLang();const loc=useLocation();
  if(['/login','/register'].includes(loc.pathname))return null;
  return(
  <motion.nav initial={{y:100}}animate={{y:0}}transition={{type:'spring',stiffness:100,delay:0.2}}className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
  <div className="max-w-lg mx-auto flex justify-around py-1.5">
  {items.map(item=>{
    const active=loc.pathname===item.to;
    return(
    <NavLink key={item.to} to={item.to} className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-lg transition relative ${active?'text-primary':'text-gray-400'}`}>
    {active&&<motion.div layoutId="nav"className="absolute -top-1 w-6 h-1 rounded-full bg-primary"transition={{type:'spring',stiffness:300,damping:30}}/>}
    <item.icon className="w-5 h-5"/><span className="text-[10px] font-medium">{t[item.label]}</span>
    </NavLink>);
  })}
  </div>
  </motion.nav>);
}

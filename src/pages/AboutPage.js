import React from 'react';import {useNavigate} from 'react-router-dom';import {motion} from 'framer-motion';import {ArrowRight,Mail,Phone,MapPin,Send} from 'lucide-react';import {useConfig} from '../context/ConfigContext';import {useLang} from '../context/LangContext';
export default function AboutPage(){
  const{cfg}=useConfig();const{t}=useLang();const nav=useNavigate();
  return(
  <motion.div initial={{opacity:0}}animate={{opacity:1}}className="pb-24 max-w-lg mx-auto p-4">
  <div className="flex items-center gap-2 mb-6"><button onClick={()=>nav(-1)}className="p-2 hover:bg-gray-200 rounded-lg transition"><ArrowRight className="w-5 h-5"/></button><h1 className="text-xl font-bold">{t.aboutUs}</h1></div>
  <motion.div initial={{y:20,opacity:0}}animate={{y:0,opacity:1}}className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
  <motion.img whileHover={{scale:1.05}}src={cfg.logo}className="w-24 h-24 mx-auto rounded-2xl object-cover shadow-lg"alt="logo"/>
  <h2 className="text-center font-bold text-xl">{cfg.appName}</h2>
  <p className="text-gray-600 text-sm leading-relaxed text-justify">{cfg.aboutText}</p>
  <div className="space-y-3 text-sm">
  {[{icon:Mail,text:cfg.contactEmail},{icon:Phone,text:cfg.phone},{icon:MapPin,text:cfg.address}].map((item,i)=>(<motion.div key={i}whileHover={{x:-4}}className="flex items-center gap-3 text-gray-600 bg-gray-50 rounded-xl p-3"><item.icon className="w-5 h-5 shrink-0"style={{color:cfg.primaryColor}}/><span>{item.text}</span></motion.div>))}
  <a href={cfg.telegram}target="_blank"rel="noreferrer"className="flex items-center gap-3 text-white rounded-xl p-3 hover:opacity-90 transition"style={{backgroundColor:cfg.primaryColor}}><Send className="w-5 h-5"/><span>{t.channel}</span></a>
  </div>
  </motion.div>
  </motion.div>);
}

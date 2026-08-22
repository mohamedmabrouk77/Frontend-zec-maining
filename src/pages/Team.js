import React,{useState,useEffect} from 'react';import {motion} from 'framer-motion';import {Shield,Twitter,Facebook,Send,Linkedin,MessageCircle,Instagram,Music,Users,Copy} from 'lucide-react';import {useConfig} from '../context/ConfigContext';import {useAuth} from '../context/AuthContext';import {useLang} from '../context/LangContext';import {LoadingPage} from '../components/Skeleton';
export default function Team(){
  const [load,setLoad]=useState(true);const {cfg}=useConfig();const {user}=useAuth();const {t}=useLang();
  useEffect(()=>{setTimeout(()=>setLoad(false),1000);},[]);
  if(load)return<LoadingPage/>;
  const social=[Twitter,Facebook,Send,Linkedin,MessageCircle,Instagram,Music,Users];
  const levels=[{level:1,ratio:'0/0',percent:'11%',color:'from-purple-500 to-purple-700'},{level:2,ratio:'0/0',percent:'3%',color:'from-blue-500 to-blue-700'},{level:3,ratio:'0/0',percent:'2%',color:'from-pink-400 to-pink-600'}];
  const link=`https://zec-mining.com/#/register?invite_code=${user?.inviteCode||'309964'}`;
  return(
  <motion.div initial={{opacity:0}}animate={{opacity:1}}className="pb-24 max-w-lg mx-auto">
  <div className="text-white p-6 relative overflow-hidden"style={{backgroundColor:cfg.primaryColor}}>
  <div className="flex items-center justify-between mb-2"><motion.span initial={{scale:0}}animate={{scale:1}}className="text-3xl font-bold">{user?.inviteCode||'309964'}</motion.span><button onClick={()=>navigator.clipboard.writeText(link)}className="bg-black/30 px-4 py-1.5 rounded-full text-sm hover:bg-black/50 transition flex items-center gap-1"><Copy className="w-3 h-3"/>{t.copy}</button></div>
  <p className="text-white/80 text-sm mb-2">{t.shareLink}</p>
  <div className="bg-black/20 rounded-lg p-2 text-xs break-all mb-3">{link}</div>
  <div className="flex gap-2 flex-wrap">{social.map((Icon,i)=>(<motion.div key={i}whileHover={{scale:1.2,rotate:10}}whileTap={{scale:0.9}}className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition"><Icon className="w-4 h-4"/></motion.div>))}</div>
  </div>
  <div className="p-4"><motion.div initial={{y:20,opacity:0}}animate={{y:0,opacity:1}}className="bg-gray-800 text-white rounded-2xl p-4 grid grid-cols-3 gap-3 text-center">{[{val:'0',label:t.teamSize},{val:'$0.00',label:t.teamDeposits},{val:'$0.00',label:t.teamEarnings},{val:'0',label:t.newMembers},{val:'0',label:t.firstDeposits},{val:'0',label:t.firstWithdrawals}].map((s,i)=>(<div key={i}><p className="text-lg font-bold">{s.val}</p><p className="text-[10px] text-gray-400">{s.label}</p></div>))}</motion.div></div>
  <div className="px-4 grid grid-cols-3 gap-3">{levels.map((lv,i)=>(<motion.div key={i}initial={{y:30,opacity:0}}animate={{y:0,opacity:1}}transition={{delay:i*0.15}}className={`bg-gradient-to-b ${lv.color} rounded-t-3xl rounded-b-xl p-3 text-white text-center shadow-lg`}><motion.div whileHover={{rotate:360}}transition={{duration:0.5}}className="w-8 h-8 bg-white/20 rounded-lg mx-auto mb-2 flex items-center justify-center"><Shield className="w-4 h-4"/></motion.div><p className="font-bold text-sm">{t.level} {lv.level}</p><div className="mt-2 bg-white/10 rounded-lg p-2 text-[10px] space-y-1"><p>{t.registeredActive}</p><p className="font-bold text-sm">{lv.ratio}</p><p>{t.commissionRate}</p><p className="font-bold text-sm">{lv.percent}</p><p>{t.totalIncome}</p><p className="font-bold text-sm">0</p></div><button className="mt-2 w-full bg-black/40 text-[10px] py-1.5 rounded-full hover:bg-black/60 transition">{t.details}</button></motion.div>))}</div>
  </motion.div>);
}

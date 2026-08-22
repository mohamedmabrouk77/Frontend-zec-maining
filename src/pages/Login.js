import React,{useState} from 'react';import {useNavigate,Link} from 'react-router-dom';import {motion} from 'framer-motion';import {User,Lock,Eye,EyeOff} from 'lucide-react';import {useAuth} from '../context/AuthContext';import {useConfig} from '../context/ConfigContext';import {useLang} from '../context/LangContext';
export default function Login(){
  const [u,setU]=useState('');const [p,setP]=useState('');const [show,setShow]=useState(false);const [err,setErr]=useState('');const [load,setLoad]=useState(false);
  const {login}=useAuth();const {cfg}=useConfig();const {t}=useLang();const nav=useNavigate();
  const sub=async e=>{e.preventDefault();setLoad(true);setErr('');try{await login(u,p);nav('/');}catch(e){setErr(e.response?.data?.message||'Invalid credentials');}setLoad(false);};
  return(
  <div className="min-h-screen bg-gray-100 flex flex-col">
  <div className="relative" style={{background:`linear-gradient(135deg,${cfg.primaryColor},${cfg.secondaryColor})`}}>
  <div className="max-w-lg mx-auto px-4 pt-12 pb-20 text-center">
  <motion.img initial={{scale:0}}animate={{scale:1}}transition={{type:'spring',delay:0.2}}src={cfg.logo}alt="logo"className="w-24 h-24 mx-auto rounded-3xl bg-white p-2 shadow-2xl mb-4"/>
  <h1 className="text-white font-bold text-2xl">{cfg.appName}</h1>
  </div>
  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gray-100 rounded-t-[2.5rem]"></div>
  </div>
  <div className="max-w-lg mx-auto w-full px-6 -mt-2">
  <h2 className="text-center font-bold text-xl text-gray-800 mb-6">{t.login}</h2>
  <form onSubmit={sub}className="space-y-4">
  <div className="relative"><User className="absolute right-3 top-3.5 w-5 h-5 text-gray-400"/>
  <input type="text"value={u}onChange={e=>setU(e.target.value)}placeholder={t.login}className="w-full pr-10 pl-4 py-3.5 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 outline-none transition"required/></div>
  <div className="relative"><Lock className="absolute right-3 top-3.5 w-5 h-5 text-gray-400"/>
  <input type={show?'text':'password'}value={p}onChange={e=>setP(e.target.value)}placeholder={t.password}className="w-full pr-10 pl-10 py-3.5 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 outline-none transition"required/>
  <button type="button"onClick={()=>setShow(!show)}className="absolute left-3 top-3.5 text-gray-400">{show?<EyeOff className="w-5 h-5"/>:<Eye className="w-5 h-5"/>}</button></div>
  {err&&<div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl text-center">{err}</div>}
  <motion.button whileTap={{scale:0.97}}disabled={load}type="submit"className="w-full text-white py-3.5 rounded-xl font-bold shadow-lg transition disabled:opacity-50"style={{backgroundColor:cfg.primaryColor}}>{load?'...':t.login}</motion.button>
  <Link to="/register"className="block w-full text-center py-3 rounded-xl font-bold border-2 text-sm transition hover:bg-gray-50"style={{borderColor:cfg.primaryColor,color:cfg.primaryColor}}>{t.noAccount} {t.createNow}</Link>
  </form>
  </div>
  </div>);
}

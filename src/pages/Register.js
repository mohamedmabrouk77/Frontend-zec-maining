import React,{useState} from 'react';import {useNavigate,Link} from 'react-router-dom';import {motion} from 'framer-motion';import {Mail,Lock,Eye,EyeOff,Phone,Gift,User} from 'lucide-react';import {useAuth} from '../context/AuthContext';import {useConfig} from '../context/ConfigContext';import {useLang} from '../context/LangContext';
export default function Register(){
  const [tab,setTab]=useState('email');const [showPass,setShowPass]=useState(false);const [showConfirm,setShowConfirm]=useState(false);
  const [form,setForm]=useState({username:'',email:'',password:'',confirmPassword:'',phone:'',inviteCode:''});
  const [err,setErr]=useState('');const [load,setLoad]=useState(false);
  const {register}=useAuth();const {cfg}=useConfig();const {t}=useLang();const nav=useNavigate();
  const ch=e=>setForm({...form,[e.target.name]:e.target.value});
  const sub=async e=>{e.preventDefault();if(form.password!==form.confirmPassword){setErr('Passwords do not match');return;}setLoad(true);setErr('');try{await register({...form,username:form.email.split('@')[0]});nav('/');}catch(e){setErr(e.response?.data?.message||'Error');}setLoad(false);};
  return(
  <div className="min-h-screen bg-gray-100 flex flex-col">
  {/* Top curved header */}
  <div className="relative" style={{background:`linear-gradient(135deg,${cfg.primaryColor},${cfg.secondaryColor})`}}>
  <div className="max-w-lg mx-auto px-4 pt-8 pb-20 text-center relative">
  <div className="flex justify-between items-start mb-4">
  <button onClick={()=>nav('/login')} className="text-white/80 text-sm hover:text-white">{t.login}</button>
  <div className="flex items-center gap-1 text-white/80 text-sm"><span className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center text-[10px]">🌐</span>عربي</div>
  </div>
  <motion.img initial={{scale:0}}animate={{scale:1}}transition={{type:'spring',delay:0.2}}src={cfg.logo}alt="logo"className="w-20 h-20 mx-auto rounded-2xl bg-white p-1 shadow-xl mb-2"/>
  </div>
  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-100 rounded-t-[2rem]"></div>
  </div>

  {/* Tabs */}
  <div className="max-w-lg mx-auto w-full px-6 -mt-4 relative z-10">
  <div className="bg-white rounded-2xl shadow-lg p-1 flex mb-6">
  <button onClick={()=>setTab('phone')}className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition ${tab==='phone'?'text-white shadow-md':'text-gray-500 hover:text-gray-700'}`}style={tab==='phone'?{backgroundColor:cfg.primaryColor}:{}}>{t.phone}</button>
  <button onClick={()=>setTab('email')}className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition ${tab==='email'?'text-white shadow-md':'text-gray-500 hover:text-gray-700'}`}style={tab==='email'?{backgroundColor:cfg.primaryColor}:{}}>{t.email}</button>
  </div>

  <form onSubmit={sub}className="space-y-4">
  {tab==='email'?(
  <div className="space-y-4">
  <div><label className="text-sm font-medium text-gray-700 mb-1 block">{t.email}</label>
  <div className="relative"><Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400"/>
  <input type="email"name="email"value={form.email}onChange={ch}placeholder={t.email}className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 outline-none transition"required/></div></div>
  </div>
  ):(
  <div><label className="text-sm font-medium text-gray-700 mb-1 block">{t.phone}</label>
  <div className="relative flex items-center border border-gray-200 rounded-xl bg-white overflow-hidden">
  <span className="px-3 py-3 text-sm text-gray-500 border-l border-gray-200 bg-gray-50">+20</span>
  <input type="tel"name="phone"value={form.phone}onChange={ch}placeholder={t.phone}className="flex-1 px-4 py-3 text-sm outline-none"/>
  </div></div>
  )}

  <div><label className="text-sm font-medium text-gray-700 mb-1 block">{t.password}</label>
  <div className="relative"><Lock className="absolute right-3 top-3 w-5 h-5 text-gray-400"/>
  <input type={showPass?'text':'password'}name="password"value={form.password}onChange={ch}placeholder={t.password}className="w-full pr-10 pl-10 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 outline-none transition"required/>
  <button type="button"onClick={()=>setShowPass(!showPass)}className="absolute left-3 top-3 text-gray-400 hover:text-gray-600">{showPass?<EyeOff className="w-5 h-5"/>:<Eye className="w-5 h-5"/>}</button>
  </div></div>

  <div><label className="text-sm font-medium text-gray-700 mb-1 block">{t.confirmPassword}</label>
  <div className="relative"><Lock className="absolute right-3 top-3 w-5 h-5 text-gray-400"/>
  <input type={showConfirm?'text':'password'}name="confirmPassword"value={form.confirmPassword}onChange={ch}placeholder={t.confirmPassword}className="w-full pr-10 pl-10 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 outline-none transition"required/>
  <button type="button"onClick={()=>setShowConfirm(!showConfirm)}className="absolute left-3 top-3 text-gray-400 hover:text-gray-600">{showConfirm?<EyeOff className="w-5 h-5"/>:<Eye className="w-5 h-5"/>}</button>
  </div></div>

  <div><label className="text-sm font-medium text-gray-700 mb-1 block">{t.inviteCode}</label>
  <div className="relative"><Gift className="absolute right-3 top-3 w-5 h-5 text-gray-400"/>
  <input type="text"name="inviteCode"value={form.inviteCode}onChange={ch}placeholder={t.inviteCode}className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 outline-none transition"/>
  </div></div>

  {err&&<div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl text-center">{err}</div>}

  <motion.button whileTap={{scale:0.97}}disabled={load}type="submit"className="w-full text-white py-3.5 rounded-xl font-bold shadow-lg transition disabled:opacity-50 text-base"style={{backgroundColor:cfg.primaryColor}}>
  {load?'...':t.submit}
  </motion.button>

  <Link to="/login"className="block w-full text-center py-3 rounded-xl font-bold border-2 text-sm transition hover:bg-gray-50"style={{borderColor:cfg.primaryColor,color:cfg.primaryColor}}>
  {t.haveAccount}
  </Link>
  </form>
  </div>
  </div>);
}

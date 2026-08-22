import React,{useState,useEffect} from 'react';import {useNavigate} from 'react-router-dom';import {motion} from 'framer-motion';import {ArrowRight} from 'lucide-react';import {useConfig} from '../context/ConfigContext';import {useAuth} from '../context/AuthContext';import {useLang} from '../context/LangContext';import {SkeletonBox} from '../components/Skeleton';import axios from 'axios';
const API=process.env.REACT_APP_API_URL||'http://localhost:5000/api';
const methods=['BEP20-USDT','TRC20-USDT','BEP20-USDC','ETH-USDT','ETH-USDC','POL-USDT','POL-USDC'];
export default function Withdraw(){
  const [load,setLoad]=useState(true);const [amt,setAmt]=useState('');const [addr,setAddr]=useState('');const [method,setMethod]=useState('BEP20-USDT');
  const {cfg}=useConfig();const {user,headers}=useAuth();const {t}=useLang();const nav=useNavigate();
  useEffect(()=>{setTimeout(()=>setLoad(false),800);},[]);
  const sub=async e=>{e.preventDefault();try{await axios.post(`${API}/withdraw`,{amount:Number(amt),address:addr,currency:method},{headers:headers()});alert('Withdrawal requested!');nav('/mine');}catch(e){alert(e.response?.data?.message||'Error');}};
  if(load)return(<div className="pb-24 max-w-lg mx-auto p-4 space-y-4"><SkeletonBox className="h-32 w-full"/><SkeletonBox className="h-12 w-full"/><SkeletonBox className="h-12 w-full"/><SkeletonBox className="h-12 w-full"/></div>);
  return(
  <div className="pb-24 max-w-lg mx-auto">
  <div className="text-white p-4 flex items-center gap-2"style={{backgroundColor:cfg.primaryColor}}><button onClick={()=>nav(-1)}className="p-2 hover:bg-white/10 rounded-lg"><ArrowRight className="w-5 h-5"/></button><h1 className="font-bold">{t.withdraw}</h1></div>
  <div className="p-4">
  <motion.div initial={{y:10,opacity:0}}animate={{y:0,opacity:1}}className="bg-white rounded-2xl p-4 shadow-sm mb-4 border border-gray-100"><p className="text-sm text-gray-500">{t.balance}</p><p className="text-xs text-red-400">24h</p><div className="bg-gray-50 rounded-xl p-3 mt-2 text-center border border-gray-100"><p className="text-xs text-gray-500">{t.balance}</p><p className="text-2xl font-bold"style={{color:cfg.primaryColor}}>{user?.balance||0} USDT</p></div></motion.div>
  <p className="text-sm font-semibold mb-2">{t.selectCurrency}:</p><div className="flex flex-wrap gap-2 mb-4">{methods.map(c=>(<button key={c}onClick={()=>setMethod(c)}className={`px-3 py-1.5 text-xs rounded-lg font-medium shadow-sm transition ${method===c?'text-white':'bg-gray-100 text-gray-600'}`}style={method===c?{backgroundColor:cfg.primaryColor}:{}}>{c}</button>))}</div>
  <motion.form initial={{y:10,opacity:0}}animate={{y:0,opacity:1}}transition={{delay:0.1}}onSubmit={sub}className="bg-white rounded-2xl p-4 shadow-sm space-y-3 border border-gray-100">
  <p className="text-xs text-gray-400">1.000 - 999999.000</p>
  <input type="number"value={amt}onChange={e=>setAmt(e.target.value)}placeholder={t.enterAmount}className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 transition"style={{'--tw-ring-color':cfg.primaryColor}}required/>
  <input type="text"value={addr}onChange={e=>setAddr(e.target.value)}placeholder={t.withdrawAddress}className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 transition"required/>
  <input type="password"placeholder={t.password}className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 transition"required/>
  <div className="flex justify-between text-sm py-1"><span className="text-gray-500">{t.youWillReceive}</span><span className="font-bold">{amt||0} USDT</span></div>
  <motion.button whileTap={{scale:0.97}}type="submit"className="w-full text-white py-3 rounded-xl font-bold shadow-lg"style={{backgroundColor:cfg.primaryColor}}>{t.confirm}</motion.button>
  </motion.form>
  </div>
  </div>);
}

import React,{useState,useEffect} from 'react';import {useNavigate} from 'react-router-dom';import {motion} from 'framer-motion';import {ArrowRight,ChevronLeft,Copy} from 'lucide-react';import {useConfig} from '../context/ConfigContext';import {useAuth} from '../context/AuthContext';import {useLang} from '../context/LangContext';import {SkeletonBox} from '../components/Skeleton';import axios from 'axios';
const API=process.env.REACT_APP_API_URL||'http://localhost:5000/api';
const currencies=['BEP20-USDT','TRX','TRC20-USDT','BNB','BEP20-USDC','ETH','ETH-USDT','ETH-USDC','POL','POL-USDT','POL-USDC','ETH-PYUSD'];
export default function Deposit(){
  const [cur,setCur]=useState('BEP20-USDT');const [load,setLoad]=useState(true);const [qr,setQr]=useState('');const [addr,setAddr]=useState('');
  const {cfg}=useConfig();const {headers}=useAuth();const {t}=useLang();const nav=useNavigate();
  useEffect(()=>{fetchAddr();},[cur]);
  const fetchAddr=async()=>{setLoad(true);try{const{data}=await axios.get(`${API}/deposit/address/${cur}`,{headers:headers()});setAddr(data.address);setQr(data.qrCode);}catch(e){setAddr('0x67DFd2B801e7b8bB7d950d4de4b040D8352CC1ab');}setLoad(false);};
  if(load)return(<div className="pb-24 max-w-lg mx-auto p-4 space-y-4"><SkeletonBox className="h-12 w-full"/>{Array.from({length:6}).map((_,i)=><SkeletonBox key={i} className="h-14 w-full"/>)}</div>);
  return(
  <div className="pb-24 max-w-lg mx-auto">
  <div className="text-white p-4 flex items-center gap-2"style={{backgroundColor:cfg.primaryColor}}><button onClick={()=>nav(-1)}className="p-2 hover:bg-white/10 rounded-lg transition"><ArrowRight className="w-5 h-5"/></button><h1 className="font-bold">{t.selectCurrency}</h1></div>
  <div className="p-4 space-y-2">{currencies.map(c=>(<motion.div key={c}whileTap={{scale:0.98}}onClick={()=>setCur(c)}className={`bg-white rounded-xl p-3 flex items-center justify-between shadow-sm cursor-pointer border-2 transition ${cur===c?'border-primary':'border-transparent'}`}><span className="font-semibold text-sm">{c}</span><ChevronLeft className="w-5 h-5 text-gray-400"/></motion.div>))}</div>
  <motion.div initial={{y:20,opacity:0}}animate={{y:0,opacity:1}}className="mx-4 bg-white rounded-2xl p-6 shadow-sm text-center border border-gray-100">
  <p className="font-bold mb-4">{cur}</p>
  <div className="w-44 h-44 bg-white mx-auto rounded-xl flex items-center justify-center mb-4 border-2 border-dashed border-gray-200 shadow-inner">{qr?<img src={qr}alt="qr"className="w-40 h-40"/>:<div className="text-gray-400 text-xs">QR Loading...</div>}</div>
  <p className="text-sm text-gray-500 mb-2">{t.walletAddress}</p>
  <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-2"><input type="text"value={addr}readOnly className="flex-1 bg-transparent text-xs outline-none text-left dir-ltr"/><button onClick={()=>navigator.clipboard.writeText(addr)}className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-black transition"><Copy className="w-3 h-3"/>{t.copy}</button></div>
  <motion.button whileTap={{scale:0.97}}className="w-full mt-5 text-white py-3 rounded-xl font-bold shadow-lg"style={{backgroundColor:cfg.primaryColor}}>{t.depositDone}</motion.button>
  </motion.div>
  </div>);
}

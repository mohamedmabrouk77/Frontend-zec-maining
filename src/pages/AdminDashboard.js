import React,{useState,useEffect} from 'react';import {useNavigate} from 'react-router-dom';import {motion} from 'framer-motion';import {ArrowRight,Palette,Image,Save,Plus,Trash2} from 'lucide-react';import {useAuth} from '../context/AuthContext';import {useConfig} from '../context/ConfigContext';import {useLang} from '../context/LangContext';
export default function AdminDashboard(){
  const{user}=useAuth();const{cfg,setCfg,slides,addSlide,delSlide,plans,addPlan,delPlan}=useConfig();const{t}=useLang();const nav=useNavigate();
  const[form,setForm]=useState(cfg);const[newSlide,setNewSlide]=useState('');const[newPlan,setNewPlan]=useState({name:'',dailyProfit:'',price:'',days:'30',imageUrl:'',limited:false});const[saved,setSaved]=useState(false);
  useEffect(()=>{if(!user?.isAdmin)nav('/');setForm(cfg);},[cfg,user,nav]);
  const save=async()=>{await setCfg(form);setSaved(true);setTimeout(()=>setSaved(false),2000);};
  const addS=async()=>{if(!newSlide)return;await addSlide({imageUrl:newSlide,title:'',active:true});setNewSlide('');};
  const addP=async()=>{await addPlan({...newPlan,dailyProfit:Number(newPlan.dailyProfit),price:Number(newPlan.price),days:Number(newPlan.days),active:true});setNewPlan({name:'',dailyProfit:'',price:'',days:'30',imageUrl:'',limited:false});};
  const ic="w-full border rounded-xl px-4 py-2.5 text-sm focus:ring-2 outline-none transition";
  return(
  <motion.div initial={{opacity:0}}animate={{opacity:1}}className="pb-24 max-w-lg mx-auto p-4">
  <div className="flex items-center gap-2 mb-6"><button onClick={()=>nav(-1)}className="p-2 hover:bg-gray-200 rounded-lg"><ArrowRight className="w-5 h-5"/></button><h1 className="text-xl font-bold">{t.admin}</h1><span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full">ADMIN</span></div>
  <motion.div initial={{y:10}}animate={{y:0}}className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
  <h2 className="font-bold mb-4 flex items-center gap-2"><Palette className="w-4 h-4"/>{t.customize}</h2>
  <div className="space-y-3">
  <div><label className="text-xs text-gray-500 mb-1 block">{t.logoUrl}</label><input type="text"value={form.logo}onChange={e=>setForm({...form,logo:e.target.value})}className={ic}/></div>
  <div><label className="text-xs text-gray-500 mb-1 block">{t.appName}</label><input type="text"value={form.appName}onChange={e=>setForm({...form,appName:e.target.value})}className={ic}/></div>
  <div className="grid grid-cols-2 gap-3">
  <div><label className="text-xs text-gray-500 mb-1 block">{t.primaryColor}</label><div className="flex items-center gap-2"><input type="color"value={form.primaryColor}onChange={e=>setForm({...form,primaryColor:e.target.value})}className="w-10 h-10 rounded-lg border cursor-pointer"/><input type="text"value={form.primaryColor}onChange={e=>setForm({...form,primaryColor:e.target.value})}className={ic}/></div></div>
  <div><label className="text-xs text-gray-500 mb-1 block">{t.secondaryColor}</label><div className="flex items-center gap-2"><input type="color"value={form.secondaryColor}onChange={e=>setForm({...form,secondaryColor:e.target.value})}className="w-10 h-10 rounded-lg border cursor-pointer"/><input type="text"value={form.secondaryColor}onChange={e=>setForm({...form,secondaryColor:e.target.value})}className={ic}/></div></div>
  </div>
  <div><label className="text-xs text-gray-500 mb-1 block">{t.ticker}</label><input type="text"value={form.tickerText}onChange={e=>setForm({...form,tickerText:e.target.value})}className={ic}/></div>
  <div><label className="text-xs text-gray-500 mb-1 block">{t.aboutUs}</label><textarea value={form.aboutText}onChange={e=>setForm({...form,aboutText:e.target.value})}rows={2}className={ic}/></div>
  <div><label className="text-xs text-gray-500 mb-1 block">Email</label><input type="text"value={form.contactEmail}onChange={e=>setForm({...form,contactEmail:e.target.value})}className={ic}/></div>
  <div><label className="text-xs text-gray-500 mb-1 block">Telegram</label><input type="text"value={form.telegram}onChange={e=>setForm({...form,telegram:e.target.value})}className={ic}/></div>
  <div><label className="text-xs text-gray-500 mb-1 block">{t.phone}</label><input type="text"value={form.phone}onChange={e=>setForm({...form,phone:e.target.value})}className={ic}/></div>
  </div>
  </motion.div>
  <motion.div initial={{y:10}}animate={{y:0}}transition={{delay:0.1}}className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
  <h2 className="font-bold mb-4 flex items-center gap-2"><Image className="w-4 h-4"/>{t.slides}</h2>
  <div className="flex gap-2 mb-4"><input type="text"placeholder={t.imageUrl}value={newSlide}onChange={e=>setNewSlide(e.target.value)}className={ic}/><motion.button whileTap={{scale:0.9}}onClick={addS}className="bg-gray-900 text-white px-4 rounded-xl"><Plus className="w-5 h-5"/></motion.button></div>
  <div className="space-y-2 max-h-60 overflow-y-auto">{slides.map(s=>(<div key={s._id}className="flex items-center gap-2 bg-gray-50 rounded-xl p-2"><img src={s.imageUrl}alt="slide"className="w-12 h-12 rounded-lg object-cover"/><span className="text-xs text-gray-500 flex-1 truncate">{s.imageUrl}</span><button onClick={()=>delSlide(s._id)}className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4"/></button></div>))}{slides.length===0&&<p className="text-xs text-gray-400 text-center py-4">No slides</p>}</div>
  </motion.div>
  <motion.div initial={{y:10}}animate={{y:0}}transition={{delay:0.2}}className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
  <h2 className="font-bold mb-4 flex items-center gap-2"><Image className="w-4 h-4"/>{t.plans}</h2>
  <div className="grid grid-cols-2 gap-2 mb-4">
  <input type="text"placeholder={t.name}value={newPlan.name}onChange={e=>setNewPlan({...newPlan,name:e.target.value})}className={ic}/>
  <input type="number"placeholder={t.price}value={newPlan.price}onChange={e=>setNewPlan({...newPlan,price:e.target.value})}className={ic}/>
  <input type="number"placeholder={t.dailyProfit}value={newPlan.dailyProfit}onChange={e=>setNewPlan({...newPlan,dailyProfit:e.target.value})}className={ic}/>
  <input type="number"placeholder={t.days}value={newPlan.days}onChange={e=>setNewPlan({...newPlan,days:e.target.value})}className={ic}/>
  <input type="text"placeholder={t.imageUrl}value={newPlan.imageUrl}onChange={e=>setNewPlan({...newPlan,imageUrl:e.target.value})}className={ic}/>
  <label className="flex items-center gap-2 text-sm"><input type="checkbox"checked={newPlan.limited}onChange={e=>setNewPlan({...newPlan,limited:e.target.checked})}className="rounded"/>{t.limited}</label>
  </div>
  <motion.button whileTap={{scale:0.9}}onClick={addP}className="w-full bg-gray-900 text-white py-2 rounded-xl text-sm font-bold mb-4">{t.addPlan}</motion.button>
  <div className="space-y-2 max-h-60 overflow-y-auto">{plans.map(p=>(<div key={p._id}className="flex items-center gap-2 bg-gray-50 rounded-xl p-2"><img src={p.imageUrl||cfg.logo}alt="plan"className="w-10 h-10 rounded-lg object-cover"/><div className="flex-1"><p className="text-xs font-bold">{p.name}</p><p className="text-[10px] text-gray-500">{p.price} USDT</p></div><button onClick={()=>delPlan(p._id)}className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4"/></button></div>))}</div>
  </motion.div>
  <motion.button whileTap={{scale:0.97}}onClick={save}className="w-full text-white py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 transition"style={{backgroundColor:cfg.primaryColor}}><Save className="w-5 h-5"/>{saved?t.saved:t.save}</motion.button>
  </motion.div>);
}

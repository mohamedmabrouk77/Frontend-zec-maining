import React,{useState,useEffect} from 'react';import {motion} from 'framer-motion';import {useConfig} from '../context/ConfigContext';import {useLang} from '../context/LangContext';import {LoadingPage} from '../components/Skeleton';
export default function Projects(){
  const [load,setLoad]=useState(true);const {cfg,plans}=useConfig();const {t}=useLang();
  useEffect(()=>{setTimeout(()=>setLoad(false),1200);},[]);
  if(load)return<LoadingPage/>;
  const displayPlans=plans.length?plans:[{name:'زيك مينر 0',dailyProfit:1.70,price:6.00,days:30,imageUrl:cfg.logo},{name:'زيك مينر 1',dailyProfit:2.60,price:12.00,days:90,imageUrl:cfg.logo},{name:'زيك مينر 2',dailyProfit:17.29,price:79.00,days:90,imageUrl:cfg.logo},{name:'زيك مينر 10',dailyProfit:29660.07,price:89879.00,days:90,imageUrl:cfg.logo,limited:true}];
  return(
  <motion.div initial={{opacity:0}}animate={{opacity:1}}className="pb-24 max-w-lg mx-auto p-4">
  <h2 className="text-center font-bold text-xl mb-6 text-gray-800">{t.projectHall}</h2>
  <div className="space-y-4">
  {displayPlans.map((pl,idx)=>{
    const isVip=pl.price>=1000;
    return(
    <motion.div key={idx}initial={{x:50,opacity:0}}animate={{x:0,opacity:1}}transition={{delay:idx*0.1}}whileHover={{y:-3}}
      className={`rounded-2xl p-5 shadow-sm border transition overflow-hidden relative ${isVip?'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200':'bg-white border-gray-100'}`}>
      {isVip&&<div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">VIP</div>}
      <div className="flex items-center gap-4">
        <motion.img whileHover={{rotate:15,scale:1.1}}src={pl.imageUrl||cfg.logo}className={`w-16 h-16 rounded-xl object-cover shadow-sm ${isVip?'ring-2 ring-yellow-400':''}`}alt="miner"/>
        <div className="flex-1">
          <h3 className="font-bold">{pl.name}</h3>
          <div className="text-xs text-gray-500 mt-1 space-y-0.5">
            <p>{t.dailyProfit}: <span className="font-bold"style={{color:cfg.primaryColor}}>{pl.dailyProfit} USDT</span></p>
            <p>{t.cycle}: {pl.days} {t.days==='Days'?'days':'يوم'}</p>
            <p>{pl.limited?t.limited:t.unlimited}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div><p className="text-xs text-gray-400">{t.price}</p><p className="text-lg font-bold text-gray-800">{pl.price} USDT</p></div>
        <motion.button whileTap={{scale:0.97}}className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition">{t.buyNow}</motion.button>
      </div>
    </motion.div>);
  })}
  </div>
  </motion.div>);
}

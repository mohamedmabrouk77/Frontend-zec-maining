import React,{useState,useEffect} from 'react';import {motion,AnimatePresence} from 'framer-motion';import {X} from 'lucide-react';import {useConfig} from '../context/ConfigContext';
export default function Popup(){
  const{popups}=useConfig();const[show,setShow]=useState(false);const[idx,setIdx]=useState(0);
  useEffect(()=>{if(popups.length){const seen=sessionStorage.getItem('popup_seen');if(!seen||!popups[0].showOnce){setShow(true);}}},[popups]);
  const close=()=>{setShow(false);sessionStorage.setItem('popup_seen','1');};
  const next=()=>{if(idx<popups.length-1)setIdx(idx+1);else close();};
  if(!show||!popups[idx])return null;
  return(
  <AnimatePresence><motion.div key="popup"initial={{opacity:0}}animate={{opacity:1}}exit={{opacity:0}}className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
  <motion.div initial={{scale:0.8,y:50}}animate={{scale:1,y:0}}exit={{scale:0.8,y:50}}className="bg-white rounded-3xl w-full max-w-sm p-6 relative shadow-2xl max-h-[80vh] overflow-y-auto">
  <button onClick={close}className="absolute top-3 left-3 p-2 hover:bg-gray-100 rounded-full transition"><X className="w-5 h-5 text-gray-500"/></button>
  <h3 className="text-center font-bold text-lg mb-4 text-gray-800">{popups[idx].title||'إعلان!'}</h3>
  <div className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{popups[idx].content}</div>
  <div className="flex gap-3 mt-6">
  <button onClick={close}className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 transition">{idx<popups.length-1?'التالي':'إغلاق'}</button>
  {idx<popups.length-1&&<button onClick={next}className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-primary hover:opacity-90 transition">التالي</button>}
  </div>
  </motion.div>
  </motion.div></AnimatePresence>);
}

// starts one or two pets (angel + nyang) and shares the desktop bridge between them
window.bootPets=function(common){
 const CH={angel:AngelChar,nyang:NyangChar},ORDER=['angel','nyang'];
 let ch='angel',duo=true;
 try{ch=localStorage.getItem('petChar')||'angel';duo=localStorage.getItem('petDuo')!=='0'}catch(e){}
 if(!CH[ch])ch='angel';
 const real=common.bridge,ign={},pets=[];
 const setDuo=v=>{try{localStorage.setItem('petDuo',v?'1':'0')}catch(e){}location.reload()};
 const list=duo?[ch,...ORDER.filter(c=>c!==ch)]:[ch];
 list.forEach((c,i)=>{
  let br;
  if(real){br=Object.assign({},real,{
   setIgnore(v){ign[i]=v;real.setIgnore(Object.values(ign).every(Boolean))},
   onAction(cb){real.onAction(a=>{if(i>0&&(a==='rename'||a==='switch'))return;if(a==='rename2'){if(i===1)cb('rename');return}if(a==='duo'){if(i===0)setDuo(!duo);return}cb(a)})}
  })}
  pets.push(TigerPet(Object.assign({},common,CH[c],{bridge:br,hud:i===0,followGap:i?220:95,startX:duo?(i?0.66:0.34):0.5,
   friend:duo?()=>pets[1-i]&&pets[1-i].pos():null,
   onSwitch(){try{localStorage.setItem('petChar',ORDER[(ORDER.indexOf(ch)+1)%ORDER.length])}catch(e){}location.reload()}})));
 });
 if(real&&real.state)real.state({duo});
 return {pets,ch,duo,CH,setDuo,
  all(name){pets.forEach(p=>p[name]&&p[name]())},
  main:pets[0]};
};

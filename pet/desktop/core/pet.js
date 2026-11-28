// 꼬미: shared pet brain + drawing (web + desktop)
(function(){
const LN='#4a3b36',ON='#e8c39e',ON2='#fbe3c8',W='#fffdfb';
const st=(w)=>`stroke="${LN}" stroke-width="${w||3.2}" stroke-linecap="round" stroke-linejoin="round"`;
const SVG=`<svg viewBox="0 0 200 200" aria-hidden="true">
<defs>
 <filter id="pRough" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="2.4"/></filter>
 <filter id="pBlush" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.6"/></filter>
</defs>
<g filter="url(#pRough)">
 <g class="tail onesie"><path d="M134 166C170 172 184 140 168 124C156 112 140 124 150 136" fill="none" ${st(13)}/><path d="M134 166C170 172 184 140 168 124C156 112 140 124 150 136" fill="none" stroke="${ON}" stroke-width="7.4" stroke-linecap="round"/></g>
 <g class="tail tigeronly"><path d="M132 168C160 170 174 150 171 128C170 116 176 108 183 112" fill="none" ${st(13)}/><path d="M132 168C160 170 174 150 171 128C170 116 176 108 183 112" fill="none" stroke="${W}" stroke-width="7.4" stroke-linecap="round"/><path d="M132 168C160 170 174 150 171 128C170 116 176 108 183 112" fill="none" stroke="${LN}" stroke-width="7.4" stroke-dasharray="2.6 9"/></g>
 <g class="onesie"><ellipse cx="100" cy="152" rx="42" ry="35" fill="${ON}" ${st()}/><ellipse cx="100" cy="158" rx="22" ry="18" fill="${ON2}" ${st(2.4)}/></g>
 <g class="tigeronly"><ellipse cx="100" cy="152" rx="40" ry="34" fill="${W}" ${st()}/><path d="M61 144q8 2 9 9M63 158q6 1 7 6M139 144q-8 2-9 9M137 158q-6 1-7 6" fill="none" ${st(3.4)}/></g>
 <ellipse cx="80" cy="184" rx="14" ry="8.5" style="fill:var(--limb)" ${st()}/><ellipse cx="120" cy="184" rx="14" ry="8.5" style="fill:var(--limb)" ${st()}/>
 <path d="M78 182v5M82 182v5M118 182v5M122 182v5" ${st(1.8)}/>
 <circle cx="54" cy="48" r="15" fill="${W}" ${st()}/><path d="M48 52q6-9 12 0" fill="#ffd3da" ${st(2.2)}/>
 <circle cx="146" cy="48" r="15" fill="${W}" ${st()}/><path d="M140 52q6-9 12 0" fill="#ffd3da" ${st(2.2)}/>
 <g class="onesie"><circle cx="27" cy="94" r="17" fill="${ON}" ${st()}/><circle cx="27" cy="94" r="8.5" fill="${ON2}" ${st(2)}/><circle cx="173" cy="94" r="17" fill="${ON}" ${st()}/><circle cx="173" cy="94" r="8.5" fill="${ON2}" ${st(2)}/></g>
 <ellipse cx="100" cy="90" rx="62" ry="48" fill="${W}" ${st()}/>
 <path d="M100 52v11M88 54l2.4 9M112 54l-2.4 9M39 86h11M40 97h9M161 86h-11M160 97h-9" ${st(3.4)}/>
 <g class="onesie"><path fill-rule="evenodd" fill="${ON}" ${st()} d="M28 88a72 60 0 1 0 144 0a72 60 0 1 0-144 0ZM48 96a52 40 0 1 0 104 0a52 40 0 1 0-104 0Z"/><path d="M92 30q8-11 16 0" fill="none" ${st(2.6)}/><path d="M60 38q-6 4-8 10M140 38q6 4 8 10" fill="none" stroke="#c99a6e" stroke-width="2.4" stroke-linecap="round"/></g>
 <g class="cheek" opacity=".85"><ellipse cx="66" cy="108" rx="12" ry="8.5" fill="#ffaabb" filter="url(#pBlush)"/><ellipse cx="134" cy="108" rx="12" ry="8.5" fill="#ffaabb" filter="url(#pBlush)"/></g>
 <g id="pEyes"><g class="en"><ellipse cx="80" cy="92" rx="4.4" ry="5.4" fill="${LN}"/><circle cx="78.7" cy="90" r="1.4" fill="#fff"/><ellipse cx="120" cy="92" rx="4.4" ry="5.4" fill="${LN}"/><circle cx="118.7" cy="90" r="1.4" fill="#fff"/></g></g>
 <path class="eh" d="M73 94q7-9 14 0M113 94q7-9 14 0" fill="none" ${st(3)}/>
 <path class="ec" d="M73 91q7 6 14 0M113 91q7 6 14 0" fill="none" ${st(3)}/>
 <ellipse cx="100" cy="101" rx="2.8" ry="2" fill="${LN}"/>
 <path class="ms" d="M94 104q3 3.5 6 0q3 3.5 6 0" fill="none" ${st(2.4)}/>
 <ellipse class="mo" cx="100" cy="108" rx="5" ry="5.5" fill="#ff8fa3" ${st(2.4)}/>
 <g class="tears"><path d="M76 96q-3 9 0 17M124 96q3 9 0 17" fill="none" stroke="#8fd3ff" stroke-width="5" stroke-linecap="round"/><path class="drop" d="M68 100q4 6 0 9q-4-3 0-9z" fill="#8fd3ff" ${st(1.6)}/><path class="drop drop2" d="M132 100q4 6 0 9q-4-3 0-9z" fill="#8fd3ff" ${st(1.6)}/><path class="drop drop2" d="M60 96q4 6 0 9q-4-3 0-9z" fill="#8fd3ff" ${st(1.6)}/></g>
 <path class="angry" d="M164 36l7-7 3 8 7-7M170 52l9-3-4 7 9-2" fill="none" ${st(3)}/>
 <g class="paw pawL"><circle cx="64" cy="146" r="12" style="fill:var(--limb)" ${st()}/><path d="M60 140v5M66 139v5" ${st(1.8)}/></g>
 <g class="paw pawR"><circle cx="136" cy="146" r="12" style="fill:var(--limb)" ${st()}/><path d="M134 139v5M140 140v5" ${st(1.8)}/></g>
 <path class="sweat" d="M158 56q6 9 0 13q-6-4 0-13z" fill="#8fd3ff" ${st(1.8)}/>
</g></svg>`;

window.TigerPet=function(opt){
 opt=opt||{};
 const desktop=!!opt.desktop,KEY=opt.key||'tigerPet2',CL=opt.clothes||{on:'🐒 잠옷 입히기',off:'🐒 잠옷 벗기기'},bridge=opt.bridge,M=Object.assign({top:20,bottom:20},opt.margins||{});
 const $=id=>document.getElementById(id);
 const mk=(t,c)=>{const e=document.createElement(t);if(c)e.className=c;document.body.appendChild(e);return e};
 const shadow=mk('div','p-shadow'),bubble=mk('div','p-bubble'),pet=mk('div','p-pet idle');
 bubble.innerHTML='<i class="p-wing l"></i><span class="p-text"></span><i class="p-wing r"></i>';const btext=bubble.querySelector('.p-text');let lastPhrase='';
 if(!document.getElementById('pet'))pet.id='pet';pet.setAttribute('role','img');pet.setAttribute('aria-label','원숭이 잠옷을 입은 하얀 아기 호랑이');
 pet.innerHTML=`<div class="flip"><div class="bob">${opt.svg||SVG}</div></div>`;if(opt.cls)pet.classList.add(opt.cls);if(opt.label)pet.setAttribute('aria-label',opt.label);
 const dlg=mk('div','p-dlg');dlg.innerHTML='<form><label for="pNameInput">아기 호랑이 이름</label><input id="pNameInput" maxlength="12" autocomplete="off"><button type="submit">이걸로 할래!</button></form>';
 const eyes=pet.querySelector('#pEyes');
 const S=150,R=(a,b)=>a+Math.random()*(b-a),pick=a=>a[Math.floor(Math.random()*a.length)];
 let store={};try{store=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
 const s={name:store.name||opt.name||'꼬미',love:store.love??30,heat:10,naked:false,follow:store.follow??true,offAt:0};
 let x=innerWidth*(opt.startX??.5)-S/2,y=innerHeight*0.55-S/2,mx=x+S/2,my=y+S/2;
 let mode='idle',until=0,lastPointer=performance.now(),nextBored=performance.now()+R(2500,5000);
 let facing=1,bananas=[],eating=null,zoomA=0,rubs=0,bubbleT=0,blinkT=performance.now()+3000,hotSaid=0,pokes=[];
 let wander=null,wanderT=0,press=null,ignoring=null;

 const L={
  hello:['안녕! 나랑 놀자!','헤헤 보고 싶었어!'],
  follow:['기다려~ 같이 가!','어디 가? 나도 갈래!','따라간다~!','헥헥 같이 가!'],
  click:['꺄르르!','헤헤 간지러워!','좋아좋아!','나 불렀어?','사랑해 ❤','또 해줘!'],
  rub:['골골~ 좋아!','더 쓰다듬어줘~','헤헤 기분 좋아'],
  bored:['뭐하고 놀까?','이거 해볼래!','나 봐봐!','심심해~ 놀아줘!'],
  banana:['바나나다!!','내 거야~!','냠냠 먹을래!'],
  yum:['맛있다~!!','냠냠 최고!','하나 더 줘!'],
  hot:['으아 더워!','덥다 더워~','땀 나...'],
  off:['더워! 잠깐 벗을래~','휴~ 시원하다!'],
  on:['다시 원숭이 할래!','이제 시원해! 다시 입을래','짜잔! 원숭이 변신!'],
  sleep:['쿨쿨...','음냐음냐...'],wake:['앗! 왔다!','헤헤 깼어!'],
  walk:['산책 가야지~','저기 뭐 있다!','룰루~'],
  roar:['어흥!!']
 };
 Object.assign(L,opt.lines||{});
 function save(){try{localStorage.setItem(KEY,JSON.stringify({name:s.name,love:s.love,follow:s.follow}))}catch(e){}}
 function report(){bridge&&bridge.state&&bridge.state({naked:s.naked,follow:s.follow,name:s.name,clothes:CL,noClothes:!!opt.noClothes,roar:opt.roarMenu||'🐯 어흥 해봐'})}
 function say(t,ms=1800,keep){if(opt.phrases&&!keep){const pool=opt.phrases.filter(x=>x!==lastPhrase);t=pool[Math.floor(Math.random()*pool.length)]||t;lastPhrase=t;ms=Math.max(ms,2600)}btext.textContent=t;bubble.classList.add('show');bubbleT=performance.now()+ms}
 function fx(ch,n=1,ox=0,oy=0){for(let i=0;i<n;i++){const d=mk('div','p-fx');d.textContent=ch;d.style.left=(x+S/2+ox+R(-30,30))+'px';d.style.top=(y+oy+R(10,40))+'px';d.style.setProperty('--dx',R(-30,30)+'px');d.style.animationDelay=(i*.12)+'s';setTimeout(()=>d.remove(),1600+i*120)}}
 const ACTS=['idle','walk','run','jump','spin','wiggle','eat','sleep','peek','wave','roar','cry','drag'];
 function setClass(c){pet.classList.remove(...ACTS);if(c)c.split(' ').forEach(k=>pet.classList.add(k))}
 function act(name,ms,line){mode='act';until=performance.now()+ms;setClass(name);if(line)say(line,Math.max(1600,ms))}
 function addLove(n){s.love=Math.min(100,s.love+n);save()}
 function happy(ms=1500){pet.classList.add('happy');clearTimeout(happy.t);happy.t=setTimeout(()=>pet.classList.remove('happy'),ms)}
 function setNaked(v,line){s.naked=v;s.offAt=performance.now();pet.classList.toggle('naked',v);fx('💨',3,0,30);fx('✨',3,0,20);const b=$('onesieBtn');if(b)b.textContent=v?CL.on:CL.off;act('spin',900,line);report()}
 function roar(){act('roar',1300,pick(L.roar));setTimeout(()=>{if(mode==='act')happy(1200)},1300)}
 function cry(){act('cry',2800,pick(['흐에엥... 너무 콕콕 찔러','흑흑... 아파...']));setTimeout(()=>{if(mode!=='sleep'){act('wiggle',900,'헤헤 그래도 좋아!');happy();fx('💖',2)}},2900)}

 const tricks=[
  ()=>act('jump',650,pick(['폴짝!','나 높이 뛴다!'])),
  ()=>act('spin',900,'빙글빙글~'),
  ()=>{act('wave',1600,'안녕안녕~');happy(1600)},
  ()=>{act('peek',1400,'안 보이지~?');setTimeout(()=>{if(mode==='act'){setClass('jump');say('까꿍!!');happy(1000);fx('✨',3)}},1100)},
  ()=>{mode='zoom';until=performance.now()+2600;zoomA=Math.atan2(y+S/2-my,x+S/2-mx);setClass('run');say('너 주위를 뱅글뱅글~')},
  ()=>{act('wiggle',1300,'꼬리 흔들흔들~');happy(1300)},
  ()=>{mode='pounce';until=performance.now()+900;setClass('jump');say('잡았다!!')},
  roar,
 ];

 const actions={
  banana(){
   const cx=x+S/2,cy=y+S/2,b=mk('div','p-banana');b.textContent='🍌';
   const bx=clampX(desktop?cx+R(-320,320):R(60,innerWidth-60)),by=clampY(desktop?cy+R(-60,120):R(innerHeight*.45,innerHeight-M.bottom-60));
   b.style.left=bx+'px';b.style.top=(by-320)+'px';
   requestAnimationFrame(()=>requestAnimationFrame(()=>b.style.top=by+'px'));
   bananas.push({el:b,x:bx,y:by});if(mode==='sleep')mode='idle';if(!eating)say(pick(L.banana));
  },
  sun(){s.heat=Math.min(110,s.heat+40);fx('☀️',2,40,-10);if(!s.naked)say(pick(L.hot))},
  ice(){s.heat=Math.max(0,s.heat-45);fx('❄️',4);say(s.naked?'시원하다~':'으 차가워! 헤헤')},
  onesie(){if(opt.noClothes)return;if(s.naked){s.heat=Math.min(s.heat,40);setNaked(false,pick(L.on))}else setNaked(true,'후~ 잠깐 벗을래!')},
  rename(){dlg.querySelector('input').value=s.name;dlg.classList.add('open');setTimeout(()=>dlg.querySelector('input').focus(),30)},
  follow(){s.follow=!s.follow;save();report();say(s.follow?'졸졸 따라갈게!':'혼자 산책할래~')},
  roar,
  switch(){opt.onSwitch&&opt.onSwitch()},
  margins(m){Object.assign(M,m)},
 };
 dlg.addEventListener('pointerdown',e=>{if(e.target===dlg)dlg.classList.remove('open')});
 dlg.querySelector('form').onsubmit=e=>{e.preventDefault();const v=dlg.querySelector('input').value.trim();if(v){s.name=v;const n=opt.hud!==false&&$('petName');if(n)n.textContent=v;save();report();say(`내 이름은 ${v}! 좋아!`,1800,true);happy();fx('💖',3)}dlg.classList.remove('open')};

 function pointerAt(px,py){const now=performance.now();if(Math.abs(px-mx)+Math.abs(py-my)<1)return;mx=px;my=py;
  if(mode==='sleep'&&!(task&&task.kind==='nap'&&Math.hypot(px-(x+S/2),py-(y+S/2))>160)){mode='act';until=now+650;setClass('jump');say(pick(L.wake));happy();if(task&&task.kind==='nap')task=null}lastPointer=now}
 if(desktop&&bridge)bridge.onCursor(p=>pointerAt(p.x,p.y));
 else{addEventListener('pointermove',e=>pointerAt(e.clientX,e.clientY));addEventListener('pointerdown',e=>{if(e.target.closest('button,form,#pet'))return;pointerAt(e.clientX,e.clientY)})}
 if(bridge&&bridge.onAction)bridge.onAction(a=>actions[a]&&actions[a]());

 pet.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.stopPropagation();pet.setPointerCapture(e.pointerId);press={sx:e.clientX,sy:e.clientY,ox:e.clientX-x,oy:e.clientY-y,drag:false}});
 pet.addEventListener('pointermove',e=>{
  if(press){if(!press.drag&&Math.hypot(e.clientX-press.sx,e.clientY-press.sy)>6){press.drag=true;mode='drag';setClass('drag');say(pick(['으앗 높다!','어디 가는 거야~?','슝~']))}
   if(press.drag){x=e.clientX-press.ox;y=e.clientY-press.oy;mx=e.clientX;my=e.clientY}return}
  if(eating||mode!=='idle')return;if(++rubs>22){rubs=0;happy(1800);say(pick(L.rub));fx('💕',2);addLove(1)}});
 pet.addEventListener('pointerup',()=>{if(!press)return;const p=press;press=null;
  if(p.drag){x=Math.max(0,Math.min(innerWidth-S,x));y=Math.max(M.top,Math.min(innerHeight-S-M.bottom,y));act('wiggle',900,'어지러워~ 헤헤');lastPointer=performance.now();return}
  if(eating)return;const now=performance.now();pokes=pokes.filter(t=>now-t<2500);pokes.push(now);
  if(pokes.length>=5){pokes=[];cry();return}
  if(mode==='sleep')say(pick(L.wake));
  if(Math.random()<.2)roar();else{act(pick(['jump','wiggle','spin']),700,pick(L.click));happy()}
  fx('💖',3);addLove(2)});
 pet.addEventListener('contextmenu',e=>{e.preventDefault();if(bridge&&bridge.openMenu)bridge.openMenu()});

 let task=null;
 function endTask(now){if(!task)return;if(task.fly)task.fly.el.remove();if(task.kind==='nap'&&mode==='sleep'){mode='act';until=now+650;setClass('jump');happy();say(pick(L.wake))}task=null}
 function newTask(now){
  endTask(now);const cx=x+S/2,cy=y+S/2,o=[],add=(k,w)=>{for(let i=0;i<w;i++)o.push(k)};
  if(s.follow)add('follow',4);add('wander',2);add('butterfly',2);add('dance',2);add('nap',1);add('home',1);add('peek',1);add('sit',1);if(opt.cls==='angel')add('fly',2);if(opt.friend&&opt.friend())add('friend',3);
  const k=pick(o);task={kind:k,end:now+R(6000,11000)};
  if(k==='wander'){task.tx=R(S,innerWidth-S);task.ty=R(S+M.top,innerHeight-S-M.bottom);say(pick(L.walk),1600)}
  if(k==='butterfly'){const el=mk('div','p-fly');el.textContent=pick(['🦋','⭐','🫧','🌸']);task.fly={el,x:clampX(cx+R(-250,250)),y:clampY(cy-R(40,140)),a:R(0,6.28)};task.end=now+R(7000,10000);say('저거 잡을래!')}
  if(k==='dance'){task.end=now+R(4500,6500);task.next=now;say('신난다~ 춤추자!')}
  if(k==='nap'&&mode!=='sleep'){task.end=now+R(7000,11000);mode='sleep';setClass('sleep');say(pick(L.sleep),2500)}
  if(k==='home'){task.left=cx<innerWidth/2;task.phase='out';task.end=now+30000;say('집 가고 싶다.',2600,true)}
  if(k==='peek'){task.left=cx<innerWidth/2;task.end=now+R(6000,8000);say('여기 숨어야지~')}
  if(k==='fly'){task.end=now+R(5000,7000);say('하늘 높이 날아볼까~')}
  if(k==='sit'){task.end=now+R(4000,6000)}
  if(k==='friend'){task.end=now+R(6000,9000);say('같이 놀자~')}
 }
 function clampX(v){return Math.max(S/2,Math.min(innerWidth-S/2,v))}
 function clampY(v){return Math.max(S/2+M.top,Math.min(innerHeight-S/2-M.bottom,v))}
 function moveTo(tx,ty,speed,dt){const cx=x+S/2,cy=y+S/2,dx=tx-cx,dy=ty-cy,d=Math.hypot(dx,dy);
  if(d<4)return d;const k=Math.min(d,speed*dt);x+=dx/d*k;y+=dy/d*k;if(Math.abs(dx)>3)facing=dx<0?-1:1;return d}

 let prev=performance.now();
 function loop(now){
  const dt=Math.min(.05,(now-prev)/1000);prev=now;const cx=x+S/2,cy=y+S/2;
  if(now>blinkT){pet.classList.add('blink');setTimeout(()=>pet.classList.remove('blink'),140);blinkT=now+R(2500,5000)}
  if(mode==='act'&&now>until)mode='idle';
  if(mode==='pounce'){moveTo(clampX(mx),clampY(my-20),700,dt);if(now>until){mode='idle';happy();fx('💖',2);addLove(1)}}
  if(mode==='zoom'){zoomA+=dt*4.2;moveTo(clampX(mx+Math.cos(zoomA)*110),clampY(my+Math.sin(zoomA)*66),600,dt);facing=-Math.sin(zoomA)>0?1:-1;s.heat+=10*dt;if(now>until){mode='idle';happy()}}
  if(eating){
   eating.el.style.left=(x+S/2)+'px';eating.el.style.top=(y+S*.68)+'px';
   if(now>eating.end){eating.el.remove();eating=null;mode='act';until=now+650;setClass('jump');say(pick(L.yum));happy(1500);fx('💖',4);addLove(5)}
   else{eating.el.style.fontSize=(16+24*(eating.end-now)/2600)+'px';if(Math.random()<dt*2)fx('✨',1,0,60)}
  } else if(mode==='idle'||mode==='walk'||mode==='sleep'){
   let tx,ty,target=null;
   if(bananas.length&&mode!=='sleep'){target=bananas.reduce((a,b)=>Math.hypot(b.x-cx,b.y-cy)<Math.hypot(a.x-cx,a.y-cy)?b:a);tx=target.x;ty=target.y-S*.18}
   else{
    if(!task||now>task.end)newTask(now);
    const k=task.kind;let free=false;tx=cx;ty=cy;
    if(k==='follow'){const g=opt.followGap||95;tx=mx+(cx<mx?-g:g);ty=my}
    else if(k==='wander'){tx=task.tx;ty=task.ty}
    else if(k==='butterfly'){const f=task.fly;f.a+=(Math.random()-.5)*dt*6;f.x+=Math.cos(f.a)*110*dt;f.y+=Math.sin(f.a)*70*dt;
     if(f.x<60||f.x>innerWidth-60)f.a=Math.PI-f.a;if(f.y<M.top+40||f.y>innerHeight-M.bottom-60)f.a=-f.a;f.x=Math.max(60,Math.min(innerWidth-60,f.x));f.y=Math.max(M.top+40,Math.min(innerHeight-M.bottom-60,f.y));
     f.el.style.transform=`translate(${f.x}px,${f.y}px)`;tx=f.x;ty=f.y+50;
     if(Math.hypot(tx-cx,ty-cy)<45&&now>(task.hit||0)){task.hit=now+2500;act('jump',650);fx('✨',3);say('거의 잡았는데!')}}
    else if(k==='home'){free=true;ty=cy;
     if(task.phase==='out'){tx=task.left?-S:innerWidth+S;if(task.left?cx<-S/2+5:cx>innerWidth+S/2-5){task.phase='away';task.back=now+R(3500,6000)}}
     else if(task.phase==='away'){tx=cx;if(now>task.back){x=task.left?innerWidth+10:-S-10;task.phase='in';task.tx=R(S*1.5,innerWidth-S*1.5);say('집에 가지마~베이비~',2600,true)}}
     else{tx=task.tx;if(Math.abs(tx-cx)<45)task.end=now}}
    else if(k==='peek'){free=true;tx=task.left?S*.08:innerWidth-S*.08;ty=cy}
    else if(k==='fly'){tx=cx;ty=M.top+S/2+10}
    else if(k==='friend'){const f=opt.friend&&opt.friend();if(!f)task.end=now;else{tx=f.x+(cx<f.x?-110:110);ty=f.y;
     if(Math.hypot(tx-cx,ty-cy)<45){facing=f.x<cx?-1:1;if(now>(task.hit||0)){task.hit=now+1800;act(pick(['jump','wiggle','spin']),700);fx(pick(['💖','💜','✨']),2,facing*50,0)}}}}
    if(!free){tx=clampX(tx);ty=clampY(ty)}
   }
   const d=Math.hypot(tx-cx,ty-cy),far=d>380;
   if(mode==='sleep'){}
   else if(target&&d<18){bananas.splice(bananas.indexOf(target),1);target.el.classList.add('held');eating={el:target.el,end:now+2600};setClass('eat');say('냠냠냠~',2400);mode='eat'}
   else if(d>(target?10:40)){
    if(mode!=='walk'&&Math.random()<.5&&!target&&task&&task.kind==='follow')say(pick(L.follow),1200);
    mode='walk';setClass(far?'run':'walk');moveTo(tx,ty,far?520:(target||!task||task.kind==='follow'||task.kind==='butterfly'?260:task.kind==='home'?200:140),dt);
    s.heat+=(far?9:5)*dt;nextBored=now+R(2500,5500);
   } else {
    if(mode==='walk'){mode='idle';setClass('idle');if(task&&task.kind==='wander')task.end=Math.min(task.end,now+R(1500,3500))}
    if(task&&task.kind==='dance'&&now>task.next){task.next=now+900;act(pick(['jump','spin','wiggle']),700);fx(pick(['🎵','🎶']),2,0,-10)}
    if(task&&task.kind==='fly'&&task.end-now>2500)task.end=now+2500;
    if(Math.abs(mx-cx)>10&&(!task||task.kind==='follow'||task.kind==='sit'))facing=mx<cx?-1:1;
    s.heat-=1.5*dt;
    if(now-lastPointer>(desktop?60000:22000)){mode='sleep';setClass('sleep');say(pick(L.sleep),3000)}
    else if(now>nextBored&&(!task||task.kind==='follow'||task.kind==='sit')){nextBored=now+R(desktop?6000:3500,desktop?12000:7000);pick(tricks)();if(Math.random()<.3)setTimeout(()=>{if(mode==='idle')say(pick(L.bored))},1500)}
   }
  }
  if(mode==='eat'&&!eating)mode='idle';
  if(mode==='sleep'){s.heat-=3*dt;if(Math.random()<dt*.9)fx('💤',1,30,0)}
  if(mode==='act')s.heat+=3*dt;
  if(s.naked)s.heat-=5*dt;
  s.heat=Math.max(0,Math.min(110,s.heat));
  if(!opt.noClothes&&!s.naked&&s.heat>=100&&!eating&&mode!=='drag')setNaked(true,pick(L.off));
  else if(s.naked&&s.heat<=18&&mode==='idle'&&now-s.offAt>9000)setNaked(false,pick(L.on));
  const hot=s.heat>65&&!s.naked;pet.classList.toggle('hot',hot);
  if(hot&&now>hotSaid&&mode==='idle'){say(pick(L.hot));hotSaid=now+6000}
  pet.classList.toggle('talk',bubble.classList.contains('show')&&mode!=='sleep'&&!eating&&now%600<300);
  pet.classList.toggle('left',facing<0);
  if(mode!=='sleep'){let ex=(mx-cx)/180,ey=(my-(y+S*.45))/180;const m=Math.hypot(ex,ey);if(m>1){ex/=m;ey/=m}eyes.setAttribute('transform',`translate(${(facing<0?-ex:ex)*3} ${ey*2.5})`)}
  pet.style.transform=`translate(${x}px,${y}px)`;
  shadow.style.transform=`translate(${x+S/2-50}px,${y+S-12}px)`;shadow.style.opacity=mode==='drag'?.3:1;
  bubble.style.transform=`translate(calc(${x+S/2}px - 50%),calc(${y-6}px - 100%))`;
  if(now>bubbleT)bubble.classList.remove('show');
  if(desktop&&bridge){const over=(mx>x+10&&mx<x+S-10&&my>y+10&&my<y+S-5)||!!press||dlg.classList.contains('open');if(over!==!ignoring){ignoring=!over;bridge.setIgnore(ignoring)}}
  const HUD=opt.hud!==false,lb=HUD&&$('loveBar'),hb=HUD&&$('heatBar'),md=HUD&&$('mood');
  if(lb)lb.style.width=s.love+'%';if(hb)hb.style.width=Math.min(100,s.heat)+'%';
  if(md)md.textContent=eating?'바나나 냠냠 중 🍌':mode==='sleep'?'쿨쿨 자는 중':pet.classList.contains('cry')?'훌쩍훌쩍 우는 중':s.naked?(opt.offMood||'잠옷 벗고 시원해지는 중'):hot?'땀 뻘뻘… 더워!':bananas.length?'바나나한테 달려가는 중':task?({follow:'너를 따라다니는 중',wander:'혼자 산책 중',butterfly:'뭔가 쫓아가는 중',dance:'춤추는 중 🎵',nap:'낮잠 자는 중',home:'집에 다녀오는 중',peek:'구석에 숨는 중',fly:'하늘 높이 나는 중',sit:'멍때리는 중',friend:'친구랑 노는 중 👯'}[task.kind]||'너랑 노는 중 ❤'):'너랑 노는 중 ❤';
  requestAnimationFrame(loop);
 }
 const n=opt.hud!==false&&$('petName');if(n)n.textContent=s.name;const ob=$('onesieBtn');if(ob){ob.textContent=CL.off;ob.hidden=!!opt.noClothes}
 report();
 setTimeout(()=>{say(pick(L.hello));act('wave',1600);happy(1600)},400);
 requestAnimationFrame(loop);
 actions.pos=()=>({x:x+S/2,y:y+S/2});
 return actions;
};
})();

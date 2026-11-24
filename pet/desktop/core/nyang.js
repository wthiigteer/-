// 냥이: original pixel-art cat-ear girl character for the pet engine
(function(){
const C={K:'#3a2630',H:'#b07a52',h:'#8a5a3a',S:'#ffe6d8',W:'#ffffff',G:'#3fc46c',g:'#1d7a42',D:'#1c1420',P:'#ff4f9a',p:'#d63682',F:'#fff4e2',T:'#ffc8de',R:'#c2343f',r:'#3d3263',B:'#221c26',Y:'#e6e6f0',L:'#2b2433',k:'#ff8fb0',E:'#5b3a28',b:'#8fd3ff'};
const mk=()=>{const m=new Map();return{m,set(x,y,c){m.set(x+','+y,c)},has(x,y){return m.has(x+','+y)}}};
const ell=(Ly,cx,cy,rx,ry,c,cond)=>{for(let y=Math.floor(cy-ry);y<=Math.ceil(cy+ry);y++)for(let x=Math.floor(cx-rx);x<=Math.ceil(cx+rx);x++){const dx=(x+.5-cx)/rx,dy=(y+.5-cy)/ry;if(dx*dx+dy*dy<=1&&(!cond||cond(x,y)))Ly.set(x,y,typeof c==='function'?c(x,y):c)}return Ly};
const rect=(Ly,x0,y0,x1,y1,c)=>{for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)Ly.set(x,y,typeof c==='function'?c(x,y):c);return Ly};
const px=(Ly,list,c)=>{list.forEach(([x,y])=>Ly.set(x,y,c));return Ly};
const line=(Ly,x0,y0,x1,y1,c)=>{const n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0));for(let i=0;i<=n;i++)Ly.set(Math.round(x0+(x1-x0)*i/n),Math.round(y0+(y1-y0)*i/n),c);return Ly};
const outline=(Ly,col='K')=>{const add=[];Ly.m.forEach((c,k)=>{const [x,y]=k.split(',').map(Number);[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{if(!Ly.has(x+dx,y+dy))add.push([x+dx,y+dy])})});add.forEach(([x,y])=>Ly.set(x,y,col));return Ly};
const mirror=Ly=>{[...Ly.m].forEach(([k,c])=>{const [x,y]=k.split(',').map(Number);Ly.set(39-x,y,c)});return Ly};
const g=(Ly,cls,extra='')=>{const rows={};Ly.m.forEach((c,k)=>{const [x,y]=k.split(',').map(Number);(rows[y]=rows[y]||[]).push([x,c])});let o='';
 for(const y in rows){const r=rows[y].sort((a,b)=>a[0]-b[0]);let i=0;while(i<r.length){let j=i;while(j+1<r.length&&r[j+1][0]===r[j][0]+1&&r[j+1][1]===r[i][1])j++;const c=r[i][1];o+=`<rect x="${r[i][0]*5}" y="${y*5}" width="${(j-i+1)*5}" height="5" ${c==='V'?'style="fill:var(--limb)"':`fill="${C[c]}"`}/>`;i=j+1}}
 return `<g${cls?` class="${cls}"`:''}${extra}>${o}</g>`};

// tail (cat tail, wags)
const tail=mk();[[27,31],[29,31],[30,30],[31,29],[32,28],[32,26],[33,25],[33,23],[32,22]].forEach(([x,y])=>rect(tail,x,y,x+1,y+1,'H'));outline(tail);
// long hair behind
const hb=mk();ell(hb,20,14,13,12,'H');rect(hb,8,14,32,30,(x,y)=>(x===10||x===29)&&y>20?'h':'H');[[8,30],[32,30],[8,29],[32,29],[12,30],[28,30]].forEach(([x,y])=>hb.m.delete(x+','+y));outline(hb);
// legs: thigh, over-knee socks, shoes
const legs=mk();[[16,18],[22,24]].forEach(([a,b])=>{rect(legs,a,31,b,33,'S');rect(legs,a,34,b,34,'W');rect(legs,a,35,b,37,'L');rect(legs,a-1,38,b,38,'B')});outline(legs);
// torso without hoodie: pink tank top
const tank=mk();rect(tank,15,24,25,30,'T');px(tank,[[19,26],[21,26],[19,27],[20,27],[21,27],[20,28]],'k');outline(tank);
// hoodie
const hood=mk();rect(hood,14,24,26,30,'P');rect(hood,18,25,22,29,'T');px(hood,[[19,26],[21,26],[19,27],[20,27],[21,27],[20,28]],'k');rect(hood,17,24,17,30,'p');rect(hood,23,24,23,30,'p');px(hood,[[16,26],[16,27],[24,26],[24,27]],'p');outline(hood);
// skirt with belt + heart buckle
const sk=mk();rect(sk,14,29,26,29,'B');px(sk,[[19,29],[21,29]],'Y');for(let y=30;y<=33;y++){const d=y-30;for(let x=13-d;x<=27+d;x++)sk.set(x,y,(x%3===0||y===32)?'r':'R')}outline(sk);
// arms: sleeve colour follows --limb, fur cuffs only with hoodie
const arm=(x0)=>{const a=mk();rect(a,x0,25,x0+2,28,'V');rect(a,x0,29,x0+2,30,'S');outline(a);const cuff=mk();rect(cuff,x0-1,29,x0+3,29,'F');return g(a)+g(cuff,'onesie')};
// face
const face=mk();ell(face,20,15.5,11.5,10,'S');outline(face);
// front hair: cap, blunt bangs, side locks
const hf=mk();ell(hf,20,12,12.5,10.5,'H',(x,y)=>y<=8);rect(hf,9,7,31,10,'H');for(let x=10;x<=30;x++)if(x%3)hf.set(x,11,'H');
for(let y=9;y<=29;y++){const w=y>16?1:(y>12?1:2);rect(hf,8,y,8+w,y,'H');rect(hf,31-w,y,31,y,'H')}px(hf,[[14,4],[15,5],[24,4],[25,5]],'h');outline(hf);
// wire cat-ear headband
const ears=mk();line(ears,9,5,9,0,'E');line(ears,9,0,14,3,'E');line(ears,30,5,30,0,'E');line(ears,30,0,25,3,'E');
// eyes
const eye=mk();ell(eye,14.5,16.5,3.6,4.1,'W');ell(eye,15.3,17.2,2.6,3.2,'G',(x,y)=>eye.has(x,y));rect(eye,15,16,16,18,'D');px(eye,[[17,16],[14,19],[15,19]],'g');px(eye,[[15,15],[14,16],[16,19]],'W');outline(eye);px(eye,[[11,12],[10,13],[12,11]],'K');mirror(eye);
const eh=mirror(px(mk(),[[12,17],[13,16],[14,15],[15,15],[16,16],[17,17],[12,18],[17,18]],'K'));
const ec=mirror(px(mk(),[[11,16],[12,17],[13,17],[14,17],[15,17],[16,17],[17,16]],'K'));
const cheek=mirror(px(mk(),[[11,21],[12,21],[13,21]],'k'));
const ms=px(mk(),[[18,22],[19,23],[20,23],[21,22]],'K');
const mo=outline(px(mk(),[[19,22],[20,22],[19,23],[20,23]],'R'));px(mo,[[19,23],[20,23]],'k');
const tears=mirror(px(mk(),[[13,20],[13,21],[13,22],[13,23],[12,24]],'b'));
const drop=mirror(px(mk(),[[11,21],[11,22]],'b'));
const angry=line(line(line(mk(),33,4,35,2,'K'),35,2,35,5,'K'),35,5,37,3,'K');
const sweat=px(mk(),[[31,7],[30,8],[31,8],[32,8],[31,9]],'b');

const SVG=`<svg viewBox="0 0 200 200" shape-rendering="crispEdges" aria-hidden="true">
${g(tail,'tail')}${g(hb)}${g(legs)}${g(tank,'tigeronly')}${g(hood,'onesie')}${g(sk)}
${g(face)}${g(hf)}${g(ears)}
<g id="pEyes">${g(eye,'en')}</g>${g(eh,'eh')}${g(ec,'ec')}${g(cheek,'cheek',' opacity=".8"')}${g(ms,'ms')}${g(mo,'mo')}
<g class="tears">${g(tears)}${g(drop,'drop')}</g>${g(angry,'angry')}
<g class="paw pawL">${arm(11)}</g><g class="paw pawR">${arm(27)}</g>${g(sweat,'sweat')}
</svg>`;

window.NyangChar={
 svg:SVG,key:'nyangPet',name:'냥이',cls:'nyang',label:'고양이 귀 머리띠를 한 도트 여자아이',
 clothes:{on:'🎀 후드 입히기',off:'🎀 후드 벗기기'},roarMenu:'🐱 냐앙 해봐',offMood:'후드 벗고 시원해지는 중',
 lines:{
  hello:['안냥! 나랑 놀자냥!','헤헤 보고 싶었다냥!'],
  follow:['기다려냥~ 같이 가!','어디 가? 나도 갈래냥!','따라간다냥~!'],
  click:['꺄르르!','헤헤 간지러워냥!','좋아좋아!','나 불렀냥?','사랑해 ❤','또 해줘냥!'],
  rub:['그릉그릉~ 좋아!','더 쓰다듬어줘냥~','헤헤 기분 좋아'],
  off:['더워! 후드 잠깐 벗을래~','휴~ 시원하다냥!'],
  on:['다시 핑크 후드 입을래!','짜잔! 후드 장착이다냥!'],
  roar:['냐앙!!','캬옹!!'],
  yum:['맛있다냥~!!','냠냠 최고!','하나 더 줘냥!']
 }
};
})();

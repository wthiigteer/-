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

// palette tuned to the user's reference: cream hair, pink ears & clips, green-black eyes
Object.assign(C,{K:'#1a1416',H:'#f7e8c8',h:'#e6cc9f',S:'#fff0e4',P:'#ff6fb0',p:'#e0488f',T:'#ffc9df',R:'#d92a43',r:'#2a1a24',k:'#ff9cc2',q:'#ff4f9a',e:'#ffd5e6',G:'#2fbf5a',j:'#8be3a0'});
const wv=[0,1,1,0,-1,-1];
// pink cat tail
const tail=mk();[[27,32],[29,32],[30,31],[31,30],[32,28],[32,26],[31,24]].forEach(([x,y])=>rect(tail,x,y,x+1,y+1,'k'));rect(tail,31,23,32,24,'e');outline(tail);
// big wavy hair behind
const hb=mk();ell(hb,20,15,14.5,12.5,'H');
for(let y=12;y<=35;y++){const o=4+(y>22?-1:0)+wv[y%6];for(let x=o;x<=14;x++)if(!(y>31&&(x+y)%3===0))hb.set(x,y,(x===o+2&&y%3)?'h':'H');for(let x=o;x<=14;x++)if(!(y>31&&(x+y)%3===0))hb.set(39-x,y,(x===o+2&&y%3)?'h':'H')}
outline(hb);
// legs: skin, white socks, black shoes
const legs=mk();[[17,18],[21,22]].forEach(([a,b])=>{rect(legs,a,34,b,34,'S');rect(legs,a,35,b,37,'W');rect(legs,a,38,b,38,'B')});px(legs,[[18,36]],'k');outline(legs);
// torso without cardigan: pink top with a little cat face
const catface=[[19,27,'W'],[20,27,'W'],[21,27,'W'],[19,28,'W'],[20,28,'W'],[21,28,'W'],[19,26,'W'],[21,26,'W'],[19,27,'K'],[21,27,'K']];
const tank=mk();rect(tank,15,25,25,30,'T');catface.forEach(([x,y,c])=>tank.set(x,y,c));outline(tank);
// cardigan over the top
const hood=mk();rect(hood,14,25,26,30,'P');rect(hood,17,25,23,30,'T');rect(hood,16,25,16,30,'p');rect(hood,24,25,24,30,'p');catface.forEach(([x,y,c])=>hood.set(x,y,c));outline(hood);
// belt + heart buckle, red/black plaid skirt
const sk=mk();rect(sk,14,30,26,30,'B');px(sk,[[19,30],[21,30],[20,31]],'W');for(let y=31;y<=33;y++){const d=y-31;for(let x=13-d;x<=27+d;x++)if(!(y===31&&x===20))sk.set(x,y,(x%2===0||y===32)?'r':'R')}outline(sk);
const arm=(x0)=>{const a=mk();rect(a,x0,25,x0+2,28,'V');rect(a,x0,29,x0+2,30,'S');outline(a);const cuff=mk();rect(cuff,x0-1,29,x0+3,29,'W');px(cuff,[[x0,30],[x0+2,30]],'W');return g(a)+g(cuff,'onesie')};
// face
const face=mk();ell(face,20,17,10.5,9.5,'S');outline(face);
// front hair: crown, side-swept bangs, framing locks
const hf=mk();ell(hf,20,13,13,11,'H',(x,y)=>y<=9);rect(hf,9,8,31,10,'H');
[[10,11],[11,11],[12,11],[13,11],[14,12],[15,11],[16,11],[19,11],[20,11],[20,12],[24,11],[25,11],[26,11],[27,12],[28,11],[29,11],[30,11]].forEach(([x,y])=>hf.set(x,y,'H'));
px(hf,[[15,5],[16,6],[24,5],[23,6],[20,9],[19,10]],'h');outline(hf);
// pink cat ears with fur
const ears=mk();[[9,2],[10,2],[9,3],[10,3],[11,3],[9,4],[10,4],[11,4],[12,4],[9,5],[10,5],[11,5],[12,5],[13,5]].forEach(([x,y])=>ears.set(x,y,'e'));px(ears,[[10,3],[10,4],[11,4],[10,5],[11,5],[12,5]],'k');mirror(ears);outline(ears);
// star hair clips
const clips=mk();[[10,9],[9,9],[11,9],[10,8],[10,10],[7,13],[6,13],[8,13],[7,12],[7,14]].forEach(([x,y])=>clips.set(x,y,'q'));px(clips,[[10,9],[7,13]],'e');mirror(clips);outline(clips);
// huge eyes: black with a green crescent and a big shine
const eye=mk();ell(eye,14.5,18.5,3.7,4.5,'D');ell(eye,14.5,18.5,3.7,4.5,'G',(x,y)=>x<14&&y>17&&((x+.5-14.5)/3.7)**2+((y+.5-18.5)/4.5)**2>.3);px(eye,[[12,21]],'j');rect(eye,15,16,16,17,'W');px(eye,[[13,20]],'W');outline(eye);mirror(eye);
const eh=mirror(px(mk(),[[11,20],[12,19],[13,18],[14,18],[15,18],[16,19],[17,20]],'K'));
const ec=mirror(px(mk(),[[11,19],[12,20],[13,21],[14,21],[15,21],[16,20],[17,19]],'K'));
const cheek=mirror(px(mk(),[[11,23],[12,23],[13,23]],'k'));
const ms=outline(px(mk(),[[19,23],[20,23],[19,24],[20,24]],'R'));px(ms,[[19,24],[20,24]],'k');
const mo=outline(px(mk(),[[18,23],[19,23],[20,23],[21,23],[18,24],[19,24],[20,24],[21,24],[19,25],[20,25]],'R'));px(mo,[[19,25],[20,25],[19,24],[20,24]],'k');
const tears=mirror(px(mk(),[[12,24],[12,25],[12,26],[11,27]],'b'));
const drop=mirror(px(mk(),[[10,25],[10,26]],'b'));
const angry=line(line(line(mk(),34,3,36,1,'K'),36,1,36,4,'K'),36,4,38,2,'K');
const sweat=px(mk(),[[33,8],[32,9],[33,9],[34,9],[33,10]],'b');

const SVG=`<svg viewBox="0 0 200 200" shape-rendering="crispEdges" aria-hidden="true">
${g(tail,'tail')}${g(hb)}${g(legs)}${g(tank,'tigeronly')}${g(hood,'onesie')}${g(sk)}
${g(face)}${g(hf)}${g(ears)}${g(clips)}
<g id="pEyes">${g(eye,'en')}</g>${g(eh,'eh')}${g(ec,'ec')}${g(cheek,'cheek',' opacity=".8"')}${g(ms,'ms')}${g(mo,'mo')}
<g class="tears">${g(tears)}${g(drop,'drop')}</g>${g(angry,'angry')}
<g class="paw pawL">${arm(11)}</g><g class="paw pawR">${arm(27)}</g>${g(sweat,'sweat')}
</svg>`;

window.NyangChar={
 svg:SVG,key:'nyangPet',name:'냥이',cls:'nyang',label:'분홍 고양이 귀와 크림색 머리의 도트 여자아이',
 clothes:{on:'🎀 가디건 입히기',off:'🎀 가디건 벗기기'},roarMenu:'🐱 냐앙 해봐',offMood:'가디건 벗고 시원해지는 중',
 lines:{
  hello:['안냥! 나랑 놀자냥!','헤헤 보고 싶었다냥!'],
  follow:['기다려냥~ 같이 가!','어디 가? 나도 갈래냥!','따라간다냥~!'],
  click:['꺄르르!','헤헤 간지러워냥!','좋아좋아!','나 불렀냥?','사랑해 ❤','또 해줘냥!'],
  rub:['그릉그릉~ 좋아!','더 쓰다듬어줘냥~','헤헤 기분 좋아'],
  off:['더워! 가디건 잠깐 벗을래~','휴~ 시원하다냥!'],
  on:['다시 핑크 가디건 입을래!','짜잔! 가디건 장착이다냥!'],
  roar:['냐앙!!','캬옹!!'],
  yum:['맛있다냥~!!','냠냠 최고!','하나 더 줘냥!']
 }
};
})();

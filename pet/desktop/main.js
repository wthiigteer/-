const {app,BrowserWindow,screen,ipcMain,Menu,Tray,nativeImage}=require('electron');
const path=require('path');

if(process.platform==='linux'){app.commandLine.appendSwitch('enable-transparent-visuals');app.disableHardwareAcceleration()}
if(!app.requestSingleInstanceLock())app.quit();

let win,tray,timer,state={naked:false,follow:true,name:'천사',clothes:{on:'🎀 후드 입히기',off:'🎀 후드 벗기기'},roar:'😇 천사 파워!',noClothes:true,duo:true};

function fit(){
  const {x,y,width,height}=screen.getPrimaryDisplay().workArea;
  win.setBounds({x,y,width,height});
}
function send(a){if(win&&!win.isDestroyed())win.webContents.send('action',a)}
function menu(){
  const login=process.platform!=='linux';
  return Menu.buildFromTemplate([
    {label:`${state.name}랑 놀기`,enabled:false},
    {type:'separator'},
    {label:'🍌 바나나 주기',click:()=>send('banana')},
    {label:state.roar,click:()=>send('roar')},
    ...(state.noClothes?[]:[{label:state.naked?state.clothes.on:state.clothes.off,click:()=>send('onesie')}]),
    {label:'☀️ 덥게',click:()=>send('sun')},
    {label:'🧊 시원하게',click:()=>send('ice')},
    {type:'separator'},
    {label:'졸졸 따라다니기',type:'checkbox',checked:state.follow,click:()=>send('follow')},
    {label:'✏️ 이름 바꾸기',click:()=>{win.focus();send('rename')}},
    {label:'👯 둘이 같이 나오기',type:'checkbox',checked:!!state.duo,click:()=>send('duo')},
    ...(state.duo?[{label:'✏️ 두 번째 친구 이름 바꾸기',click:()=>{win.focus();send('rename2')}}]:[]),
    {label:state.duo?'🔄 앞뒤 순서 바꾸기':'🔄 다음 캐릭터로 바꾸기 (천사 ↔ 냥이)',click:()=>send('switch')},
    ...(login?[{label:'컴퓨터 켜면 같이 시작',type:'checkbox',checked:app.getLoginItemSettings().openAtLogin,click:i=>app.setLoginItemSettings({openAtLogin:i.checked})}]:[]),
    {type:'separator'},
    {label:'잘 자~ (종료)',click:()=>app.quit()}
  ]);
}

function create(){
  const {x,y,width,height}=screen.getPrimaryDisplay().workArea;
  win=new BrowserWindow({
    x,y,width,height,transparent:true,frame:false,resizable:false,movable:false,
    alwaysOnTop:true,skipTaskbar:true,hasShadow:false,fullscreenable:false,
    backgroundColor:'#00000000',show:false,
    webPreferences:{preload:path.join(__dirname,'preload.js'),contextIsolation:true,nodeIntegration:false,backgroundThrottling:false}
  });
  win.setAlwaysOnTop(true,'floating');
  win.setVisibleOnAllWorkspaces(true,{visibleOnFullScreen:true});
  win.setIgnoreMouseEvents(true,{forward:true});
  win.loadFile(path.join(__dirname,'renderer.html'));
  win.once('ready-to-show',()=>win.showInactive());

  timer=setInterval(()=>{
    if(!win||win.isDestroyed())return;
    const p=screen.getCursorScreenPoint(),b=win.getBounds();
    win.webContents.send('cursor',{x:p.x-b.x,y:p.y-b.y});
  },33);

  const icon=nativeImage.createFromPath(path.join(__dirname,'icon.png')).resize({width:18,height:18});
  tray=new Tray(icon);
  tray.setToolTip('천사 & 냥이 데스크톱 펫');
  tray.on('click',()=>tray.popUpContextMenu(menu()));
  tray.on('right-click',()=>tray.popUpContextMenu(menu()));
  if(process.platform==='linux')tray.setContextMenu(menu());

  screen.on('display-metrics-changed',fit);
  screen.on('display-added',fit);
  screen.on('display-removed',fit);
}

ipcMain.on('ignore',(e,v)=>{if(win&&!win.isDestroyed())win.setIgnoreMouseEvents(v,{forward:true})});
ipcMain.on('menu',()=>menu().popup({window:win}));
ipcMain.on('state',(e,s)=>{Object.assign(state,s);if(tray&&process.platform==='linux')tray.setContextMenu(menu())});

app.on('second-instance',()=>send('banana'));
app.whenReady().then(()=>{if(process.platform==='darwin'&&app.dock)app.dock.hide();setTimeout(create,process.platform==='linux'?300:0)});
app.on('window-all-closed',()=>app.quit());
app.on('before-quit',()=>clearInterval(timer));

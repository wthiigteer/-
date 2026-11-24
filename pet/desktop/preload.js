const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('petBridge',{
  onCursor:cb=>ipcRenderer.on('cursor',(e,p)=>cb(p)),
  onAction:cb=>ipcRenderer.on('action',(e,a)=>cb(a)),
  setIgnore:v=>ipcRenderer.send('ignore',!!v),
  openMenu:()=>ipcRenderer.send('menu'),
  state:s=>ipcRenderer.send('state',s)
});

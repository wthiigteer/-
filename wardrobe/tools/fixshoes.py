import cv2, numpy as np
exec(open('extract2.py').read().split('# 원피스')[0])
L=cv2.imread('layer-shoes.png',cv2.IMREAD_UNCHANGED)
s=align(cv2.imread(U+'ba5648c9-image.png'))
fb=fgmask(base); fs=fgmask(s)
def edges(fm,y,lo,hi):
    xs=np.where(fm[y,lo:hi]>0)[0]+lo; return xs.min(),xs.max()
Y0,Y1=866,940
mapx=np.tile(np.arange(W,dtype=np.float32),(H,1)); mapy=np.tile(np.arange(H,dtype=np.float32)[:,None],(1,W))
for lo,hi in [(230,343),(343,460)]:
    bl,br=edges(fb,Y0,lo,hi); sl,sr=edges(fs,Y0,lo,hi)
    print('leg',lo,(bl,br),(sl,sr))
    for y in range(820,H):
        t=1.0 if y<=Y0 else max(0.0,1-(y-Y0)/(Y1-Y0))
        if t==0: continue
        # 기본 다리 폭(bl..br)에 오도록 편집본 다리(sl..sr)를 늘린다: 출력 x → 원본 x
        xs=np.arange(lo,hi,dtype=np.float32)
        src=sl+(xs-bl)*(sr-sl)/max(1,(br-bl))
        mapx[y,lo:hi]=xs*(1-t)+src*t
out=cv2.remap(L,mapx,mapy,cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT,borderValue=(0,0,0,0))
cv2.imwrite('layer-shoes.png',out)
c=base.astype(float).copy(); c[Y0:]=255; af=out[...,3:4]/255.0; c=c*(1-af)+out[...,:3]*af
z=c[780:1024,230:470].astype(np.uint8); cv2.imwrite('zoom-shoes.png',cv2.resize(z,None,fx=2,fy=2))

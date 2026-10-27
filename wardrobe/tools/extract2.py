import cv2, numpy as np
U='/root/.claude/uploads/b08912d2-b21f-5c84-9a7b-920dbd57664a/'
base=cv2.imread(U+'7a51aae0-image.png'); H,W=base.shape[:2]
def fgmask(img):
    m=np.zeros((H+2,W+2),np.uint8); im=img.copy()
    for s in [(0,0),(W-1,0),(0,H-1),(W-1,H-1)]:
        cv2.floodFill(im,m,s,(255,0,255),(28,28,28),(28,28,28),cv2.FLOODFILL_FIXED_RANGE)
    return (np.any(im!=(255,0,255),2)).astype(np.uint8)*255
def align(edit):
    g0=cv2.cvtColor(base,cv2.COLOR_BGR2GRAY); g1=cv2.cvtColor(edit,cv2.COLOR_BGR2GRAY)
    flow=cv2.calcOpticalFlowFarneback(g0,g1,None,0.5,6,81,5,7,1.5,0)
    flow=cv2.GaussianBlur(flow,(0,0),25)
    gx,gy=np.meshgrid(np.arange(W),np.arange(H))
    return cv2.remap(edit,(gx+flow[...,0]).astype(np.float32),(gy+flow[...,1]).astype(np.float32),cv2.INTER_LINEAR,borderValue=(255,255,255))
def seeds_fill(img,seeds,tol=16):
    total=np.zeros((H,W),np.uint8)
    for s in seeds:
        m=np.zeros((H+2,W+2),np.uint8)
        cv2.floodFill(img.copy(),m,s,0,(tol,)*3,(tol,)*3,cv2.FLOODFILL_MASK_ONLY|(255<<8))
        total|=m[1:-1,1:-1]
    return total
def finish(mask,close=9,dil=2):
    mask=cv2.morphologyEx(mask,cv2.MORPH_CLOSE,np.ones((close,close),np.uint8))
    ff=mask.copy(); cv2.floodFill(ff,np.zeros((H+2,W+2),np.uint8),(0,0),255); mask|=cv2.bitwise_not(ff)
    mask=cv2.dilate(mask,np.ones((dil*2+1,dil*2+1),np.uint8))
    return cv2.GaussianBlur(mask,(0,0),1.0)
def save(name,img,a):
    cv2.imwrite(f'layer-{name}.png',np.dstack([img,a]))

# 원피스: 정렬 후 치마·몸판 안쪽에서 번지기 채우기
d=align(cv2.imread(U+'8a44001a-image.png'))
di=d.astype(int); B_,G_,R_=di[...,0],di[...,1],di[...,2]
dm=(((G_-B_)<4)&((R_-G_)>14)).astype(np.uint8)*255
roi=np.zeros_like(dm); roi[250:700,170:520]=255; dm&=roi; dm&=fgmask(d)
dm=cv2.morphologyEx(dm,cv2.MORPH_OPEN,np.ones((3,3),np.uint8))
dm=cv2.morphologyEx(dm,cv2.MORPH_CLOSE,np.ones((9,9),np.uint8))
n_,lab_,st_,_=cv2.connectedComponentsWithStats(dm); k_=1+np.argmax(st_[1:,cv2.CC_STAT_AREA]); dm=(lab_==k_).astype(np.uint8)*255
save('dress',d,finish(dm,11,2))

# 구두: 발목 아래 전체를 편집본으로 교체(기본 캐릭터의 발은 페이지에서 가린다)
s=align(cv2.imread(U+'ba5648c9-image.png'))
sm=fgmask(s); band=np.zeros_like(sm); band[836:H,:]=255; sm&=band
a=cv2.GaussianBlur(sm,(0,0),1.0).astype(float)
ramp=np.clip((np.arange(H)-836)/30,0,1)[:,None]; a=(a*ramp).astype(np.uint8)
save('shoes',s,a)

# 머리띠: 편집본에서 흰 띠를 찾아 기본 캐릭터 머리 크기에 맞춰 옮긴다
h=cv2.imread(U+'af3ef180-image.png')
hsv=cv2.cvtColor(h,cv2.COLOR_BGR2HSV)
white=((hsv[...,1]<45)&(hsv[...,2]>215)).astype(np.uint8)*255
fh=fgmask(h); inside=cv2.erode(fh,np.ones((9,9),np.uint8))
band=white&inside; band[140:,:]=0
n,lab,st,_=cv2.connectedComponentsWithStats(band)
i=1+np.argmax(st[1:,cv2.CC_STAT_AREA]); bm=(lab==i).astype(np.uint8)*255
bm=cv2.dilate(bm,np.ones((5,5),np.uint8))
def headbox(fm):
    ys,xs=np.where(fm[:200]>0); top=ys.min()
    row=np.where(fm[top+45]>0)[0]; return top,row.min(),row.max()
bt,bl,br=headbox(fgmask(base)); ht,hl,hr=headbox(fh)
sc=(br-bl)/(hr-hl); M=np.float32([[sc,0,bl-hl*sc],[0,sc,bt-ht*sc]])
print('headband scale',sc,M)
hw=cv2.warpAffine(h,M,(W,H),borderValue=(255,255,255)); bw=cv2.warpAffine(bm,M,(W,H))
save('headband',hw,cv2.GaussianBlur(bw,(0,0),1.0))

# 미리보기: 기본(발 가림) + 레이어
def comp(names,hidefeet=False):
    c=base.astype(float).copy()
    if hidefeet: c[866:]=255
    for n in names:
        L=cv2.imread(f'layer-{n}.png',cv2.IMREAD_UNCHANGED); af=L[...,3:4]/255.0; c=c*(1-af)+L[...,:3]*af
    return c.astype(np.uint8)
cv2.imwrite('prev2.png',np.hstack([comp(['dress']),comp(['shoes'],True),comp(['headband']),comp(['dress','shoes','headband'],True)]))

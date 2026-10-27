import cv2, numpy as np
exec(open('extract2.py').read().split('# 원피스')[0])
d=align(cv2.imread(U+'8a44001a-image.png'))
L=cv2.imread('layer-dress.png',cv2.IMREAD_UNCHANGED)
fe=cv2.erode(fgmask(d),np.ones((3,3),np.uint8)); L[...,3]=np.minimum(L[...,3],cv2.GaussianBlur(fe,(0,0),.8))
m=(L[...,3]>40).astype(np.uint8)*255
# 1) 몸판 위 머리카락 조각 → 원피스 색으로 메우기
dark=((d[...,2].astype(int)<215)&(m>0)).astype(np.uint8)*255
box=np.zeros_like(dark); box[272:352,282:408]=255; dark&=box
dark=cv2.morphologyEx(dark,cv2.MORPH_OPEN,np.ones((5,5),np.uint8))
hair=cv2.dilate(dark,np.ones((13,13),np.uint8))&box
img=cv2.inpaint(d,hair,15,cv2.INPAINT_TELEA)
# 2) 기본 캐미솔이 원피스 밖으로 보이는 곳
hsv=cv2.cvtColor(base,cv2.COLOR_BGR2HSV)
wb=((hsv[...,1]<11)&(hsv[...,2]>238)).astype(np.uint8)*255
tb=np.zeros_like(wb); tb[244:430,250:440]=255; wb&=tb; wb&=cv2.bitwise_not(cv2.erode(m,np.ones((3,3),np.uint8)))
straps=wb.copy(); straps[318:]=0
sides=wb.copy(); sides[:318]=0
skin=base[255:262,336:350].reshape(-1,3).mean(0)
pink=img[320:340,330:356].reshape(-1,3).mean(0)
line=img[395:400,300:390].reshape(-1,3).min(0)  # 허리선 색 근처의 어두운 선
sides=cv2.dilate(sides,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(5,5))); img[sides>0]=pink
# 캐미솔 끈 자리에 원피스 어깨끈을 그린다(바깥선 포함)
straps=cv2.morphologyEx(straps,cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(9,9)))
st_in=cv2.dilate(straps,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(7,7))); st_out=cv2.dilate(straps,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(11,11)))
st_out&=cv2.bitwise_not(m); st_in&=cv2.bitwise_not(m)
img[st_out>0]=np.array([150,140,175]); img[st_in>0]=pink
alpha=np.maximum.reduce([L[...,3],cv2.GaussianBlur(st_out,(0,0),.7),cv2.GaussianBlur(sides,(0,0),.7)])
out=np.dstack([img,alpha]); out[alpha==0]=0
cv2.imwrite('layer-dress.png',out)
B=cv2.imread('base-clean.png',cv2.IMREAD_UNCHANGED)
bg=np.full((H,W,3),(200,170,230),float)
def comp(names):
    c=bg.copy()
    for Lr in [B]+[cv2.imread(f'layer-{n}.png',cv2.IMREAD_UNCHANGED) for n in names]:
        af=Lr[...,3:4]/255.0; c=c*(1-af)+Lr[...,:3]*af
    return c.astype(np.uint8)
cv2.imwrite('prev5.png',np.hstack([cv2.resize(comp([])[220:430,250:440],None,fx=2.2,fy=2.2),cv2.resize(comp(['dress'])[220:430,250:440],None,fx=2.2,fy=2.2)]))

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// All video URLs from EBONIES_RAW_URLS (excluding the 3 image URLs)
const ALL_VIDEO_URLS = [
    "https://video.twimg.com/amplify_video/1958987542554165248/vid/avc1/720x1280/KqthbZ48-Nbo1xpF.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1951802363293188097/vid/avc1/720x1280/RGwGqx4d6u9CWD62.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1951787642628239360/vid/avc1/720x1280/SpHLXFV8RMQ_SbzT.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1962318108875747328/vid/avc1/720x1280/vF0yI7-RD6QMqQ7c.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1962332159248846848/vid/avc1/720x1280/Rlojmv6ia4TRsay0.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1962318230615400448/vid/avc1/720x1280/DF7UqAGvT-lTLisB.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1962343953287835648/vid/avc1/720x1280/RkgvbCMWYMP7exZ8.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1962344612598804480/vid/avc1/720x1280/2q8wxKrNIgAg2x9e.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1962339276852740096/vid/avc1/720x1280/ZOgSAYJKOQlyMNHT.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1962344065070170112/vid/avc1/720x1280/qe4krIC7ssKeoNPU.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1962328979748364288/vid/avc1/720x1280/BPXaNhKVBB1PPVMk.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1962337597063385088/vid/avc1/1280x720/2tMv_REnL4eFz1zx.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1962337597080117248/vid/avc1/1280x720/qkkmZ9oOtZmnPZU4.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1962326136006094848/vid/avc1/720x1280/acsel6rdX6y0MmUo.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1958991418434990080/vid/avc1/720x1280/ZO9hr12o-VOlnQ_P.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1956104560365461505/vid/avc1/720x1174/unOiPqIeQAiY_epO.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1953231770440388608/vid/avc1/720x1280/K7DI6XLeNwjDTWSt.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1953227622529548289/vid/avc1/720x1280/TicNiTCDkoQaoZ4l.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1953230664033288194/vid/avc1/720x1280/fUiWsZPyYt7Duyst.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1956101762445955072/vid/avc1/720x1280/4qzAoZp9208PD1Pg.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1958993276939509760/vid/avc1/360x640/XAqY5eBveQlue5hf.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1958988686848401408/vid/avc1/512x910/hvcat9Kxceu3GoXu.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1956102107037360128/vid/avc1/720x1280/nEj8YEk3SKj-cKJw.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1958993943011774464/vid/avc1/608x1080/m5jvNbufvRL_1hAL.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1953230018441822208/vid/avc1/720x1280/oS0p3yqa9YXMZ5j2.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1953227290315530240/vid/avc1/720x1280/HXLF3ebomxQX4sR6.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1956101697165778945/vid/avc1/1280x720/PJyi1OMKUX510cCF.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1956104475342725124/vid/avc1/720x1280/jedLwWJYvwd-qV0f.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1958988828095758336/vid/avc1/720x1280/rMXbseKnNVO8Ovol.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1953231345523802113/vid/avc1/720x1280/CqGN-1I5MDiQByVO.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1956104679378804736/vid/avc1/352x598/xG2SUovyMRHRZ2e4.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1953229876586332160/vid/avc1/720x1280/QNkXyRAhyuB_8mqj.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1956104621069676545/vid/avc1/720x1280/6juGVcDIarhItiwG.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1953227143946895360/vid/avc1/720x1280/lfPXSbJie4jooI1P.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1953227407663722496/vid/avc1/720x1280/aB3dXfgvf4pvNqW7.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1956101861397975040/vid/avc1/720x1280/9UXimtDkG-GXtXm5.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1958987364933804032/vid/avc1/720x1280/2UGrudERPlQZvyS7.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1953230446038573056/vid/avc1/720x1238/ZfcZjy9NV3n_qBB_.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1958988078384914432/vid/avc1/720x1280/hvHtzHary4DSH2-w.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1956104744386355201/vid/avc1/1280x720/kKnTG3o45Zm_kOxx.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1958987683663110144/vid/avc1/1080x590/5n57-xTBMwYoaSXH.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1956101925222670339/vid/avc1/356x640/nGGsXYmgsEf1difj.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1958986937886547968/vid/avc1/720x1280/p6BBtn18rGikb9bA.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1951803304696270848/vid/avc1/720x1126/8c_YIlMG52EdSWlz.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1943434055460229124/vid/avc1/720x1280/ZLeC_nelP6B4sVDq.mp4?tag=14",
    "https://video.twimg.com/amplify_video/1951794318282575872/vid/avc1/720x1280/XZltDiVmsdfQrCwJ.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1951802959106580480/vid/avc1/720x1280/34R8NMbmXYLIf7lN.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1946010742160826368/vid/avc1/720x1280/sIorIX-i3RHcSllX.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1951787718591299584/vid/avc1/720x1280/VkX2G0x_v0Lk74J2.mp4?tag=21",
    "https://video.twimg.com/ext_tw_video/1926355417359097856/pu/vid/avc1/1280x720/eBFDYZhq1p6yBYsW.mp4?tag=12",
    "https://video.twimg.com/amplify_video/1941224761834545152/vid/avc1/720x1266/zWLKDWGeAmvgzZZF.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1946004761917997057/vid/avc1/720x1280/pACJcZt0sYWxyQ8L.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1935479979145412608/vid/avc1/720x1280/F5q-c1gJ_BsfJ-e2.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1938023769156796416/vid/avc1/720x1280/Vn7QWyeJgQUy_NRr.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1946010672929927168/vid/avc1/720x1152/IQRO0G1vaR1t3R3H.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1951784690505191424/vid/avc1/720x1280/uWL9yR2QzacuGvNT.mp4?tag=21",
    "https://video.twimg.com/ext_tw_video/1920553451190206464/pu/vid/avc1/720x1280/4yToX_LI87VK3HT9.mp4?tag=12",
    "https://video.twimg.com/ext_tw_video/1920553378188570627/pu/vid/avc1/720x1280/c_LNsrCjT9UtonpL.mp4?tag=12",
    "https://video.twimg.com/amplify_video/1946008889780039680/vid/avc1/720x1280/_pZDmq1FtXeYT9Oi.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1935486373945032704/vid/avc1/720x1280/_QhTi8znWu8j52Y1.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1935486374099992576/vid/avc1/720x1280/6WWO-jUhhcDBPXcB.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1932887029668544512/vid/avc1/720x1280/RWKdaoApQKiGdjz2.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1938014174778691584/vid/avc1/720x1280/6fgylUfkFqZP1gcs.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1943433376117202944/vid/avc1/720x1280/V-3gONHDtC4uxpRj.mp4?tag=14",
    "https://video.twimg.com/amplify_video/1938040087205572608/vid/avc1/608x1072/wZWojtV2JENqGcZq.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1946010904711090176/vid/avc1/720x1280/kGtzEGjU0AZHVxzb.mp4?tag=21",
    "https://video.twimg.com/ext_tw_video/1926352441991147520/pu/vid/avc1/720x1280/2zEUM0RZBxnlpWDj.mp4?tag=12",
    "https://video.twimg.com/amplify_video/1935485478238904320/vid/avc1/1280x720/KMsHFrcaa4OGmmbC.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1943422306581385218/vid/avc1/720x1280/UWy7sl8PRa-gNiGZ.mp4?tag=14",
    "https://video.twimg.com/amplify_video/1943422306900152322/vid/avc1/718x944/jlBlOCwUa8ll9Iwc.mp4?tag=14",
    "https://video.twimg.com/amplify_video/1951784504349327360/vid/avc1/720x1280/KDvgflQHSJfrvAKG.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1943430498300366852/vid/avc1/720x1280/FWv4aL9oyH7hBfMh.mp4?tag=14",
    "https://video.twimg.com/amplify_video/1948474467644026881/vid/avc1/720x1280/MfmfIgamk6dmiW2P.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1941218163498287108/vid/avc1/720x1280/MXnHfSbIWhgsrXau.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1948474390875693057/vid/avc1/720x1280/AbdtQesVak7lYvtn.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1935443566748106752/vid/avc1/720x1280/KJIw-sSNLkx9U980.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1943433872462499840/vid/avc1/720x1280/Gv9UJnPWDMVatVxE.mp4?tag=14",
    "https://video.twimg.com/amplify_video/1943422004327055361/vid/avc1/1280x720/ypUbugudbpeBQdkA.mp4?tag=14",
    "https://video.twimg.com/ext_tw_video/1926346459013697536/pu/vid/avc1/720x1280/qiikMx1xYIe2HjwL.mp4?tag=12",
    "https://video.twimg.com/amplify_video/1935456447153700864/vid/avc1/720x1280/PVmPQZl_nCFzDK23.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1935456447153807361/vid/avc1/720x1280/v03aF8Wl2xS6_G17.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1948464897391730688/vid/avc1/720x1280/N4UPH05EjmLzRehY.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1948471533178925056/vid/avc1/720x1280/w8cmNPOYVSkge1ku.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1948467327592529920/vid/avc1/720x1280/QN8FvP80sGk1kacj.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1932890160494178304/vid/avc1/720x1280/abGJKeV2GyKqC7HF.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1938015009818480641/vid/avc1/720x1280/HgplC8u9Tyw9eXRL.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1938014922560159744/vid/avc1/720x1280/shkLW83WIBWQahqB.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1941225188927889408/vid/avc1/1280x720/0CwLOa5lWPj1UaHP.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1948467205089165312/vid/avc1/720x1280/ycWEGMZTrN_vWqEj.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1941229445810933760/vid/avc1/720x1280/OaYabpYtY3VoPZPM.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1946004873041879040/vid/avc1/1280x720/O_h90MkRCUeUssvS.mp4?tag=21",
    "https://video.twimg.com/ext_tw_video/1932865440080097280/pu/vid/avc1/720x1280/UQPFjpydpGx6vF6U.mp4?tag=12",
    "https://video.twimg.com/ext_tw_video/1926344146270191616/pu/vid/avc1/720x1280/4mYx_-3e2pMdE6lu.mp4?tag=12",
    "https://video.twimg.com/ext_tw_video/1920552138973065216/pu/vid/avc1/960x720/K_I_3lDfUNyYt9cM.mp4?tag=12",
    "https://video.twimg.com/amplify_video/1948471634437836800/vid/avc1/720x1280/rgeA15blYXOVy6us.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1948467389001334785/vid/avc1/1280x720/oNFoDtzoIf_B0Ypk.mp4?tag=21",
    "https://video.twimg.com/ext_tw_video/1920553264505823232/pu/vid/avc1/720x1280/4RVk5TZ7PW8C0Kaq.mp4?tag=12",
    "https://video.twimg.com/ext_tw_video/1926353367565037569/pu/vid/avc1/720x1280/tEhl1pRynC2S-7WS.mp4?tag=12",
    "https://video.twimg.com/amplify_video/1938019936020140034/vid/avc1/720x1280/U1B_JfAOjOHyBlO1.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1951784622779772928/vid/avc1/720x960/qaJtwUSYBXdXH2bE.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1941229016134111232/vid/avc1/720x1280/LoIMM-4q5QsZ9mdu.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1941229016134057985/vid/avc1/720x1280/Z34asYWHvdJ3hpTC.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1941228221619421184/vid/avc1/720x1280/xBP3ogHh488aLH_c.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1946012406687092736/vid/avc1/640x360/CdM1rJW9rHFW6MTN.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1935470632050851840/vid/avc1/720x1280/_pufHrKoZFiXi3eC.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1932886154267013122/vid/avc1/720x1280/3qjfzgwPr9tTHHwM.mp4?tag=21",
    "https://video.twimg.com/ext_tw_video/1920551259007770624/pu/vid/avc1/672x1232/BolEmzbfkubZ5Lt1.mp4?tag=12",
    "https://video.twimg.com/amplify_video/1943427841414303744/vid/avc1/718x1174/bWRYoI9l-zM279Jk.mp4?tag=14",
    "https://video.twimg.com/amplify_video/1946012198373126144/vid/avc1/1280x720/eI5YgmTXwq49Ua-L.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1943420237522833411/vid/avc1/720x1280/Jk5Sau3iMcVkvIf1.mp4?tag=14",
    "https://video.twimg.com/amplify_video/1938039771919749120/vid/avc1/720x1280/yUc5SdPEDQQKLd7s.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1938039984822661120/vid/avc1/720x1280/ZFmyBL2uM17jPXw4.mp4?tag=21",
    "https://video.twimg.com/ext_tw_video/1926350275142430720/pu/vid/avc1/720x1280/Z0t3jsILU9ldBS9n.mp4?tag=12",
    "https://video.twimg.com/amplify_video/1948465017600585728/vid/avc1/640x364/JLGNP-daIjHTpdoV.mp4?tag=21",
    "https://video.twimg.com/ext_tw_video/1926348863679455233/pu/vid/avc1/720x1280/4eiTHV7w5Mk7qYkp.mp4?tag=12",
    "https://video.twimg.com/ext_tw_video/1932853086370082819/pu/vid/avc1/720x1280/YrnqxdeEt43kJyGg.mp4?tag=12",
    "https://video.twimg.com/amplify_video/1941237392784207872/vid/avc1/720x1280/_8pxqiBXV5vA_w2I.mp4?tag=21",
    "https://video.twimg.com/ext_tw_video/1932847536831971328/pu/vid/avc1/720x1280/3Nx5ixT7aLkXTHzN.mp4?tag=12",
    "https://video.twimg.com/amplify_video/1938036558692814850/vid/avc1/540x960/kxFtJN8wSUoarRT6.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1935485399515766784/vid/avc1/720x1280/SdRJJHK9GsgTK6fz.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1941227377738035200/vid/avc1/720x1280/9NVNRwXpnKYTSIri.mp4?tag=21",
    "https://video.twimg.com/ext_tw_video/1926344820059971586/pu/vid/avc1/720x960/Cabrgb-EOBmVJ0UG.mp4?tag=12",
    "https://video.twimg.com/amplify_video/1935472374926749696/vid/avc1/1280x718/0uH98HBCbAldO6hZ.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1932871573805158401/vid/avc1/720x1280/gNNdNk_iWpp1N-_W.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1932853936345788416/vid/avc1/720x1280/eBZ6ez5tFC5uBUy4.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1943426061523419136/vid/avc1/720x1280/XJDuwcxSoooVjJnG.mp4?tag=14",
    "https://video.twimg.com/amplify_video/1941226728820465665/vid/avc1/720x1206/9dYFYP4OCWywisrJ.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1951784254532419584/vid/avc1/720x960/pX-hrLNCNttSOoj-.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1946005024297127936/vid/avc1/720x1280/EFT3IWOR1M6YPoq8.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1932875177597284352/vid/avc1/720x1280/-5fbTqpnwBWXoMDQ.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1932875177593090051/vid/avc1/538x960/sEyx8EbQFwiTTPlC.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1935477535531225088/vid/avc1/720x1280/LJgUa51u9Z2fhwDW.mp4?tag=21",
    "https://video.twimg.com/ext_tw_video/1920550158460465154/pu/vid/avc1/720x1280/nBlw4pi88ELeAsSy.mp4?tag=12",
    "https://video.twimg.com/ext_tw_video/1932845676041580544/pu/vid/avc1/720x1280/oBnV41GVwM_6J4Tw.mp4?tag=12",
    "https://video.twimg.com/amplify_video/1935479659665272832/vid/avc1/720x1280/4hfeV0LikdzQOAbL.mp4?tag=21",
    "https://video.twimg.com/ext_tw_video/1943416933493112832/pu/vid/avc1/474x552/hX60T-GLtGtaI7Bz.mp4?tag=12",
    "https://video.twimg.com/amplify_video/1948464962235691008/vid/avc1/720x1280/FCrlZ1cjR9-ukOQG.mp4?tag=21",
    "https://video.twimg.com/ext_tw_video/1926342285731487744/pu/vid/avc1/720x1280/up4iLz6rTf9yulk8.mp4?tag=12",
    "https://video.twimg.com/amplify_video/1946012619917197314/vid/avc1/720x1280/BTrjzJN8YY9b0NFD.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1941230260319813634/vid/avc1/720x1280/c0nkQzVZhNbKY5JK.mp4?tag=21",
    "https://video.twimg.com/ext_tw_video/1920546601631698944/pu/vid/avc1/720x1280/qVa3ytYyBlguNfzt.mp4?tag=12",
    "https://video.twimg.com/amplify_video/1938028962170765312/vid/avc1/720x1210/zaFRrlRkl5MCRmC9.mp4?tag=21",
    "https://video.twimg.com/ext_tw_video/1926345677153427457/pu/vid/avc1/720x1280/uoHvrn9RLy2f0m_S.mp4?tag=12"
];

const THUMBNAILS_DIR = path.join(__dirname, 'public', 'thumbnails');
const TEMP_DIR = path.join(__dirname, 'temp_videos');

if (!fs.existsSync(THUMBNAILS_DIR)) {
    fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });
}
if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
}

function downloadVideo(url, outputPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(outputPath);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`HTTP ${response.statusCode}`));
                return;
            }
            const totalBytes = parseInt(response.headers['content-length'] || '0');
            let downloadedBytes = 0;

            response.on('data', (chunk) => {
                downloadedBytes += chunk.length;
                const percent = totalBytes ? ((downloadedBytes / totalBytes) * 100).toFixed(1) : '?';
                process.stdout.write(`\r    Download: ${percent}%`);
            });

            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log('');
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(outputPath, () => { });
            reject(err);
        });
    });
}

function extractThumbnail(videoPath, thumbnailPath) {
    try {
        execSync(
            `ffmpeg -i "${videoPath}" -ss 00:00:01 -vframes 1 -vf scale=400:-1 -q:v 2 "${thumbnailPath}"`,
            { stdio: 'pipe' }
        );
        return true;
    } catch (error) {
        return false;
    }
}

async function processAllVideos() {
    const startTime = Date.now();
    console.log(`\n🎬 Processing ALL ${ALL_VIDEO_URLS.length} videos\n`);
    console.log(`Estimated time: 45-60 minutes`);
    console.log(`Started: ${new Date().toLocaleTimeString()}\n`);

    const thumbnailMap = {};
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < ALL_VIDEO_URLS.length; i++) {
        const url = ALL_VIDEO_URLS[i];
        const videoId = `ebonies-${String(i + 1).padStart(3, '0')}`;
        const videoPath = path.join(TEMP_DIR, `${videoId}.mp4`);
        const thumbnailPath = path.join(THUMBNAILS_DIR, `${videoId}.jpg`);

        console.log(`\n[${i + 1}/${ALL_VIDEO_URLS.length}] ${videoId}`);

        try {
            await downloadVideo(url, videoPath);
            console.log(`    Extracting thumbnail...`);
            const success = extractThumbnail(videoPath, thumbnailPath);

            if (success) {
                thumbnailMap[videoId] = `/thumbnails/${videoId}.jpg`;
                successCount++;
                console.log(`    ✅ Success`);
            } else {
                failCount++;
                console.log(`    ❌ Failed to extract`);
            }

            fs.unlinkSync(videoPath);

            // Progress update every 10 videos
            if ((i + 1) % 10 === 0) {
                const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
                const remaining = ((ALL_VIDEO_URLS.length - i - 1) * (Date.now() - startTime) / (i + 1) / 1000 / 60).toFixed(1);
                console.log(`\n📊 Progress: ${i + 1}/${ALL_VIDEO_URLS.length} | Success: ${successCount} | Failed: ${failCount}`);
                console.log(`⏱️  Elapsed: ${elapsed}min | Estimated remaining: ${remaining}min\n`);
            }

        } catch (error) {
            failCount++;
            console.error(`    ❌ Error: ${error.message}`);
        }
    }

    // Save final map
    fs.writeFileSync(
        path.join(__dirname, 'thumbnail_map.json'),
        JSON.stringify(thumbnailMap, null, 2)
    );

    const totalTime = ((Date.now() - startTime) / 1000 / 60).toFixed(1);

    console.log(`\n${'='.repeat(60)}`);
    console.log(`✅ COMPLETED!`);
    console.log(`${'='.repeat(60)}`);
    console.log(`Total time: ${totalTime} minutes`);
    console.log(`Success: ${successCount}/${ALL_VIDEO_URLS.length}`);
    console.log(`Failed: ${failCount}`);
    console.log(`Thumbnails: ${THUMBNAILS_DIR}`);
    console.log(`Map file: thumbnail_map.json\n`);

    try {
        fs.rmdirSync(TEMP_DIR, { recursive: true });
    } catch (e) { }
}

try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    console.log('✅ ffmpeg is installed');
    processAllVideos().catch(console.error);
} catch (error) {
    console.error('❌ ffmpeg not installed');
    process.exit(1);
}

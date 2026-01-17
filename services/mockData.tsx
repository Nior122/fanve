import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Profile, User, UserRole, Image, MediaType } from '../types';
import ruriData from './ruriData.json';

// Subset of data for demo purposes from the Belle Delphine dataset
const BELLE_FULL_DATA = [
  { i: "belle-001", t: "Gamer Girl Vibes 🎮✨", d: "Tantalizing tease 😏", u: "https://img.coomer.st/thumbnail/data/07/e2/07e208332897589351e1d3643eaeeb0637b7d73490b3c07a3a857d617b0e1b8b.jpg", dt: "2025-08-18T11:35:37.667Z", l: 426, v: 1976 },
  { i: "belle-002", t: "Kawaii Princess 👑💖", d: "Heavenly curves 👸", u: "https://img.coomer.st/thumbnail/data/08/58/085861d453b3c39999cbf018e4f59920d2099018f044242b2d79600c8560f7ac.jpg", dt: "2025-08-18T11:36:37.669Z", l: 147, v: 586 },
  { i: "belle-003", t: "E-Girl Energy ⚡🎯", d: "Captivating allure 💫", u: "https://img.coomer.st/thumbnail/data/10/04/1004b01ae8aa1677339a4a31cfc7cd9d9f864b1cf7c1ba92a8e21656b4d51831.jpg", dt: "2025-08-18T11:37:37.669Z", l: 436, v: 2434 },
  { i: "belle-004", t: "Cosplay Queen 👸🎭", d: "Perfect storm ⛈️", u: "https://img.coomer.st/thumbnail/data/18/a0/18a0fd64e889fd862aae94b9fe9104e2d2c973438beb670c05f046bc67b7b26d.jpg", dt: "2025-08-18T11:38:37.670Z", l: 118, v: 2126 },
  { i: "belle-005", t: "Gaming Setup Ready 🖥️🎮", d: "Angelic sin 😈", u: "https://img.coomer.st/thumbnail/data/1a/34/1a34d7f46b39f100fa2644b3da225d65e24118e412f3c16d1d9e33d670f80603.jpg", dt: "2025-08-18T11:39:37.670Z", l: 160, v: 2165 },
  { i: "belle-006", t: "Otaku Dreams 🌸💫", d: "Mysterious charm 🔮", u: "https://img.coomer.st/thumbnail/data/1a/e5/1ae50820541e23a92c5b40d9b67e9a44964f8c8ba6564e27f99d87f3247cd136.jpg", dt: "2025-08-18T11:40:37.670Z", l: 246, v: 2038 },
  { i: "belle-007", t: "Anime Aesthetic 🌙✨", d: "Captivating allure 💫", u: "https://img.coomer.st/thumbnail/data/27/d9/27d997447d5e8d334c4b621d0f281cf72bfd337d7d224cfcdd3769547ef009d5.jpg", dt: "2025-08-18T11:41:37.671Z", l: 255, v: 710 },
  { i: "belle-008", t: "Gamer Goddess Mode 🎮👑", d: "Sweet obsession 🍭", u: "https://img.coomer.st/thumbnail/data/2c/b2/2cb2bf9929e463a4b6825600d4e5f63c3746c43dc712a7784da28ea8516e1a78.jpg", dt: "2025-08-18T11:42:37.671Z", l: 103, v: 861 },
  { i: "belle-009", t: "Kawaii Cuteness 🎀💕", d: "Sweet obsession 🍭", u: "https://img.coomer.st/thumbnail/data/33/ee/33ee9e70b748997b977056a28d1d66a65e5af2b5d733101b5db0c25aa7fc3475.jpg", dt: "2025-08-18T11:43:37.671Z", l: 478, v: 1204 },
  { i: "belle-010", t: "Controller Queen 🎮👸", d: "Sinful desires 😈", u: "https://img.coomer.st/thumbnail/data/36/08/360885bd45eef6eec0b84d6b9d2edd721a890336b707ee2d8d252d3228f26eee.jpg", dt: "2025-08-18T11:44:37.672Z", l: 256, v: 2162 },
  { i: "belle-011", t: "Pastel Princess 🌸💖", d: "Golden goddess 🏆", u: "https://img.coomer.st/thumbnail/data/3d/4f/3d4f4e3aa80c1efddb045939f0a33e84f9e2df84fda1dfbd4d9bd6b5d85d1ceb.jpg", dt: "2025-08-18T11:45:37.672Z", l: 322, v: 2016 },
  { i: "belle-012", t: "Gaming Glam ✨🎯", d: "Lustful thoughts 💭", u: "https://img.coomer.st/thumbnail/data/3d/d0/3dd0dbd10678e85212cb7eff4531a1fbfaae9182f39635004033d97d6b79a942.jpg", dt: "2025-08-18T11:46:37.673Z", l: 528, v: 2294 },
  { i: "belle-013", t: "Neon Nights 🌈⚡", d: "Passion unleashed 💥", u: "https://img.coomer.st/thumbnail/data/46/f4/46f4058dc157610f03092f2efc0b1544bd4ac2b430ca5e1fbb250fd328c57599.jpg", dt: "2025-08-18T11:47:37.673Z", l: 498, v: 2036 },
  { i: "belle-014", t: "Pixel Perfect 💎🎮", d: "Stunning elegance 👑", u: "https://img.coomer.st/thumbnail/data/52/08/520871cb4fa6364b7d9ac9e7b3ceeb0634d05f1b04bcd724798e99a3c513dc3b.jpg", dt: "2025-08-18T11:48:37.673Z", l: 514, v: 1375 },
  { i: "belle-015", t: "Anime Vibes Only 🌸👑", d: "Your fantasy awaits 🔮", u: "https://img.coomer.st/thumbnail/data/5d/62/5d629f84b183685925e3656b29ac5571b0a52d2f4479a22121ef44f2da925a87.jpg", dt: "2025-08-18T11:49:37.673Z", l: 314, v: 724 },
  { i: "belle-016", t: "E-Girl Aesthetic 💫🎭", d: "Mysterious charm 🔮", u: "https://img.coomer.st/thumbnail/data/5e/94/5e94275cc3314fee6e65f312f92848f3fa7ec6ece8abfb90a608edb435c7cfaf.jpg", dt: "2025-08-18T11:50:37.674Z", l: 312, v: 1825 },
  { i: "belle-017", t: "Gaming Goddess 🎮✨", d: "Ravishing beauty 🌹", u: "https://img.coomer.st/thumbnail/data/60/ce/60cee16e70b693d13fa92ef9f93fde792af57124850d326de23441d29248fc36.jpg", dt: "2025-08-18T11:51:37.674Z", l: 317, v: 1138 },
  { i: "belle-018", t: "Kawaii Energy 💖🌸", d: "Passion unleashed 💥", u: "https://img.coomer.st/thumbnail/data/61/7a/617a3015ca556bf89fe074f3e18784c61c942029af99255c2492e6d62cfd4ef2.jpg", dt: "2025-08-18T11:52:37.675Z", l: 504, v: 1106 },
  { i: "belle-019", t: "Controller Cutie 🎮💕", d: "Exotic temptress 🌺", u: "https://img.coomer.st/thumbnail/data/6d/15/6d15f514cf020b5d23f983107d51217b4d26ce8db373da5d9685541fb5f6fb4c.jpg", dt: "2025-08-18T11:53:37.676Z", l: 571, v: 512 },
  { i: "belle-020", t: "Cosplay Magic 👑🎭", d: "Heavenly curves 👸", u: "https://img.coomer.st/thumbnail/data/6d/2b/6d2b7b6725ceb9f0276fa68f0b39886f821eeb6bccaff3adafd1090f97fd86dd.jpg", dt: "2025-08-18T11:54:37.676Z", l: 308, v: 1508 },
  { i: "belle-021", t: "Gamer Princess 🎮👸", d: "Exotic temptress 🌺", u: "https://img.coomer.st/thumbnail/data/7a/1c/7a1c7af7e30c161a1d5f2ba7967b5e613c8e1d364e42db293ccd4805f8b6de96.jpg", dt: "2025-08-18T11:55:37.676Z", l: 598, v: 1683 },
  { i: "belle-022", t: "Neon Dreams 🌈💫", d: "Addictive appeal 💊", u: "https://img.coomer.st/thumbnail/data/7e/2f/7e2ff71cb04315a96f97943cc2bd015d6bf22c491a01fdbc6036ad6280402797.jpg", dt: "2025-08-18T11:56:37.677Z", l: 285, v: 2111 },
  { i: "belle-023", t: "Otaku Life 🌸⚡", d: "Irresistible charm ✨", u: "https://img.coomer.st/thumbnail/data/85/b9/85b9c4284d08f621fdc7b5a6793f03c37ddfa326cb075819d4a05a721e10cac7.jpg", dt: "2025-08-18T11:57:37.677Z", l: 152, v: 1104 },
  { i: "belle-024", t: "Gaming Queen 👑🎮", d: "Perfect storm ⛈️", u: "https://img.coomer.st/thumbnail/data/89/47/8947a73f37fa76f2f65ee03fc07f214ed9655e2c2134ff40d87d06e61558d9ad.jpg", dt: "2025-08-18T11:58:37.677Z", l: 584, v: 2472 },
  { i: "belle-025", t: "Kawaii Mode On 💖✨", d: "Golden goddess 🏆", u: "https://img.coomer.st/thumbnail/data/89/5f/895ff744a6317601e9e3436d947b268868da4924b9b2009f53da49de525d002c.jpg", dt: "2025-08-18T11:59:37.678Z", l: 556, v: 1297 },
  { i: "belle-026", t: "E-Girl Fantasy 💫🎯", d: "Midnight temptation 🌙", u: "https://img.coomer.st/thumbnail/data/89/e8/89e82dcdadb49ecd8266196fa5989224ce6b5dfa59087f805f5729e3c0243c38.jpg", dt: "2025-08-18T12:00:37.678Z", l: 266, v: 1448 },
  { i: "belle-027", t: "Anime Princess 🌸👑", d: "Heavenly curves 👸", u: "https://img.coomer.st/thumbnail/data/8a/b8/8ab8dec669962de841f80222496fe209b665f87a1025a7df5c1e6a596b2e4fbe.jpg", dt: "2025-08-18T12:01:37.678Z", l: 347, v: 1078 },
  { i: "belle-028", t: "Gaming Glam Squad ✨🎮", d: "Your fantasy awaits 🔮", u: "https://img.coomer.st/thumbnail/data/8c/67/8c67c4f8ae1fe474c4753ef648590e16d254640cfe43500f1e546d555e3561b7.jpg", dt: "2025-08-18T12:02:37.679Z", l: 468, v: 1334 },
  { i: "belle-029", t: "Pixel Paradise 💎🌈", d: "Radiant goddess ☀️", u: "https://img.coomer.st/thumbnail/data/8c/fa/8cfaa68da23abbf6435f2279c8b1546ba1b415ef34d9a33542bbc185dc428171.jpg", dt: "2025-08-18T12:03:37.679Z", l: 593, v: 1378 },
  { i: "belle-030", t: "Controller Goddess 🎮👑", d: "Hot and ready 🌡️", u: "https://img.coomer.st/thumbnail/data/90/2e/902ea794ab0771032d8acb4634932853cbc9ae8811cd9982c00ff23ff01532f3.jpg", dt: "2025-08-18T12:04:37.679Z", l: 581, v: 757 },
  { i: "belle-031", t: "Kawaii Dreams 💖🌸", d: "Fierce beauty 🐆", u: "https://img.coomer.st/thumbnail/data/90/c8/90c8b3c24e8f9231229aa61bd69c0842b2c85f2c34d2f57a941e48faa3cf0eea.jpg", dt: "2025-08-18T12:05:37.680Z", l: 398, v: 2303 },
  { i: "belle-032", t: "Gaming Aesthetic 🎯✨", d: "Radiant goddess ☀️", u: "https://img.coomer.st/thumbnail/data/91/6b/916b43c3e97add0e8cf1073c338bcb2afd6a95f6e951a2db04958d3ddd055434.jpg", dt: "2025-08-18T12:06:37.680Z", l: 368, v: 1909 },
  { i: "belle-033", t: "Neon Princess 🌈👸", d: "Perfect storm ⛈️", u: "https://img.coomer.st/thumbnail/data/a3/55/a355a85fbbda186c47c6f4d437a13fc780cecc775d474ce88c1c867c0fe4da1f.jpg", dt: "2025-08-18T12:07:37.681Z", l: 124, v: 1501 },
  { i: "belle-034", t: "Otaku Queen 🌸👑", d: "Captivating allure 💫", u: "https://img.coomer.st/thumbnail/data/a3/fc/a3fc779ed21affb6de80bf64c2600b4ce441be09ee6f648d3259f81b44be0382.jpg", dt: "2025-08-18T12:08:37.681Z", l: 182, v: 1844 },
  { i: "belle-035", t: "E-Girl Power 💫⚡", d: "Wild and free 🦋", u: "https://img.coomer.st/thumbnail/data/a7/b2/a7b21a06b44c85667ddef8972328176b306b9db01bfdde878dad66719eb53836.jpg", dt: "2025-08-18T12:09:37.682Z", l: 512, v: 1268 },
  { i: "belle-036", t: "Gaming Cuteness 🎮💕", d: "Velvet touch 🤲", u: "https://img.coomer.st/thumbnail/data/a8/cc/a8cc37a7617eaf8e52b3536870accb3ea1bda0cb635bdd9df74cea44d64987ab.jpg", dt: "2025-08-18T12:10:37.682Z", l: 284, v: 1469 },
  { i: "belle-037", t: "Kawaii Vibes 💖🌸", d: "Irresistible charm ✨", u: "https://img.coomer.st/thumbnail/data/b1/97/b197a6f600938c0e71a6837eb2057104450beab83a303bd482336f2a38ea59fc.jpg", dt: "2025-08-18T12:11:37.682Z", l: 303, v: 2448 },
  { i: "belle-038", t: "Anime Dreams 🌙✨", d: "Exotic temptress 🌺", u: "https://img.coomer.st/thumbnail/data/bd/f2/bdf275bc33281bda733edc5e884824760cd7c224dddc87401d21e3d13a161d80.jpg", dt: "2025-08-18T12:12:37.682Z", l: 121, v: 675 },
  { i: "belle-039", t: "Controller Princess 🎮👸", d: "Your fantasy awaits 🔮", u: "https://img.coomer.st/thumbnail/data/c3/97/c3975128291356baf8ef7c43da40003a86b4ce8df0e852c58e0cc722be0a09d7.jpg", dt: "2025-08-18T12:13:37.682Z", l: 340, v: 1572 },
  { i: "belle-040", t: "Gaming Magic 🎯💫", d: "Electric touch ⚡", u: "https://img.coomer.st/thumbnail/data/d7/30/d73097b037e1366f767aa049accb7b5ed4507de7486fcd0eb4cbdc06f45ff717.jpg", dt: "2025-08-18T12:14:37.683Z", l: 432, v: 2285 },
  { i: "belle-041", t: "Gamer Girl Vibes 🎮✨", d: "Intoxicating beauty 🍷", u: "https://img.coomer.st/thumbnail/data/d8/0b/d80b15399244ffd8cd5b76a732df3d7d34fbe8c129130de05f46884867280957.jpg", dt: "2025-08-18T12:15:37.685Z", l: 258, v: 809 },
  { i: "belle-042", t: "Kawaii Princess 👑💖", d: "Magnetic attraction 🧲", u: "https://img.coomer.st/thumbnail/data/e0/0d/e00d403b7994f29cb39195dab633229007b33f3197836a728c757f3a6411e247.jpg", dt: "2025-08-18T12:16:37.686Z", l: 356, v: 1920 },
  { i: "belle-043", t: "E-Girl Energy ⚡🎯", d: "Exotic paradise 🏝️", u: "https://img.coomer.st/thumbnail/data/e0/30/e03093d820bed2737307850d76e37beafafc740908c4ebce10ee154d9d88370d.jpg", dt: "2025-08-18T12:17:37.686Z", l: 544, v: 1213 },
  { i: "belle-044", t: "Cosplay Queen 👸🎭", d: "Tempting treasure 💎", u: "https://img.coomer.st/thumbnail/data/e8/b7/e8b788235521049b60023a09055213ad5fafd65c496a33b3aacac01760d9704d.jpg", dt: "2025-08-18T12:18:37.686Z", l: 469, v: 950 },
  { i: "belle-045", t: "Gaming Setup Ready 🖥️🎮", d: "Passion unleashed 💥", u: "https://img.coomer.st/thumbnail/data/e8/bc/e8bcbd0c5635987ea38f9ccb5895167a4a458339920814ac6c5a552576141194.jpg", dt: "2025-08-18T12:19:37.687Z", l: 315, v: 1640 },
  { i: "belle-046", t: "Otaku Dreams 🌸💫", d: "Captivating allure 💫", u: "https://img.coomer.st/thumbnail/data/01/55/01552a5dacb9d554ef7aec845c075d13e747b3f751401b136f5b8a114193d0b1.jpg", dt: "2025-08-18T12:20:37.687Z", l: 184, v: 690 },
  { i: "belle-047", t: "Anime Aesthetic 🌙✨", d: "Angelic sin 😈", u: "https://img.coomer.st/thumbnail/data/08/9c/089c8d01f0eb8640f166ea7d0a3f1e25b899e04dc988a4540125822691b0fe66.jpg", dt: "2025-08-18T12:21:37.687Z", l: 486, v: 2244 },
  { i: "belle-048", t: "Gamer Goddess Mode 🎮👑", d: "Tantalizing tease 😏", u: "https://img.coomer.st/thumbnail/data/0f/4b/0f4bd7eabee87b588d413c911c06fc303ec7deee98827ea8208dc0ea80ddbd02.jpg", dt: "2025-08-18T12:22:37.688Z", l: 466, v: 573 },
  { i: "belle-049", t: "Kawaii Cuteness 🎀💕", d: "Exotic temptress 🌺", u: "https://img.coomer.st/thumbnail/data/0f/cf/0fcf5350fdffc4b0b02cf14abe0e20601e76533acd9bb93fdf3e7a018e5dfcd0.jpg", dt: "2025-08-18T12:23:37.688Z", l: 596, v: 2101 },
  { i: "belle-050", t: "Controller Queen 🎮👸", d: "Pure seduction 💕", u: "https://img.coomer.st/thumbnail/data/10/ae/10aeaeadb8b9489ecba98ebc08ed4b8bc8afa6d9998185fd2fe62b007aa22bb6.jpg", dt: "2025-08-18T12:24:37.688Z", l: 543, v: 1871 }
];

const MOCK_IMAGES: Image[] = BELLE_FULL_DATA.map((item, index) => {
  const isVideo = index % 15 === 0;
  return {
    id: item.i,
    url: isVideo ? 'https://www.w3schools.com/html/mov_bbb.mp4' : item.u,
    thumbnailUrl: item.u,
    caption: item.t,
    width: 800,
    height: 1000,
    isLocked: index % 3 !== 0,
    isVisible: true,
    mediaType: isVideo ? 'video' : 'image',
    sourceUrl: item.u,
    createdAt: item.dt,
    sha256: `sha256-${item.i}`
  };
});

const RURI_IMAGES: Image[] = (ruriData as any[]).map((item) => ({
  ...item,
  mediaType: item.mediaType as MediaType
}));

// Bishoujomom images
const BISHOUJOMOM_URLS = [
  "https://img.coomer.st/thumbnail/data/08/15/0815fe36666e60f1d485c2e515e0c20628201b1666ad537e61a109331ef04fb3.jpg",
  "https://img.coomer.st/thumbnail/data/09/a3/09a36ac7b250eb00ae61a14cc9f5f3ff7dc95a00bfc688c946d333e678dff0b6.jpg",
  "https://img.coomer.st/thumbnail/data/0a/14/0a1494f01677299f7e106494316cc732232a3d77cb341974a506c36c5dcf55ae.jpg",
  "https://img.coomer.st/thumbnail/data/0b/95/0b95231971c459dd2788c1ff0d24b2dff4e5944311c45c0c291201918b19585e.jpg",
  "https://img.coomer.st/thumbnail/data/0b/e7/0be768382bcdb7d68dde68a8bdc18de5b42603d032cbc11da35facb57e763b42.jpg",
  "https://img.coomer.st/thumbnail/data/0d/69/0d69d4a9f74e6a90b0f6a3e295027fc6e373ceed5844c6ac347c1d91b33e48cc.jpg",
  "https://img.coomer.st/thumbnail/data/10/b7/10b789e173201e65ec4bde38a0910eaf926b89605d582049de5877b5f0535055.jpg",
  "https://img.coomer.st/thumbnail/data/15/f2/15f24a6f6c75aac9ce5ec75fb26f12b795ce0de86113e2e214b0e29b0d1f94b7.jpg",
  "https://img.coomer.st/thumbnail/data/19/e0/19e014f0623f416821b726bdccd5775a67e5e79f5cb14371214c113d33f6b4d5.jpg",
  "https://img.coomer.st/thumbnail/data/1b/04/1b04c1db339383a41f004b59e7ffb7e828a5c8988b1ea56b4cae289dc0bc7ada.jpg",
  "https://img.coomer.st/thumbnail/data/20/2a/202a237c9769d2bf2994d13f117d824744f581aa8751b497bbef84f89d5e4f99.jpg",
  "https://img.coomer.st/thumbnail/data/22/d1/22d1ff6781393d311a2657e6d31f098d15bbb7c10c7ac09fb83834192af462ce.jpg",
  "https://img.coomer.st/thumbnail/data/24/57/245721ed5ce165f7863a6277f1d8c7f0752df4d92be36234855bd1896a412fa4.jpg",
  "https://img.coomer.st/thumbnail/data/25/be/25be8dd1f0a3bfaa1bdf6af62c06824aec56211091ef914ad4909b1e145afbc0.jpg",
  "https://img.coomer.st/thumbnail/data/26/a6/26a6e965bc1adf9c31a83077d07bcf9780b27a757a1d97df261dff88dd117aeb.jpg",
  "https://img.coomer.st/thumbnail/data/28/9e/289ee36513a2f2157b73c1630233c5a29cadaf3fa78e769cb0c6a3055f45912f.jpg",
  "https://img.coomer.st/thumbnail/data/2b/02/2b021ba43a7da5e1a27d6cae4ba7fe673c6f4d553427e385e43403fc0326e2f0.jpg",
  "https://img.coomer.st/thumbnail/data/2b/76/2b761cb2d30ca18b34e3155eef5cb23ccba17752a74fe198c45054583603d663.jpg",
  "https://img.coomer.st/thumbnail/data/32/5f/325fce4acdebad8d1c17768e3a5d16740ba6bb35a74290949369614a4f6ed666.jpg",
  "https://img.coomer.st/thumbnail/data/32/f1/32f113425462d6acf7bb480f1e90d3c68839a229a0e22ae3c9d66a5156161c11.jpg",
  "https://img.coomer.st/thumbnail/data/35/dd/35dd5c839c956aec76dd45aacb68a63cd260d27dc5e94f1b3b4e18925d3c2ece.jpg",
  "https://img.coomer.st/thumbnail/data/36/80/36802915e31c85bda096a2634091fb0c1d3e7ad5ade875d09da707644f99b5d1.jpg",
  "https://img.coomer.st/thumbnail/data/3e/0d/3e0d975137aaef81dfa7b57ab4049fa15ad8d8c0d2f7d586e5323aa0b3f427d2.jpg",
  "https://img.coomer.st/thumbnail/data/3f/c8/3fc89553473cbacd9621b553589adf9cfe0da2f43ed66254e36cf937b2135521.jpg",
  "https://img.coomer.st/thumbnail/data/40/df/40df1fb10f505d0f281a787d5b34ca79b5b5b80c58f08a59abf4e3fc556d9029.jpg",
  "https://img.coomer.st/thumbnail/data/42/c0/42c00d0f32af713b3fcf1d097f5d97c6c9ed43ef94f596a95163d7ca9120c808.jpg",
  "https://img.coomer.st/thumbnail/data/44/86/4486b7e2b2987602ce51ff8e16c3945c4f4e7bd65f8cd95f674dc95f3241538c.jpg",
  "https://img.coomer.st/thumbnail/data/4f/b1/4fb18bbcacc7f4d05413b44d208eae458c328af1d151bb9b7705f220a8cf1f2c.jpg",
  "https://img.coomer.st/thumbnail/data/50/f7/50f73c4d4fbd626a09f2e9700b3418c93d9898da3d46ea809f4a247639aadfbf.jpg",
  "https://img.coomer.st/thumbnail/data/52/14/5214369aa3b702d5ce697281755446485c2cb2fbd5fba4cb9dcea25ef4d4be07.jpg",
  "https://img.coomer.st/thumbnail/data/54/0e/540ea49577d46a5d96b209442a1f00987ebf5cd2cdda02ade3187266159e228c.jpg",
  "https://img.coomer.st/thumbnail/data/5b/29/5b29d45143c22e57bfee75c48013d6f3b241356a83300cec2f1a9c9ae2363001.jpg",
  "https://img.coomer.st/thumbnail/data/5c/ac/5cacdfbd5f428ad781c070e3f33aa8bd7d790d1a83b1a977e3db82f85f232fed.jpg",
  "https://img.coomer.st/thumbnail/data/62/c6/62c6ca07a1479cdae307f0c30e7c8672dd8c0573ec31e5296f8a2a8d62229a56.jpg",
  "https://img.coomer.st/thumbnail/data/6a/e7/6ae7591c9a211c5a6c834538ab80da48182c3abbff12f073e91cad727175d4aa.jpg",
  "https://img.coomer.st/thumbnail/data/6f/5c/6f5c24f50e28dee1895d29eb08bc21a0d6db63a4610217309ff996d48fc0c968.jpg",
  "https://img.coomer.st/thumbnail/data/72/52/72524b253906cafae93c4f0fecce037bb3024e7a028462939c526cb6d94c8a5e.jpg",
  "https://img.coomer.st/thumbnail/data/7c/8f/7c8fb3918dd4c745ef0593e8edcc90397961b9b7ccad7b6066fa842145687334.jpg",
  "https://img.coomer.st/thumbnail/data/7d/ff/7dff0e9fdc07be60c576f0284ab589812f28029b2914f438f57deff214dfbe23.jpg",
  "https://img.coomer.st/thumbnail/data/81/f4/81f4bd196dcc02f4b8ad8a10896524e1a20b36677830435f65f7a1a36b763331.jpg",
  "https://img.coomer.st/thumbnail/data/82/23/822349d99be65f53ebd2ee127255aa915bf76e602d5ee93a326e8e9a5d824866.jpg",
  "https://img.coomer.st/thumbnail/data/82/65/826594bdf6ff5ff987b435a1bc6874d0a6860f7247a7f165becfff6b2dfdf7ac.jpg",
  "https://img.coomer.st/thumbnail/data/82/88/828834bb546e1921c802bfc496be7dcfd33c9b2a451f9d8b60a7fa0b6a991aec.jpg",
  "https://img.coomer.st/thumbnail/data/89/ba/89bae8063a20566b55157e1c98c57909c7ecedb4b780fd799bb238886a775a88.jpg",
  "https://img.coomer.st/thumbnail/data/8a/c9/8ac9ce6cce037361e552309986a92904581fbaab5b77868ab953f76dd288ef6e.jpg",
  "https://img.coomer.st/thumbnail/data/8c/00/8c00afdc39298d151fcab4b6d243fb63e43a15c408d09c72d9b7de7af4ca2d51.jpg",
  "https://img.coomer.st/thumbnail/data/8c/37/8c378c5c6358004f2a733c596c0bf64ff7ca0626860d6ebf7b029b777a793b27.jpg",
  "https://img.coomer.st/thumbnail/data/8e/e1/8ee1178051130ddf82135bd0ac49d5747a2a15f56eb616328f0ef2b124e5c803.jpg",
  "https://img.coomer.st/thumbnail/data/90/04/9004b37a382cd2a24e614cbd0c0b359fd81b5ee2af49ab4a487704fe8a4903cc.jpg",
  "https://img.coomer.st/thumbnail/data/91/32/91328a3e31a857f4a99fc0018eb2c447ebd2b878df35f499bfce2407627993cd.jpg",
  "https://img.coomer.st/thumbnail/data/91/53/9153e5bceefe3f4d663d31fc2b64aeb3f6983fdeb53c3bcb37bc5f220bb642f9.jpg",
  "https://img.coomer.st/thumbnail/data/91/69/9169a14372707c55acc7aa5b679e32e8e4a4a2d58f49b4d9578ca5e59d7bf856.jpg",
  "https://img.coomer.st/thumbnail/data/91/f7/91f7da9af090707989c19549fdb13d1aec5a7292f670eca8b30a5ad6bbf7dd61.jpg",
  "https://img.coomer.st/thumbnail/data/94/49/9449acde0213c1e1991cd859521cfbc2bfcab119783c1ddce72b62078d13b203.jpg",
  "https://img.coomer.st/thumbnail/data/98/6b/986ba0e52b15e18ff3acde69a9a978bde84525f3ab39d6294719541e21938034.jpg",
  "https://img.coomer.st/thumbnail/data/9d/af/9dafb17af813ef04ef1d8a17ce682d3f1987b5c8f6db14e632e63c6307f87ffa.jpg",
  "https://img.coomer.st/thumbnail/data/9e/8a/9e8a90168fadb73cf1bcee4d63368ad919f68d8377502083ab2c5ad605a8635d.jpg",
  "https://img.coomer.st/thumbnail/data/9f/94/9f947e2478bb309299078031f81c81f7d391ff29f3da105dafbe06dd7dce6904.jpg",
  "https://img.coomer.st/thumbnail/data/a0/1b/a01b3f75bf6dba320286134cc610e8e8080313a2127aa36d9aef53e893a028d0.jpg",
  "https://img.coomer.st/thumbnail/data/a0/4a/a04a42720fb7b329822721df199adf0eaf8d8928681f482afb3b935d316a62e8.jpg",
  "https://img.coomer.st/thumbnail/data/a2/69/a26950c6b965c83cc8390b8f7d9fc3dc7efcaa421a63c03560fd6750835517f7.jpg",
  "https://img.coomer.st/thumbnail/data/a2/99/a299c5a84aa7e059e9c7bd9d8273dfac2eecd7d521d0be4887d14a149a495b6c.jpg",
  "https://img.coomer.st/thumbnail/data/a4/ab/a4ab165f595e78170f3af60c701fc752267628953c76bb019c3aab8c7a6c7c65.jpg",
  "https://img.coomer.st/thumbnail/data/a5/77/a5774d19fde88c9e79f99cbc82c648b69e4812202242b5c04f40611f8ff3989e.jpg",
  "https://img.coomer.st/thumbnail/data/a7/7c/a77cc5ebe17ee62e3a55a218e7492507b5e34f05712c6a0712664cd2fad689ba.jpg",
  "https://img.coomer.st/thumbnail/data/a8/25/a8259fe7c74a947582d3970fe050f501cfcdd05df818dbb951460df9062c5ea3.jpg",
  "https://img.coomer.st/thumbnail/data/a8/3f/a83fa7ab2408f24952a57687eb88a52bf34ff940523cd693d1feb54e9efa73f5.jpg",
  "https://img.coomer.st/thumbnail/data/aa/60/aa608964fbffb85e86fb3f8b24ed2093732ed8f8fcd0daf043633db13884b87f.jpg",
  "https://img.coomer.st/thumbnail/data/aa/bf/aabf818220221b3257d93b892ee084c067f86d75a3607544dbc89ef4461e152e.jpg",
  "https://img.coomer.st/thumbnail/data/ab/ba/abba6739dc2687b857685428b05f169b15f2a89098b043edcc8c148b8219f7ab.jpg",
  "https://img.coomer.st/thumbnail/data/b5/29/b52936aa7837be19832c916d14be6540f2ad5e0c1f52dca5741f8715a871ec2f.jpg",
  "https://img.coomer.st/thumbnail/data/b6/55/b655f02e13fcb4775ba82ad32049c72886453717b68bb7b865c9d7876dcde9af.jpg",
  "https://img.coomer.st/thumbnail/data/b8/aa/b8aa26f8dcbd5a721cdf83d15a9d221ceca4bd49442306935af42519bca62177.jpg",
  "https://img.coomer.st/thumbnail/data/b8/f8/b8f8ae9b4f5553333731d65d277c24f6798e70aef818eaf139842085e904c301.jpg",
  "https://img.coomer.st/thumbnail/data/bc/52/bc5267c0da027578772d42f9436047cc7ea8145d8ce7fa4dde38ed6d8321c1d4.jpg",
  "https://img.coomer.st/thumbnail/data/be/d8/bed816375e5a9c8c924a03990b24664267f7f3d030ce54f090646a90c5a1767e.jpg",
  "https://img.coomer.st/thumbnail/data/bf/65/bf65411e098830f7bb7d6088fb44d19bcdbb7fc80898356693e684c882e432ff.jpg",
  "https://img.coomer.st/thumbnail/data/c1/6b/c16bc27df3487d06fecf103ffe0e5eaf82e314db9a427456dc08c693794204e4.jpg",
  "https://img.coomer.st/thumbnail/data/c4/84/c4843d0417b8de82eb85b5526f4b8bf86c00bc3849837e23f78cd20cc091aa7c.jpg",
  "https://img.coomer.st/thumbnail/data/c4/b9/c4b933238d4a77219ce4ef49c6fa986c6479cd20068f1e9c14d95b1bdc966d91.jpg",
  "https://img.coomer.st/thumbnail/data/c7/cb/c7cb630056a6f8129db351a71d7f3d5fe4b6ef23e5605e70dff31724a45fcf7d.jpg",
  "https://img.coomer.st/thumbnail/data/c9/8a/c98a404e6230a56b79fe62c88387bd612221656dd071a030ead8782b82fd8a64.jpg",
  "https://img.coomer.st/thumbnail/data/cc/98/cc98ca62ddff123fbc4a5178c00845854053ea16c25fe71f07d9300fab7c1d69.jpg",
  "https://img.coomer.st/thumbnail/data/cf/c8/cfc801cd51e4b8e7952435ff152fec818d3ac0bdb5276bc9a57304dbf74cb575.jpg",
  "https://img.coomer.st/thumbnail/data/d3/e1/d3e182d94d9b78550f7bb1da3b3bafaefa3409ef08287e087caf599939c8c42d.jpg",
  "https://img.coomer.st/thumbnail/data/d5/8c/d58c33f0faef76cda76653fecfbef94e0cfdf36d4ea29b484f204d43696d56ea.jpg",
  "https://img.coomer.st/thumbnail/data/d6/d0/d6d053ab1a6e9244eedf466a1848db0c67a5a3d4a84cf94622e43ac45014dc99.jpg",
  "https://img.coomer.st/thumbnail/data/e2/4e/e24e6c24552b9dfcc0a3bed1ae3fb1f80bbe2e52669123ca51d032410f80fb89.jpg",
  "https://img.coomer.st/thumbnail/data/e9/7e/e97ea1dfff31a5e250519f3300afd56d4a40c7be67288d3ee8bb53b04f45633f.jpg",
  "https://img.coomer.st/thumbnail/data/ea/19/ea19651ce117098e4daa08ac0e7f52836ecccaecc10f41455d438af8356465cd.jpg",
  "https://img.coomer.st/thumbnail/data/ea/39/ea39d1e2ef0aafcba4ccdc271246268bfd8737f7c984652eff929ec57be203ec.jpg",
  "https://img.coomer.st/thumbnail/data/f2/04/f204e8dfdd47d8b5ef0df7c19a49bf14af7037ff085108f511b1916bc7c9c4b3.jpg",
  "https://img.coomer.st/thumbnail/data/f2/66/f266ffa7a2bb5d40127e4dc64ed6881e32ab1db6aa1d0e326275dcc954f43b2b.jpg",
  "https://img.coomer.st/thumbnail/data/f3/bd/f3bd4ca62be5e2a653b601144a386208d26aad6a71eb4af6c3808632f71c7806.jpg",
  "https://img.coomer.st/thumbnail/data/f8/2f/f82fe64bdd1294816d97a79722e2e472895cb7246ab00c4a6c24d2b5d5aca2af.jpg",
  "https://img.coomer.st/thumbnail/data/fd/97/fd973b1c99576dbf28e6c3793d05bcbbefbdc2ce5d72cd81068146d66d7728e4.jpg",
  "https://img.coomer.st/thumbnail/data/fe/f2/fef2d3a8203096d4c5c48138d0c1ddfde842bb23153a919425fb0cec4b64f8c4.jpg"
];

const BISHOUJOMOM_IMAGES: Image[] = BISHOUJOMOM_URLS.map((url, index) => ({
  id: `bishoujomom-${String(index + 1).padStart(3, '0')}`,
  url,
  thumbnailUrl: url,
  caption: `📸 Exclusive Bishoujo Content ${index + 1}`,
  width: 800,
  height: 1000,
  isLocked: index % 3 !== 0, // Every 3rd image is unlocked
  isVisible: true,
  mediaType: 'image' as MediaType,
  sourceUrl: url,
  createdAt: new Date(Date.now() - index * 3600000).toISOString(),
  sha256: `sha256-bishoujomom-${index + 1}`
}));

// Create 3 profiles for variety
const CHOCOLATE_URLS = [
  "https://img.coomer.st/thumbnail/data/00/da/00dae8c2dd238cf93e7ff77a913bc6d082e67baa595a16884322bed88a561b2e.jpg",
  "https://img.coomer.st/thumbnail/data/01/72/0172da3c952ef1712810e9482d800260fc5c9cdd0aa5564652ca559e1ad4f518.jpg",
  "https://img.coomer.st/thumbnail/data/03/50/0350b49db0ff5a4a464b4a88f5e1fae2352bdfea4d4ed7576735012fa3d333f8.jpg",
  "https://img.coomer.st/thumbnail/data/04/9d/049d1ab2bb90f2171e0b59ffac411d8b1e5ebf8e8cfa0c5ae17713b458bd2dbc.jpg",
  "https://img.coomer.st/thumbnail/data/06/1b/061b3a4ddafc26bfa85583ffce856ad33c7675e9d616913c00a26735383619aa.jpg",
  "https://img.coomer.st/thumbnail/data/06/c5/06c58c189a0333287ed16693ce1d8b0be3efe537154fd436a3f1ebeb1269d7be.jpg",
  "https://img.coomer.st/thumbnail/data/07/6c/076ce4b32be3da45af0f6e60eac51a3e55898522dad1235d14f922776d7ff55f.jpg",
  "https://img.coomer.st/thumbnail/data/08/20/082056be6871f2a41d239c774708c21639e800a5e31bf82542de09243f52f7e8.jpg",
  "https://img.coomer.st/thumbnail/data/08/2d/082d30c865e20941e84de98e42816ff00f32343086a112d33407cebd41419988.jpg",
  "https://img.coomer.st/thumbnail/data/08/7e/087e7c80dd1810058f9850809492b3a1c5aa0aa89d8c92189eef0f5890ca1ca5.jpg",
  "https://img.coomer.st/thumbnail/data/0a/54/0a54f4b5a9861f02243e3885d4756c624549107db273db86a5da13ca445952ff.jpg",
  "https://img.coomer.st/thumbnail/data/0a/da/0adae95f775107cbcc0070d40b6a0a92a91429f9d5d36f4a87dc2879c4cf7718.jpg",
  "https://img.coomer.st/thumbnail/data/0a/e9/0ae971ff2d1d937d1d5d76c4f10fe4be03fb89d53d619c1dbf0497fcc7ab9170.jpg",
  "https://img.coomer.st/thumbnail/data/0b/b6/0bb67d7d5c9c368c09b518bd0ce0e20c3ed27fed59e26d96168ef57e6e312911.jpg",
  "https://img.coomer.st/thumbnail/data/0f/5f/0f5f16fb1c2b085f429106403e8ab7753d49163cf0593283904a04eb9e77d64c.jpg",
  "https://img.coomer.st/thumbnail/data/10/9a/109a8eeafb84f6f662779d41901c2a360fe4404d2db26dcb3db73baec4295e8d.jpg",
  "https://img.coomer.st/thumbnail/data/12/5d/125dec1b6b8692f53a8f1e9a0eedf16bd7fb740ad6e5b69ea6a2af4c4b11877f.jpg",
  "https://img.coomer.st/thumbnail/data/12/71/1271b4a6ca775e108201b2ea7858c703e949786465ab14d2cf7000bcf90c1e73.jpg",
  "https://img.coomer.st/thumbnail/data/12/a2/12a2c4c4e60609a37228af948a6a245846ab97b44f137752486a6bb43e3ac508.jpg",
  "https://img.coomer.st/thumbnail/data/13/a0/13a0a4b359bf3b32de244598a1ed140af2f5397286689aca24cd2076075b74e3.jpg",
  "https://img.coomer.st/thumbnail/data/14/23/1423d2a13973998e9a5485a447054cda6855641376d59c8f9c5e9684cede5647.jpg",
  "https://img.coomer.st/thumbnail/data/15/bf/15bf36e9e8e4998440d67434030c0ff41f9d060e6570fb227a289e5dbdc5e9b2.jpg",
  "https://img.coomer.st/thumbnail/data/15/f7/15f706fcb7c6d9ddea9ad74d46c10f6af27bc9bd1dc63d4768909726022f4f83.jpg",
  "https://img.coomer.st/thumbnail/data/16/33/16335b154f1e8a484a74d2634a2255d572143a0714fbc352a65f6582aa1ca41a.jpg",
  "https://img.coomer.st/thumbnail/data/17/f7/17f75e638af0cf1fa40b28ada3df22942ee856ca5482dd6671d6e8816728e77b.jpg",
  "https://img.coomer.st/thumbnail/data/18/15/1815159a46839462be3714f5d7ee22c016b1d1f171ed087c300cbe22b424ef90.jpg",
  "https://img.coomer.st/thumbnail/data/1b/ad/1bad611088ff451f45f60247328b70f269e2541958bb7c9126766a4ced5c47f5.jpg",
  "https://img.coomer.st/thumbnail/data/1b/f0/1bf0e5cfeda7a5a68d8000984fd090a5c781e61f0ad7be9d5257a511fead9126.jpg",
  "https://img.coomer.st/thumbnail/data/1c/90/1c90a81bfa74ae8a742c7d0a5b7339d6bac9de8808a7c7ff517e3a76b042dc87.jpg",
  "https://img.coomer.st/thumbnail/data/1e/d6/1ed60f46e2b05a89151ec112ec55bcd03242b835429ef9f19eda7ce0fde9e124.jpg",
  "https://img.coomer.st/thumbnail/data/1f/de/1fde120091410dac9d4e2eed6134233628bdff7bb55905c08648a3d54e743f8c.jpg",
  "https://img.coomer.st/thumbnail/data/20/85/2085983a98ca3732e4a93df1dc4da0ccb33dfeb3a3fab8c24948762d8eb08f04.jpg",
  "https://img.coomer.st/thumbnail/data/21/77/2177c1bb0866e39f49077254cb279208c54d2159875499aee9ab8ad17a342a9c.jpg",
  "https://img.coomer.st/thumbnail/data/22/5f/225f05933ed2386a300ae76818a9866a7ae1d2f7748391e86b9b2fb3a54fccaf.jpg",
  "https://img.coomer.st/thumbnail/data/23/24/2324e76b58782f3c3a23f1c32f0f3afa27d427c8d67f548ebd2e4af8d357f7f9.jpg",
  "https://img.coomer.st/thumbnail/data/24/66/24665c38e5a87f9e562154bb8a95fdfdd7664690a3ba7e45ff6856fddaa46f2a.jpg",
  "https://img.coomer.st/thumbnail/data/26/70/267014b62d6f6338f3191b1466533b9fe2b6570187c66192335d8b819d27d1b8.jpg",
  "https://img.coomer.st/thumbnail/data/27/3b/273bd21d94a887629874e291befb1e5feba22d8448dd72481445706fa1f173ca.jpg",
  "https://img.coomer.st/thumbnail/data/27/42/2742a94ca545934a40d0b33b7aee9f292426346d566b14af15ec7e68200b1fc9.jpg",
  "https://img.coomer.st/thumbnail/data/2a/64/2a6448b3cb48f4b84d5a5247c98a7e76c161ed80f7984c07029dc1976f5efd33.jpg",
  "https://img.coomer.st/thumbnail/data/2c/2a/2c2a4c08e4bca3890fc4a22162bcd2b32c9a60f64d397ad4dc940f6d0760c861.jpg",
  "https://img.coomer.st/thumbnail/data/2e/d0/2ed0e5935f7441e46de84e2f7536eec920f42ab503a9cfc41e6baef10aecb84e.jpg",
  "https://img.coomer.st/thumbnail/data/2f/0f/2f0f386777d1f3fdf03c19edfaf1b69c4bc89c011c8dbf298fb7bc2627fc19f1.jpg",
  "https://img.coomer.st/thumbnail/data/30/ea/30ea9c28f5a57a9a03bba50b1d642fbc542b8c8819cccc16696d331edddcb74a.jpg",
  "https://img.coomer.st/thumbnail/data/33/d2/33d225390435eeac04971995aeb9a8072ccce21dcfa2ad7c6cb471832e43dbc8.jpg",
  "https://img.coomer.st/thumbnail/data/35/db/35db9dcc0a43e5d24a912876e7240b776aad259d8351bc1b9610002bb4bfd2cf.jpg",
  "https://img.coomer.st/thumbnail/data/36/fe/36fea287a3478ca055746ed095622a09dc15073c18048bb384f99206769d11ed.jpg",
  "https://img.coomer.st/thumbnail/data/38/0f/380f049ff0b9b580d70fc1cfd11c8008232feb6187dac80e5692469b2982551d.jpg",
  "https://img.coomer.st/thumbnail/data/3a/c2/3ac2d700a71b7a7349b93dde45907953e9354edcd20adadc147e21c76a0cc769.jpg",
  "https://img.coomer.st/thumbnail/data/3a/da/3adaef6e145b71a6bcbc686b87aba48ddc09f3ee07cc0da3a8264efe37a6f5a5.jpg",
  "https://img.coomer.st/thumbnail/data/3a/e6/3ae6f32c6ff3de9e37e781fee1c2d9db167c710a159fb057fed84d9699711693.jpg",
  "https://img.coomer.st/thumbnail/data/3b/14/3b1437b11e0b67594f3512eadff30350633823bb23e9c8fc7c5cfb2570f3cb79.jpg",
  "https://img.coomer.st/thumbnail/data/3c/57/3c57ad0b7239cb3b6f4a4b9dc3206ff603076198441322dc7a80bda9326a28d6.jpg",
  "https://img.coomer.st/thumbnail/data/3e/12/3e126662381fccaf86b4a23545150d4daf33ba3512aadcb173136c8d8fdd75cb.jpg",
  "https://img.coomer.st/thumbnail/data/40/8d/408d8f27d1cf4a3775efc3a4b910ff3452aef7cab5cb06c9c7911c26332c2137.jpg",
  "https://img.coomer.st/thumbnail/data/41/89/41896b163d2a6f7fa030fb28f5925585d088dd9bb9851b944b6d422822a21e57.jpg",
  "https://img.coomer.st/thumbnail/data/41/a8/41a893e65179909b60c7f7639aeda93828c5800e978c3a7132222336fb14d952.jpg",
  "https://img.coomer.st/thumbnail/data/43/7c/437c4b613850f9b23d41a61ad538b7889fbfe7be5badc15b49f716880fef6a3e.jpg",
  "https://img.coomer.st/thumbnail/data/43/9b/439badb79ac262275a067bcc537e9d0534ced4c9343c00ae6fdea8e571f59db6.jpg",
  "https://img.coomer.st/thumbnail/data/44/4a/444aae4b666111ae799bf0578f62cb7ed6e16c4d7a4388780b19a218883a5634.jpg",
  "https://img.coomer.st/thumbnail/data/44/c8/44c8111694aba5e5821d11e6b268460de9f284994b0bd759b68747377610c74d.jpg",
  "https://img.coomer.st/thumbnail/data/45/b5/45b55d1db46bf374a78ebf6b30162aa98efab1c1765409770f7c4da726c23128.jpg",
  "https://img.coomer.st/thumbnail/data/46/4c/464cfa5abe108757448d95f8e2cba66a4f1182daa47ba695dfa917c6e70f59c5.jpg",
  "https://img.coomer.st/thumbnail/data/46/ad/46ad7d4cf682f3256a0ade79c10830b9aed8625d2fba5b77e0d39401c5a0a364.jpg",
  "https://img.coomer.st/thumbnail/data/47/70/4770efa89226c6249a218f444d92d2dbda76059a44c40a34c71541f43fb82d8d.jpg",
  "https://img.coomer.st/thumbnail/data/47/87/47879fed025d83d9945288ad5f4d46f74ed08f58380e5b8927e882802378d558.jpg",
  "https://img.coomer.st/thumbnail/data/48/da/48da003551fda550f30aa941f3191838fad846b895581780975c9004317d08b0.jpg",
  "https://img.coomer.st/thumbnail/data/4a/08/4a08b9dd938edc1686726a8a962815708b098dc189e84289b2a89c86a52f4858.jpg",
  "https://img.coomer.st/thumbnail/data/4a/76/4a76bbe8b328d2c4c1d3f112b60d5a19adadb9e7387f516b2e7e78a001551dfe.jpg",
  "https://img.coomer.st/thumbnail/data/4b/50/4b501045ad37762f0a5bab226aece945b140de92f59234c81b90f982a914edee.jpg",
  "https://img.coomer.st/thumbnail/data/4c/2f/4c2f15b764b1293259142c4ccc4d4cc66748b00b93586f83add4d24e7ce71346.jpg",
  "https://img.coomer.st/thumbnail/data/52/1b/521b637675a3d22cb96269732212fdd02757a39fbeae99725c59f64f8ddca23f.jpg",
  "https://img.coomer.st/thumbnail/data/52/ad/52ad9eb26f0953538098325e91c543d171eabc8ce2ff4e5bcd9fb254fa24c32a.jpg",
  "https://img.coomer.st/thumbnail/data/52/bf/52bf7232264f610cc5643452696e947ec2d66c45ff3dd2064560d1c62e0be3f1.jpg",
  "https://img.coomer.st/thumbnail/data/55/43/554379c461bd191f1333d64910cf1ceaeb3f3d6a69690b4a359d4ab8f49ba8bf.jpg",
  "https://img.coomer.st/thumbnail/data/56/6f/566f269aa985afccbff8478664c5dacd56776f77dde956560d156b84dc9e4baf.jpg",
  "https://img.coomer.st/thumbnail/data/57/29/5729375d3d899806838689ad8a6d147c031ec5eae2155dca6402c7b7439d71f6.jpg",
  "https://img.coomer.st/thumbnail/data/57/7c/577ce5626028ac3fceb16aca6d7789ff80d4be2063f68aa884b009341ca82418.jpg",
  "https://img.coomer.st/thumbnail/data/58/1c/581c3b9a39e634e777440ce142e5701f6994be9001e11cb0014eb6251e1a92b0.jpg",
  "https://img.coomer.st/thumbnail/data/5a/3b/5a3b6c11dd323f1339290f3a142d8ede39f0c23ab30da5817ab15e228caa77c6.jpg",
  "https://img.coomer.st/thumbnail/data/5b/2a/5b2a19e7317525d3e8fb4394b9b41bbb4b820ed063d823055cd4ecfcb4b4ede6.jpg",
  "https://img.coomer.st/thumbnail/data/5d/74/5d74b73a38b5d5b33f932739ba664fad4fb0f525dc05f271a7445641ee059995.jpg",
  "https://img.coomer.st/thumbnail/data/5e/63/5e63b9df98c288d62646d7c41de18af30024c943e7ede048cb41efd00663f062.jpg",
  "https://img.coomer.st/thumbnail/data/60/14/60141e1a7f7f14fa50001224f667e2861b162c0f33cba73ed0a5a5a02454d231.jpg",
  "https://img.coomer.st/thumbnail/data/63/6e/636ee5271b149b4500dc8ed487a88a62ec67d50f277f33987d0d94eb2200cd8e.jpg",
  "https://img.coomer.st/thumbnail/data/64/6b/646bcf1d97e69553121749dac8075e53435dced7e3d5005b4c6451a100a9f5b1.jpg",
  "https://img.coomer.st/thumbnail/data/67/5f/675f5d4057b595185fd03958014733645fd0d71fb69b35bc3ab4748801e7484e.jpg",
  "https://img.coomer.st/thumbnail/data/68/5b/685b3cdef7c1d4eb9e4c774544efe449660daf3a91b159caf10aeabbf4b2b878.jpg",
  "https://img.coomer.st/thumbnail/data/6a/6a/6a6a53db4f0bc9a8761343e9828073f7e202b4fe0362c19ba4f0f9d7d7e33c3a.jpg",
  "https://img.coomer.st/thumbnail/data/6b/01/6b01658d93310065a1dbcaed40f829a38bf1d8756bc255c40c85dec616f6f39b.jpg",
  "https://img.coomer.st/thumbnail/data/6c/ac/6cacc849843950e3bef59f7a468ff88fb678708aecaddd3687fa0a8ad1eecd04.jpg",
  "https://img.coomer.st/thumbnail/data/6d/0d/6d0de3c29d788980e83cc4c1ce4830c5476dc29e5bb5b2750d8d0ca27f3a2c47.jpg",
  "https://img.coomer.st/thumbnail/data/6e/cd/6ecdad55653a2519fc124544fe0fb5b26f71731f026e788e19f361de374222aa.jpg",
  "https://img.coomer.st/thumbnail/data/6f/51/6f519d4cbf222e4847b559f3fb8d58d138b4d086ea1369925b10b38245241a30.jpg",
  "https://img.coomer.st/thumbnail/data/71/47/714754ac781b6fed722da6d74170d05c2c5f69c7892c7f96dbccd9222cc5b12a.jpg",
  "https://img.coomer.st/thumbnail/data/72/00/7200ae9d76d9f6af497097d8a2b014f2a8e30372626e9e14be969d24983bcce7.jpg",
  "https://img.coomer.st/thumbnail/data/72/fe/72feb65adb894b9011e530a39fd50e6dedacd3a161135c5fb52fca832003cbae.jpg",
  "https://img.coomer.st/thumbnail/data/74/84/7484f252aad2242c812693af59e21b0735c3f8635bd49521fe2eb2d3effbdab1.jpg",
  "https://img.coomer.st/thumbnail/data/75/68/756828e45c8de798c7be3d538945a7cc455b87b456e5fcbeed4ce88dbf96fba7.jpg",
  "https://img.coomer.st/thumbnail/data/76/a9/76a9608b3d8ff68cdedb6479fc8f8c634255ab7b185625afe6a975fdf68ae50c.jpg",
  "https://img.coomer.st/thumbnail/data/77/cd/77cd7737d5ec326b5bec5ce9d936bb2f9cbc7237187d6e9f7724deb59ff700bb.jpg",
  "https://img.coomer.st/thumbnail/data/78/3a/783a908caccbfd8f8d8525b3b6f0dd8e9ba70f7a08f9245b9f26ed6f8d554eec.jpg",
  "https://img.coomer.st/thumbnail/data/79/7e/797e46d8ededb443f99c35fa4f5880f27382614d31ba849eb526b09b422c8ac5.jpg",
  "https://img.coomer.st/thumbnail/data/79/9c/799c3ae0ef3957595106ad484a0599ba7aee09ca067b050085f30518283f2ff2.jpg",
  "https://img.coomer.st/thumbnail/data/7a/3a/7a3af0dc0a37854da71eb4c9e871c021833b8117d9df6c986b3f29515575c876.jpg",
  "https://img.coomer.st/thumbnail/data/7b/2a/7b2a83b37224fcab9888417b7feaa7c1d45dd2b6f8fead7431feae32ff6020fd.jpg",
  "https://img.coomer.st/thumbnail/data/7b/e3/7be31e42f86efb3acf97944719ddaea799766d73c4afebf8b0f4a92de1679c10.jpg",
  "https://img.coomer.st/thumbnail/data/7c/2b/7c2b7739b5a217a208543ad92f8c5bae888536f6d63f56dcbf58f00cbd603faf.jpg",
  "https://img.coomer.st/thumbnail/data/7c/52/7c5236c45c64cc806b30d8f989fb80ffce190d24e651b90c1366b7b790f47db3.jpg",
  "https://img.coomer.st/thumbnail/data/82/6b/826bcc0b86b8fac7d453a4daec5d01f71b1e90cdac63448818bea156f944b6b4.jpg",
  "https://img.coomer.st/thumbnail/data/83/3d/833dbeba3446a200e6abb0c3c8ce41b96c7ed751a2c481efbe94e00dc397a130.jpg",
  "https://img.coomer.st/thumbnail/data/84/d5/84d5565252fcc342822531adb8d887b1c2934d3c41f884ee5b9bd8561baf00f2.jpg",
  "https://img.coomer.st/thumbnail/data/85/c7/85c7eb905f7aef418bf37ada81d08a9e90b637325e59b4a20dd86b366b0d83ac.jpg",
  "https://img.coomer.st/thumbnail/data/8a/cb/8acb552e12fd1a8e95ab2f3ac56b76d707be2b94ff9624d882e4c9f8815286ab.jpg",
  "https://img.coomer.st/thumbnail/data/8e/dc/8edc3dd0ff800995373b52a9a71383a6d8a85d55d3102b264e7d07a30487dd18.jpg",
  "https://img.coomer.st/thumbnail/data/90/54/9054c843ee5749fed07200547608e7a112b1addd267628571d9a8edcb9cf0d78.jpg",
  "https://img.coomer.st/thumbnail/data/90/ab/90abdbda47d8d9bc486abdf95b15d8945d313e07690264366f77f6cf8eae9cb0.jpg",
  "https://img.coomer.st/thumbnail/data/93/4a/934ae241e99ec5a96eabdf52bff140dbe0083ec727c16b89828073e313f3a1e7.jpg",
  "https://img.coomer.st/thumbnail/data/93/b8/93b818cf094bed1b6787be780fd2613a0f84498de3e211f63b087d3ae7db7fa4.jpg",
  "https://img.coomer.st/thumbnail/data/94/60/9460aa61b7ada4fbda103f500e3ca8a127a44fe8fce81c1c7bd5d3e09e71341e.jpg",
  "https://img.coomer.st/thumbnail/data/96/44/9644c11961ec106425c9add46633ada9a7b0cf3ddf6e81691809860c7dfcdfe1.jpg",
  "https://img.coomer.st/thumbnail/data/96/db/96dbc9caf1a2820bbe26facf47ab7ec22037f022e978688149076e59eac3dbfc.jpg",
  "https://img.coomer.st/thumbnail/data/97/08/9708a6b6a22e4c0111558d675a92dae6e42fe07e730b06164754b84b9d642a6a.jpg",
  "https://img.coomer.st/thumbnail/data/98/b3/98b318508517c50fc6b540286b459d09bce8c6fb72a9f477b464dacfd4cc74ca.jpg",
  "https://img.coomer.st/thumbnail/data/9a/06/9a063a2b30dd1ea7513abb4d00f806c348c8d218c02cbba707bcfeaba29c3f4f.jpg",
  "https://img.coomer.st/thumbnail/data/9a/d9/9ad901d948171363950def9b76b6f4af4920b9c2bf75edfff2d88aa20f2e67b8.jpg",
  "https://img.coomer.st/thumbnail/data/9b/25/9b25c3a63be8b9f301608883c76dcc3ea0a4d7c8a118ece8de585595ddf31d59.jpg",
  "https://img.coomer.st/thumbnail/data/9d/9b/9d9b3f92127eaf2536c40850fba24faf93f70efde4c8f814e1c802743df55c3a.jpg",
  "https://img.coomer.st/thumbnail/data/9d/ed/9ded2e0e9e3ce49f7ca5fbd662a9584bfc9f55a775b3e9d77418450824bb7cec.jpg",
  "https://img.coomer.st/thumbnail/data/a0/4d/a04d88b663fda667257c6d8f671dfe718d1c1f795891002cc43c62c73d69fd3a.jpg",
  "https://img.coomer.st/thumbnail/data/a0/a6/a0a65002ca0ccdc2a23c8a017834948efc434df15757c55f0f679deb089fb575.jpg",
  "https://img.coomer.st/thumbnail/data/a0/db/a0db592d01a55ebf8d75e79f6fc6c58a6da710dcd42c4025a6f02ce92eac0908.jpg",
  "https://img.coomer.st/thumbnail/data/a1/f9/a1f9ef127cd13770c35a5d7694a6213152ae153ebde75e1263b8943ce3df5c3a.jpg",
  "https://img.coomer.st/thumbnail/data/a2/31/a231f48a1e92af5b8dc0c5b526998976ccc789b467aa0d5916bea23701e44f48.jpg",
  "https://img.coomer.st/thumbnail/data/a3/65/a365bff4d36567346b92a576c722157068be3b51d5bbc35b0b4d5b8bcd3bf219.jpg",
  "https://img.coomer.st/thumbnail/data/a7/11/a711fb895a297f1dcbb973e9e3a1e19e7409aba62af96027cd022188e26ed0e0.jpg",
  "https://img.coomer.st/thumbnail/data/a8/13/a8130c6ade49d5b38b8839c753efffbc64f594da25b6d882edb9a46c6c8956f7.jpg",
  "https://img.coomer.st/thumbnail/data/a8/6f/a86f0ebb5d2639939b638d47d27c0682b8ebab9e5735550264bbb43d75b35cd7.jpg",
  "https://img.coomer.st/thumbnail/data/a9/72/a97228a296c4ac72a0484b35e6f7b63de3cca2ac1f088d8125c1860f10b1f9d0.jpg",
  "https://img.coomer.st/thumbnail/data/aa/0d/aa0d3d71c1133988887cd25884b2dbd4309a9ac7b62d5930d42bb673927a54c.jpg",
  "https://img.coomer.st/thumbnail/data/ad/2f/ad2fe6d7426383cbf91d8d1a5f75765b5122f66f16c78c7c765bd478dec30ca3.jpg",
  "https://img.coomer.st/thumbnail/data/ad/61/ad614f1f47d98557da2628cf1443fa04c213eae24fc1a50008936b10bee0750e.jpg",
  "https://img.coomer.st/thumbnail/data/b0/8c/b08cc1f73de24e61518e2a5b6ec5b19e2859aabf97141b03e793d92277a727ff.jpg",
  "https://img.coomer.st/thumbnail/data/b2/91/b2911227336ee2458c50b9d14e138565b547cddde35e65632ebc2126a0b1e809.jpg",
  "https://img.coomer.st/thumbnail/data/b4/42/b44296cba5abee2ccaba323c63ec4657e3c905beeaca32b8a799d60a7e07ef2a.jpg",
  "https://img.coomer.st/thumbnail/data/b5/51/b5514e927208bd85aca8257ad6554570161d9fc499dfb3466cc40fe2a483dd43.jpg",
  "https://img.coomer.st/thumbnail/data/b6/10/b610d09d39e2dc452d015e930b28bc884009278c7ca471b0ed54e30ea03a1762.jpg",
  "https://img.coomer.st/thumbnail/data/b8/80/b880f4b4da50411670eecec97896108157e2bc1748416bc72f05f4a794d367fb.jpg",
  "https://img.coomer.st/thumbnail/data/b9/af/b9afc0e563973362a29db3f7b099d21a05f7f2741b21baff67dba5fd38cb7e76.jpg",
  "https://img.coomer.st/thumbnail/data/b9/e1/b9e1aa35cace15fa32d669884a129621b55aa124f0409f9b1d3031c15501e26d.jpg",
  "https://img.coomer.st/thumbnail/data/bb/12/bb12e183af1a267cccf229ad5cbab04004373a7dc6d44438f0dd5f18994f449f.jpg",
  "https://img.coomer.st/thumbnail/data/bc/99/bc99b6eff1b8f7143bfced547d40a2e37535936309b7693c7deac34bfc4df306.jpg",
  "https://img.coomer.st/thumbnail/data/bd/73/bd731df229b7ef174d5f5eac305a329c551ae99bcaac70a2c25c1b220d4c2c99.jpg",
  "https://img.coomer.st/thumbnail/data/be/dc/bedc89e53fabf932e2f8985d7115ad467471f27eba55cba706cb85fdbb933bfc.jpg",
  "https://img.coomer.st/thumbnail/data/bf/fa/bffafcf2a1498de54326bea1bd64a932c5e5c05643858505cfc47e8824f5c329.jpg",
  "https://img.coomer.st/thumbnail/data/c0/5a/c05a5d4b876589c86ae48e49ce5d5c5141db405b5d81c00375b1880597bb24ec.jpg",
  "https://img.coomer.st/thumbnail/data/c1/9e/c19e9f56f7e7184c4e7cfe863a564092c1fda2d67aa3839435ba20c00dfd5650.jpg",
  "https://img.coomer.st/thumbnail/data/c2/70/c2704d69212606b20f128c4158631bb5e26e2026c20192e8cc57d46bf3a2da35.jpg",
  "https://img.coomer.st/thumbnail/data/c4/b6/c4b698c6fe8cf3b3dcbc260c54d73c2a20772863a4a143c5c1b0af4a0f58f88e.jpg",
  "https://img.coomer.st/thumbnail/data/c5/c7/c5c73eb83b4151563fdefc4dc969d412042ad6c305e13323c4cb7b259943fd8e.jpg",
  "https://img.coomer.st/thumbnail/data/c7/b6/c7b6b726637ce628cc838087dd348e362872e9b9c34f43c2ea44eb4321b68fc4.jpg",
  "https://img.coomer.st/thumbnail/data/c8/83/c883b11fccf1b085d31127dc51b9ea552712cc7f08b1aca69553c13d8af33e5a.jpg",
  "https://img.coomer.st/thumbnail/data/c8/d9/c8d92a58981f2ba19021b2df660f845f5f8ae97aec852291e301d781c88f2f0c.jpg",
  "https://img.coomer.st/thumbnail/data/c9/7c/c97cb270efe3333ed2b5c06d4e96cc77870a0bcbcf88d9cc2c17aded2f6181b9.jpg",
  "https://img.coomer.st/thumbnail/data/cb/28/cb28dc7d3a6ce115c2abdd13a6c93ba494014b612ddcbd50d0ed3630bc82bf02.jpg",
  "https://img.coomer.st/thumbnail/data/ce/5a/ce5a9acdcb72364acbd51e0f5b3adc71572255f2f642298700e6e725e9e.jpg",
  "https://img.coomer.st/thumbnail/data/d1/2e/d12ebf0931981d1edba00e73dca8c41039865ea8371cb78c30cc11844bbc1ce6.jpg",
  "https://img.coomer.st/thumbnail/data/d2/3c/d23c95874ac7cea6a36c6ddfadd62fd5c23feba799e16a1ee297dd6abdc51057.jpg",
  "https://img.coomer.st/thumbnail/data/d2/66/d26641dd6831aba7c5388e58e02c5f642d47a4aa536840eb90f64a109ff7bd3d.jpg",
  "https://img.coomer.st/thumbnail/data/d4/5e/d45e61c54dd9a98efd907beb9eb0e9b100aaec192a29b9ba79ac57a4829824d4.jpg",
  "https://img.coomer.st/thumbnail/data/d5/b1/d5b1990dac31903a53491a43c153ebf6ff5ca8c5c5a5abc52c1ec0e259fed4ac.jpg",
  "https://img.coomer.st/thumbnail/data/d8/d8/d8d8824bd172d54632df2d4d691ba31a918bed238dba8cddf427f2f474a.jpg",
  "https://img.coomer.st/thumbnail/data/d9/3c/d93c905f89a42bc2b8e1522ea23ed726a3cb758f11d45479abd1ed4ece65113d.jpg",
  "https://img.coomer.st/thumbnail/data/db/eb/dbeb435ffa51fe4594ec569aab66b587fa45ddf4cfe8ae3b7baff06c258a5656.jpg",
  "https://img.coomer.st/thumbnail/data/dc/90/dc90a90c8af06c32bbe0c4abd11e6d4359125eea8a79d5b2f1e94b76b9726416.jpg",
  "https://img.coomer.st/thumbnail/data/dc/d7/dcd7742733fed322cc482ea743c12d540cbd30f5ce1d7d7a013dc7d3380c4291.jpg",
  "https://img.coomer.st/thumbnail/data/de/45/de456a87b59b62e85db055975073d7dc56a5880bb610c71760dafce7ab8eab6f.jpg",
  "https://img.coomer.st/thumbnail/data/de/51/de51219d3435c8204fd15d840757a7d27d2fe7f6ec40e35248151d2071a368ba.jpg",
  "https://img.coomer.st/thumbnail/data/e2/b9/e2b9921957a0cbc6ebd6403a2e227a26839e09f515aefb63f79ff9ea5cd3d7cb.jpg",
  "https://img.coomer.st/thumbnail/data/e3/5f/e35fb91a6472eac5f633a50ffc39348c8efd807b2bdde6ba627f45edfb8366ed.jpg",
  "https://img.coomer.st/thumbnail/data/e5/22/e522901b02779ecfd1326038c13b775df2e390a36f419902826ffb22915c668f.jpg",
  "https://img.coomer.st/thumbnail/data/e6/bb/e6bb141278a59be22eecf13923d4dfb72ebb78a6b764c3bb35922245ab3a9d94.jpg",
  "https://img.coomer.st/thumbnail/data/ed/d3/edd35ccc48cac1432d803d11e234e495d92c5a9e24a25f56e559fc1ddef29b17.jpg",
  "https://img.coomer.st/thumbnail/data/ef/24/ef24c3455d2abb00b8701b45de3de41a48dac658010dfa6ba28f6adc8afd8510.jpg",
  "https://img.coomer.st/thumbnail/data/ef/ed/efed2dee3f23ea26f3463affbc443abaee723fa3521481782faab53dbd26cece.jpg",
  "https://img.coomer.st/thumbnail/data/ef/f2/eff26b3407e55b98e1687601ea1e6ba057c50b98e9bd3ed9905f82b08ef6676e.jpg",
  "https://img.coomer.st/thumbnail/data/f1/07/f107e015a8dcd4189e59e7518f2b92dbd3622b413c8ac5bb70db6cdb14c3210d.jpg",
  "https://img.coomer.st/thumbnail/data/f2/d3/f2d3331f5ef03f92cf8440c16f7227f3993041b0689fa90ef4372fba8bdd17fa.jpg",
  "https://img.coomer.st/thumbnail/data/f6/b9/f6b93cbd936c51f4d3ab9bc4342c0142ec5e3c8f7d71a1319762e4f8901db97c.jpg",
  "https://img.coomer.st/thumbnail/data/f8/05/f8051473846770961cfe367a77d174aa75e242209149cb98566b5768d8903176.jpg",
  "https://img.coomer.st/thumbnail/data/f9/03/f9030e51ae37eb3fdf9d8d134aef0d7389630c29c0a1df49b501e74e433ada2e.jpg",
  "https://img.coomer.st/thumbnail/data/fa/a2/faa2de8a2faf0de21f29ee8a984e87423e470f0d3aebbf5dda86715512e9d7b3.jpg",
  "https://img.coomer.st/thumbnail/data/fb/2d/fb2d6ff6bcddf752847962c16b0356fa688d850525528fa84a8c115e6ff8002b.jpg",
  "https://img.coomer.st/thumbnail/data/fc/57/fc57fa7798405eb4106fb50b5bbea46b19aba1ecb4e2f04f7d76115fe521f7de.jpg",
  "https://img.coomer.st/thumbnail/data/fd/0d/fd0dc694b0a06566034081bd75c42e7281b11d1f533be711aec76f26cf91b48e.jpg",
  "https://img.coomer.st/thumbnail/data/fe/8c/fe8c97c8d1f7a786daa9d6b30e6cb20b4965812b53ee790d06fc4d2438f3a4b9.jpg"
];

const CHOCOLATE_IMAGES: Image[] = CHOCOLATE_URLS.map((url, index) => ({
  id: `chocolate-${String(index + 1).padStart(3, '0')}`,
  url,
  thumbnailUrl: url,
  caption: `🦋 Sweet Exclusive Content ${index + 1}`,
  width: 800,
  height: 1000,
  isLocked: index % 3 !== 0,
  isVisible: true,
  mediaType: 'image' as MediaType,
  sourceUrl: url,
  createdAt: new Date(Date.now() - index * 3600000).toISOString(),
  sha256: `sha256-chocolate-${index + 1}`
}));

const KITTI_URLS = [
  "https://img.coomer.st/thumbnail/data/00/74/00741a33f66c90b655baf4baba3de034b5696a2b208a3210539abede70cee293.jpg",
  "https://img.coomer.st/thumbnail/data/03/ba/03bae280e2117b9141d32537290a8867912dfb3d6d6a6d5e9dcde34bad1899f0.jpg",
  "https://img.coomer.st/thumbnail/data/08/55/0855f5a099e89b1fc3eb5b066703b4e83a80db0893c5af03e278a4c57bf9f405.jpg",
  "https://img.coomer.st/thumbnail/data/09/0e/090e48f6ff03316bbf240b0d3819dfd4af802b6cc4aac470b3285a0ece4fdc99.jpg",
  "https://img.coomer.st/thumbnail/data/0c/09/0c09a4b17dac6c8f1345ff11f380c10f32ea06577e6a47c32fc1b1fddc0a4818.jpg",
  "https://img.coomer.st/thumbnail/data/0c/fe/0cfe724225f250cf3b1fc9becc21e62ab30b2a9f62baf75e5107c77ae4099e08.jpg",
  "https://img.coomer.st/thumbnail/data/0e/db/0edbf264d375a061b2221663f484f2ca26120b6676e145cc7c32bcf1849623e8.jpg",
  "https://img.coomer.st/thumbnail/data/0f/11/0f1182e435199f5593972d0e374706aee38b83e337fac995cf74a58985628664.jpg",
  "https://img.coomer.st/thumbnail/data/11/a0/11a0c339e97d21638c9f0d4eb9e14556a75ca5c45454db503bf0524db0e141c5.jpg",
  "https://img.coomer.st/thumbnail/data/11/a5/11a53bddd44382a9a300c3dcb473331eda8f665eb072b447cae459c604fa19bf.jpg",
  "https://img.coomer.st/thumbnail/data/12/ee/12eeae340edac3dc1f03745d0acff6d4fdc7e452dcb39635f34dfbecbd90ff11.jpg",
  "https://img.coomer.st/thumbnail/data/18/76/18761550d1ed9ad837eed2f676ed7fd5b555b10681d8de11d843f602c18563c0.jpg",
  "https://img.coomer.st/thumbnail/data/18/e1/18e1f8d9d7921b157811477a296031dc867179037998cc56b94e2e3355278463.jpg",
  "https://img.coomer.st/thumbnail/data/1d/b6/1db62dc3484835501352ea1e956f646b39ed6decb22f5d09b68210ff15aa4e21.jpg",
  "https://img.coomer.st/thumbnail/data/1d/ba/1dba191c5953f0d1579a76bf560489cadcbdc6333fd3d80be0c3a739f0677ff1.jpg",
  "https://img.coomer.st/thumbnail/data/1e/d6/1ed6f72c8fde67425ff9aef3503a627a9df7627f778eee262b09e630cc28d37f.jpg",
  "https://img.coomer.st/thumbnail/data/21/ab/21aba643f4884c169ee94bbbb8860aee5a4ff8089c7d4a724204a5abc1e89927.jpg",
  "https://img.coomer.st/thumbnail/data/2d/e1/2de189b29b2016419eb84aa76ad032d12b2307fef6db950e298150bcb78dfa97.jpg",
  "https://img.coomer.st/thumbnail/data/2e/c9/2ec9fc7b4e3525b090c2b87117c576a1369559359f95b454daf77aae17e82b25.jpg",
  "https://img.coomer.st/thumbnail/data/39/74/3974f2d4399cfe359a24a46d8e64a1a1dcc4a8509725fe8de252d609097cf41b.jpg",
  "https://img.coomer.st/thumbnail/data/39/fc/39fcf3480c67fe96050b716fa9fd3105131f579839e8a16e2ba56a66074991cf.jpg",
  "https://img.coomer.st/thumbnail/data/3c/26/3c26f2277061c58942bdd353609508a752bb637cef547233ab392d9fd09a7c05.jpg",
  "https://img.coomer.st/thumbnail/data/3d/03/3d0377e2c49b21adc875c3a198cb5df29ab7e54352e6e7d308f8b930beb6da0a.jpg",
  "https://img.coomer.st/thumbnail/data/3d/33/3d3322c3b59f2d261bb41bddeb58935298144836a4a368a0ea63cbabc8ba808b.jpg",
  "https://img.coomer.st/thumbnail/data/42/fc/42fc36d8b7053ea3a98f72290d47bb3ed58f58b34f6ea7d86333afa439bdb3d0.jpg",
  "https://img.coomer.st/thumbnail/data/44/3c/443ccd1f1ceaa2f55c5968f930a5f4636791c54a62e832c9fa28e079c67071ef.jpg",
  "https://img.coomer.st/thumbnail/data/44/6f/446f79616faad3bb567ce1786f536bae0904505ebaeeda98275ec3f20cdb36dd.jpg",
  "https://img.coomer.st/thumbnail/data/45/45/45458c83588546bee4a01f9387905053dedf28bea63d23f4ab03c75de2c332fd.jpg",
  "https://img.coomer.st/thumbnail/data/48/ec/48eca22058469683804ee9cef5e29b417e4355faef9f85a6937b15c685df2d57.jpg",
  "https://img.coomer.st/thumbnail/data/49/a4/49a4e75561b52c6bc05f13ba6f0c6ffa3a11c478b0c3f9b6a9519a0a16ed30df.jpg",
  "https://img.coomer.st/thumbnail/data/4c/3f/4c3fca845f558ac58879f5183fd6479123232c64729089a5143e05e7ece4b27d.jpg",
  "https://img.coomer.st/thumbnail/data/4c/83/4c83f8be264d50058e7c0556517407d9de1b469cecf5cf67c90b537c2f7a45eb.jpg",
  "https://img.coomer.st/thumbnail/data/4d/be/4dbe33e954b020c3b1b23b4d378ccdeab7f15f05b20e2bbbe1fd8488dc9327b3.jpg",
  "https://img.coomer.st/thumbnail/data/53/05/530584244204f970fa3b7c0515961f6994203a401367fd028222cdc5c47b9764.jpg",
  "https://img.coomer.st/thumbnail/data/56/af/56afa469b6cfaeb504537f1eee3f44e1fa4655c70ec29bb59c609095be24a7f0.jpg",
  "https://img.coomer.st/thumbnail/data/58/10/5810412db4ed848ddc189d6973ae64deed6060d85b7abe2312c489537f5fdaeb.jpg",
  "https://img.coomer.st/thumbnail/data/58/39/583913029469025192d1d62426d94198828ca354b99201f722a53554c4e7bb67.jpg",
  "https://img.coomer.st/thumbnail/data/58/5e/585e05e4f21bb5f7ecd5c9ac14512dff5ad654327f8d952482560cf75a05ea31.jpg",
  "https://img.coomer.st/thumbnail/data/59/fb/59fbb0b9232308556fda6b94f595957a8a3c84cd516d30bfd24e6f7e76c93efc.jpg",
  "https://img.coomer.st/thumbnail/data/61/35/61357aa34db6895c8ed690773409f0c27332c0b521d019f85ce26a7bdd3ff096.jpg",
  "https://img.coomer.st/thumbnail/data/61/51/6151050cf7bbeb4af0128c162e107874b032dd6724af05ef131fe375e68a3586.jpg",
  "https://img.coomer.st/thumbnail/data/62/53/62533f5e5c1772c42a6e0df29a22a0d2e01a60228cccce3e1f7afb76200bf429.jpg",
  "https://img.coomer.st/thumbnail/data/63/fb/63fbee61dce76b111df6d11ff4181f2315de8bdf2607b813c34980cee5ca43c6.jpg",
  "https://img.coomer.st/thumbnail/data/65/05/65057c5121b84b174cf3907d808a2b3461a295ada01abaa847320a8a5a6bedb8.jpg",
  "https://img.coomer.st/thumbnail/data/65/f4/65f4385d87e0e9074f39031eb798c56cdf731f1b7d3aef5649aa8def7b365fc3.jpg",
  "https://img.coomer.st/thumbnail/data/6a/44/6a44b2a6d12fa4c4d3f0dfb87c739f3547749b0f37040f75229dd21cffb9fe6e.jpg",
  "https://img.coomer.st/thumbnail/data/73/36/7336d19f3fba2e7d5fb52c2787614bf7db5f04b9ea35f14adb38e10ac370de0a.jpg",
  "https://img.coomer.st/thumbnail/data/73/59/73597b2c36b7ba39a30f5bcf8e27b6e7fca547b5715216bf991d5741904faedb.jpg",
  "https://img.coomer.st/thumbnail/data/76/a0/76a050c886bc10cd73863d90333c34bb8f7d63221bf7a42b6c33ef60a4b73006.jpg",
  "https://img.coomer.st/thumbnail/data/77/fc/77fc8576fda5fa086d7c31ed835f5bdfd6facfdfab90b4111497fbab95994894.jpg",
  "https://img.coomer.st/thumbnail/data/7a/29/7a292029f0e329e8c351da0c0cab8b9e3818ba12d4e4ce6d2bc0c001e7cbe386.jpg",
  "https://img.coomer.st/thumbnail/data/7b/7a/7b7aac29fbcd24c4874eafeb32cb0de7820206222374ae55a61fba5dd9e148b7.jpg",
  "https://img.coomer.st/thumbnail/data/7c/7a/7c7a2302b60a6d159ec2263bf821ba1549eaa89cda2f16643d796cfbe9927dbe.jpg",
  "https://img.coomer.st/thumbnail/data/7e/cc/7ecc072d0f33035e4512c8e7b7f7b52e32d34dd8867f889c73a96c0a8baf60b4.jpg",
  "https://img.coomer.st/thumbnail/data/81/fd/81fd9e0b1d188e4b434d9d303defbcb148610698a38c763e271944404d803184.jpg",
  "https://img.coomer.st/thumbnail/data/86/38/863879ae33d516dfe7824474e728aaa7ac72f21cd5fb2a38ba70b77757fc0c20.jpg",
  "https://img.coomer.st/thumbnail/data/87/92/8792b64b121ff994b48b4134805d43339d6fc44819956f48bc2c88939e43c6cd.jpg",
  "https://img.coomer.st/thumbnail/data/88/7c/887ce651617f32a52a8dd3a2367081261313a0d4e1a877d6393073b22e7808fd.jpg",
  "https://img.coomer.st/thumbnail/data/8b/73/8b73e8ce5c5bbb0c01b66fcba9fef05ed7c956729990f7f25b62f4f15acb2606.jpg",
  "https://img.coomer.st/thumbnail/data/8e/00/8e00b3c46db15f1ebf9e2972efb767c428d1443e653f48aba3acad01727eb64f.jpg",
  "https://img.coomer.st/thumbnail/data/92/cf/92cfd457423ea9f2e5c55dbd6d33279ccca75f963ba0179bd7d0fb8b0d748b55.jpg",
  "https://img.coomer.st/thumbnail/data/95/0c/950ce4013afb12e575c86e545bb07596f0b13276d3bbde8667e8c44fe584f82c.jpg",
  "https://img.coomer.st/thumbnail/data/97/00/9700d2bbdf985438bd6f9e30db45ad1ae6e970acf9906fcc145c10601c56d2e9.jpg",
  "https://img.coomer.st/thumbnail/data/97/83/9783cdb3d9a420b072e658b01888af66beb4fe120afa9050ca629b6d3890e68b.jpg",
  "https://img.coomer.st/thumbnail/data/9a/fa/9afa48b71021326d0adfe3b180b5bb7fc77c17733833155402da4ac339f8691a.jpg",
  "https://img.coomer.st/thumbnail/data/a0/c3/a0c3e6ac64885b2c76c15349433bf321033128bbffe2bc3671ac11f78999d63a.jpg",
  "https://img.coomer.st/thumbnail/data/a2/f2/a2f228c6a3292a6ff37d49b0f65cd79b451151dbb8020b6b670beadbb2fcea2d.jpg",
  "https://img.coomer.st/thumbnail/data/a3/77/a377b76323257a4a82913c0912be5f9996f7fc0832bfbc11e028e46595e11e48.jpg",
  "https://img.coomer.st/thumbnail/data/a7/37/a737988bed444a05b3cfeea4ac12d350429f9f4b43a43742c50be0b92c3f1fe5.jpg",
  "https://img.coomer.st/thumbnail/data/a9/d7/a9d7ee35a6727f3534429e7725000631adf3fe9f3adccc582156ffafecd38a46.jpg",
  "https://img.coomer.st/thumbnail/data/aa/e5/aae5b6916e4b7083a27106e7b83041197b7ec921b7b1dc9baf72a281a7669470.jpg",
  "https://img.coomer.st/thumbnail/data/b0/55/b055400d4d1727a518ed1100b53f13dbb1dd6212a0738772ac97b8c6e88ab057.jpg",
  "https://img.coomer.st/thumbnail/data/b0/e4/b0e436c1bf431e601c2541509fb5cb8e4ee1aad61c18e57a45821737efcff90b.jpg",
  "https://img.coomer.st/thumbnail/data/b9/cf/b9cf772b01647bdb310cf03921d7404534b6199e607f5ac8e8a7f22837e0d312.jpg",
  "https://img.coomer.st/thumbnail/data/ba/38/ba38163c904ec0e8093ce0b0d19fb647d8fb29200ad4792ae9b546ae40341b3d.jpg",
  "https://img.coomer.st/thumbnail/data/bd/82/bd82ada11c8a1d74d81b869e97010ab57581577943daa15e2f81a1c26f0af74e.jpg",
  "https://img.coomer.st/thumbnail/data/bd/dd/bddd8a563fbd4a7eb1e7ada70d471ebb72b40f0b2f52d402e9e2748f3d1582d9.jpg",
  "https://img.coomer.st/thumbnail/data/bf/1d/bf1d9ad0fdbce42690a480ad173579b31f338d0adef6412e7286bef714363c63.jpg",
  "https://img.coomer.st/thumbnail/data/c0/15/c015b6ff55ee6ade794ba4b4b483056d3961fe814394801f2b969ffe6fa7d28d.jpg",
  "https://img.coomer.st/thumbnail/data/c1/9d/c19d1408ccb8f4ab398f872e80fe63d82ad9b1f7c0ff0d18c544085d3dea258a.jpg",
  "https://img.coomer.st/thumbnail/data/c3/79/c37913b658948c81ff8aaa5a6f0eaa9bb7d92e64b5cabfa486735e0d9892fe25.jpg",
  "https://img.coomer.st/thumbnail/data/c4/e6/c4e616b09bc524a5e30f4432de34eefeac361027bde7a75dd24d069b792ecafb.jpg",
  "https://img.coomer.st/thumbnail/data/c5/e1/c5e1b9d474a520150da399ec72683c8217e9f65c4ca9a8b7f972b75152b3cdc9.jpg",
  "https://img.coomer.st/thumbnail/data/ca/9f/ca9f0ec1560b4ba086b1ceb68f0a8b206dd3fbee12534192f7b5486b807118b9.jpg",
  "https://img.coomer.st/thumbnail/data/cc/28/cc28daa927f9bedf33a9dbfabb756a95e13bfb68a4a9adca0f4d367048511548.jpg",
  "https://img.coomer.st/thumbnail/data/d0/2b/d02bd6f0eb1780769b2a9ef2489d1f590282e22e8d46290e1d5d0149dfcfc6ae.jpg",
  "https://img.coomer.st/thumbnail/data/d2/80/d280b03ec1b2c47045b837edab33fb184a597d56f8cfe64067923c2bbe5b1e8d.jpg",
  "https://img.coomer.st/thumbnail/data/d3/66/d366417cf14ca0b7f673ab111c3090a79404cc1d83e5b52d2753ea83e369dba3.jpg",
  "https://img.coomer.st/thumbnail/data/d3/7d/d37d6261322c637e4c4ec55a9bec248705c8f8e9f234de4e4dc4c4fee8dd5074.jpg",
  "https://img.coomer.st/thumbnail/data/d7/d9/d7d9d4cf3943138768d85c52f67009efceb02a2eb8822aa413c9f6ecc69cca55.jpg",
  "https://img.coomer.st/thumbnail/data/d8/a3/d8a3c643bcfaaa07ea1d02c3b218fd26da698cac5f6e498af0c9c06d2aa1ba77.jpg",
  "https://img.coomer.st/thumbnail/data/d8/d0/d8d080af255feb463570f8086c011f94a5ca721ac1dbcfef1f426b8f8d53ce0a.jpg",
  "https://img.coomer.st/thumbnail/data/da/45/da45b0e5a608c17dec8e982df61913634cb0723da26668aa9ac5c124ac71d6f8.jpg",
  "https://img.coomer.st/thumbnail/data/de/69/de6941480fe1f741599683492b02d642c8d374add7cf5dced2a42b3450906420.jpg",
  "https://img.coomer.st/thumbnail/data/e2/dd/e2ddd3c228e9bd19ac222e0ea7012c4afbbee00d17ea2bd6de3015be52985f73.jpg",
  "https://img.coomer.st/thumbnail/data/e3/4a/e34aaa16869e5142da5c57449c9b3fad912bd5f938f70fbf6d3c50e13d333e9c.jpg",
  "https://img.coomer.st/thumbnail/data/e3/d2/e3d238dd601eb5b633f1a69437041851e13ecebebf716e92447b40e55f35539f.jpg",
  "https://img.coomer.st/thumbnail/data/e6/3a/e63acc3b2e5b7453ea0a0ace5975f45326909032771d9abd97b810fc2cb2ad93.jpg",
  "https://img.coomer.st/thumbnail/data/eb/16/eb16db326f6caa910a06c9056fd2c41a64d245b668ef1204e8b9bb6821dea5be.jpg",
  "https://img.coomer.st/thumbnail/data/ec/87/ec874fcec2899b84ffd1ebbea79b26d2265d68dd6935743529359a948d6ca014.jpg",
  "https://img.coomer.st/thumbnail/data/ee/04/ee041e0901ce503ea8ffb8647c09b1b98b8658e5a374faaa253f86a95230fb2e.jpg",
  "https://img.coomer.st/thumbnail/data/f0/33/f033feb838a91d4e035696f5980cfdfafe99cde8801065a041eaa336ceee282a.jpg",
  "https://img.coomer.st/thumbnail/data/f3/cf/f3cf22fd15f4c8e1db15fb6cb3e30b06227d1b7de91d19de831d3905519d4c00.jpg",
  "https://img.coomer.st/thumbnail/data/fa/d1/fad17fbe1d03098938c9e20fd97e586f7347c154240ea3e1fa02e51a56ddb0af.jpg",
  "https://img.coomer.st/thumbnail/data/fb/da/fbdac431a470119ea4bf257409cf0ee888e45e1d440d133a3a0f3f0610b53405.jpg",
  "https://img.coomer.st/thumbnail/data/fd/8a/fd8ac9e3bf4e241f031d378e052c134cb4370cc738db79d3db260a31bd380381.jpg",
  "https://img.coomer.st/thumbnail/data/fe/ee/feeed61f7211d4b64e0c7fec9da374b9b3c37ccf1129070e4074d4dd617b741f.jpg"
];

const KITTI_IMAGES: Image[] = KITTI_URLS.map((url, index) => ({
  id: `kitti-${String(index + 1).padStart(3, '0')}`,
  url,
  thumbnailUrl: url,
  caption: `🍫 Chocolate Kitti Exclusive ${index + 1}`,
  width: 800,
  height: 1000,
  isLocked: index % 3 !== 0,
  isVisible: true,
  mediaType: 'image' as MediaType,
  sourceUrl: url,
  createdAt: new Date(Date.now() - index * 3600000).toISOString(),
  sha256: `sha256-kitti-${index + 1}`
}));



// Create 3 profiles for variety
const PROFILES: Profile[] = [
  {
    id: 'profile-1',
    name: 'Zara Sky',
    handle: '@zara_sky',
    bio: 'Digital princess 👑 | Cosplay & Gaming 🎮 | Exclusive content below 👇',
    avatarUrl: MOCK_IMAGES[0].thumbnailUrl,
    heroUrl: MOCK_IMAGES[4].thumbnailUrl,
    tags: ['cosplay', 'gaming', 'egirl', 'anime'],
    category: 'Creator',
    images: MOCK_IMAGES,
    stats: { posts: MOCK_IMAGES.length, likes: 12500, views: 450000, followers: 8500 },
    isVerified: true,
    isVisible: true,
    pricePerMonth: 9.99
  },
  {
    id: 'profile-2',
    name: 'Luna Ray',
    handle: '@lunaray_x',
    bio: 'Your midnight muse 🌙✨',
    avatarUrl: MOCK_IMAGES[1].thumbnailUrl,
    heroUrl: MOCK_IMAGES[5].thumbnailUrl,
    tags: ['model', 'fashion', 'art'],
    category: 'Model',
    images: MOCK_IMAGES.slice(5, 15),
    stats: { posts: 10, likes: 5000, views: 120000, followers: 3000 },
    isVerified: false,
    isVisible: true,
    pricePerMonth: 0
  },
  {
    id: 'profile-3',
    name: 'Pixel Vixen',
    handle: '@pixel_vixen',
    bio: 'High score in cuteness 👾',
    avatarUrl: MOCK_IMAGES[2].thumbnailUrl,
    heroUrl: MOCK_IMAGES[6].thumbnailUrl,
    tags: ['gaming', 'retro', 'tech'],
    category: 'Gamer',
    images: MOCK_IMAGES.slice(10, 20),
    stats: { posts: 10, likes: 8000, views: 200000, followers: 5000 },
    isVerified: true,
    isVisible: true,
    pricePerMonth: 4.99
  },
  {
    id: 'ruri',
    name: "ルリ💎",
    handle: '@ruri_diamond',
    bio: "Diamond Beauty Creator | Premium Japanese Content | Sparkling like a diamond, bringing you exclusive premium content with Japanese elegance and beauty.",
    avatarUrl: '/media/ruri/profile.jpg',
    heroUrl: '/media/ruri/cover.jpg',
    tags: ["premium", "japanese", "elegant", "exclusive", "beauty"],
    category: "Premium",
    images: RURI_IMAGES,
    stats: {
      posts: RURI_IMAGES.length,
      likes: 12800,
      views: 67300,
      followers: 2890
    },
    isVerified: true,
    isVisible: true,
    pricePerMonth: 29.99
  },
  {
    id: 'bishoujomom',
    name: 'Bishoujomom',
    handle: '@bishoujomom',
    bio: 'Your favorite bishoujo content creator bringing you exclusive and captivating experiences. Premium content that showcases beauty and creativity.',
    avatarUrl: 'https://img.coomer.st/thumbnail/data/91/69/9169a14372707c55acc7aa5b679e32e8e4a4a2d58f49b4d9578ca5e59d7bf856.jpg',
    heroUrl: 'https://img.coomer.st/thumbnail/data/24/57/245721ed5ce165f7863a6277f1d8c7f0752df4d92be36234855bd1896a412fa4.jpg',
    tags: ['bishoujo', 'premium', 'exclusive', 'beauty', 'creative'],
    category: 'Premium',
    images: BISHOUJOMOM_IMAGES,
    stats: {
      posts: BISHOUJOMOM_IMAGES.length,
      likes: 12800,
      views: 67500,
      followers: 2850
    },
    isVerified: true,
    isVisible: true,
  },
  {
    id: 'bustyebonyslxt',
    name: 'bustyebonyslxt',
    handle: '@bustyebonyslxt',
    bio: 'Premium ebony content creator specializing in exclusive curves and sensual content. Known for authentic personality and stunning visuals.',
    avatarUrl: 'https://img.coomer.st/thumbnail/data/bc/f3/bcf30769a7beeeb0efb3487817d7e54a2e4b2e625a432f098af1ad17a7113a7f.jpg',
    heroUrl: 'https://img.coomer.st/thumbnail/data/94/18/9418d2cd8a6cd68e4eb03e1080bf41870151c80184275aba030830c035174ff7.jpg',
    tags: ['Ebony', 'Curvy', 'Premium Content', 'Exclusive', 'OnlyFans'],
    category: 'Curvy',
    images: BISHOUJOMOM_IMAGES.slice(0, 50).map((img, index) => ({
      ...img,
      id: `bustyebony-${String(index + 1).padStart(3, '0')}`,
      caption: `🔥 Exclusive Premium Content ${index + 1}`,
      isLocked: index % 4 !== 0, // Every 4th image is unlocked
      sha256: `sha256-bustyebony-${index + 1}`
    })),
    stats: {
      posts: 284,
      likes: 28563,
      views: 142856,
      followers: 5847
    },
    isVerified: true,
    isVisible: true,
    pricePerMonth: 24.99
  },
  {
    id: 'chocolatebutterfly22',
    name: 'chocolatebutterfly22',
    handle: '@chocolatebutterfly22',
    bio: 'Sweet and captivating content creator bringing you exclusive experiences. Like chocolate and butterflies, I\'m here to add sweetness and beauty to your day.',
    avatarUrl: 'https://img.coomer.st/thumbnail/data/de/51/de51219d3435c8204fd15d840757a7d27d2fe7f6ec40e35248151d2071a368ba.jpg',
    heroUrl: 'https://img.coomer.st/thumbnail/data/46/4c/464cfa5abe108757448d95f8e2cba66a4f1182daa47ba695dfa917c6e70f59c5.jpg',
    tags: ['sweet', 'premium', 'exclusive', 'captivating', 'butterfly'],
    category: 'Premium',
    images: CHOCOLATE_IMAGES,
    stats: {
      posts: CHOCOLATE_IMAGES.length,
      likes: 14200,
      views: 72300,
      followers: 3150
    },
    isVerified: true,
    isVisible: true,
    pricePerMonth: 19.99
  },
  {
    id: 'chocolate-kitti',
    name: 'chocolate-kitti',
    handle: '@chocolate-kitti',
    bio: 'Sweet and irresistible chocolate beauty creating enchanting content. Known for her playful charm and captivating allure that melts hearts with every post.',
    avatarUrl: 'https://img.coomer.st/thumbnail/data/88/7c/887ce651617f32a52a8dd3a2367081261313a0d4e1a877d6393073b22e7808fd.jpg',
    heroUrl: 'https://img.coomer.st/thumbnail/data/42/fc/42fc36d8b7053ea3a98f72290d47bb3ed58f58b34f6ea7d86333afa439bdb3d0.jpg',
    tags: ['Chocolate', 'Sweet', 'Playful', 'Charming', 'Beautiful'],
    category: 'Chocolate Beauty',
    images: KITTI_IMAGES,
    stats: {
      posts: KITTI_IMAGES.length,
      likes: 22847,
      views: 89234,
      followers: 4123
    },
    isVerified: true,
    isVisible: true,
    pricePerMonth: 19.99
  },
  {
    id: 'cutie-lily',
    name: 'Cutie Lily',
    handle: '@cutie_lily',
    bio: 'Lily Content Creator. Sweet and adorable content creator known for her cute and playful personality. Creates engaging content that showcases her charming and lovely nature.',
    avatarUrl: 'https://img.coomer.st/thumbnail/data/32/ee/32eefebf11f4a01c8d1699b0b790810d51e8b73e281eab871442dcd42d431f42.jpg',
    heroUrl: 'https://img.coomer.st/thumbnail/data/b7/0a/b70a23dee1afc6eac5939b82b950b24f8e21b03854dc61ee7bad1d71a28fd2fe.jpg',
    tags: ['Cute', 'Sweet', 'Playful', 'Adorable', 'OnlyFans'],
    category: 'Cute',
    images: [],
    stats: {
      posts: 251,
      likes: 12456,
      views: 45678,
      followers: 2134
    },
    isVerified: true,
    isVisible: true,
    pricePerMonth: 14.99
  }
];

interface MockDataContextType {
  profiles: Profile[];
  user: User | null;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  addProfile: (profile: Profile) => void;
  updateProfile: (profile: Profile) => void;
  deleteProfile: (id: string) => void;
  toggleFavorite: (profileId: string) => void;
  isFavorite: (profileId: string) => boolean;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export const MockDataProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>(PROFILES);

  const login = (email: string, role: UserRole) => {
    setUser({
      id: 'user-' + Date.now(),
      email,
      role,
      favorites: []
    });
  };

  const logout = () => {
    setUser(null);
  };

  const addProfile = (profile: Profile) => {
    setProfiles(prev => [...prev, profile]);
  };

  const updateProfile = (updated: Profile) => {
    setProfiles(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const deleteProfile = (id: string) => {
    setProfiles(prev => prev.filter(p => p.id !== id));
  };

  const toggleFavorite = (profileId: string) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      const isFav = prev.favorites.includes(profileId);
      return {
        ...prev,
        favorites: isFav
          ? prev.favorites.filter(id => id !== profileId)
          : [...prev.favorites, profileId]
      };
    });
  };

  const isFavorite = (profileId: string) => {
    return user?.favorites.includes(profileId) || false;
  };

  return (
    <MockDataContext.Provider value={{
      profiles,
      user,
      login,
      logout,
      addProfile,
      updateProfile,
      deleteProfile,
      toggleFavorite,
      isFavorite
    }}>
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (context === undefined) {
    throw new Error('useMockData must be used within a MockDataProvider');
  }
  return context;
};
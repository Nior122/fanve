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
    pricePerMonth: 19.99
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
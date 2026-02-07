import json
import random
from datetime import datetime, timedelta

def generate_captions(count):
    prefixes = ["Soft curves, loud energy", "Can’t look away", "Too hot to scroll past", 
                "Just for your eyes only", "Feeling a little extra today", "Breathtaking views only for you",
                "Simply irresistible", "Your favorite dream come true", "Bold and beautiful", 
                "Pure elegance", "Addicted to your love", "Radiant as the sun", "Your favorite view",
                "Dripping in finesse", "Bratty energy", "Kawaii dreams", "Midnight muse", 
                "Golden hour glow", "Paradise found", "Seductively sweet", "Wild thoughts",
                "Velvet touch", "Sparkle more", "Peachy keen", "Red hot", "Morning glory"]
    emojis = ["😍🔥", "💦✨", "😈📸", "💖👑", "💅✨", "😍💎", "💦🔥", "🌈✨", "😈💖", "💅✨", "💖🔥", "☀️✨", "🍑👀", "💦🔥", "😈🔥", "🌸💖", "🌙💎", "✨☀️", "🏝️✨", "🍭💕", "💭😈", "🤲✨", "💎✨", "🍑✨", "🌶️🔥", "☀️✨"]
    
    captions = []
    for _ in range(count):
        cap = f"{random.choice(prefixes)} {random.choice(emojis)}"
        captions.append(cap)
    return captions

# Extracted URLs from previous fetches
urls = [
    "https://img.coomer.st/thumbnail/data/7f/9e/7f9e77824071a006d0bb9ffde4f48534e5430fd85490b07b88256fdef459d7b3.jpg",
    "https://img.coomer.st/thumbnail/data/8f/16/8f16aec8fc17ed417fef7d0eba0e6213fafa9f1122dea67ef3a51a1a63c7be9d.jpg",
    "https://img.coomer.st/thumbnail/data/1f/d9/1fd9f7309da9b0a3199504645baf83df0219c3f1fac8670ba5d74949c88eb3b5.jpg",
    "https://img.coomer.st/thumbnail/data/95/57/9557dc8f306a694f5560b66bfdadc06d3defbb1b776b7a0c70b8bfa57639955b.jpg",
    "https://img.coomer.st/thumbnail/data/8f/04/8f04acf37183f4fe16f2c7ce3e32336e26462ca93bfdc583016d2878608a033d.jpg",
    "https://img.coomer.st/thumbnail/data/d3/99/d3990dc46a345d2747d29c6d0c5906d4e24b4f44ec013e7787d5cd47265d668a.jpg",
    "https://img.coomer.st/thumbnail/data/73/44/7344222e184cf540ff43bdeb3d223fd1179d5720228b3dccfbe2476a57bc91bb.jpg",
    "https://img.coomer.st/thumbnail/data/fb/d2/fbd27f5b01f9f9f07318a3ca71a42ea99ff8bbe4fd779a6dfbc81f750a13b130.jpg",
    "https://img.coomer.st/thumbnail/data/b6/0b/b60b58f12ea50ab462c9442d3674ad256315ccdc20bcd3384356a67fa49c219e.jpg",
    "https://img.coomer.st/thumbnail/data/d8/d7/d8d7e3560da5ddca593f48aa1cc30e1daf8da423c7fdd04fe857ed2f176176bb.jpg",
    "https://img.coomer.st/thumbnail/data/27/5a/275a9322392f96ae10fa3f9b8ca6a4d5c51bb7f8af076b48020308c00e15f4fe.jpg",
    "https://img.coomer.st/thumbnail/data/3b/d1/3bd100b364de8afa41788a69334c4bc12c43f1ca515a5fe6059dd6dde14a71e9.jpg",
    "https://img.coomer.st/thumbnail/data/7e/03/7e035a8eafd0e2c0524ca63b8041615ce01b60c0436836c96b5a24a4f57173a5.jpg",
    "https://img.coomer.st/thumbnail/data/9e/12/9e12fa9e75e61857169ec0147b282751ae6163401082fa7ef4ab1d78dd69bd08.jpg",
    "https://img.coomer.st/thumbnail/data/20/0d/200da6c9bb826ac880c7e741b77b508d917feacb6f95dcb6003da2f1acba385c.jpg",
    "https://img.coomer.st/thumbnail/data/ea/6d/ea6d231a44b54b2dfd8b858425a8ff1c61ce6824b10004aaa7a8d7fbe354dd3d.jpg",
    "https://img.coomer.st/thumbnail/data/c5/d9/c5d98b14afddd441ac7a47555ba78bdd915dc503732a863f93bcd74a5861fd69.jpg",
    "https://img.coomer.st/thumbnail/data/26/28/2628d03699efb4e0a4519ee5a5fd874d3c7e10ab50d278b867bcd0664368fa02.jpg",
    "https://img.coomer.st/thumbnail/data/31/97/31979183f917e0f6a20ea0122b44704c6e456ef6d299044dc42fa38b88015d89.jpg",
    "https://img.coomer.st/thumbnail/data/e5/a0/e5a028275eb427e36ec9a1fc703b5aa18b23e2ca4a30552b03e5431cd2006637.jpg",
    "https://img.coomer.st/thumbnail/data/35/bb/35bb47a20cc1260aeb5ecb149f3be06f9c22cf6c73e9021fedfad1e40c669cf3.jpg",
    "https://img.coomer.st/thumbnail/data/55/17/5517037e080f9643d2f92500c4431587e3c004f3dccc90670d2fa7a0593d9e55.jpg",
    "https://img.coomer.st/thumbnail/data/b5/7a/b57a35a63340c3de78616b20b074bbe15da5f587cf3ceddb24058858a6bff5fe.jpg",
    "https://img.coomer.st/thumbnail/data/b3/d5/b3d576506efd95a8acd89575ab30593a594d98db094807504c7d1aa3beab50ff.jpg",
    "https://img.coomer.st/thumbnail/data/05/c5/05c5d6514356e25f9c974a6978c7bea8ee997f6f792717eb07586fa69040e651.jpg",
    "https://img.coomer.st/thumbnail/data/08/d9/08d99db6b6356350ee8a0692ee7b920261b2a988b99cb62d9f1093c7c905a9fa.jpg",
    "https://img.coomer.st/thumbnail/data/f0/bb/f0bb9fae748e47f6ba23e18db0bbc10f8f822c34d5376082731da98beb5650f0.jpg",
    "https://img.coomer.st/thumbnail/data/33/53/33536c1cdace0bff8d98a64b274fb368da6a09e61d0e85db1eb1ce5facff8c5a.jpg",
    "https://img.coomer.st/thumbnail/data/dd/51/dd5188cd95442ff0923135121612eb7e4dafb67bb60a1ece7a0a61ff65de3879.jpg",
    "https://img.coomer.st/thumbnail/data/85/23/8523d5a192a89691458eac02fdb1a4127ca2eaf4178952139d635645a5fd80e5.jpg",
    "https://img.coomer.st/thumbnail/data/2e/33/2e332f129d3f9bb849467e67bce041d589f096f6171ebf04415bf9214250938e.jpg",
    "https://img.coomer.st/thumbnail/data/5d/60/5d60471548c8738d09ad5620857fa5b7497e0fa27d1567b09222a021fcd0fc32.jpg",
    "https://img.coomer.st/thumbnail/data/22/33/223330cec6ea89112ed14545cfcda10debc8a758232ffe5950cc9585d1d78295.jpg",
    "https://img.coomer.st/thumbnail/data/5a/d0/5ad0fb808c24f0b4558cf4640eda81bc582b2d3ec3b211b1db531e393e34229b.jpg",
    "https://img.coomer.st/thumbnail/data/5f/b2/5fb2bf5bcd03c3ec9b79970841d79de2bf71b4b52bdf1a7b3592a4bbd554c12d.jpg",
    "https://img.coomer.st/thumbnail/data/4f/4a/4f4a1874892c250f7e67787ed62c4e448c6d956848e400c2536fec91a6292c36.jpg",
    "https://img.coomer.st/thumbnail/data/fb/ce/fbcec019e6b47a405a572404cff5850f2e46822f7e50fa93ae163bad1a5a3b2b.jpg",
    "https://img.coomer.st/thumbnail/data/97/44/9744739c9794f553e53a564646a753862fcf07863403f5c17485baccbb49cec7.jpg",
    "https://img.coomer.st/thumbnail/data/dd/50/dd50bf9a675ebfa8811557272307267ec4c41b0cfd69f8cf464b3536a40d45a2.jpg",
    "https://img.coomer.st/thumbnail/data/f2/9d/f29dd7e72db1c27acfd88ebc6ef5e9e3eace238176fc0942dbca78f992b019de.jpg",
    "https://img.coomer.st/thumbnail/data/4f/6b/4f6b2d8b4edc7f21d0953e93f249dabdbd7f56d69b9de134bdc1925aa391a2a7.jpg",
    "https://img.coomer.st/thumbnail/data/91/e2/91e2aafef67d33de0b2b49022534151eb97bfc4d89f4bd39d7954109972a0669.jpg",
    "https://img.coomer.st/thumbnail/data/6f/44/6f44831372c1040420319e6815c0be7074a24bd5db8557e42895ada74a722fc3.jpg",
    "https://img.coomer.st/thumbnail/data/b5/8e/b58edf604e929c063676c2faf1fff5a7e8c7d075376411833fc603a6456f4e3e.jpg",
    "https://img.coomer.st/thumbnail/data/d2/1a/d21ad3381a5e8c71f0c7541af4a5ee196a7651f4eaef4de3b60086f1a530ce1b.jpg",
    "https://img.coomer.st/thumbnail/data/12/c6/12c6ab5206b15ce8b7be282411e3bec95fb6f820553874b11376506f9734efa1.jpg",
    "https://img.coomer.st/thumbnail/data/0c/99/0c995f0647d864768aceee3f9ecc382aaa270fc84b844758f16c3c9cbe1099c3.jpg",
    "https://img.coomer.st/thumbnail/data/51/d5/51d5c4db7c943b353f49a3ed3e9da2ff6eae5ecf19b2a744100a3fc139c57e6a.jpg",
    "https://img.coomer.st/thumbnail/data/39/4b/394b244f99d639f27711c0b9137d58efc3d507eab2d795753711c6a77f7466d1.jpg",
    "https://img.coomer.st/thumbnail/data/ad/fa/adfa352cf476fc7e7ee76896657b323d1b2b6bc02b70af9299cffb9d80ec976d.jpg",
    "https://img.coomer.st/thumbnail/data/b2/b2/b2b2bfb97527a4cd2a0a45e872006121371c3478d22da2fe45d0afbadf46836b.jpg",
    "https://img.coomer.st/thumbnail/data/71/b7/71b78fdb682b10ad950758db4101eef3c8efdb969e628847ad7c210847d6a52b.jpg",
    "https://img.coomer.st/thumbnail/data/6d/ef/6defa8c01eacd718b79f0c5e60475f82f86eac8b8fbc3e48d81a712600978e77.jpg",
    "https://img.coomer.st/thumbnail/data/5c/de/5cdec2234e5c40fa87f013c806e1c66843482c99ff2f3c149b4981609378c362.jpg",
    "https://img.coomer.st/thumbnail/data/7d/73/7d7353e9ebedbdd54961c89c52648012760f73d3f2c84db1255a2ae4282373e3.jpg",
    "https://img.coomer.st/thumbnail/data/ac/fd/acfdc591344f4956f323374341ef48580768be6097f7dd9195522ad3d8c70e51.jpg",
    "https://img.coomer.st/thumbnail/data/22/86/2286626614ee404dc4f400f0a8068d16a4793973e4a3503e7ac0bd3ac0408780.jpg",
    "https://img.coomer.st/thumbnail/data/67/85/67856340ffea4c11e0c192fdd0857a906bd1ae2a6022043da9377c2f8efe0417.jpg",
    "https://img.coomer.st/thumbnail/data/05/ab/05abdc82222410a8e4d4f8e0be085ec7a9ee487370e37c84bf59f3c151475ecf.jpg",
    "https://img.coomer.st/thumbnail/data/ee/b6/eeb64380bbeef7bf727dfff556c22e278483373fe023c555b45c0bc97b2c6771.jpg",
    "https://img.coomer.st/thumbnail/data/2f/68/2f68904e5e141d8218b594c65d4239d63f4e5a82caa878e59d4f1e59c0b4a830.jpg",
    "https://img.coomer.st/thumbnail/data/b1/f4/b1f49d1afa59a13461490ed4323e82b88dc7a4de685179eac2c2408cfb2023e2.jpg",
    "https://img.coomer.st/thumbnail/data/87/09/8709ab0fe93b1d262e7a6feaba16399270da30cf505e37298aa4a94c57412f97.jpg",
    "https://img.coomer.st/thumbnail/data/cc/3c/cc3ce50a549eb660cee9096cedc1c85991e803caa516321f8e2fdef4c0ce7e20.jpg",
    "https://img.coomer.st/thumbnail/data/8d/cf/8dcfc63ec903d7509f02a08df0d04f04f214d137cc84e392e08fd00a7066ceb4.jpg",
    "https://img.coomer.st/thumbnail/data/e7/ed/e7edf35869005bd8ff25a2dfda57b7d273aaf71a41866e8eb9e2410ac27707b4.jpg",
    "https://img.coomer.st/thumbnail/data/47/18/47185baefb93ce307b47b63a7219f8f3f26fd6290a4690d0947104f277ac8fa3.jpg",
    "https://img.coomer.st/thumbnail/data/15/7c/157c1b827c58aaf71af5f4edc823e07ced5fc0296a5ae238259e8db030ffea49.jpg",
    "https://img.coomer.st/thumbnail/data/69/3e/693efe57935a52b9083292358f2c41806a6662ed86cadba57651ae316f821269.jpg",
    "https://img.coomer.st/thumbnail/data/3c/ea/3cea05d7307c7526c7960da9c0c6967b8b9ffc108611cde3c7c49e73d443c302.jpg",
    "https://img.coomer.st/thumbnail/data/ed/af/edafced6d3826e4382f8c835f451b71ef1a598096081e586d51b04523abcca8f.jpg",
    "https://img.coomer.st/thumbnail/data/c3/42/c34283ad0179bd73548fba41de599735cb4bdbf73611f252b4c67b79cc68760c.jpg",
    "https://img.coomer.st/thumbnail/data/c1/4a/c14adc0671c9d002162beb0aa9d3a53550c67ab7edbe3afbd0e11b98eb659e42.jpg",
    "https://img.coomer.st/thumbnail/data/8d/7d/8d7d94a12678ff3bd71c6160406248404cf18831221470730fc1731a9df56ced.jpg",
    "https://img.coomer.st/thumbnail/data/fe/0a/fe0afff4fe423427f9d1446f2b31f13f7e220c6434bcbfd62fbfd9c9255c5572.jpg",
    "https://img.coomer.st/thumbnail/data/92/f1/92f1b3d8881ec3fc86296882963be0bc35dc906e640366bb7b00ef7afda4b0a6.jpg",
    "https://img.coomer.st/thumbnail/data/4c/6f/4c6feb189f38a11d4a447732c278e79ce430c62e9646e7b7dfaeb1ffda1f6305.jpg",
    "https://img.coomer.st/thumbnail/data/ac/fe/acfee92f72ef5e1bbeb0b2730cd15f0e7d5da1bac1776e30c52ad1dc4ca68fed.jpg",
    "https://img.coomer.st/thumbnail/data/7f/e7/7fe797dd20083b35a6209081096324790b8d971180f7bc2da1774547327aaa42.jpg",
    "https://img.coomer.st/thumbnail/data/2f/35/2f35ec805afd3d6a5edcdb69d567a48146a3a7009a24a7356580d26d1e9a81ad.jpg",
    "https://img.coomer.st/thumbnail/data/bd/d0/bdd0e91616deb6202e76043675660776b12d315f0ca0fa6f03bc27b195f0fc07.jpg",
    "https://img.coomer.st/thumbnail/data/5c/9b/5c9ba7c654105342ff22bd85cc65923f25c3101cb5a470d6f454f2ef409e6c06.jpg",
    "https://img.coomer.st/thumbnail/data/fe/1c/fe1c5a7ec48120b1f73273dfe51887cf8671ec6e5b634efe6aa6d2034c9b1ec3.jpg",
    "https://img.coomer.st/thumbnail/data/6d/d1/6dd1080e35f6e62c3a074e1f4c6ecb556dc1c93d7470102750211945b85eff1e.jpg",
    "https://img.coomer.st/thumbnail/data/e7/c0/e7c092cc2a9a5e93cb986ff85d9298a16d946b64b9549c6102ecf67bcf4983aa.jpg",
    "https://img.coomer.st/thumbnail/data/cc/aa/ccaa3814e39688065e0c867ae386e8c290b6a52ac51cb372ebf53ce6b77cc52a.jpg",
    "https://img.coomer.st/thumbnail/data/13/18/13188072a233081f68c66468d17243bae58bcb20a44990978319fec46f5d35be.jpg",
    "https://img.coomer.st/thumbnail/data/b7/c1/b7c14e16c8f93d8707e4cb4485b81b86bfb2e3212495d07bf97c30b3d9c26b50.jpg",
    "https://img.coomer.st/thumbnail/data/a7/b7/a7b7730773e50be9b8431d5ba6767f2d5045372d6374a4894116e0bb4ac4bce5.jpg",
    "https://img.coomer.st/thumbnail/data/a4/b5/a4b55ba729cbbca72fc0f218a028864ddd6a7b0594bbcd2658c1bb99bcf796bc.jpg",
    "https://img.coomer.st/thumbnail/data/73/25/73251da059d2c1dc4bdd9a819fe092f247530920d0f97336088bb918c9e7eb5b.jpg",
    "https://img.coomer.st/thumbnail/data/27/37/27379b67086e88846d50a43f39b69401d6ac582c44d61dc4762d541781ab9469.jpg",
    "https://img.coomer.st/thumbnail/data/6f/b7/6fb793fc3868627324897d36fc17590afa5f335a20d6502b9108ac95d4b32670.jpg",
    "https://img.coomer.st/thumbnail/data/d3/e9/d3e9136f743c2d45e8d6b9616fc6f9336eb4ea21a772843f9ffb9591d4496331.jpg",
    "https://img.coomer.st/thumbnail/data/4f/28/4f28352ce93f1bd686121ca38e5336461b791150307e887f0d2e1fd78ad48302.jpg",
    "https://img.coomer.st/thumbnail/data/df/f4/dff4c3fb6768127676ae8f6ab5e4d5f99f8aec831c40a4db8c6cafd1ca3071bd.jpg",
    "https://img.coomer.st/thumbnail/data/2a/33/2a3362a54c094a090c024dd3bd10e967b443960413ad5f22a603622677a89c49.jpg",
    "https://img.coomer.st/thumbnail/data/ef/5f/ef5f2cc982bb766e6877ed03f7f9cadfeff506f1fa94827696d2ea2486eb73ae.jpg",
    "https://img.coomer.st/thumbnail/data/0c/5e/0c5efea8d48f07326826939be51a1e4532d5f982f4359c0bd2b99750b1f284be.jpg",
    "https://img.coomer.st/thumbnail/data/07/6a/076ae24839eb85a2648796f72048d46482f8ea2ce00a04459f2dcef2693a3670.jpg",
    "https://img.coomer.st/thumbnail/data/25/92/2592b655553719f2fd6ec1b7f0888e963d90e04b1a13348ac12c1fec77848ee5.jpg",
    "https://img.coomer.st/thumbnail/data/c5/45/c545b448f0ac7437f419ebaabf2f898b795ecbb357cdca36a978c6847a5b4dc1.jpg",
    "https://img.coomer.st/thumbnail/data/2f/54/2f54988a0bcee28955aad9b7b0735a0553fa908074b695d713cef8f92cab355b.jpg",
    "https://img.coomer.st/thumbnail/data/86/21/8621006204fbd0d88cf2c66d4efa51b3161db816691c0a9d8f7b6757cbe14ae6.jpg",
    "https://img.coomer.st/thumbnail/data/72/1a/721af2645136ea8f4ea0cb451d5ae791471b5c75daac63f85eb7f020eba105bf.jpg",
    "https://img.coomer.st/thumbnail/data/3d/b9/3db97bcbf4edb88c4eafc32b32d4d21b03f47e4d8239fe5fc80bd4d47a6697d4.jpg",
    "https://img.coomer.st/thumbnail/data/d1/a9/d1a90659911dd84d668eab5cee77269faddb92d06b7932ac25eb2b39e1370256.jpg",
    "https://img.coomer.st/thumbnail/data/cb/82/cb82ed34c1ee590ecaca9377e191a7a2b70f8a3d2e5b547418a3174c85cb27ee.jpg",
    "https://img.coomer.st/thumbnail/data/60/4b/604b9ad534f97c36ba3acd64aa900c51d819e854085cb2ac9172074cee72bd4a.jpg",
    "https://img.coomer.st/thumbnail/data/80/fd/80fd21a1ffa4aa75d052aa925034ecc319b199685909421296dfd972b6833242.jpg",
    "https://img.coomer.st/thumbnail/data/4e/34/4e34f4f90a584778414a46a5868697bc4693f1878f707bbbd6ea520444cda6e7.jpg",
    "https://img.coomer.st/thumbnail/data/b1/63/b163b5f945d269f2231cf175d22ba038f77a317d7ee9fa7ffd01b53de4dcedb3.jpg",
    "https://img.coomer.st/thumbnail/data/50/48/5048d859779724c3905f606c4e610a4c21048b489a7c2b32b6617aaf72ab54c2.jpg",
    "https://img.coomer.st/thumbnail/data/7f/80/7f80c1705754c3de24d0c1837069ef9eaa5dfb785b081ccad83b5c3c92e4177e.jpg",
    "https://img.coomer.st/thumbnail/data/0b/8b/0b8b0cf23ad61546460c2ffd6ab34c5badc3683329a93cb7b7e2d8e1f0716eb8.jpg",
    "https://img.coomer.st/thumbnail/data/f5/34/f534bc480ca0baba2bd38eb8af45c9d291b6c60a85c14930680dc5c7edc9a75c.jpg",
    "https://img.coomer.st/thumbnail/data/ca/1f/ca1f3485e9cd1318b9bfb2ddf97bc653000c1d4997ae95e44ea9fd9cbe584425.jpg",
    "https://img.coomer.st/thumbnail/data/72/c3/72c3cb2a4e1fb9d877d2317825db809629dd93b9e392bafad4087c09804e4368.jpg",
    "https://img.coomer.st/thumbnail/data/6d/c8/6dc8f6f21d73b4ef1ced91616a84bc008eea042d954b37ad1ed4483284e2ed68.jpg",
    "https://img.coomer.st/thumbnail/data/64/4e/644ebac8df6c25329506887eeeebbcec01b65602ef987f7f65aa2897bd32247b.jpg",
    "https://img.coomer.st/thumbnail/data/aa/48/aa48300d0baac7d61fd7f0acf298cd6e9f54d16409176ee144338af4fc1173de.jpg",
    "https://img.coomer.st/thumbnail/data/bb/06/bb0696ab3eeb23e580b549d5f2ce5bda8fecc5ad0910c770730547369313e3f6.jpg",
    "https://img.coomer.st/thumbnail/data/2c/47/2c4752bf4271678d58c3daf65e9834caeba48fe248adaceb3a814a03cec66a74.jpg",
    "https://img.coomer.st/thumbnail/data/75/5c/755cd54f9a443a57e52eae996423d3d27d22382b7d34c2e1b694ebcc0d1df000.jpg",
    "https://img.coomer.st/thumbnail/data/8e/ef/8eef5a2d8b10a3cc768c82bd6a46d6f4612777c7763e91b45d2a1d4f11a67a6d.jpg",
    "https://img.coomer.st/thumbnail/data/1a/1e/1a1ef8856e6c6f3d0fdf0180116ce97fc134bb434bc506156b04deffe3008b27.jpg",
    "https://img.coomer.st/thumbnail/data/8f/b5/8fb51846dee5115a4a9d1644e2334cb37cc9de754152d408178eeb1a496a4f88.jpg",
    "https://img.coomer.st/thumbnail/data/29/6d/296d916f56454aa5085aaadb540319d70ed0e450c6d17fd0a7afe8a0a2276405.jpg",
    "https://img.coomer.st/thumbnail/data/f8/10/f810e9bf61559da16f683c6b1d900a2b14e3054cd8c19204d2fb1abdaf2ee037.jpg",
    "https://img.coomer.st/thumbnail/data/b4/44/b4444f7e1fb735b0f574a179508f5ef428e099c04b191be016b049fece409303.jpg",
    "https://img.coomer.st/thumbnail/data/03/1f/031f8f7dcc7820f621bdbbcf73ed8869505bf613c3a3b5fce5f0e72da187851e.jpg",
    "https://img.coomer.st/thumbnail/data/6f/64/6f64d1647e9b6dbb1c3a50ebd2506d4125668d62ccd55a383824418d5731975f.jpg",
    "https://img.coomer.st/thumbnail/data/56/e5/56e55437d441b927fe77095cf67d41762d98558d0da8385d4b0061b13b801866.jpg",
    "https://img.coomer.st/thumbnail/data/91/07/9107bfd521bc09180776af82964709a96a8c2d50775a74c0db4af7fe14f5b1f4.jpg",
    "https://img.coomer.st/thumbnail/data/f4/9b/f49b6d2d22f04e031801e9ed48390b8c2b45b13523bdf1d45b3e849e9e87e63e.jpg",
    "https://img.coomer.st/thumbnail/data/1b/3d/1b3d208cfd1dc51a4c5522eb46609b603b4fdff06263b2242056b9e41a9a3033.jpg"
]

# Unique set to avoid duplicates
unique_urls = list(set(urls))
count = 310 # Total items desired
final_list = []
captions = generate_captions(count)

for i in range(count):
    url = unique_urls[i % len(unique_urls)]
    item_id = f"redhead-{i+1:03d}"
    dt = (datetime(2026, 2, 7, 12, 0, 0) + timedelta(minutes=i)).strftime("%Y-%m-%dT%H:%M:%S.000Z")
    
    final_list.append({
        "id": item_id,
        "url": url,
        "thumbnailUrl": url,
        "caption": captions[i],
        "width": 800,
        "height": 1000,
        "isLocked": i % 2 == 0, # Alternate locked/unlocked
        "isVisible": True,
        "mediaType": "image",
        "sourceUrl": url,
        "createdAt": dt
    })

with open('services/redheadwinterData.json', 'w') as f:
    json.dump(final_list, f, indent=2)

print(f"Successfully generated {len(final_list)} items in services/redheadwinterData.json")

const VERCEL_URL = 'https://phakaphol-dhera.vercel.app';
const assets = [
  '/assets/pkshop.jfif',
  '/assets/crypto.jfif',
  '/assets/iot.png',
  '/assets/TPR/tprport.png',
  '/assets/TPR/tpr1.jpeg',
  '/assets/TPR/tpr2.jpeg',
  '/assets/TPR/tpr3.jpeg',
  '/assets/TPR/tpr4.jpeg',
  '/assets/Devinit/devinit.jpg',
  '/assets/Devinit/gsap.png',
  '/assets/Devinit/css.png',
  '/assets/Devinit/react.png',
  '/assets/profil.jpg',
  '/IOT/iot.jpg',
  '/IOT/iotmain.jpg',
  '/IOT/iot2.jpg',
  '/IOT/iot3.jpg',
  '/IOT/iot4.jpg',
  '/IOT/iot5.jpg',
  '/assets/IT3K/3klogo.png',
  '/assets/GTA6/gta6.png',
  '/assets/Project/yaiba.jfif',
  '/assets/Helloworld/helloworldhippo.png',
  '/assets/pkflix.png',
  '/assets/cognisync.png',
  '/assets/pheeraphat-port.png',
  '/assets/iphone.png',
  '/assets/it-fun-slide.png',
  '/assets/accordion/helloworld.jpg',
  '/assets/accordion/Teacher.jpg',
  '/assets/ecom.png',
  '/projects/jarvis-trade-1.png',
  '/projects/pk-brain.png',
  '/projects/it3k.png',
  '/assets/starterpack pk/sit_photo (2 of 96).jpg',
  '/assets/starterpack pk/sit_photo (13 of 115).jpg',
  '/assets/starterpack pk/sit_photo (14 of 115).jpg',
  '/assets/starterpack pk/sit_photo (25 of 149).jpg',
  '/assets/starterpack pk/sit_photo (3 of 149).jpg',
  '/assets/starterpack pk/sit_photo (45 of 149).jpg',
  '/assets/starterpack pk/sit_photo (46 of 149).jpg',
  '/assets/starterpack pk/sit_photo (6 of 149).jpg',
  '/assets/starterpack pk/sit_photo (63 of 149).jpg',
  '/assets/starterpack pk/sit_photo (80 of 149).jpg',
  '/assets/starterpack pk/sit_photo (101 of 149).jpg',
  '/assets/starterpack pk/sit_photo (137 of 149).jpg',
  '/assets/starterpack pk/sit_photo (138 of 149).jpg',
  '/assets/starterpack pk/sit_photo (149 of 149).jpg',
  '/assets/starterpack pk/sit_photo (12 of 61).jpg',
  '/assets/starterpack pk/sit_photo (27 of 61).jpg',
  '/assets/starterpack pk/sit_photo (3 of 61).jpg',
  '/assets/starterpack pk/sit_photo (31 of 61).jpg',
  '/assets/starterpack pk/sit_photo (32 of 61).jpg',
  '/assets/starterpack pk/sit_photo (54 of 61).jpg',
  '/assets/starterpack pk/sit_photo (55 of 61).jpg',
  '/assets/starterpack pk/sit_photo (9 of 61).jpg',
  '/assets/starterpack pk/sit_photo (14 of 96).jpg',
  '/assets/starterpack pk/sit_photo (32 of 96).jpg',
  '/assets/starterpack pk/sit_photo (33 of 96).jpg',
  '/assets/starterpack pk/sit_photo (43 of 96).jpg',
  '/assets/starterpack pk/sit_photo (44 of 96).jpg',
  '/assets/starterpack pk/sit_photo (47 of 96).jpg',
  '/assets/starterpack pk/sit_photo (50 of 96).jpg',
  '/assets/starterpack pk/sit_photo (72 of 96).jpg'
];

async function check() {
  console.log('🔍 Testing live Vercel deployment: ' + VERCEL_URL);
  let ok = 0;
  let fail = 0;

  for (const a of assets) {
    try {
      const url = VERCEL_URL + encodeURI(a);
      const res = await fetch(url);
      if (res.status === 200) {
        ok++;
      } else {
        console.warn('⚠️ HTTP ' + res.status + ' -> ' + a);
        fail++;
      }
    } catch (e) {
      console.error('Error fetching ' + a + ':', e.message);
      fail++;
    }
  }

  console.log('\n📊 VERIFICATION SUMMARY:');
  console.log('====================================');
  console.log('✅ Passed (HTTP 200 OK): ' + ok + ' / ' + assets.length);
  console.log('❌ Failed: ' + fail);
  console.log('====================================');
}

check();

import fs from 'fs';
import path from 'path';

const LOCAL_SUPABASE_URL = 'http://localhost:8000';
const PUBLIC_DIR = '/home/phakaphol/projects/Portfolio/frontend/public';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q';

// All assets in the system
const assets = [
  'assets/pkshop.jfif',
  'assets/crypto.jfif',
  'assets/iot.png',
  'assets/TPR/tprport.png',
  'assets/TPR/tpr1.jpeg',
  'assets/TPR/tpr2.jpeg',
  'assets/TPR/tpr3.jpeg',
  'assets/TPR/tpr4.jpeg',
  'assets/Devinit/devinit.jpg',
  'assets/Devinit/gsap.png',
  'assets/Devinit/css.png',
  'assets/Devinit/react.png',
  'assets/profil.jpg',
  'IOT/iot.jpg',
  'IOT/iotmain.jpg',
  'IOT/iot2.jpg',
  'IOT/iot3.jpg',
  'IOT/iot4.jpg',
  'IOT/iot5.jpg',
  'assets/IT3K/3klogo.png',
  'assets/GTA6/gta6.png',
  'assets/Project/yaiba.jfif',
  'assets/Helloworld/helloworldhippo.png',
  'assets/pkflix.png',
  'assets/cognisync.png',
  'assets/pheeraphat-port.png',
  'assets/iphone.png',
  'assets/it-fun-slide.png',
  'assets/accordion/helloworld.jpg',
  'assets/accordion/Teacher.jpg',
  'assets/ecom.png',
  'projects/jarvis-trade-1.png',
  'projects/pk-brain.png',
  'assets/starterpack pk/sit_photo (2 of 96).jpg',
  'assets/starterpack pk/sit_photo (13 of 115).jpg',
  'assets/starterpack pk/sit_photo (14 of 115).jpg',
  'assets/starterpack pk/sit_photo (25 of 149).jpg',
  'assets/starterpack pk/sit_photo (3 of 149).jpg',
  'assets/starterpack pk/sit_photo (45 of 149).jpg',
  'assets/starterpack pk/sit_photo (46 of 149).jpg',
  'assets/starterpack pk/sit_photo (6 of 149).jpg',
  'assets/starterpack pk/sit_photo (63 of 149).jpg',
  'assets/starterpack pk/sit_photo (80 of 149).jpg',
  'assets/starterpack pk/sit_photo (101 of 149).jpg',
  'assets/starterpack pk/sit_photo (137 of 149).jpg',
  'assets/starterpack pk/sit_photo (138 of 149).jpg',
  'assets/starterpack pk/sit_photo (149 of 149).jpg',
  'assets/starterpack pk/sit_photo (12 of 61).jpg',
  'assets/starterpack pk/sit_photo (27 of 61).jpg',
  'assets/starterpack pk/sit_photo (3 of 61).jpg',
  'assets/starterpack pk/sit_photo (31 of 61).jpg',
  'assets/starterpack pk/sit_photo (32 of 61).jpg',
  'assets/starterpack pk/sit_photo (54 of 61).jpg',
  'assets/starterpack pk/sit_photo (55 of 61).jpg',
  'assets/starterpack pk/sit_photo (9 of 61).jpg',
  'assets/starterpack pk/sit_photo (14 of 96).jpg',
  'assets/starterpack pk/sit_photo (32 of 96).jpg',
  'assets/starterpack pk/sit_photo (33 of 96).jpg',
  'assets/starterpack pk/sit_photo (43 of 96).jpg',
  'assets/starterpack pk/sit_photo (44 of 96).jpg',
  'assets/starterpack pk/sit_photo (47 of 96).jpg',
  'assets/starterpack pk/sit_photo (50 of 96).jpg',
  'assets/starterpack pk/sit_photo (72 of 96).jpg'
];

async function syncToPublic() {
  console.log(`🚀 Exporting ${assets.length} assets to Portfolio frontend/public/...`);
  let count = 0;

  for (const assetPath of assets) {
    const dest = path.join(PUBLIC_DIR, assetPath);
    fs.mkdirSync(path.dirname(dest), { recursive: true });

    // Try from local Supabase first
    const url = `${LOCAL_SUPABASE_URL}/storage/v1/object/public/portfolio-assets/${encodeURI(assetPath)}`;
    try {
      let res = await fetch(url);
      if (!res.ok) {
        // Fallback to cloud if not in local
        const cloudUrl = `https://frpbnexgcxfjpsrlsylt.supabase.co/storage/v1/object/public/portfolio-assets/${encodeURI(assetPath)}`;
        res = await fetch(cloudUrl);
      }

      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(dest, buffer);
        console.log(`✅ Saved: ${assetPath}`);
        count++;
      } else {
        console.warn(`⚠️ Not found: ${assetPath}`);
      }
    } catch (e) {
      console.error(`❌ Error on ${assetPath}:`, e.message);
    }
  }

  console.log(`\n🎉 Export finished! Saved ${count} assets directly to public folder.`);
}

syncToPublic();

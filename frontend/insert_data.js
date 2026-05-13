import { createClient } from '@supabase/supabase-js';
import { portfoliodata } from './src/data/Data.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env manually to avoid needing dotenv
const envPath = path.join(__dirname, '.env');
const envFile = fs.readFileSync(envPath, 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...values] = line.split('=');
  if (key && values.length > 0) {
    env[key.trim()] = values.join('=').trim();
  }
});

const url = env['VITE_SUPABASE_URL'];
const key = env['VITE_SUPABASE_ANON_KEY'];

const supabase = createClient(url, key);

async function insertData() {
  console.log('Inserting data into portfolio table...');
  const { data, error } = await supabase
    .from('Portfolio')
    .insert(portfoliodata);

  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log('Successfully inserted data:', data);
  }
}

insertData();

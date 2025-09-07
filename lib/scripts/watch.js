#!/usr/bin/env node

import { watch } from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('👀 Monitorando mudanças nos componentes...\n');
console.log('💡 Pressione Ctrl+C para parar\n');

let buildTimeout;
let isBuilding = false;

function debuildBuild() {
  clearTimeout(buildTimeout);
  buildTimeout = setTimeout(() => {
    if (isBuilding) return;
    
    isBuilding = true;
    console.log('🔄 Detectada mudança, fazendo rebuild...');
    
    try {
      execSync('node scripts/build.js', { 
        stdio: 'inherit', 
        cwd: path.dirname(__dirname) 
      });
      console.log('✅ Rebuild concluído!\n');
    } catch (error) {
      console.error('❌ Erro no rebuild:', error.message);
    } finally {
      isBuilding = false;
    }
  }, 1000); // Aguarda 1s após última mudança
}

// Monitorar pasta src
const srcPath = path.join(__dirname, '../src');

watch(srcPath, { recursive: true }, (eventType, filename) => {
  if (filename && (filename.endsWith('.tsx') || filename.endsWith('.ts'))) {
    console.log(`📝 ${eventType}: ${filename}`);
    debuildBuild();
  }
});

console.log(`🎯 Monitorando: ${srcPath}`);
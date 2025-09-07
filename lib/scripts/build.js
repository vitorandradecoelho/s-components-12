#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Iniciando build automatizado da biblioteca...\n');

try {
  // 1. Limpar pasta dist
  console.log('📁 Limpando pasta dist...');
  const distPath = path.join(__dirname, '../dist');
  if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
  }

  // 2. Instalar dependências se necessário
  console.log('📦 Verificando dependências...');
  if (!fs.existsSync(path.join(__dirname, '../node_modules'))) {
    console.log('📥 Instalando dependências...');
    execSync('npm install', { stdio: 'inherit', cwd: path.dirname(__dirname) });
  }

  // 3. Fazer build
  console.log('🔨 Compilando biblioteca...');
  execSync('npm run build', { stdio: 'inherit', cwd: path.dirname(__dirname) });

  // 4. Verificar se arquivos foram gerados
  console.log('✅ Verificando arquivos gerados...');
  const requiredFiles = ['index.js', 'index.esm.js', 'index.d.ts'];
  const missingFiles = requiredFiles.filter(file => 
    !fs.existsSync(path.join(distPath, file))
  );

  if (missingFiles.length > 0) {
    throw new Error(`Arquivos não encontrados: ${missingFiles.join(', ')}`);
  }

  // 5. Mostrar estatísticas
  const stats = fs.statSync(path.join(distPath, 'index.js'));
  const sizeKB = (stats.size / 1024).toFixed(2);
  
  console.log('\n🎉 Build concluído com sucesso!');
  console.log(`📊 Tamanho da biblioteca: ${sizeKB} KB`);
  console.log(`📂 Arquivos disponíveis em: ${distPath}`);
  
} catch (error) {
  console.error('\n❌ Erro durante o build:');
  console.error(error.message);
  process.exit(1);
}
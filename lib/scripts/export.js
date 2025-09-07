#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function publishToNPM(versionType) {
  const versionMap = {
    '1': 'patch',
    '2': 'minor', 
    '3': 'major'
  };
  
  const version = versionMap[versionType] || 'patch';
  const releaseCommand = `npm run release:${version}`;

  // Verificar login NPM
  try {
    execSync('npm whoami', { stdio: 'pipe' });
  } catch {
    console.log('\n🔑 Faça login no NPM primeiro:');
    console.log('npm login');
    process.exit(1);
  }

  // Publicar no NPM
  console.log(`\n🚀 Publicando no NPM com versão ${version}...`);
  execSync(releaseCommand, { stdio: 'inherit', cwd: path.dirname(__dirname) });
  
  console.log('\n🎉 Biblioteca publicada no NPM com sucesso!');
  console.log('📖 Para usar: npm install @vitorandradecoelho/sd-components');
}

async function publishToBitBucket(versionType) {
  const versionMap = {
    '1': 'patch',
    '2': 'minor', 
    '3': 'major'
  };
  
  const version = versionMap[versionType] || 'patch';
  const libPath = path.dirname(__dirname);

  try {
    // 1. Atualizar versão no package.json
    console.log(`\n📦 Atualizando versão (${version})...`);
    execSync(`npm version ${version}`, { stdio: 'inherit', cwd: libPath });

    // 2. Verificar se há repositório Git configurado
    try {
      execSync('git remote -v', { stdio: 'pipe', cwd: libPath });
    } catch {
      console.log('\n❌ Repositório Git não configurado.');
      console.log('Configure primeiro: git remote add origin <url-do-bitbucket>');
      process.exit(1);
    }

    // 3. Verificar se há mudanças para commit
    const status = execSync('git status --porcelain', { encoding: 'utf8', cwd: libPath });
    if (status.trim()) {
      // 4. Fazer commit das mudanças
      console.log('\n📝 Fazendo commit das mudanças...');
      execSync('git add .', { stdio: 'inherit', cwd: libPath });
      
      const packageJson = JSON.parse(fs.readFileSync(path.join(libPath, 'package.json'), 'utf8'));
      const newVersion = packageJson.version;
      
      execSync(`git commit -m "chore: release v${newVersion}"`, { 
        stdio: 'inherit', 
        cwd: libPath 
      });

      // 5. Criar tag
      console.log(`\n🏷️  Criando tag v${newVersion}...`);
      execSync(`git tag v${newVersion}`, { stdio: 'inherit', cwd: libPath });
    }

    // 6. Push para BitBucket
    console.log('\n🚀 Enviando para BitBucket...');
    execSync('git push origin main', { stdio: 'inherit', cwd: libPath });
    execSync('git push origin --tags', { stdio: 'inherit', cwd: libPath });

    console.log('\n🎉 Biblioteca enviada para BitBucket com sucesso!');
    console.log('📖 Para usar localmente: npm link no diretório lib/');
    console.log(`🔗 Versão: v${JSON.parse(fs.readFileSync(path.join(libPath, 'package.json'), 'utf8')).version}`);

  } catch (error) {
    console.error('\n❌ Erro no fluxo BitBucket:');
    console.error(error.message);
    throw error;
  }
}

async function main() {
  console.log('📦 Exportador Automático da Biblioteca sd_components\n');

  try {
    // 1. Build da biblioteca
    console.log('🔨 Fazendo build da biblioteca...');
    execSync('node scripts/build.js', { stdio: 'inherit', cwd: path.dirname(__dirname) });

    // 2. Escolher repositório
    console.log('\n📋 Opções de publicação:');
    console.log('  1. NPM Registry (público)');
    console.log('  2. BitBucket Repository (versionamento)');
    console.log('  3. Apenas build (sem publicação)');
    
    const repoChoice = await question('\n❓ Escolha uma opção (1-3): ');
    
    if (repoChoice === '3') {
      console.log('\n✅ Build concluído! Biblioteca pronta em ./dist/');
      console.log('💡 Para testar localmente: npm link');
      return;
    }

    if (repoChoice !== '1' && repoChoice !== '2') {
      console.log('❌ Opção inválida. Saindo...');
      return;
    }

    // 3. Escolher tipo de versão
    console.log('\n📋 Tipos de versão disponíveis:');
    console.log('  1. patch (0.1.0 → 0.1.1) - Correções');
    console.log('  2. minor (0.1.0 → 0.2.0) - Novas funcionalidades');
    console.log('  3. major (0.1.0 → 1.0.0) - Mudanças incompatíveis');
    
    const versionType = await question('\n❓ Escolha o tipo de versão (1-3): ');

    // 4. Publicar conforme escolha
    if (repoChoice === '1') {
      await publishToNPM(versionType);
    } else if (repoChoice === '2') {
      await publishToBitBucket(versionType);
    }

  } catch (error) {
    console.error('\n❌ Erro durante o export:');
    console.error(error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
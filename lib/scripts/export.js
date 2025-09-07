#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('📦 Exportador Automático da Biblioteca sd_components\n');

  try {
    // 1. Build da biblioteca
    console.log('🔨 Fazendo build da biblioteca...');
    execSync('node scripts/build.js', { stdio: 'inherit', cwd: path.dirname(__dirname) });

    // 2. Verificar se é para publicar
    const shouldPublish = await question('\n❓ Deseja publicar no NPM? (y/N): ');
    
    if (shouldPublish.toLowerCase() === 'y' || shouldPublish.toLowerCase() === 'yes') {
      // 3. Escolher tipo de versão
      console.log('\n📋 Tipos de versão disponíveis:');
      console.log('  1. patch (0.1.0 → 0.1.1) - Correções');
      console.log('  2. minor (0.1.0 → 0.2.0) - Novas funcionalidades');
      console.log('  3. major (0.1.0 → 1.0.0) - Mudanças incompatíveis');
      
      const versionType = await question('\n❓ Escolha o tipo de versão (1-3): ');
      
      let releaseCommand;
      switch (versionType) {
        case '1':
          releaseCommand = 'npm run release:patch';
          break;
        case '2':
          releaseCommand = 'npm run release:minor';
          break;
        case '3':
          releaseCommand = 'npm run release:major';
          break;
        default:
          console.log('❌ Tipo inválido. Usando patch como padrão.');
          releaseCommand = 'npm run release:patch';
      }

      // 4. Verificar login NPM
      try {
        execSync('npm whoami', { stdio: 'pipe' });
      } catch {
        console.log('\n🔑 Faça login no NPM primeiro:');
        console.log('npm login');
        process.exit(1);
      }

      // 5. Publicar
      console.log(`\n🚀 Publicando com ${releaseCommand}...`);
      execSync(releaseCommand, { stdio: 'inherit', cwd: path.dirname(__dirname) });
      
      console.log('\n🎉 Biblioteca publicada com sucesso!');
      console.log('📖 Para usar: npm install sd_components');
      
    } else {
      console.log('\n✅ Build concluído! Biblioteca pronta em ./dist/');
      console.log('💡 Para testar localmente: npm link');
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
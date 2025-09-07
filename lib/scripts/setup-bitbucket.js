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

async function setupBitBucket() {
  console.log('🔧 Configuração do BitBucket para sd_components\n');

  try {
    const libPath = path.dirname(__dirname);
    
    // 1. Verificar se já existe repositório
    let hasRemote = false;
    try {
      const remotes = execSync('git remote -v', { encoding: 'utf8', cwd: libPath });
      if (remotes.includes('origin')) {
        console.log('📋 Repositório já configurado:');
        console.log(remotes);
        
        const overwrite = await question('\n❓ Deseja reconfigurar? (y/N): ');
        if (overwrite.toLowerCase() !== 'y') {
          console.log('✅ Mantendo configuração atual.');
          return;
        }
        hasRemote = true;
      }
    } catch {
      // Não há git ou remotes configurados
    }

    // 2. Obter URL do BitBucket
    console.log('\n📝 Digite a URL do repositório BitBucket:');
    console.log('Exemplo: https://usuario@bitbucket.org/usuario/projeto.git');
    const repoUrl = await question('URL: ');

    if (!repoUrl.includes('bitbucket.org')) {
      console.log('⚠️  URL não parece ser do BitBucket. Continuando mesmo assim...');
    }

    // 3. Configurar Git
    if (hasRemote) {
      console.log('\n🔄 Removendo origin existente...');
      execSync('git remote remove origin', { cwd: libPath });
    }

    console.log('\n🔗 Adicionando repositório BitBucket...');
    execSync(`git remote add origin ${repoUrl}`, { cwd: libPath });

    // 4. Verificar se há commits
    let hasCommits = false;
    try {
      execSync('git log --oneline -1', { stdio: 'pipe', cwd: libPath });
      hasCommits = true;
    } catch {
      // Não há commits ainda
    }

    if (!hasCommits) {
      console.log('\n📝 Fazendo commit inicial...');
      execSync('git add .', { cwd: libPath });
      execSync('git commit -m "feat: initial commit - sd_components library"', { cwd: libPath });
    }

    // 5. Configurar branch principal
    const currentBranch = execSync('git branch --show-current', { encoding: 'utf8', cwd: libPath }).trim();
    if (currentBranch !== 'main') {
      console.log('\n🌿 Renomeando branch para main...');
      execSync('git branch -M main', { cwd: libPath });
    }

    // 6. Push inicial
    const pushInitial = await question('\n❓ Fazer push inicial para BitBucket? (Y/n): ');
    if (pushInitial.toLowerCase() !== 'n') {
      console.log('\n🚀 Fazendo push inicial...');
      try {
        execSync('git push -u origin main', { stdio: 'inherit', cwd: libPath });
        console.log('\n🎉 Repositório configurado e sincronizado com sucesso!');
      } catch (error) {
        console.log('\n⚠️  Erro no push. Verifique suas credenciais e tente:');
        console.log('cd lib && git push -u origin main');
      }
    }

    // 7. Atualizar package.json com informações do repositório
    const updatePackage = await question('\n❓ Atualizar package.json com URL do repositório? (Y/n): ');
    if (updatePackage.toLowerCase() !== 'n') {
      const packagePath = path.join(libPath, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      packageJson.repository = {
        type: 'git',
        url: repoUrl
      };
      
      packageJson.homepage = repoUrl.replace('.git', '#readme');
      
      fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
      console.log('✅ package.json atualizado!');
    }

    console.log('\n📋 Próximos passos:');
    console.log('1. Use "npm run export" para publicar com versionamento');
    console.log('2. Escolha opção 2 (BitBucket Repository) no menu');
    console.log('3. Suas mudanças serão commitadas, taggeadas e enviadas automaticamente');

  } catch (error) {
    console.error('\n❌ Erro na configuração:');
    console.error(error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

setupBitBucket();
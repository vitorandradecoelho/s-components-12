#!/usr/bin/env node

/**
 * Script para remover automaticamente um componente dos arquivos index e deletar os arquivos
 * Uso: node scripts/remove-component.js NomeDoComponente
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cores para output no terminal
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}

function removeFromIndexFile(indexPath, componentName) {
  try {
    if (!fs.existsSync(indexPath)) {
      log(`⚠ Arquivo index não encontrado: ${indexPath}`, 'yellow');
      return false;
    }

    let content = fs.readFileSync(indexPath, 'utf-8');
    const lines = content.split('\n');
    
    // Filtra linhas que contêm referência ao componente
    const originalLength = lines.length;
    const filteredLines = lines.filter(line => {
      // Remove linhas que exportam o componente
      return !line.includes(`from './components/${componentName}'`) &&
             !line.includes(`from './${componentName}'`) &&
             !line.includes(`from './components/${componentName}.tsx'`) &&
             !line.includes(`from './${componentName}.tsx'`);
    });
    
    if (filteredLines.length === originalLength) {
      log(`⚠ ${componentName} não encontrado em ${indexPath}`, 'yellow');
      return false;
    }
    
    fs.writeFileSync(indexPath, filteredLines.join('\n'));
    log(`✓ Removido de ${indexPath}`, 'green');
    return true;
  } catch (error) {
    log(`✗ Erro ao atualizar ${indexPath}: ${error.message}`, 'red');
    return false;
  }
}

function deleteComponentFile(componentPath) {
  try {
    if (!fs.existsSync(componentPath)) {
      log(`⚠ Arquivo não encontrado: ${componentPath}`, 'yellow');
      return false;
    }
    
    fs.unlinkSync(componentPath);
    log(`✓ Arquivo deletado: ${componentPath}`, 'green');
    return true;
  } catch (error) {
    log(`✗ Erro ao deletar ${componentPath}: ${error.message}`, 'red');
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    log('❌ Uso: node scripts/remove-component.js NomeDoComponente', 'red');
    log('   Remove o componente dos index files e deleta os arquivos', 'blue');
    process.exit(1);
  }
  
  const componentName = args[0];
  
  log(`\n🗑️  Processando remoção do componente: ${componentName}\n`, 'blue');
  
  // Caminhos
  const libComponentPath = path.join(__dirname, '..', 'src', 'components', `${componentName}.tsx`);
  const srcComponentPath = path.join(__dirname, '..', '..', 'src', 'components', 'library', `${componentName}.tsx`);
  const libIndexPath = path.join(__dirname, '..', 'src', 'index.ts');
  const srcIndexPath = path.join(__dirname, '..', '..', 'src', 'components', 'library', 'index.ts');
  
  // Verificar se pelo menos um arquivo existe
  const libExists = fs.existsSync(libComponentPath);
  const srcExists = fs.existsSync(srcComponentPath);
  
  if (!libExists && !srcExists) {
    log(`❌ Componente ${componentName} não encontrado em nenhum local`, 'red');
    log(`   Procurado em:`, 'yellow');
    log(`   - ${libComponentPath}`, 'yellow');
    log(`   - ${srcComponentPath}`, 'yellow');
    process.exit(1);
  }
  
  // Confirmação
  log(`⚠️  Esta ação irá:`, 'yellow');
  if (libExists) log(`   - Deletar: ${libComponentPath}`, 'yellow');
  if (srcExists) log(`   - Deletar: ${srcComponentPath}`, 'yellow');
  log(`   - Remover exportações dos arquivos index`, 'yellow');
  log('');
  
  const confirm = await askQuestion('Deseja continuar? (s/n): ');
  
  if (confirm.toLowerCase() !== 's') {
    log('\n❌ Operação cancelada', 'red');
    process.exit(0);
  }
  
  log('');
  let success = true;
  
  // Remover dos index files primeiro
  log('📦 Removendo dos arquivos index...', 'blue');
  removeFromIndexFile(libIndexPath, componentName);
  removeFromIndexFile(srcIndexPath, componentName);
  
  log('');
  
  // Deletar arquivos
  log('🗑️  Deletando arquivos do componente...', 'blue');
  if (libExists) {
    if (!deleteComponentFile(libComponentPath)) {
      success = false;
    }
  }
  
  if (srcExists) {
    if (!deleteComponentFile(srcComponentPath)) {
      success = false;
    }
  }
  
  log('');
  if (success) {
    log('✅ Componente removido com sucesso!', 'green');
  } else {
    log('⚠ Processo concluído com avisos', 'yellow');
  }
}

main();

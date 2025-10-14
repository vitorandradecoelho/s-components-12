#!/usr/bin/env node

/**
 * Script para adicionar automaticamente um novo componente aos arquivos index
 * Uso: node scripts/add-component.js NomeDoComponente [--create]
 * Opções interativas: --api, --interface
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

function extractExports(componentPath) {
  try {
    const content = fs.readFileSync(componentPath, 'utf-8');
    const exports = [];
    
    // Extrai export do componente principal
    const componentNameMatch = content.match(/export\s+(?:const|function)\s+(\w+)/);
    if (componentNameMatch) {
      exports.push(componentNameMatch[1]);
    }
    
    // Extrai tipos/interfaces exportados
    const typeExports = content.matchAll(/export\s+(?:type|interface)\s+(\w+)/g);
    for (const match of typeExports) {
      exports.push(`type ${match[1]}`);
    }
    
    // Extrai hooks exportados
    const hookExports = content.matchAll(/export\s+(?:const|function)\s+(use\w+)/g);
    for (const match of hookExports) {
      exports.push(match[1]);
    }
    
    return exports;
  } catch (error) {
    return [];
  }
}

function updateIndexFile(indexPath, componentName, exports, isLibIndex = false) {
  try {
    let content = fs.readFileSync(indexPath, 'utf-8');
    const lines = content.split('\n');
    
    // Monta a linha de export
    const basePath = isLibIndex ? './components' : './';
    let exportLine;
    
    if (exports.length === 0) {
      exportLine = `export { ${componentName} } from '${basePath}${componentName}';`;
    } else {
      const mainExport = exports.find(e => !e.startsWith('type ') && !e.startsWith('use'));
      const types = exports.filter(e => e.startsWith('type ')).map(e => e.replace('type ', ''));
      const hooks = exports.filter(e => e.startsWith('use'));
      
      const exportParts = [mainExport];
      if (types.length > 0) {
        exportParts.push(`type ${types.join(', type ')}`);
      }
      if (hooks.length > 0) {
        exportParts.push(...hooks);
      }
      
      exportLine = `export { ${exportParts.join(', ')} } from '${basePath}${componentName}';`;
    }
    
    // Verifica se já existe
    if (content.includes(`from '${basePath}${componentName}'`)) {
      log(`⚠ ${componentName} já existe em ${indexPath}`, 'yellow');
      return false;
    }
    
    // Adiciona no final, antes da última linha vazia
    let insertIndex = lines.length;
    while (insertIndex > 0 && lines[insertIndex - 1].trim() === '') {
      insertIndex--;
    }
    
    lines.splice(insertIndex, 0, exportLine);
    
    fs.writeFileSync(indexPath, lines.join('\n'));
    log(`✓ Adicionado em ${indexPath}`, 'green');
    return true;
  } catch (error) {
    log(`✗ Erro ao atualizar ${indexPath}: ${error.message}`, 'red');
    return false;
  }
}

async function createComponentTemplate(componentName, componentPath, options = {}) {
  const { useApi, apiUrl, useInterface, interfaceName } = options;
  
  let imports = `import React from 'react';\nimport { cn } from '@/lib/utils';`;
  
  if (useApi) {
    imports += `\nimport { useState, useEffect } from 'react';`;
  }
  
  let interfaces = '';
  if (useInterface && interfaceName) {
    interfaces = `\nexport interface ${interfaceName} {
  id: string;
  // Adicione os campos necessários aqui
}\n`;
  }
  
  interfaces += `\nexport interface ${componentName}Props {
  /** Additional CSS classes */
  className?: string;`;
  
  if (useApi && apiUrl) {
    interfaces += `\n  /** API base URL */\n  apiBaseUrl?: string;`;
  }
  
  if (useInterface && interfaceName) {
    interfaces += `\n  /** Data items */\n  items?: ${interfaceName}[];`;
  }
  
  interfaces += `\n  /** Component children */\n  children?: React.ReactNode;\n}`;
  
  let componentBody = '';
  
  if (useApi) {
    const defaultUrl = apiUrl || 'https://api.example.com';
    componentBody = `  const [data, setData] = useState${useInterface && interfaceName ? `<${interfaceName}[]>` : ''}([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiBaseUrl || '${defaultUrl}');
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [apiBaseUrl]);
  
  if (loading) return <div className={cn("", className)}>Carregando...</div>;
  if (error) return <div className={cn("text-destructive", className)}>Erro: {error}</div>;`;
  } else {
    componentBody = `  // Implemente a lógica do componente aqui`;
  }
  
  const propsDestructure = useApi && apiUrl 
    ? `{\n  className,\n  apiBaseUrl,${useInterface && interfaceName ? '\n  items,' : ''}\n  children,\n}` 
    : `{\n  className,\n  children,\n}`;
  
  const template = `${imports}
${interfaces}

export const ${componentName}: React.FC<${componentName}Props> = (${propsDestructure}) => {
${componentBody}
  
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
};
`;

  try {
    if (fs.existsSync(componentPath)) {
      log(`⚠ Componente ${componentName} já existe em ${componentPath}`, 'yellow');
      return false;
    }
    
    fs.writeFileSync(componentPath, template);
    log(`✓ Componente criado em ${componentPath}`, 'green');
    return true;
  } catch (error) {
    log(`✗ Erro ao criar componente: ${error.message}`, 'red');
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    log('❌ Uso: node scripts/add-component.js NomeDoComponente [--create]', 'red');
    log('   --create: Cria o arquivo do componente com template básico', 'blue');
    log('   Opções interativas disponíveis durante a criação', 'blue');
    process.exit(1);
  }
  
  const componentName = args[0];
  const shouldCreate = args.includes('--create');
  
  let options = {};
  
  // Perguntas interativas se estiver criando o componente
  if (shouldCreate) {
    log('\n📋 Configuração do componente:', 'blue');
    
    const useApiResponse = await askQuestion('O componente usa API/URL? (s/n): ');
    const useApi = useApiResponse.toLowerCase() === 's';
    
    let apiUrl = '';
    if (useApi) {
      apiUrl = await askQuestion('Qual a URL base da API? (ex: https://api.example.com/endpoint): ');
    }
    
    const useInterfaceResponse = await askQuestion('O componente usa interface de dados específica? (s/n): ');
    const useInterface = useInterfaceResponse.toLowerCase() === 's';
    
    let interfaceName = '';
    if (useInterface) {
      interfaceName = await askQuestion(`Nome da interface (ex: ${componentName}Data): `);
    }
    
    options = { useApi, apiUrl, useInterface, interfaceName };
    log('');
  }
  
  log(`\n🚀 Processando componente: ${componentName}\n`, 'blue');
  
  // Caminhos
  const libComponentPath = path.join(__dirname, '..', 'src', 'components', `${componentName}.tsx`);
  const srcComponentPath = path.join(__dirname, '..', '..', 'src', 'components', 'library', `${componentName}.tsx`);
  const libIndexPath = path.join(__dirname, '..', 'src', 'index.ts');
  const srcIndexPath = path.join(__dirname, '..', '..', 'src', 'components', 'library', 'index.ts');
  
  let success = true;
  
  // Criar componente se solicitado
  if (shouldCreate) {
    log('📝 Criando arquivos do componente...', 'blue');
    await createComponentTemplate(componentName, libComponentPath, options);
    await createComponentTemplate(componentName, srcComponentPath, options);
    log('');
  }
  
  // Verificar se o componente existe
  const componentExists = fs.existsSync(libComponentPath);
  
  if (!componentExists && !shouldCreate) {
    log(`⚠ Componente não encontrado em ${libComponentPath}`, 'yellow');
    log('   Use --create para criar o componente automaticamente', 'blue');
    log('');
  }
  
  // Extrair exports do componente
  const exports = componentExists ? extractExports(libComponentPath) : [];
  
  log('📦 Atualizando arquivos index...', 'blue');
  
  // Atualizar lib/src/index.ts
  if (!updateIndexFile(libIndexPath, componentName, exports, true)) {
    success = false;
  }
  
  // Atualizar src/components/library/index.ts
  if (!updateIndexFile(srcIndexPath, componentName, exports, false)) {
    success = false;
  }
  
  log('');
  if (success) {
    log('✅ Componente adicionado com sucesso!', 'green');
    log(`\n💡 Agora você pode importar: import { ${componentName} } from '@vitorandradecoelho/sd-components';`, 'blue');
  } else {
    log('⚠ Processo concluído com avisos', 'yellow');
  }
}

main();

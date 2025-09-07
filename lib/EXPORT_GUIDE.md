# 🚀 Guia de Exportação Automatizada

Esta biblioteca possui scripts automatizados para facilitar o build e export dos componentes.

## 📋 Scripts Disponíveis

### 🔨 Build Automatizado
```bash
cd lib
npm run build:auto
```
- Limpa pasta dist
- Verifica dependências  
- Compila a biblioteca
- Valida arquivos gerados
- Mostra estatísticas

### 📦 Export Completo (Recomendado)
```bash
cd lib
npm run export
```
- Faz build automatizado
- Pergunta se deseja publicar no NPM
- Permite escolher tipo de versão (patch/minor/major)
- Publica automaticamente

### 👀 Modo Watch (Desenvolvimento)
```bash
cd lib  
npm run watch
```
- Monitora mudanças nos arquivos .tsx/.ts
- Rebuild automático quando detecta mudanças
- Ideal para desenvolvimento contínuo

## 🎯 Fluxo Recomendado

### Para Desenvolvimento:
1. `npm run watch` - Monitora e rebuilda automaticamente
2. Edite os componentes normalmente
3. A biblioteca é recompilada a cada mudança

### Para Publicação:
1. `npm run export` - Script interativo completo
2. Escolha o tipo de versão apropriado:
   - **patch** (0.1.0 → 0.1.1): Correções de bugs
   - **minor** (0.1.0 → 0.2.0): Novas funcionalidades
   - **major** (0.1.0 → 1.0.0): Mudanças incompatíveis
3. Confirme a publicação no NPM

## 📖 Uso da Biblioteca Exportada

Após publicação, instale em outros projetos:

```bash
npm install sd_components
```

Importe os componentes:

```typescript
import { Input, Select, Button, Toast } from 'sd_components';

// Uso básico
<Input label="Nome" placeholder="Digite seu nome" />
<Select options={options} placeholder="Selecione..." />
<Button variant="primary">Clique aqui</Button>

// Toast notifications  
Toast.success('Sucesso!', 'Operação realizada');
```

## 🛠️ Comandos Manuais (Avançado)

Se preferir controle manual:

```bash
# Build simples
npm run build

# Versioning manual
npm run version:patch  # ou minor/major
npm run publish:npm

# Build com watch nativo do Rollup
npm run build:watch
```

## 💡 Dicas

- Use `npm run export` para um processo completo e guiado
- O modo `watch` é perfeito para desenvolvimento ativo
- Sempre teste localmente antes de publicar
- Mantenha as versões semânticas (semver)
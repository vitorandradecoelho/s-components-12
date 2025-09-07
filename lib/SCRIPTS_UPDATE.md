# 🔧 Atualização de Scripts - package.json

Para facilitar o uso dos novos fluxos, adicione este script ao `lib/package.json`:

## Scripts para adicionar:

```json
{
  "scripts": {
    "setup:bitbucket": "node scripts/setup-bitbucket.js",
    "export": "node scripts/export.js",
    "build:auto": "node scripts/build.js"
  }
}
```

## Como adicionar:

1. Abra `lib/package.json`
2. Encontre a seção `"scripts"`
3. Adicione as linhas acima
4. Salve o arquivo

## Scripts disponíveis após atualização:

### Configuração inicial:
```bash
cd lib
npm run setup:bitbucket
```

### Export com opções:
```bash
cd lib  
npm run export
```

### Build automatizado:
```bash
cd lib
npm run build:auto
```

## Versão completa da seção scripts:

```json
{
  "scripts": {
    "build": "rollup -c",
    "build:watch": "rollup -c -w",
    "watch": "node scripts/watch.js",
    "build:auto": "node scripts/build.js",
    "export": "node scripts/export.js",
    "setup:bitbucket": "node scripts/setup-bitbucket.js",
    "version:patch": "node scripts/version.js patch",
    "version:minor": "node scripts/version.js minor", 
    "version:major": "node scripts/version.js major",
    "release:patch": "npm run build && npm run version:patch && npm publish",
    "release:minor": "npm run build && npm run version:minor && npm publish",
    "release:major": "npm run build && npm run version:major && npm publish",
    "prepublishOnly": "npm run build"
  }
}
```
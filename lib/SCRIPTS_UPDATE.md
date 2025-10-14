# 🔧 Atualização de Scripts - package.json

Para facilitar o uso dos novos fluxos, adicione estes scripts ao `lib/package.json`:

## Scripts para adicionar:

```json
{
  "scripts": {
    "setup:bitbucket": "node scripts/setup-bitbucket.js",
    "export": "node scripts/export.js",
    "build:auto": "node scripts/build.js",
    "add-component": "node scripts/add-component.js"
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

### Adicionar novo componente (NOVO!):
```bash
cd lib
npm run add-component NomeDoComponente

# Ou criar com template (recomendado):
npm run add-component NomeDoComponente --create

# Com --create, o script perguntará:
# - O componente usa API/URL? (s/n)
# - Qual a URL base da API? (se usar API)
# - O componente usa interface de dados específica? (s/n)
# - Nome da interface (se usar interface)
#
# O código será gerado automaticamente com:
# ✅ Fetch e estados (se usar API)
# ✅ Loading e error handling
# ✅ Interfaces customizadas (se especificado)
# ✅ TypeScript completamente tipado
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
    "add-component": "node scripts/add-component.js",
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

## Documentação dos Scripts

- **add-component**: Ver [ADD_COMPONENT_GUIDE.md](./ADD_COMPONENT_GUIDE.md) para guia completo
- **export**: Ver [EXPORT_GUIDE.md](./EXPORT_GUIDE.md)
- **setup:bitbucket**: Ver [BITBUCKET_SETUP.md](./BITBUCKET_SETUP.md)

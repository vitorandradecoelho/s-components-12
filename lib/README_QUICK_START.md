# ⚡ Quick Start - sd_components

## 🎯 Escolha seu fluxo:

### 🔵 NPM (Registro Público)
```bash
cd lib
npm run export
# Escolha: 1. NPM Registry
# Suas atualizações ficam públicas no npm
```

### 🟢 BitBucket (Versionamento Privado)
```bash
cd lib
npm run setup:bitbucket  # Primeira vez
npm run export
# Escolha: 2. BitBucket Repository
# Versionamento privado com Git tags
```

### 🟡 Apenas Build (Desenvolvimento Local)
```bash
cd lib
npm run build:auto
# ou
npm run export
# Escolha: 3. Apenas build
```

## 📋 Scripts Principais:

| Script | Comando | Função |
|--------|---------|--------|
| **Setup BitBucket** | `npm run setup:bitbucket` | Configura repo BitBucket (uma vez) |
| **Export Completo** | `npm run export` | Menu com todas opções |
| **Build Automático** | `npm run build:auto` | Build + validação |
| **Watch Mode** | `npm run watch` | Rebuild automático |

## 🔄 Fluxos Detalhados:

- 📖 **NPM**: Ver `EXPORT_GUIDE.md`
- 🌿 **BitBucket**: Ver `BITBUCKET_WORKFLOW.md` 
- ⚙️ **Setup**: Ver `BITBUCKET_SETUP.md`

## 🚀 Start Rápido (BitBucket):

1. `npm run setup:bitbucket`
2. Configure URL do repositório
3. `npm run export` → Opção 2
4. Escolha tipo de versão
5. ✅ Pronto!
# 🌿 Fluxo BitBucket - sd_components

Este guia detalha o fluxo completo para usar BitBucket como repositório de versionamento da biblioteca.

## 🚀 Configuração Inicial (Uma vez)

### 1. Execute o script de configuração:
```bash
cd lib
node scripts/setup-bitbucket.js
```

**O que este script faz:**
- ✅ Configura o repositório BitBucket como origin
- ✅ Faz commit inicial se necessário
- ✅ Configura branch principal (main)
- ✅ Atualiza package.json com info do repositório
- ✅ Faz push inicial opcional

### 2. Verificação da configuração:
```bash
cd lib
git remote -v
# Deve mostrar: origin https://usuario@bitbucket.org/usuario/projeto.git
```

## 📦 Fluxo de Publicação

### 1. Fazer alterações nos componentes
```bash
# Trabalhe normalmente nos arquivos em lib/src/
vim lib/src/components/MeuComponente.tsx
```

### 2. Executar export automatizado
```bash
cd lib
npm run export
```

### 3. Menu interativo:
```
📋 Opções de publicação:
  1. NPM Registry (público)
  2. BitBucket Repository (versionamento)  ← Escolha esta
  3. Apenas build (sem publicação)

❓ Escolha uma opção (1-3): 2
```

### 4. Escolha do tipo de versão:
```
📋 Tipos de versão disponíveis:
  1. patch (0.1.0 → 0.1.1) - Correções
  2. minor (0.1.0 → 0.2.0) - Novas funcionalidades  
  3. major (0.1.0 → 1.0.0) - Mudanças incompatíveis

❓ Escolha o tipo de versão (1-3): 2
```

## 🔄 O que acontece automaticamente:

1. **📦 Build**: Compila a biblioteca
2. **🔢 Versioning**: Atualiza package.json com nova versão
3. **📝 Commit**: Faz commit com mensagem padrão "chore: release vX.X.X"
4. **🏷️ Tag**: Cria tag Git com a versão (v0.2.0)
5. **🚀 Push**: Envia commits e tags para BitBucket

## 📁 Estrutura de Branches Recomendada

```
main (branch principal)
├── feature/novo-componente
├── fix/correcao-bug
└── release/v0.2.0
```

### Fluxo com branches:
```bash
# Criar feature branch
git checkout -b feature/novo-componente

# Fazer alterações e commits
git add .
git commit -m "feat: adicionar novo componente"

# Push da feature
git push origin feature/novo-componente

# No BitBucket: criar Pull Request
# Após merge: usar script de export na main
```

## 🔍 Verificação de Releases

### No BitBucket:
1. Vá para **Repositório > Tags**
2. Veja todas as versões criadas
3. Compare diferenças entre versões

### Localmente:
```bash
cd lib
git tag -l  # Lista todas as tags
git show v0.2.0  # Mostra detalhes da versão
```

## 📊 Histórico de Mudanças

O arquivo `CHANGELOG.md` é atualizado automaticamente:
```bash
cd lib
cat CHANGELOG.md
```

## 🛠️ Comandos Úteis

### Verificar status:
```bash
cd lib
git status
git log --oneline -5
```

### Reverter versão (se necessário):
```bash
cd lib
git reset --hard HEAD~1  # Remove último commit
git tag -d v0.2.0        # Remove tag local
git push origin :v0.2.0  # Remove tag remota
```

### Sincronizar com remoto:
```bash
cd lib
git pull origin main
git fetch --tags
```

## ⚠️ Resolução de Problemas

### Problema: "Repository not configured"
**Solução:**
```bash
cd lib
node scripts/setup-bitbucket.js
```

### Problema: "Authentication failed"
**Solução:**
```bash
# Para HTTPS com token:
git remote set-url origin https://TOKEN@bitbucket.org/usuario/projeto.git

# Para SSH:
git remote set-url origin git@bitbucket.org:usuario/projeto.git
```

### Problema: "Nothing to commit"
**Solução:**
```bash
cd lib
git add .
git status  # Verificar se há mudanças
```

## 🎯 Boas Práticas

1. **Sempre teste localmente** antes de fazer release
2. **Use versões semânticas** (patch/minor/major)
3. **Mantenha commits descritivos**
4. **Faça backup** antes de mudanças grandes
5. **Use branches** para features grandes
6. **Documente mudanças** no CHANGELOG.md

## 🔗 Links Úteis

- [BitBucket Git Tutorial](https://www.atlassian.com/git/tutorials)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
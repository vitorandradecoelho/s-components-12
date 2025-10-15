# Guia de Remoção de Componentes

Este guia explica como usar o script `remove-component.js` para remover componentes da biblioteca de forma automatizada.

## Uso Básico

```bash
cd lib
npm run remove-component -- NomeDoComponente
```

## O que o Script Faz

O script `remove-component` executa as seguintes ações automaticamente:

1. **Remove as exportações** dos arquivos index:
   - `lib/src/index.ts`
   - `src/components/library/index.ts`

2. **Deleta os arquivos** do componente:
   - `lib/src/components/NomeDoComponente.tsx`
   - `src/components/library/NomeDoComponente.tsx`

3. **Solicita confirmação** antes de executar as ações destrutivas

## Exemplo de Uso

```bash
# Remover o componente Accordion
npm run remove-component -- Accordion
```

### Fluxo de Execução

```
🗑️  Processando remoção do componente: Accordion

⚠️  Esta ação irá:
   - Deletar: lib/src/components/Accordion.tsx
   - Deletar: src/components/library/Accordion.tsx
   - Remover exportações dos arquivos index

Deseja continuar? (s/n): s

📦 Removendo dos arquivos index...
✓ Removido de lib/src/index.ts
✓ Removido de src/components/library/index.ts

🗑️  Deletando arquivos do componente...
✓ Arquivo deletado: lib/src/components/Accordion.tsx
✓ Arquivo deletado: src/components/library/Accordion.tsx

✅ Componente removido com sucesso!
```

## Casos Especiais

### Componente Não Encontrado

Se o componente não existir em nenhum local, o script exibirá um erro:

```
❌ Componente MeuComponente não encontrado em nenhum local
   Procurado em:
   - lib/src/components/MeuComponente.tsx
   - src/components/library/MeuComponente.tsx
```

### Cancelar Operação

Se você cancelar a confirmação digitando 'n', a operação será cancelada sem fazer alterações:

```
Deseja continuar? (s/n): n

❌ Operação cancelada
```

## Importante

⚠️ **ATENÇÃO**: Esta operação é **DESTRUTIVA** e não pode ser desfeita facilmente!

- Certifique-se de ter um backup ou commit do seu código antes de remover componentes
- Verifique se o componente não está sendo usado em outras partes do projeto
- Use o Git para reverter mudanças se necessário

## Workflow Completo

### 1. Verificar uso do componente

Antes de remover, verifique onde o componente está sendo usado:

```bash
# Buscar referências ao componente
grep -r "import.*MeuComponente" src/
grep -r "from.*MeuComponente" src/
```

### 2. Remover o componente

```bash
cd lib
npm run remove-component -- MeuComponente
```

### 3. Rebuild a biblioteca

```bash
npm run build
```

### 4. Commit das mudanças

```bash
git add .
git commit -m "Remove MeuComponente from library"
```

## Scripts Relacionados

- `add-component`: Adiciona um novo componente à biblioteca
- `build`: Compila a biblioteca
- `export`: Exporta componentes para uso externo

## Troubleshooting

### "Arquivo não encontrado"

Se você vir avisos sobre arquivos não encontrados, mas a operação for concluída com sucesso, isso significa que o componente existia em apenas um dos locais (lib ou src).

### Exportação ainda aparece no index

Se após a remoção a exportação ainda aparecer no index, verifique manualmente os arquivos:
- `lib/src/index.ts`
- `src/components/library/index.ts`

E remova manualmente as linhas que referenciam o componente.

## Dicas

1. **Sempre confirme**: Leia atentamente o que será removido antes de confirmar
2. **Use controle de versão**: Commit antes de remover componentes importantes
3. **Verifique dependências**: Certifique-se de que nenhum outro componente depende do que será removido
4. **Teste após remoção**: Execute `npm run build` para garantir que não há erros de compilação

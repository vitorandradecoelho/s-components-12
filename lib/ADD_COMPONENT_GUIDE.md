# 🎯 Guia de Adição Automática de Componentes

Este guia explica como usar o script automatizado para adicionar novos componentes à biblioteca sem precisar editar manualmente os arquivos `index.ts`.

## 📋 Pré-requisitos

Adicione este script ao `lib/package.json` na seção `"scripts"`:

```json
{
  "scripts": {
    "add-component": "node scripts/add-component.js"
  }
}
```

## 🚀 Uso Básico

### Opção 1: Adicionar Componente Existente aos Index

Se você já criou o componente manualmente em `lib/src/components/NomeDoComponente.tsx`:

```bash
cd lib
npm run add-component NomeDoComponente
```

### Opção 2: Criar Componente e Adicionar aos Index

Para criar o componente automaticamente com um template básico E adicionar aos index:

```bash
cd lib
npm run add-component NomeDoComponente --create
```

## 📁 O que o Script Faz Automaticamente

### 1. **Extrai Exports do Componente**
   - Identifica o componente principal
   - Encontra tipos e interfaces exportados
   - Detecta hooks personalizados (useAlgo)

### 2. **Atualiza `lib/src/index.ts`**
   - Adiciona export do componente
   - Inclui todos os tipos e interfaces
   - Mantém a formatação existente

### 3. **Atualiza `src/components/library/index.ts`**
   - Adiciona export para uso no projeto de demonstração
   - Sincroniza com o index da biblioteca

### 4. **Cria Template do Componente** (com --create)
   - Gera arquivo `.tsx` com estrutura básica
   - Inclui props interface
   - Adiciona suporte a className e children

## 🎨 Template Gerado (com --create)

```typescript
import React from 'react';
import { cn } from '@/lib/utils';

export interface NomeDoComponenteProps {
  /** Additional CSS classes */
  className?: string;
  /** Component children */
  children?: React.ReactNode;
}

export const NomeDoComponente: React.FC<NomeDoComponenteProps> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
};
```

## 📊 Exemplos Práticos

### Exemplo 1: Botão Personalizado

```bash
cd lib
npm run add-component Button --create
```

**Resultado:**
- ✓ Cria `lib/src/components/Button.tsx`
- ✓ Cria `src/components/library/Button.tsx`
- ✓ Adiciona `export { Button, type ButtonProps } from './components/Button';` em `lib/src/index.ts`
- ✓ Adiciona `export { Button, type ButtonProps } from './Button';` em `src/components/library/index.ts`

### Exemplo 2: Adicionar Componente Existente

Se você já criou `lib/src/components/Card.tsx`:

```bash
cd lib
npm run add-component Card
```

**Resultado:**
- ✓ Analisa `Card.tsx` para extrair exports
- ✓ Adiciona exports apropriados nos arquivos index

### Exemplo 3: Componente com Múltiplos Exports

Se seu componente exporta:
```typescript
export const Modal: React.FC<ModalProps> = ...
export interface ModalProps { ... }
export type ModalSize = 'sm' | 'md' | 'lg';
export const useModal = () => { ... }
```

O script automaticamente gera:
```typescript
export { Modal, type ModalProps, type ModalSize, useModal } from './components/Modal';
```

## ⚙️ Detecção Inteligente de Exports

O script detecta automaticamente:

### Componentes
```typescript
export const Component = ...
export function Component() ...
```

### Tipos e Interfaces
```typescript
export type SomeType = ...
export interface SomeInterface { ... }
```

### Hooks Personalizados
```typescript
export const useSomeHook = () => { ... }
export function useSomeHook() { ... }
```

## 🔄 Fluxo de Trabalho Recomendado

### Para Novos Componentes:

1. **Criar componente com template:**
   ```bash
   cd lib
   npm run add-component NomeDoComponente --create
   ```

2. **Editar o componente:**
   - Abra `lib/src/components/NomeDoComponente.tsx`
   - Implemente a lógica do componente
   - Adicione props e funcionalidades

3. **Build e teste:**
   ```bash
   npm run build
   ```

4. **Publicar (quando pronto):**
   ```bash
   npm run export
   ```

### Para Componentes Já Criados:

1. **Adicionar aos index:**
   ```bash
   cd lib
   npm run add-component NomeDoComponente
   ```

2. **Verificar e testar:**
   ```bash
   npm run build
   ```

## 🎯 Vantagens

✅ **Economia de Tempo**: Não precisa editar múltiplos arquivos index manualmente  
✅ **Sem Erros**: Elimina erros de digitação nos exports  
✅ **Consistência**: Mantém padrão uniforme em todos os componentes  
✅ **Automação**: Detecta automaticamente tipos, interfaces e hooks  
✅ **Template**: Cria estrutura básica consistente para novos componentes

## 🐛 Troubleshooting

### Erro: "Componente já existe"
```bash
⚠ NomeDoComponente já existe em lib/src/index.ts
```
**Solução**: O componente já foi adicionado. Verifique o arquivo index manualmente.

### Erro: "Componente não encontrado"
```bash
⚠ Componente não encontrado em lib/src/components/NomeDoComponente.tsx
```
**Solução**: Use a flag `--create` ou crie o arquivo manualmente primeiro.

### Múltiplos Exports Não Detectados
**Solução**: O script detecta exports padrão. Para casos complexos, edite o index manualmente após rodar o script.

## 💡 Dicas

1. **Sempre use PascalCase** para nomes de componentes (ex: `MyButton`, não `myButton`)
2. **Use --create** para garantir estrutura consistente
3. **Execute `npm run build`** após adicionar para verificar se tudo está correto
4. **Commit os arquivos index** junto com o componente novo

## 📚 Scripts Relacionados

- `npm run build` - Compila a biblioteca
- `npm run watch` - Monitora mudanças e rebuilda
- `npm run export` - Build e publicação completa
- `npm run add-component` - Adiciona novo componente (este script)

## 🔗 Próximos Passos

Após adicionar o componente:

1. Criar documentação em `src/pages/NomeDoComponenteDocs.tsx`
2. Adicionar exemplos de uso
3. Testar no projeto de demonstração
4. Fazer build e publicar quando pronto

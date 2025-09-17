# Guia de Carregamento de Estilos

Este guia explica como garantir que os estilos da biblioteca `@vitorandradecoelho/sd-components` sejam carregados corretamente em seu projeto.

## Problema Comum

Ao importar componentes da biblioteca em outros projetos, os estilos CSS podem não ser carregados automaticamente, resultando em componentes sem estilização.

## Soluções

### 1. Importação Automática (Recomendada)

Os componentes principais como `LinhaTrajetoSelector` já importam os estilos automaticamente:

```tsx
import { LinhaTrajetoSelector } from '@vitorandradecoelho/sd-components';

// Os estilos são carregados automaticamente
function MyComponent() {
  return <LinhaTrajetoSelector />;
}
```

### 2. StyleProvider

Use o `StyleProvider` para controlar manualmente quando os estilos são carregados:

```tsx
import { StyleProvider, LinhaTrajetoSelector } from '@vitorandradecoelho/sd-components';

function App() {
  return (
    <StyleProvider>
      <LinhaTrajetoSelector />
    </StyleProvider>
  );
}
```

### 3. Hook useStyles

Use o hook `useStyles` para garantir que os estilos sejam carregados:

```tsx
import { useStyles, LinhaTrajetoSelector } from '@vitorandradecoelho/sd-components';

function MyComponent() {
  const stylesLoaded = useStyles();
  
  return <LinhaTrajetoSelector />;
}
```

### 4. Função loadStyles

Para carregamento programático dos estilos:

```tsx
import { loadStyles, LinhaTrajetoSelector } from '@vitorandradecoelho/sd-components';

async function MyComponent() {
  await loadStyles(); // Carrega os estilos antes de renderizar
  
  return <LinhaTrajetoSelector />;
}
```

### 5. Importação Manual do CSS

Se nenhuma das opções acima funcionar, importe o CSS diretamente:

```tsx
import '@vitorandradecoelho/sd-components/dist/styles.css';
import { LinhaTrajetoSelector } from '@vitorandradecoelho/sd-components';
```

## Verificação

Para verificar se os estilos foram carregados corretamente:

1. Abra as ferramentas de desenvolvedor
2. Vá para a aba "Elements" ou "Elementos"
3. Procure por uma tag `<style>` ou `<link>` contendo os estilos da biblioteca
4. Os componentes devem aparecer com a estilização adequada

## Troubleshooting

### Estilos não aparecem
- Verifique se está importando os componentes corretamente
- Tente usar uma das soluções manuais (StyleProvider ou importação do CSS)
- Verifique se não há conflitos com outros frameworks CSS

### Conflitos de CSS
- Use o `StyleProvider` para isolar os estilos
- Verifique a especificidade do CSS do seu projeto
- Considere usar CSS Modules ou styled-components para isolamento

### Performance
- A importação automática é a mais eficiente para a maioria dos casos
- Use `loadStyles()` apenas quando necessário controle programático
- O `StyleProvider` é útil para lazy loading de estilos
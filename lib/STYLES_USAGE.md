# Como Importar CSS como Componente

Este guia mostra as diferentes formas de importar e usar os estilos CSS da biblioteca `@vitorandradecoelho/sd-components`.

## ⚠️ PROBLEMA COMUM: CSS Não Carregando

**Se os componentes aparecem sem estilização quando importados via npm**, use uma das soluções abaixo:

## 🎨 Soluções de Importação

### 1. **Importação Automática (Recomendado)**

Os componentes principais já importam estilos automaticamente:

```javascript
// ✅ Os estilos são carregados automaticamente
import { LinhaTrajetoSelector, Input, Alert } from '@vitorandradecoelho/sd-components';

function App() {
  return (
    <div>
      <LinhaTrajetoSelector linhas={dados} />
      <Input label="Nome" />
      <Alert>Funcionando perfeitamente!</Alert>
    </div>
  );
}
```

### 2. **StyleProvider - Controle Manual**

```javascript
import { StyleProvider, LinhaTrajetoSelector } from '@vitorandradecoelho/sd-components';

function App() {
  return (
    <StyleProvider>
      <div>
        <LinhaTrajetoSelector linhas={dados} />
        <Alert>Estilos carregados via componente!</Alert>
      </div>
    </StyleProvider>
  );
}
```

### 3. **Hook useStyles - Carregamento Programático**

```javascript
import { useStyles, LinhaTrajetoSelector } from '@vitorandradecoelho/sd-components';

function MyComponent() {
  const stylesLoaded = useStyles(); // Carrega estilos automaticamente
  
  if (!stylesLoaded) {
    return <div>Carregando estilos...</div>;
  }
  
  return <LinhaTrajetoSelector linhas={dados} />;
}
```

### 4. **Função loadStyles - Controle Assíncrono**

```javascript
import { loadStyles, LinhaTrajetoSelector } from '@vitorandradecoelho/sd-components';

async function MyComponent() {
  const success = await loadStyles(); // Carrega estilos antes de renderizar
  
  if (!success) {
    console.warn('Não foi possível carregar os estilos');
  }
  
  return <LinhaTrajetoSelector linhas={dados} />;
}
```

### 5. **Importação Manual do CSS (Último Recurso)**

```javascript
// No seu arquivo principal (App.tsx ou index.tsx)
import '@vitorandradecoelho/sd-components/dist/styles.css';

// Depois importe os componentes normalmente
import { LinhaTrajetoSelector, Input } from '@vitorandradecoelho/sd-components';

function App() {
  return (
    <div>
      <LinhaTrajetoSelector linhas={dados} />
      <Input label="Nome" />
    </div>
  );
}
```

## 🚀 Casos de Uso

### **Quando usar cada opção:**

**Importação Automática** ✅
- Uso padrão da biblioteca
- Mais simples e direto
- Recomendado para a maioria dos casos

**StyleProvider** 🎯
- Quando você quer controle manual sobre os estilos
- Para lazy loading de estilos
- Em aplicações com code splitting

**Importação Manual** ⚙️
- Quando você precisa de controle total
- Para otimizações específicas de bundle
- Em configurações customizadas do build

**Hook useStyles** 🔍
- Para debug e verificação
- Em casos onde você precisa confirmar que os estilos foram carregados

## 📝 Exemplo Completo

```javascript
import React from 'react';
import { 
  StyleProvider, 
  Input, 
  Select, 
  Alert, 
  useStyles,
  type SelectOption 
} from '@vitorandradecoelho/sd-components';

function App() {
  const stylesReady = useStyles();
  
  const options: SelectOption[] = [
    { label: 'Opção 1', value: '1' },
    { label: 'Opção 2', value: '2' }
  ];

  return (
    <StyleProvider>
      <div className="p-6 space-y-4">
        {stylesReady && (
          <>
            <Alert variant="success">
              Estilos carregados como componente!
            </Alert>
            
            <Input 
              label="Nome" 
              placeholder="Digite aqui..."
            />
            
            <Select
              label="Escolha"
              options={options}
              placeholder="Selecione uma opção"
            />
          </>
        )}
      </div>
    </StyleProvider>
  );
}

export default App;
```

## 🎛️ Configuração Avançada

### Tree Shaking de Estilos

```javascript
// Se você quiser importar apenas estilos específicos
import { StyleProvider } from '@vitorandradecoelho/sd-components';
// Sem importar outros componentes que você não usa

function MinimalApp() {
  return (
    <StyleProvider>
      {/* Seus componentes customizados usando as classes da biblioteca */}
      <div className="bg-primary text-primary-foreground p-4">
        Usando apenas os tokens de design
      </div>
    </StyleProvider>
  );
}
```

### Carregamento Condicional

```javascript
import React, { lazy, Suspense } from 'react';

// Lazy load dos componentes com estilos
const LazyComponents = lazy(() => import('@vitorandradecoelho/sd-components'));

function App() {
  return (
    <Suspense fallback={<div>Carregando componentes...</div>}>
      <LazyComponents.StyleProvider>
        <LazyComponents.Input label="Nome" />
      </LazyComponents.StyleProvider>
    </Suspense>
  );
}
```

## 🔧 Troubleshooting

### Estilos não aparecem?

1. **Verifique se o Tailwind CSS está configurado**
2. **Confirme se os CSS variables estão definidos**
3. **Use o StyleProvider para debug**

```javascript
import { StyleProvider, useStyles } from '@vitorandradecoelho/sd-components';

function Debug() {
  const styles = useStyles();
  console.log('Estilos carregados:', styles);
  
  return (
    <StyleProvider>
      <div>Debug dos estilos</div>
    </StyleProvider>
  );
}
```
# Como Importar CSS como Componente

Este guia mostra as diferentes formas de importar e usar os estilos CSS da biblioteca `@vitorandradecoelho/sd-components`.

## 🎨 Opções de Importação

### 1. **Importação Automática (Recomendado)**

```javascript
// Os estilos são carregados automaticamente com qualquer componente
import { Input, Alert, DataTable } from '@vitorandradecoelho/sd-components';

function App() {
  return (
    <div>
      <Input label="Nome" />
      <Alert>Funcionando perfeitamente!</Alert>
    </div>
  );
}
```

### 2. **StyleProvider - CSS como Componente**

```javascript
import { StyleProvider, Input, Alert } from '@vitorandradecoelho/sd-components';

function App() {
  return (
    <StyleProvider>
      <div>
        <Input label="Nome" />
        <Alert>Estilos carregados via componente!</Alert>
      </div>
    </StyleProvider>
  );
}
```

### 3. **Importação Manual do CSS**

```javascript
// Importar CSS separadamente (apenas se necessário)
import '@vitorandradecoelho/sd-components/dist/styles.css';
import { Input, Alert } from '@vitorandradecoelho/sd-components';

function App() {
  return (
    <div>
      <Input label="Nome" />
      <Alert>CSS importado manualmente!</Alert>
    </div>
  );
}
```

### 4. **Hook useStyles para Verificação**

```javascript
import { useStyles, Input } from '@vitorandradecoelho/sd-components';

function MyComponent() {
  const stylesLoaded = useStyles();
  
  if (!stylesLoaded) {
    return <div>Carregando estilos...</div>;
  }
  
  return <Input label="Nome" />;
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
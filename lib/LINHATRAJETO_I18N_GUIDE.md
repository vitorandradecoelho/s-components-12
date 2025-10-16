# LinhaTrajetoSelector - Guia de Internacionalização (i18n)

## Visão Geral

O `LinhaTrajetoSelector` possui suporte completo para internacionalização (i18n) em português, inglês e espanhol através do sistema de contexto `LanguageProvider` e `useLanguage`.

## Configuração Básica

### 1. Configurar o LanguageProvider

Envolva sua aplicação com o `LanguageProvider` no componente raiz:

```tsx
import { LanguageProvider } from '@vitorandradecoelho/sd-components';

function App() {
  return (
    <LanguageProvider defaultLanguage="pt">
      {/* Seu app aqui */}
    </LanguageProvider>
  );
}
```

### 2. Usar o Hook useLanguage

Use o hook `useLanguage` para acessar as traduções:

```tsx
import { useLanguage, LinhaTrajetoSelector } from '@vitorandradecoelho/sd-components';

function MyComponent() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <LinhaTrajetoSelector
      linhas={linhas}
      linhaLabel={t('component.linhatrajeto.linha')}
      trajetoLabel={t('component.linhatrajeto.trajeto')}
      linhaPlaceholder={t('component.linhatrajeto.selectLinha')}
      trajetoPlaceholder={t('component.linhatrajeto.selectTrajeto')}
    />
  );
}
```

## Chaves de Tradução Disponíveis

### Português (pt)
```typescript
'component.linhatrajeto.title': 'LinhaTrajetoSelector'
'component.linhatrajeto.description': 'Seletor de linhas e trajetos de transporte'
'component.linhatrajeto.linha': 'Linha'
'component.linhatrajeto.trajeto': 'Trajeto'
'component.linhatrajeto.selectLinha': 'Selecione uma linha'
'component.linhatrajeto.selectTrajeto': 'Selecione trajetos'
'component.linhatrajeto.loading': 'Carregando linhas...'
'component.linhatrajeto.noData': 'Nenhuma linha disponível'
'component.linhatrajeto.number': 'Número'
```

### Inglês (en)
```typescript
'component.linhatrajeto.title': 'LinhaTrajetoSelector'
'component.linhatrajeto.description': 'Transport line and route selector'
'component.linhatrajeto.linha': 'Line'
'component.linhatrajeto.trajeto': 'Route'
'component.linhatrajeto.selectLinha': 'Select a line'
'component.linhatrajeto.selectTrajeto': 'Select routes'
'component.linhatrajeto.loading': 'Loading lines...'
'component.linhatrajeto.noData': 'No lines available'
'component.linhatrajeto.number': 'Number'
```

### Espanhol (es)
```typescript
'component.linhatrajeto.title': 'LinhaTrajetoSelector'
'component.linhatrajeto.description': 'Selector de líneas y rutas de transporte'
'component.linhatrajeto.linha': 'Línea'
'component.linhatrajeto.trajeto': 'Ruta'
'component.linhatrajeto.selectLinha': 'Seleccione una línea'
'component.linhatrajeto.selectTrajeto': 'Seleccione rutas'
'component.linhatrajeto.loading': 'Cargando líneas...'
'component.linhatrajeto.noData': 'No hay líneas disponibles'
'component.linhatrajeto.number': 'Número'
```

## Exemplo Completo

```tsx
import React, { useState } from 'react';
import { 
  LanguageProvider, 
  useLanguage, 
  LinhaTrajetoSelector,
  type Linha,
  type Trajeto
} from '@vitorandradecoelho/sd-components';

// Componente com seletor de idioma
function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div>
      <button onClick={() => setLanguage('pt')}>🇧🇷 PT</button>
      <button onClick={() => setLanguage('en')}>🇺🇸 EN</button>
      <button onClick={() => setLanguage('es')}>🇪🇸 ES</button>
    </div>
  );
}

// Componente com LinhaTrajetoSelector
function TransportSelector() {
  const { t } = useLanguage();
  const [selectedLinhaId, setSelectedLinhaId] = useState('');
  const [selectedTrajetoIds, setSelectedTrajetoIds] = useState<string[]>([]);
  
  const linhas: Linha[] = [
    // ... seus dados de linhas
  ];
  
  return (
    <div>
      <h2>{t('component.linhatrajeto.title')}</h2>
      <p>{t('component.linhatrajeto.description')}</p>
      
      <LinhaTrajetoSelector
        linhas={linhas}
        selectedLinhaId={selectedLinhaId}
        selectedTrajetoIds={selectedTrajetoIds}
        onLinhaChange={(linha) => setSelectedLinhaId(linha?._id || '')}
        onTrajetoChange={(trajetos) => setSelectedTrajetoIds(trajetos.map(t => t._id))}
        linhaLabel={t('component.linhatrajeto.linha')}
        trajetoLabel={t('component.linhatrajeto.trajeto')}
        linhaPlaceholder={t('component.linhatrajeto.selectLinha')}
        trajetoPlaceholder={t('component.linhatrajeto.selectTrajeto')}
      />
    </div>
  );
}

// App com LanguageProvider
function App() {
  return (
    <LanguageProvider defaultLanguage="pt">
      <LanguageSwitcher />
      <TransportSelector />
    </LanguageProvider>
  );
}

export default App;
```

## Trocar Idioma Dinamicamente

```tsx
function MyComponent() {
  const { language, setLanguage } = useLanguage();
  
  const handleLanguageChange = (newLang: 'pt' | 'en' | 'es') => {
    setLanguage(newLang);
    // O componente será re-renderizado automaticamente com as novas traduções
  };
  
  return (
    <select value={language} onChange={(e) => handleLanguageChange(e.target.value as any)}>
      <option value="pt">Português</option>
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  );
}
```

## Props do LanguageProvider

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| children | ReactNode | - | Componentes filhos |
| defaultLanguage | 'pt' \| 'en' \| 'es' | 'pt' | Idioma padrão inicial |

## API do useLanguage

O hook `useLanguage()` retorna:

```typescript
interface LanguageContextType {
  language: 'pt' | 'en' | 'es';     // Idioma atual
  setLanguage: (lang: Language) => void;  // Função para trocar idioma
  t: (key: string) => string;       // Função de tradução
}
```

## Personalizar Traduções

Se você precisar de traduções customizadas, pode passar diretamente as strings:

```tsx
<LinhaTrajetoSelector
  linhas={linhas}
  linhaLabel="Rota de Ônibus"      // Texto customizado
  trajetoLabel="Direção"             // Texto customizado
  linhaPlaceholder="Escolha sua rota..."
  trajetoPlaceholder="Escolha a direção..."
/>
```

## Boas Práticas

1. **Sempre use o LanguageProvider** no componente raiz da aplicação
2. **Prefira usar `t()`** em vez de textos hardcoded para facilitar manutenção
3. **Teste em todos os idiomas** para garantir que as traduções fazem sentido
4. **Mantenha consistência** nos termos usados em toda a aplicação
5. **Use chaves de tradução semânticas** para facilitar compreensão

## Troubleshooting

### Erro: "useLanguage must be used within a LanguageProvider"

**Solução:** Certifique-se de que o `LanguageProvider` envolve todos os componentes que usam `useLanguage`:

```tsx
// ❌ Errado
function App() {
  return <MyComponent />; // useLanguage não funcionará aqui
}

// ✅ Correto
function App() {
  return (
    <LanguageProvider>
      <MyComponent />
    </LanguageProvider>
  );
}
```

### Traduções não aparecem

**Verificar:**
1. O idioma está configurado corretamente?
2. A chave de tradução está escrita corretamente?
3. O LanguageProvider está no lugar correto?

```tsx
const { t, language } = useLanguage();
console.log('Idioma atual:', language); // Debug
console.log('Tradução:', t('component.linhatrajeto.linha')); // Teste
```

## Exportações Disponíveis

```typescript
// Componentes e Contexto
export { LanguageProvider, useLanguage };

// Tipos
export type { Language, LanguageContextType, LanguageProviderProps };

// Traduções (opcional para uso avançado)
export { translations };
```

## Suporte

Para mais informações sobre internacionalização e outros componentes, consulte a documentação completa da biblioteca.

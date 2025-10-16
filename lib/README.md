# sd_components

Uma biblioteca moderna de componentes React com design system integrado, baseada em Tailwind CSS e Radix UI.

## 🚀 Instalação

```bash
npm install @vitorandradecoelho/sd-components
```

## 🎨 Importação dos Estilos

**IMPORTANTE**: Os estilos CSS são incluídos automaticamente quando você importa os componentes. Não é necessário importar o CSS separadamente na maioria dos casos.

```javascript
// Os estilos são importados automaticamente
import { Input, Alert, DataTable } from '@vitorandradecoelho/sd-components';
```

### Importação manual (se necessário)
```javascript
// Apenas se você precisar importar o CSS separadamente
import '@vitorandradecoelho/sd-components/dist/styles.css';
```

## 📋 Pré-requisitos

Esta biblioteca requer as seguintes dependências no seu projeto:

```bash
npm install react react-dom tailwindcss
```

## ⚙️ Configuração

### 1. Configure o Tailwind CSS

Adicione o seguinte ao seu `tailwind.config.js`:

```js
module.exports = {
  content: [
    // ... seus caminhos existentes
    "./node_modules/sd_components/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Tokens de design da biblioteca
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
    },
  },
  plugins: [],
}
```

### 2. Importe os estilos CSS

No seu arquivo CSS principal (ex: `index.css`):

```css
@import 'sd_components/dist/styles.css';
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Variáveis CSS obrigatórias */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
}
```

### 📚 **Documentação Completa**

- [📖 Guia de Importação dos Estilos](./STYLES_USAGE.md)
- [🚀 Exemplos de Uso](./IMPORT_EXAMPLES.md)
- [📦 Guia de Deploy](./EXPORT_GUIDE.md)

### Exemplo básico (versão 0.1)

```tsx
import React from 'react';
import { Input, Select, Alert, Toast } from 'sd_components';

function App() {
  const [nome, setNome] = useState('');
  const [opcao, setOpcao] = useState('');

  const opcoes = [
    { label: 'Opção 1', value: '1' },
    { label: 'Opção 2', value: '2' },
    { label: 'Opção 3', value: '3' }
  ];

  const handleSubmit = () => {
    Toast.success('Formulário enviado com sucesso!');
  };

  return (
    <div className="space-y-4 p-6">
      <Input 
        label="Nome"
        placeholder="Digite seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      
      <Select
        label="Escolha uma opção"
        options={opcoes}
        value={opcao}
        onValueChange={setOpcao}
        placeholder="Selecione..."
      />
      
      <Alert variant="success">
        Componente funcionando perfeitamente!
      </Alert>

      <button onClick={handleSubmit}>
        Enviar
      </button>
    </div>
  );
}
```

### Exemplo com DataTable

```tsx
import React from 'react';
import { DataTable, type TableColumn } from 'sd_components';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  status: 'ativo' | 'inativo';
}

function UsuariosPage() {
  const usuarios: Usuario[] = [
    { id: 1, nome: 'João Silva', email: 'joao@email.com', status: 'ativo' },
    { id: 2, nome: 'Maria Santos', email: 'maria@email.com', status: 'ativo' },
    { id: 3, nome: 'Pedro Costa', email: 'pedro@email.com', status: 'inativo' }
  ];

  const colunas: TableColumn<Usuario>[] = [
    {
      key: 'id',
      title: 'ID',
      sortable: true,
      width: '80px'
    },
    {
      key: 'nome',
      title: 'Nome',
      sortable: true
    },
    {
      key: 'email',
      title: 'E-mail',
      sortable: true
    },
    {
      key: 'status',
      title: 'Status',
      render: (status) => (
        <span className={`px-2 py-1 rounded text-xs ${
          status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      )
    }
  ];

  return (
    <DataTable
      data={usuarios}
      columns={colunas}
      pagination={{
        pageSize: 5,
        showTotal: true,
        showSizeChanger: true
      }}
    />
  );
}
```

### Exemplo com ComboBox e LinhaTrajetoSelector

```tsx
import React, { useState } from 'react';
import { ComboBox, LinhaTrajetoSelector, type Linha, type Trajeto } from 'sd_components';

function TransporteForm() {
  const [linhas] = useState<Linha[]>([
    {
      _id: '1',
      clienteId: 1,
      id_migracao: 1,
      descr: 'Linha Centro-Periferia',
      numero: '001',
      trajetos: [
        {
          _id: 't1',
          nome: 'Centro → Periferia',
          sentido: 'Ida',
          kmTrajeto: 15.5,
          // ... outros campos
        },
        {
          _id: 't2', 
          nome: 'Periferia → Centro',
          sentido: 'Volta',
          kmTrajeto: 15.5,
          // ... outros campos
        }
      ],
      id: '1'
    }
  ]);

  const [linhaSelecionada, setLinhaSelecionada] = useState<string>('');
  const [trajetosSelecionados, setTrajetosSelecionados] = useState<string[]>([]);

  return (
    <div className="space-y-4">
      <LinhaTrajetoSelector
        linhas={linhas}
        selectedLinhaId={linhaSelecionada}
        selectedTrajetoIds={trajetosSelecionados}
        onLinhaChange={(linha) => setLinhaSelecionada(linha?._id || '')}
        onTrajetoChange={(trajetos) => setTrajetosSelecionados(trajetos.map(t => t._id))}
        linhaLabel="Linha de Transporte"
        trajetoLabel="Trajetos"
        multiSelectTrajeto={true}
      />
    </div>
  );
}
```

## 🌍 Internacionalização (i18n)

A biblioteca possui suporte completo para internacionalização em **Português**, **Inglês** e **Espanhol**.

### Configuração Básica

Envolva sua aplicação com o `LanguageProvider`:

```tsx
import { LanguageProvider } from '@vitorandradecoelho/sd-components';

function App() {
  return (
    <LanguageProvider defaultLanguage="pt">
      {/* Seu app */}
    </LanguageProvider>
  );
}
```

### Uso com Componentes

Use o hook `useLanguage()` para acessar traduções:

```tsx
import { useLanguage, LinhaTrajetoSelector } from '@vitorandradecoelho/sd-components';

function MyComponent() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <div>
      {/* Seletor de idioma */}
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="pt">🇧🇷 Português</option>
        <option value="en">🇺🇸 English</option>
        <option value="es">🇪🇸 Español</option>
      </select>
      
      {/* Componente com i18n */}
      <LinhaTrajetoSelector
        linhas={linhas}
        linhaLabel={t('component.linhatrajeto.linha')}
        trajetoLabel={t('component.linhatrajeto.trajeto')}
        linhaPlaceholder={t('component.linhatrajeto.selectLinha')}
        trajetoPlaceholder={t('component.linhatrajeto.selectTrajeto')}
      />
    </div>
  );
}
```

### Chaves de Tradução Disponíveis

| Chave | PT | EN | ES |
|-------|----|----|-----|
| `component.linhatrajeto.linha` | Linha | Line | Línea |
| `component.linhatrajeto.trajeto` | Trajeto | Route | Ruta |
| `component.linhatrajeto.selectLinha` | Selecione uma linha | Select a line | Seleccione una línea |
| `component.linhatrajeto.selectTrajeto` | Selecione trajetos | Select routes | Seleccione rutas |
| `component.linhatrajeto.loading` | Carregando linhas... | Loading lines... | Cargando líneas... |
| `component.linhatrajeto.noData` | Nenhuma linha disponível | No lines available | No hay líneas disponibles |

Para mais informações, consulte o [Guia Completo de i18n](./LINHATRAJETO_I18N_GUIDE.md).

## 🧩 Componentes Disponíveis

- **Input** - Campo de entrada com suporte a ícones e validação
- **Select** - Seletor dropdown personalizado
- **TextField** - Campo de texto com área expandida
- **RadioButton** - Botões de opção com design moderno
- **CheckBox** - Caixas de seleção com estados indeterminados
- **DataTable** - Tabela de dados com sorting e paginação
- **ComboBox** - Campo de busca com autocomplete
- **FileUpload** - Componente de upload de arquivos
- **LightBox** - Modal/overlay para conteúdo
- **FormModal** - Modal específico para formulários
- **Alert** - Alertas com diferentes variantes
- **Toast** - Notificações temporárias
- **SweetAlert** - Alertas interativos com confirmação
- **LinhaTrajetoSelector** - Seletor em cascata para linhas e trajetos (com i18n)
- **DatePicker** - Seletor de data com calendário
- **TimePicker** - Seletor de horário
- **Map** - Componente de mapa interativo
- **Accordion** - Componente de acordeão expansível
- **LoadingSpinner** - Indicador de carregamento
- **ErrorMessage** - Mensagens de erro formatadas

## 🎨 Versionamento

Esta biblioteca segue o [Semantic Versioning (SemVer)](https://semver.org/):

- **MAJOR** (X.0.0): Mudanças incompatíveis na API
- **MINOR** (0.X.0): Novas funcionalidades compatíveis
- **PATCH** (0.0.X): Correções de bugs compatíveis

### Changelog

#### v1.0.0
- ✨ Versão inicial da biblioteca
- 🎯 13 componentes base implementados
- 🎨 Design system completo com tokens CSS
- 📚 Documentação e exemplos

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
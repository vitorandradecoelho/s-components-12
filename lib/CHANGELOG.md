# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Adicionado
- 🌐 **LinhaTrajetoSelector**: Integração com API REST via `clienteId` e `apiBaseUrl`
- 🔄 **LinhaTrajetoSelector**: Opção `keepTrajetosOnLinhaChange` para manter trajetos selecionados ao trocar de linha
- 📊 Estados de loading e error para busca de dados via API
- 📖 Documentação atualizada com exemplos de uso da API e novas funcionalidades

### Alterado
- 🔧 **LinhaTrajetoSelector**: Propriedade `linhas` agora é opcional quando usar API
- 🎯 Melhor experiência do usuário com feedback visual durante carregamento
- 📝 Documentação expandida com tabela de propriedades e exemplos práticos

### Corrigido
- 🐛 Problemas de build com `padStart` em browsers antigos
- 🔨 Configuração do Rollup para geração correta de bundles

## [0.1.0] - 2025-01-15

### Adicionado  
- ✨ Versão inicial da biblioteca sd_components
- 🎯 14 componentes fundamentais:
  - Input - Campo de entrada com validação
  - Select - Seletor dropdown
  - TextField - Área de texto expandida
  - RadioButton - Botões de opção
  - CheckBox - Caixas de seleção
  - DataTable - Tabela de dados
  - ComboBox - Campo com autocomplete
  - FileUpload - Upload de arquivos
  - LightBox - Modal/overlay
  - FormModal - Modal para formulários
  - Alert - Componente de alertas
  - Toast - Notificações temporárias
  - SweetAlert - Alertas interativos
  - LinhaTrajetoSelector - Seletor de linhas e trajetos de transporte

- 🎨 Design system completo com:
  - Tokens CSS customizáveis
  - Suporte a tema claro/escuro
  - Variantes de componentes
  - Animações suaves

- 📚 Documentação completa
- 🔧 Configuração TypeScript
- 📦 Build otimizado com Rollup
- 🧪 Tipos TypeScript incluídos

### Notas Técnicas
- Baseado em React 18+
- Utiliza Tailwind CSS para estilização
- Radix UI para componentes primitivos
- Bundle ESM e CommonJS
- Peer dependencies: react, react-dom
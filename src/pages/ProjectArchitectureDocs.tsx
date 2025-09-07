import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FolderTree, Settings, Package, GitBranch, Rocket, Code2, Palette, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProjectArchitectureDocs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Início
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
              📖 Manual de Arquitetura do Projeto
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Documentação completa da estrutura, geração de componentes, exportação e publicação do sd_components
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Índice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">📁 Estrutura</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Arquitetura Geral</li>
                  <li>• Estrutura de Pastas</li>
                  <li>• Configurações</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">⚙️ Desenvolvimento</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Geração de Componentes</li>
                  <li>• Sistema de CSS</li>
                  <li>• Scripts Automatizados</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">🚀 Publicação</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Build & Export</li>
                  <li>• NPM Registry</li>
                  <li>• BitBucket Workflow</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Architecture Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderTree className="h-5 w-5" />
              1. Arquitetura Geral do Projeto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">🏗️ Visão Geral</h3>
              <p className="text-muted-foreground mb-4">
                O projeto sd_components é uma biblioteca React moderna que combina desenvolvimento, 
                documentação e publicação em um único workspace monorepo.
              </p>
              
              <div className="bg-secondary/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Estrutura Principal:</h4>
                <div className="font-mono text-sm space-y-1">
                  <div>📦 <span className="text-primary">sd_components/</span></div>
                  <div>├── 📁 <span className="text-blue-600">lib/</span> → Biblioteca dos componentes</div>
                  <div>├── 📁 <span className="text-green-600">src/</span> → App de documentação</div>
                  <div>├── 📁 <span className="text-purple-600">public/</span> → Assets estáticos</div>
                  <div>└── ⚙️ configs → Vite, Tailwind, TypeScript</div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3">🎯 Dual Purpose Design</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">📚 Biblioteca (lib/)</h4>
                  <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                    <li>• Componentes React exportáveis</li>
                    <li>• Sistema de build independente</li>
                    <li>• Publicação NPM/BitBucket</li>
                    <li>• CSS integrado</li>
                  </ul>
                </div>
                <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">📖 Documentação (src/)</h4>
                  <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
                    <li>• Playground interativo</li>
                    <li>• Exemplos de uso</li>
                    <li>• Testes visuais</li>
                    <li>• Guias de implementação</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Structure */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              2. Estrutura Detalhada de Pastas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-secondary/30 p-6 rounded-lg font-mono text-sm">
              <div className="text-primary font-semibold mb-4">sd_components/</div>
              
              <div className="space-y-2 ml-4">
                <div className="text-blue-600 font-semibold">📁 lib/ (Biblioteca Principal)</div>
                <div className="ml-4 space-y-1 text-muted-foreground">
                  <div>├── 📁 src/</div>
                  <div className="ml-4 space-y-1">
                    <div>├── 📁 components/ → Componentes React</div>
                    <div>├── 📁 lib/ → Utilitários</div>
                    <div>├── 📁 styles/ → CSS da biblioteca</div>
                    <div>└── 📄 index.ts → Export principal</div>
                  </div>
                  <div>├── 📁 scripts/ → Automação</div>
                  <div className="ml-4 space-y-1">
                    <div>├── build.js → Build automatizado</div>
                    <div>├── export.js → Menu de publicação</div>
                    <div>├── setup-bitbucket.js → Config repo</div>
                    <div>├── version.js → Versionamento</div>
                    <div>└── watch.js → Desenvolvimento</div>
                  </div>
                  <div>├── 📄 package.json → Config da lib</div>
                  <div>├── 📄 rollup.config.js → Bundler</div>
                  <div>└── 📄 tailwind.config.js → Styles</div>
                </div>

                <div className="text-green-600 font-semibold mt-4">📁 src/ (App Documentação)</div>
                <div className="ml-4 space-y-1 text-muted-foreground">
                  <div>├── 📁 components/</div>
                  <div className="ml-4 space-y-1">
                    <div>├── 📁 library/ → Cópias dos componentes</div>
                    <div>└── 📁 ui/ → Shadcn components</div>
                  </div>
                  <div>├── 📁 pages/ → Páginas de docs</div>
                  <div>├── 📁 contexts/ → React contexts</div>
                  <div>└── 📄 main.tsx → Entry point</div>
                </div>

                <div className="text-purple-600 font-semibold mt-4">⚙️ Configs Raiz</div>
                <div className="ml-4 space-y-1 text-muted-foreground">
                  <div>├── 📄 vite.config.ts → Bundler app</div>
                  <div>├── 📄 tailwind.config.ts → Styles app</div>
                  <div>├── 📄 tsconfig.json → TypeScript</div>
                  <div>└── 📄 package.json → Deps principais</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">🔍 Análise por Diretório</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">lib/src/components/</h4>
                    <Badge variant="secondary" className="mb-2">Fonte dos Componentes</Badge>
                    <ul className="text-sm space-y-1">
                      <li>• Alert.tsx → Notificações</li>
                      <li>• Input.tsx → Campos de entrada</li>
                      <li>• Select.tsx → Seletores</li>
                      <li>• DataTable.tsx → Tabelas</li>
                      <li>• LinhaTrajetoSelector.tsx → Específico</li>
                      <li>• E mais...</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">lib/scripts/</h4>
                    <Badge variant="secondary" className="mb-2">Automação</Badge>
                    <ul className="text-sm space-y-1">
                      <li>• <code>npm run build:auto</code></li>
                      <li>• <code>npm run export</code></li>
                      <li>• <code>npm run watch</code></li>
                      <li>• <code>npm run setup:bitbucket</code></li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">src/pages/</h4>
                    <Badge variant="secondary" className="mb-2">Documentação</Badge>
                    <ul className="text-sm space-y-1">
                      <li>• Index.tsx → Home</li>
                      <li>• *Docs.tsx → Guias componentes</li>
                      <li>• BitBucketDocs.tsx → Integração</li>
                      <li>• TestePage.tsx → Playground</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">src/components/library/</h4>
                    <Badge variant="secondary" className="mb-2">Cópias para Docs</Badge>
                    <ul className="text-sm space-y-1">
                      <li>• Espelham lib/src/components/</li>
                      <li>• Usadas na documentação</li>
                      <li>• Importam da biblioteca publicada</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Component Generation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              3. Processo de Geração de Componentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">🔄 Fluxo de Desenvolvimento</h3>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-xl">1️⃣</span>
                    </div>
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Criação</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Criar componente em lib/src/components/
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-xl">2️⃣</span>
                    </div>
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Export</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Adicionar no lib/src/index.ts
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-xl">3️⃣</span>
                    </div>
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300">Docs</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Criar cópia em src/components/library/
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-orange-100 dark:bg-orange-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-xl">4️⃣</span>
                    </div>
                    <h4 className="font-semibold text-orange-700 dark:text-orange-300">Página</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Criar página *Docs.tsx
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">📝 Template de Componente</h3>
              <div className="bg-secondary/30 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
{`// lib/src/components/NovoComponente.tsx
import React from 'react';
import { cn } from '../lib/utils';

export interface NovoComponenteProps {
  className?: string;
  children?: React.ReactNode;
  // ... outras props
}

export const NovoComponente = React.forwardRef<
  HTMLDivElement,
  NovoComponenteProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "base-classes",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

NovoComponente.displayName = "NovoComponente";`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">🔗 Sistema de Exports</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">lib/src/index.ts</h4>
                  <div className="bg-white dark:bg-gray-900 p-3 rounded border font-mono text-sm">
{`// Componentes
export { Alert } from './components/Alert';
export { Input } from './components/Input';
export { NovoComponente } from './components/NovoComponente';

// Types
export type { AlertProps } from './components/Alert';
export type { InputProps } from './components/Input';

// Utils
export { cn } from './lib/utils';`}
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">src/components/library/index.ts</h4>
                  <div className="bg-white dark:bg-gray-900 p-3 rounded border font-mono text-sm">
{`// Re-exports da biblioteca
export {
  Alert,
  Input,
  NovoComponente,
  type AlertProps,
  type InputProps
} from '@vitorandradecoelho/sd-components';`}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CSS System */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              4. Sistema de CSS e Estilos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">🎨 Arquitetura de Estilos</h3>
              <p className="text-muted-foreground mb-4">
                O sistema de CSS é baseado em Tailwind CSS com tokens de design semantic e 
                configurações customizadas para consistência entre biblioteca e documentação.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Biblioteca (lib/)</h4>
                  <ul className="text-sm space-y-2">
                    <li><Badge variant="outline">lib/src/styles/index.css</Badge> → CSS principal</li>
                    <li><Badge variant="outline">lib/tailwind.config.js</Badge> → Config lib</li>
                    <li><Badge variant="outline">lib/postcss.config.js</Badge> → Processamento</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Documentação (src/)</h4>
                  <ul className="text-sm space-y-2">
                    <li><Badge variant="outline">src/index.css</Badge> → CSS app</li>
                    <li><Badge variant="outline">tailwind.config.ts</Badge> → Config app</li>
                    <li><Badge variant="outline">postcss.config.js</Badge> → Build config</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">🎭 Design Tokens</h3>
              <div className="bg-secondary/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">lib/src/styles/index.css</h4>
                <pre className="text-sm bg-white dark:bg-gray-900 p-3 rounded border overflow-x-auto">
{`:root {
  /* Colors */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  
  /* Semantic tokens */
  --muted: 210 40% 96%;
  --accent: 210 40% 96%;
  --destructive: 0 84.2% 60.2%;
  
  /* Radius */
  --radius: 0.5rem;
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">⚙️ Configuração Tailwind</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Biblioteca</h4>
                  <div className="bg-white dark:bg-gray-900 p-3 rounded border font-mono text-sm">
{`// lib/tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        primary: "hsl(var(--primary))",
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
}`}
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Documentação</h4>
                  <div className="bg-white dark:bg-gray-900 p-3 rounded border font-mono text-sm">
{`// tailwind.config.ts
export default {
  content: [
    "./src/**/*.{ts,tsx}",
    // Include library components
    "./node_modules/@vitorandradecoelho/sd-components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    // Extends same tokens
    extend: { /* same config */ }
  }
}`}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">🔄 Sincronização de Estilos</h3>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full">
                    <span className="text-yellow-700 dark:text-yellow-300">⚠️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-1">Importante</h4>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">
                      Os tokens CSS devem ser mantidos sincronizados entre lib/src/styles/index.css 
                      e src/index.css para garantir consistência visual.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Build and Export */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              5. Sistema de Build e Export
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">🔨 Processo de Build</h3>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg">
                <h4 className="font-semibold mb-4">Scripts Disponíveis:</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border">
                    <h5 className="font-semibold text-blue-600 mb-2">Build Automatizado</h5>
                    <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">npm run build:auto</code>
                    <ul className="text-sm mt-2 space-y-1 text-muted-foreground">
                      <li>• Limpa pasta dist/</li>
                      <li>• Verifica dependências</li>
                      <li>• Executa Rollup build</li>
                      <li>• Valida arquivos gerados</li>
                      <li>• Mostra estatísticas</li>
                    </ul>
                  </div>

                  <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border">
                    <h5 className="font-semibold text-green-600 mb-2">Watch Mode</h5>
                    <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">npm run watch</code>
                    <ul className="text-sm mt-2 space-y-1 text-muted-foreground">
                      <li>• Monitora mudanças .tsx/.ts</li>
                      <li>• Rebuild automático</li>
                      <li>• Ideal para desenvolvimento</li>
                      <li>• Hot reload</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">⚙️ Configuração Rollup</h3>
              <div className="bg-secondary/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">lib/rollup.config.js</h4>
                <pre className="text-sm bg-white dark:bg-gray-900 p-3 rounded border overflow-x-auto">
{`export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js', 
      format: 'esm',
      sourcemap: true
    }
  ],
  external: ['react', 'react-dom'],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    postcss({ extract: true }),
    terser()
  ]
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">📦 Estrutura do Build</h3>
              <div className="bg-secondary/30 p-4 rounded-lg font-mono text-sm">
                <div className="space-y-1">
                  <div className="text-primary font-semibold">lib/dist/ (Gerado)</div>
                  <div className="ml-4 space-y-1 text-muted-foreground">
                    <div>├── 📄 index.js → CommonJS bundle</div>
                    <div>├── 📄 index.esm.js → ES Modules bundle</div>
                    <div>├── 📄 index.css → Estilos compilados</div>
                    <div>├── 📄 index.d.ts → TypeScript definitions</div>
                    <div>└── 📁 types/ → Definições auxiliares</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">🎯 Export Interativo</h3>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-4 rounded-lg">
                <code className="text-lg font-semibold">npm run export</code>
                <p className="text-muted-foreground mt-2 mb-4">Script interativo que oferece múltiplas opções:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-900 p-3 rounded border">
                    <h5 className="font-semibold text-blue-600 mb-1">1. NPM Registry</h5>
                    <p className="text-xs text-muted-foreground">Publicação pública</p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-3 rounded border">
                    <h5 className="font-semibold text-green-600 mb-1">2. BitBucket Repo</h5>
                    <p className="text-xs text-muted-foreground">Versionamento privado</p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-3 rounded border">
                    <h5 className="font-semibold text-purple-600 mb-1">3. Build Only</h5>
                    <p className="text-xs text-muted-foreground">Apenas compilação</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Publishing Workflows */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5" />
              6. Workflows de Publicação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">🚀 NPM Registry (Público)</h3>
              
              <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="bg-blue-100 dark:bg-blue-900 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <p className="text-sm font-medium">Build</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 dark:bg-blue-900 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <p className="text-sm font-medium">Version</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 dark:bg-blue-900 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <p className="text-sm font-medium">Publish</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 dark:bg-blue-900 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-sm font-bold">4</span>
                    </div>
                    <p className="text-sm font-medium">Available</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 p-4 rounded border">
                  <h4 className="font-semibold mb-2">Comandos Executados:</h4>
                  <div className="font-mono text-sm space-y-1">
                    <div>1. <code>npm run build</code> → Compila biblioteca</div>
                    <div>2. <code>npm version patch|minor|major</code> → Atualiza versão</div>
                    <div>3. <code>npm publish</code> → Publica no registro</div>
                    <div>4. <code>npm install @vitorandradecoelho/sd-components</code> → Instalável globalmente</div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    <strong>Vantagens:</strong> Distribuição pública, fácil instalação, versionamento semântico automático
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">🌿 BitBucket Repository (Privado)</h3>
              
              <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-lg border border-green-200 dark:border-green-800">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                  <div className="text-center">
                    <div className="bg-green-100 dark:bg-green-900 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <p className="text-sm font-medium">Build</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 dark:bg-green-900 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <p className="text-sm font-medium">Version</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 dark:bg-green-900 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <p className="text-sm font-medium">Commit</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 dark:bg-green-900 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-sm font-bold">4</span>
                    </div>
                    <p className="text-sm font-medium">Tag</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 dark:bg-green-900 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-sm font-bold">5</span>
                    </div>
                    <p className="text-sm font-medium">Push</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 p-4 rounded border mb-4">
                  <h4 className="font-semibold mb-2">Setup Inicial (Uma vez):</h4>
                  <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">npm run setup:bitbucket</code>
                  <ul className="text-sm mt-2 space-y-1 text-muted-foreground">
                    <li>• Configura remote origin</li>
                    <li>• Atualiza package.json</li>
                    <li>• Prepara repositório</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 p-4 rounded border">
                  <h4 className="font-semibold mb-2">Processo de Publicação:</h4>
                  <div className="font-mono text-sm space-y-1">
                    <div>1. <code>npm run build</code> → Compila</div>
                    <div>2. <code>npm version patch|minor|major</code> → Versiona</div>
                    <div>3. <code>git add . && git commit</code> → Commita mudanças</div>
                    <div>4. <code>git tag v$&#123;version&#125;</code> → Cria tag</div>
                    <div>5. <code>git push origin main --tags</code> → Envia para repo</div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Vantagens:</strong> Controle privado, histórico completo, integração com CI/CD, tags organizadas
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">📊 Comparação de Workflows</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border border-border rounded-lg overflow-hidden">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 border-b">Aspecto</th>
                      <th className="text-left p-3 border-b">NPM Registry</th>
                      <th className="text-left p-3 border-b">BitBucket Repo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Visibilidade</td>
                      <td className="p-3">🌐 Público</td>
                      <td className="p-3">🔒 Privado</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Instalação</td>
                      <td className="p-3">✅ npm install</td>
                      <td className="p-3">⚙️ Git clone/submodule</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Versionamento</td>
                      <td className="p-3">📦 NPM SemVer</td>
                      <td className="p-3">🏷️ Git Tags</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Distribuição</td>
                      <td className="p-3">🚀 CDN global</td>
                      <td className="p-3">📁 Repositório</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Controle</td>
                      <td className="p-3">📊 NPM stats</td>
                      <td className="p-3">🛠️ Controle total</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage and Integration */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5" />
              7. Uso e Integração da Biblioteca
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">📦 Instalação em Projetos</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Via NPM</h4>
                  <div className="bg-white dark:bg-gray-900 p-3 rounded border font-mono text-sm">
                    <div># Instalação</div>
                    <div>npm install @vitorandradecoelho/sd-components</div>
                    <div className="mt-2"># Importação automática de estilos</div>
                    <div>import '@vitorandradecoelho/sd-components/dist/index.css';</div>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Via Git</h4>
                  <div className="bg-white dark:bg-gray-900 p-3 rounded border font-mono text-sm">
                    <div># Clone do repositório</div>
                    <div>git clone [bitbucket-url]</div>
                    <div className="mt-2"># Build local</div>
                    <div>cd lib && npm run build</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">🎯 Exemplos de Uso</h3>
              
              <div className="bg-secondary/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Importação e Uso Básico:</h4>
                <pre className="text-sm bg-white dark:bg-gray-900 p-3 rounded border overflow-x-auto">
{`import React from 'react';
import { 
  Input, 
  Select, 
  Alert, 
  Toast,
  LinhaTrajetoSelector 
} from '@vitorandradecoelho/sd-components';

function MeuComponente() {
  return (
    <div>
      <Input 
        label="Nome"
        placeholder="Digite seu nome"
        required
      />
      
      <Select 
        options={[
          { value: '1', label: 'Opção 1' },
          { value: '2', label: 'Opção 2' }
        ]}
        placeholder="Selecione..."
      />
      
      <Alert 
        type="success"
        title="Sucesso!"
        message="Operação realizada com êxito"
      />
      
      <LinhaTrajetoSelector 
        linhas={linhasData}
        onLinhaChange={handleLinhaChange}
        onTrajetoChange={handleTrajetoChange}
      />
    </div>
  );
}

// Toast notifications
Toast.success('Título', 'Mensagem de sucesso');
Toast.error('Erro', 'Algo deu errado');`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">⚙️ Configuração de Projeto</h3>
              
              <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Tailwind CSS Setup</h4>
                <div className="bg-white dark:bg-gray-900 p-3 rounded border">
                  <pre className="text-sm">
{`// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // Incluir componentes da biblioteca
    "./node_modules/@vitorandradecoelho/sd-components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Usar mesmos tokens da biblioteca
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        primary: "hsl(var(--primary))",
        // ... outros tokens
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">🔄 Atualizações e Versionamento</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Patch (0.1.0 → 0.1.1)</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Correções de bugs</li>
                    <li>• Melhorias de performance</li>
                    <li>• Ajustes de estilos</li>
                    <li>• Backward compatible</li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Minor (0.1.0 → 0.2.0)</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Novos componentes</li>
                    <li>• Novas funcionalidades</li>
                    <li>• Novas props opcionais</li>
                    <li>• Backward compatible</li>
                  </ul>
                </div>

                <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">Major (0.1.0 → 1.0.0)</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Breaking changes</li>
                    <li>• Reestruturação de APIs</li>
                    <li>• Remoção de componentes</li>
                    <li>• Migração necessária</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              8. Melhores Práticas e Troubleshooting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">✅ Melhores Práticas</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Desenvolvimento</h4>
                    <ul className="text-sm space-y-2">
                      <li>• Use <code>npm run watch</code> durante desenvolvimento</li>
                      <li>• Teste localmente antes de publicar</li>
                      <li>• Mantenha componentes focados e reutilizáveis</li>
                      <li>• Documente todas as props e exemplos</li>
                      <li>• Use TypeScript para type safety</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Versionamento</h4>
                    <ul className="text-sm space-y-2">
                      <li>• Siga Semantic Versioning (SemVer)</li>
                      <li>• Commits descritivos e organizados</li>
                      <li>• Use conventional commits</li>
                      <li>• Mantenha CHANGELOG.md atualizado</li>
                      <li>• Teste em diferentes ambientes</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">CSS e Estilos</h4>
                    <ul className="text-sm space-y-2">
                      <li>• Use tokens semânticos do design system</li>
                      <li>• Evite estilos inline diretos</li>
                      <li>• Mantenha consistência visual</li>
                      <li>• Teste em modo claro e escuro</li>
                      <li>• Otimize para acessibilidade</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Publicação</h4>
                    <ul className="text-sm space-y-2">
                      <li>• Sempre execute build antes de publicar</li>
                      <li>• Verifique arquivos gerados em dist/</li>
                      <li>• Teste instalação em projeto limpo</li>
                      <li>• Mantenha documentação atualizada</li>
                      <li>• Use tags descritivas no Git</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">🔧 Troubleshooting Comum</h3>
              
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
                  <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">❌ Erro: "Module not found"</h4>
                  <div className="text-sm space-y-2">
                    <p><strong>Causa:</strong> Componente não exportado no index.ts</p>
                    <p><strong>Solução:</strong></p>
                    <div className="bg-white dark:bg-gray-900 p-2 rounded font-mono text-xs">
                      // Adicionar em lib/src/index.ts<br/>
                      export &#123; MeuComponente &#125; from './components/MeuComponente';
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">⚠️ Erro: "Styles not applied"</h4>
                  <div className="text-sm space-y-2">
                    <p><strong>Causa:</strong> CSS não importado ou configuração Tailwind incorreta</p>
                    <p><strong>Soluções:</strong></p>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Importar CSS: <code>import '@vitorandradecoelho/sd-components/dist/index.css';</code></li>
                      <li>Verificar tailwind.config.js inclui path da biblioteca</li>
                      <li>Sincronizar tokens CSS entre lib e projeto</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">ℹ️ Erro: "npm publish failed"</h4>
                  <div className="text-sm space-y-2">
                    <p><strong>Causas possíveis:</strong></p>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Não logado no NPM: <code>npm login</code></li>
                      <li>Versão já existe: <code>npm run version:patch</code></li>
                      <li>Nome do pacote em uso: alterar em package.json</li>
                      <li>Build falhou: <code>npm run build:auto</code></li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">🔄 Reset completo (último recurso)</h4>
                  <div className="bg-white dark:bg-gray-900 p-3 rounded font-mono text-sm">
                    # Limpar tudo e reconstruir<br/>
                    cd lib<br/>
                    rm -rf node_modules dist<br/>
                    npm install<br/>
                    npm run build:auto<br/>
                    npm run export
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">📞 Comandos de Diagnóstico</h3>
              
              <div className="bg-secondary/30 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
                  <div>
                    <h4 className="font-semibold mb-2">Verificações de Build:</h4>
                    <ul className="space-y-1">
                      <li><code>ls lib/dist/</code> → Arquivos gerados</li>
                      <li><code>npm run build:auto</code> → Build com logs</li>
                      <li><code>npm pack</code> → Simula publicação</li>
                      <li><code>npm list</code> → Dependências instaladas</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Git/Versionamento:</h4>
                    <ul className="space-y-1">
                      <li><code>git status</code> → Estado do repositório</li>
                      <li><code>git remote -v</code> → Remotes configurados</li>
                      <li><code>git tag -l</code> → Tags existentes</li>
                      <li><code>npm version</code> → Versão atual</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8 border-t border-border">
          <p className="text-muted-foreground">
            📖 Documentação completa da arquitetura do projeto sd_components
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Versão: 1.0 | Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  );
}
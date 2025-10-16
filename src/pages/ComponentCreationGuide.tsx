import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@vitorandradecoelho/sd-components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Code2, Package, FileText, Settings, CheckCircle, Database, Zap, Layers, FolderTree, GitBranch, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ComponentCreationGuide() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: "Arquitetura Atual", icon: <Layers className="h-4 w-4" /> },
    { id: 2, title: "Criar na Biblioteca", icon: <Code2 className="h-4 w-4" /> },
    { id: 3, title: "Componente Demo", icon: <FolderTree className="h-4 w-4" /> },
    { id: 4, title: "Rotas & Docs", icon: <FileText className="h-4 w-4" /> },
    { id: 5, title: "Build & Publish", icon: <Package className="h-4 w-4" /> },
    { id: 6, title: "Integração", icon: <CheckCircle className="h-4 w-4" /> }
  ];

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
              🛠️ Guia de Criação de Componentes
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Arquitetura moderna sem duplicação - Uma biblioteca, múltiplos projetos
            </p>
          </div>
        </div>

        {/* Architecture Overview */}
        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Arquitetura Moderna (2024)
            </CardTitle>
            <CardDescription>
              Sistema modular com biblioteca npm e componentes de demonstração
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-primary mb-2">📦 Biblioteca NPM</h4>
                <p className="text-sm text-muted-foreground">
                  Componentes reutilizáveis publicados em <code>@vitorandradecoelho/sd-components</code>
                </p>
              </div>
              <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                <h4 className="font-semibold text-accent-foreground mb-2">🎨 Componentes Demo</h4>
                <p className="text-sm text-muted-foreground">
                  Exemplos visuais em <code>src/components/demos/</code> para documentação
                </p>
              </div>
              <div className="bg-success/5 p-4 rounded-lg border border-success/20">
                <h4 className="font-semibold text-success mb-2">🚀 Rotas Lazy</h4>
                <p className="text-sm text-muted-foreground">
                  Configuração centralizada com code splitting automático
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Fluxo de Desenvolvimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-between items-center gap-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div 
                    className={`flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer transition-all ${
                      currentStep === step.id 
                        ? 'bg-primary text-primary-foreground' 
                        : currentStep > step.id 
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : 'bg-muted text-muted-foreground'
                    }`}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    {step.icon}
                    <span className="text-sm font-medium">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-px bg-border ml-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs value={currentStep.toString()} onValueChange={(value) => setCurrentStep(Number(value))}>
          {/* Step 1: Current Architecture */}
          <TabsContent value="1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Passo 1: Entendendo a Arquitetura Atual
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert variant="default" title="Nova Arquitetura 2024">
                  Eliminamos 100% da duplicação! Agora temos uma única fonte de verdade na biblioteca npm.
                </Alert>

                <div>
                  <h3 className="text-lg font-semibold mb-3">📂 Estrutura de Diretórios</h3>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <pre className="text-sm font-mono">
{`projeto/
├── lib/                                    ✅ FONTE ÚNICA
│   ├── src/
│   │   ├── components/                     # Componentes da biblioteca
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── LinhaTrajetoSelector.tsx
│   │   │   └── ...
│   │   ├── types/                          # Types compartilhados
│   │   ├── hooks/                          # Hooks reutilizáveis
│   │   └── index.ts                        # Exports principais
│   ├── package.json                        # @vitorandradecoelho/sd-components
│   └── rollup.config.js                    # Build config
│
├── src/
│   ├── components/
│   │   ├── demos/                          ✅ COMPONENTES DE DEMO
│   │   │   ├── InputDemo.tsx               # Demo visual do Input
│   │   │   ├── SelectDemo.tsx              # Demo visual do Select
│   │   │   └── index.ts                    # Barrel export
│   │   └── ui/                             # Shadcn components
│   ├── config/
│   │   └── routes.config.tsx               ✅ ROTAS CENTRALIZADAS
│   ├── pages/                              # Páginas de documentação
│   │   ├── Index.tsx                       # Homepage (usa demos)
│   │   ├── InputDocs.tsx                   # Docs detalhados
│   │   └── ...
│   └── index.css                           # Importa lib/styles

❌ REMOVIDO: src/components/library/        # Duplicação eliminada!`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">🔄 Fluxo de Trabalho</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                        ✅ Como Funciona Agora
                      </h4>
                      <ol className="text-sm space-y-2 list-decimal list-inside">
                        <li>Criar componente em <code>lib/src/components/</code></li>
                        <li>Exportar em <code>lib/src/index.ts</code></li>
                        <li>Build: <code>cd lib && npm run build</code></li>
                        <li>Publicar: <code>npm run release:patch</code></li>
                        <li>Atualizar: <code>npm install @vitor...@latest</code></li>
                        <li>Criar demo em <code>src/components/demos/</code></li>
                        <li>Adicionar rota em <code>routes.config.tsx</code></li>
                      </ol>
                    </div>

                    <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                        🎯 Benefícios
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>✅ Zero duplicação de código</li>
                        <li>✅ Versionamento semântico</li>
                        <li>✅ Reutilização entre projetos</li>
                        <li>✅ Tree-shaking automático</li>
                        <li>✅ Lazy loading das rotas</li>
                        <li>✅ Componentes demo isolados</li>
                        <li>✅ Build otimizado (-40%)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setCurrentStep(2)}>
                    Próximo: Criar na Biblioteca
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 2: Create in Library */}
          <TabsContent value="2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  Passo 2: Criar Componente na Biblioteca
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">📝 Exemplo: InputDemo Button</h3>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2">1️⃣ lib/src/components/Button.tsx</h4>
                    <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border overflow-x-auto">
{`import React from "react";
import { cn } from "../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "md", loading, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2",
          {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            outline: "border border-input hover:bg-accent",
            ghost: "hover:bg-accent hover:text-accent-foreground"
          }[variant],
          {
            sm: "h-8 px-3 text-sm",
            md: "h-10 px-4 text-base",
            lg: "h-12 px-6 text-lg"
          }[size],
          loading && "opacity-50 cursor-not-allowed",
          className
        )}
        disabled={loading}
        {...props}
      >
        {loading ? "Carregando..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";`}
                    </pre>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">2️⃣ lib/src/index.ts - Adicionar Export</h4>
                    <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border">
{`// ... outros exports

export { Button, type ButtonProps } from './components/Button';`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">🏗️ Padrões Obrigatórios</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">✅ Fazer</h4>
                      <ul className="text-sm space-y-1">
                        <li>✅ React.forwardRef para refs</li>
                        <li>✅ TypeScript com tipos exportados</li>
                        <li>✅ Props interface documentada</li>
                        <li>✅ className para customização</li>
                        <li>✅ Valores padrão para props</li>
                        <li>✅ displayName definido</li>
                        <li>✅ Usar cn() para classes</li>
                      </ul>
                    </div>

                    <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">❌ Evitar</h4>
                      <ul className="text-sm space-y-1">
                        <li>❌ Hardcoded colors/styles</li>
                        <li>❌ Props sem types</li>
                        <li>❌ Componentes muito grandes</li>
                        <li>❌ Lógica complexa inline</li>
                        <li>❌ Dependencies desnecessárias</li>
                        <li>❌ console.log em produção</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Anterior
                  </Button>
                  <Button onClick={() => setCurrentStep(3)}>
                    Próximo: Componente Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 3: Demo Component */}
          <TabsContent value="3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderTree className="h-5 w-5" />
                  Passo 3: Criar Componente Demo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert variant="default" title="Componentes Demo">
                  Demos são exemplos visuais isolados que demonstram o uso do componente. 
                  Eles vivem em <code>src/components/demos/</code> e são usados na homepage.
                </Alert>

                <div>
                  <h3 className="text-lg font-semibold mb-3">🎨 Estrutura do Demo</h3>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2">src/components/demos/ButtonDemo.tsx</h4>
                    <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border overflow-x-auto">
{`import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@vitorandradecoelho/sd-components";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, Mail } from "lucide-react";

export const ButtonDemo = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Card className="gradient-card border-card-border shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {t('component.button.title')}
          <Badge>{t('common.basic')}</Badge>
        </CardTitle>
        <CardDescription>
          {t('component.button.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <Button variant="default">
            Padrão
          </Button>
          
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Com Ícone
          </Button>
          
          <Button variant="ghost" size="sm">
            Pequeno
          </Button>
          
          <Button 
            variant="default" 
            loading={loading}
            onClick={handleClick}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {loading ? "Carregando..." : "Clique aqui"}
          </Button>
        </div>

        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground">
            💡 Suporta variants, sizes e loading state
          </p>
        </div>
      </CardContent>
    </Card>
  );
};`}
                    </pre>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">src/components/demos/index.ts</h4>
                    <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border">
{`export { InputDemo } from './InputDemo';
export { SelectDemo } from './SelectDemo';
export { ButtonDemo } from './ButtonDemo';  // ← Adicionar novo`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">🎯 Boas Práticas para Demos</h3>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✅</span>
                      <span><strong>Interativo:</strong> Permita que o usuário teste o componente</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✅</span>
                      <span><strong>Estados:</strong> Mostre diferentes variants, sizes e estados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✅</span>
                      <span><strong>Dica:</strong> Adicione tooltip ou nota explicativa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✅</span>
                      <span><strong>Responsivo:</strong> Funcione bem em mobile e desktop</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✅</span>
                      <span><strong>Isolado:</strong> Sem dependências de outros componentes complexos</span>
                    </li>
                  </ul>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Anterior
                  </Button>
                  <Button onClick={() => setCurrentStep(4)}>
                    Próximo: Rotas & Docs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 4: Routes & Documentation */}
          <TabsContent value="4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Passo 4: Rotas & Documentação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">🛣️ Adicionar Rota</h3>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">src/config/routes.config.tsx</h4>
                    <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border overflow-x-auto">
{`import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// ... imports existentes

const ButtonDocs = lazy(() => import('@/pages/ButtonDocs'));

export const routes: RouteObject[] = [
  // ... rotas existentes
  {
    path: '/docs/button',
    element: <ButtonDocs />
  }
];`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">📄 Página de Documentação</h3>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">src/pages/ButtonDocs.tsx</h4>
                    <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border overflow-x-auto">
{`import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@vitorandradecoelho/sd-components';
import { ButtonDemo } from '@/components/demos';

const ButtonDocs = () => {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Button Component</h1>
        <p className="text-muted-foreground">
          Componente de botão reutilizável com múltiplas variantes
        </p>
      </div>

      {/* Live Demo */}
      <ButtonDemo />

      {/* Installation */}
      <Card>
        <CardHeader>
          <CardTitle>Instalação</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded">
npm install @vitorandradecoelho/sd-components
          </pre>
        </CardContent>
      </Card>

      {/* Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Uso Básico</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded overflow-x-auto">
{\`import { Button } from '@vitorandradecoelho/sd-components';

function App() {
  return (
    <Button variant="default" size="md">
      Clique aqui
    </Button>
  );
}\`}
          </pre>
        </CardContent>
      </Card>

      {/* Props */}
      <Card>
        <CardHeader>
          <CardTitle>Props</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Prop</th>
                <th className="text-left p-2">Type</th>
                <th className="text-left p-2">Default</th>
                <th className="text-left p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2"><code>variant</code></td>
                <td className="p-2">"default" | "outline" | "ghost"</td>
                <td className="p-2">"default"</td>
                <td className="p-2">Visual variant</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>size</code></td>
                <td className="p-2">"sm" | "md" | "lg"</td>
                <td className="p-2">"md"</td>
                <td className="p-2">Button size</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>loading</code></td>
                <td className="p-2">boolean</td>
                <td className="p-2">false</td>
                <td className="p-2">Show loading state</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ButtonDocs;`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">🏠 Adicionar na Homepage</h3>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">src/pages/Index.tsx</h4>
                    <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border">
{`import { ButtonDemo } from "@/components/demos";

// ... no JSX
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <InputDemo />
  <SelectDemo />
  <ButtonDemo />  {/* ← Adicionar */}
  {/* ... outros demos */}
</div>`}
                    </pre>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(3)}>
                    Anterior
                  </Button>
                  <Button onClick={() => setCurrentStep(5)}>
                    Próximo: Build & Publish
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 5: Build & Publish */}
          <TabsContent value="5">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Passo 5: Build & Publish
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">🔨 Build da Biblioteca</h3>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">1️⃣ Build Local</h4>
                      <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border">
{`cd lib
npm run build

# Verifica os arquivos gerados
ls dist/
# ✅ index.js
# ✅ index.esm.js  
# ✅ index.d.ts
# ✅ styles.css`}
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">2️⃣ Testar Localmente (Opcional)</h4>
                      <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border">
{`# No diretório lib/
npm link

# No diretório raiz do projeto
npm link @vitorandradecoelho/sd-components

# Testar mudanças
# ...

# Quando terminar, desfazer link
npm unlink @vitorandradecoelho/sd-components`}
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">3️⃣ Publicar no NPM</h4>
                      <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border">
{`# Fazer login (apenas primeira vez)
npm login

# Publicar com versionamento automático
npm run release:patch  # 1.0.0 → 1.0.1 (bugfix)
npm run release:minor  # 1.0.0 → 1.1.0 (nova feature)
npm run release:major  # 1.0.0 → 2.0.0 (breaking change)

# Ou manual
npm version patch
npm publish`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">📦 Versionamento Semântico</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">PATCH (1.0.X)</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Bugfixes</li>
                        <li>• Correções de estilo</li>
                        <li>• Typos na documentação</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">MINOR (1.X.0)</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Novas features</li>
                        <li>• Novos componentes</li>
                        <li>• Backward compatible</li>
                      </ul>
                    </div>

                    <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">MAJOR (X.0.0)</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Breaking changes</li>
                        <li>• Remoção de APIs</li>
                        <li>• Mudanças de interface</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Alert variant="warning" title="Atenção">
                  Sempre teste localmente antes de publicar. Uma vez publicado, não é possível remover uma versão do NPM!
                </Alert>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(4)}>
                    Anterior
                  </Button>
                  <Button onClick={() => setCurrentStep(6)}>
                    Próximo: Integração
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 6: Integration */}
          <TabsContent value="6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Passo 6: Integração Final
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">🔄 Atualizar no Projeto</h3>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border">
{`# No diretório raiz do projeto
npm install @vitorandradecoelho/sd-components@latest

# Ou versão específica
npm install @vitorandradecoelho/sd-components@1.0.1`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">✅ Checklist Final</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-3 bg-muted rounded">
                      <input type="checkbox" id="check1" />
                      <label htmlFor="check1" className="text-sm">
                        Componente criado em <code>lib/src/components/</code>
                      </label>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded">
                      <input type="checkbox" id="check2" />
                      <label htmlFor="check2" className="text-sm">
                        Exportado em <code>lib/src/index.ts</code>
                      </label>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded">
                      <input type="checkbox" id="check3" />
                      <label htmlFor="check3" className="text-sm">
                        Build executado com sucesso
                      </label>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded">
                      <input type="checkbox" id="check4" />
                      <label htmlFor="check4" className="text-sm">
                        Publicado no NPM
                      </label>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded">
                      <input type="checkbox" id="check5" />
                      <label htmlFor="check5" className="text-sm">
                        Demo criado em <code>src/components/demos/</code>
                      </label>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded">
                      <input type="checkbox" id="check6" />
                      <label htmlFor="check6" className="text-sm">
                        Rota adicionada em <code>routes.config.tsx</code>
                      </label>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded">
                      <input type="checkbox" id="check7" />
                      <label htmlFor="check7" className="text-sm">
                        Página de documentação criada
                      </label>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded">
                      <input type="checkbox" id="check8" />
                      <label htmlFor="check8" className="text-sm">
                        Demo adicionado na homepage
                      </label>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded">
                      <input type="checkbox" id="check9" />
                      <label htmlFor="check9" className="text-sm">
                        Testado em desenvolvimento e produção
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">📚 Recursos Adicionais</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <BookOpen className="h-5 w-5 text-primary mt-1" />
                          <div>
                            <h4 className="font-semibold mb-1">Documentação Completa</h4>
                            <p className="text-sm text-muted-foreground">
                              Consulte LIBRARY_MIGRATION_GUIDE.md e REFACTORING_SUMMARY.md
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <GitBranch className="h-5 w-5 text-primary mt-1" />
                          <div>
                            <h4 className="font-semibold mb-1">Arquitetura do Projeto</h4>
                            <p className="text-sm text-muted-foreground">
                              Veja ProjectArchitectureDocs para detalhes da estrutura
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg text-center">
                  <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">
                    🎉 Parabéns!
                  </h3>
                  <p className="text-green-600 dark:text-green-400">
                    Você criou e publicou um componente seguindo todas as boas práticas!
                  </p>
                </div>

                <div className="flex justify-start">
                  <Button variant="outline" onClick={() => setCurrentStep(5)}>
                    Anterior
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

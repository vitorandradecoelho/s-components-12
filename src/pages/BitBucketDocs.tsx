import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GitBranch, Package, Settings, Upload, CheckCircle, AlertCircle, Code, Terminal, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

const BitBucketDocs = () => {
  const [showCommand, setShowCommand] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(1);

  const toggleCommand = (command: string) => {
    setShowCommand(showCommand === command ? null : command);
  };

  const steps = [
    {
      id: 1,
      title: 'Instalação da Biblioteca',
      description: 'Instale a biblioteca sd_components no seu projeto',
      icon: <Package className="h-5 w-5" />,
      commands: [
        'npm install @vitorandradecoelho/sd-components',
        'yarn add @vitorandradecoelho/sd-components'
      ]
    },
    {
      id: 2,
      title: 'Configuração BitBucket',
      description: 'Configure o repositório BitBucket para versionamento',
      icon: <Settings className="h-5 w-5" />,
      commands: [
        'cd lib',
        'node scripts/setup-bitbucket.js'
      ]
    },
    {
      id: 3,
      title: 'Export e Versionamento',
      description: 'Use o script de export para publicar no BitBucket',
      icon: <Upload className="h-5 w-5" />,
      commands: [
        'cd lib',
        'npm run export',
        '# Escolha: 2. BitBucket Repository'
      ]
    },
    {
      id: 4,
      title: 'Verificação',
      description: 'Verifique se a publicação foi realizada com sucesso',
      icon: <CheckCircle className="h-5 w-5" />,
      commands: [
        'git tag -l',
        'git log --oneline -5'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/documentation">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para Docs
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <GitBranch className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">BitBucket Integration</h1>
              <Badge variant="secondary">sd_components</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Documentação BitBucket
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Guia completo para configurar e usar o BitBucket como repositório de versionamento 
            para a biblioteca sd_components. Controle de versões automático e deploy simplificado.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Badge variant="outline" className="px-4 py-2">
              <GitBranch className="h-4 w-4 mr-2" />
              Versionamento Automático
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Settings className="h-4 w-4 mr-2" />
              Configuração Simples
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Upload className="h-4 w-4 mr-2" />
              Deploy Automatizado
            </Badge>
          </div>
        </div>

        {/* Quick Start Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5" />
              Quick Start - 4 Passos Simples
            </CardTitle>
            <CardDescription>
              Siga estes passos para configurar o BitBucket em minutos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    activeStep === step.id
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setActiveStep(step.id)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      activeStep === step.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      {step.icon}
                    </div>
                    <span className="font-semibold text-sm">Passo {step.id}</span>
                  </div>
                  <h3 className="font-medium mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>

            {/* Command Display */}
            <div className="mt-6">
              <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400 mb-2">
                  # {steps.find(s => s.id === activeStep)?.title}
                </div>
                {steps.find(s => s.id === activeStep)?.commands.map((cmd, idx) => (
                  <div key={idx} className="text-slate-300">
                    <span className="text-blue-400">$</span> {cmd}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Guides */}
        <Tabs defaultValue="setup" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="setup">Configuração</TabsTrigger>
            <TabsTrigger value="workflow">Fluxo de Trabalho</TabsTrigger>
            <TabsTrigger value="commands">Comandos</TabsTrigger>
            <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
          </TabsList>

          {/* Setup Tab */}
          <TabsContent value="setup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configuração Inicial do BitBucket
                </CardTitle>
                <CardDescription>
                  Configure o repositório BitBucket uma única vez
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Pré-requisitos:</strong> Tenha uma conta BitBucket e um repositório criado.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      1. Execute o script de configuração
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleCommand('setup')}
                      >
                        {showCommand === 'setup' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </h4>
                    {showCommand === 'setup' && (
                      <div className="bg-slate-950 rounded p-4 font-mono text-sm">
                        <div className="text-slate-300">
                          <div><span className="text-blue-400">$</span> cd lib</div>
                          <div><span className="text-blue-400">$</span> node scripts/setup-bitbucket.js</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">2. Informe a URL do repositório</h4>
                    <p className="text-muted-foreground mb-2">Exemplo:</p>
                    <code className="bg-muted px-2 py-1 rounded">
                      https://usuario@bitbucket.org/usuario/projeto.git
                    </code>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">3. Configuração automática</h4>
                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                      <li>Adiciona o repositório como origin</li>
                      <li>Configura branch principal (main)</li>
                      <li>Faz commit inicial se necessário</li>
                      <li>Atualiza package.json com info do repo</li>
                      <li>Faz push inicial (opcional)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Workflow Tab */}
          <TabsContent value="workflow" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  Fluxo de Trabalho Completo
                </CardTitle>
                <CardDescription>
                  Como trabalhar com versionamento automático no BitBucket
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Desenvolvimento</h4>
                      <p className="text-muted-foreground mb-2">
                        Trabalhe normalmente nos componentes da biblioteca
                      </p>
                      <div className="bg-slate-950 rounded p-3 font-mono text-sm">
                        <div className="text-slate-300">
                          <div><span className="text-blue-400">$</span> # Edite os arquivos em lib/src/</div>
                          <div><span className="text-blue-400">$</span> vim lib/src/components/MeuComponente.tsx</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Export Automatizado</h4>
                      <p className="text-muted-foreground mb-2">
                        Execute o script de export e escolha BitBucket
                      </p>
                      <div className="bg-slate-950 rounded p-3 font-mono text-sm">
                        <div className="text-slate-300">
                          <div><span className="text-blue-400">$</span> cd lib</div>
                          <div><span className="text-blue-400">$</span> npm run export</div>
                          <div><span className="text-yellow-400">#</span> Escolha: 2. BitBucket Repository</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Versionamento</h4>
                      <p className="text-muted-foreground mb-2">
                        Escolha o tipo de versão conforme suas mudanças
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                        <div className="border rounded-lg p-3">
                          <Badge variant="secondary" className="mb-2">Patch</Badge>
                          <p className="text-sm text-muted-foreground">
                            Correções de bugs<br />
                            <code className="text-xs">0.1.0 → 0.1.1</code>
                          </p>
                        </div>
                        <div className="border rounded-lg p-3">
                          <Badge variant="secondary" className="mb-2">Minor</Badge>
                          <p className="text-sm text-muted-foreground">
                            Novas funcionalidades<br />
                            <code className="text-xs">0.1.0 → 0.2.0</code>
                          </p>
                        </div>
                        <div className="border rounded-lg p-3">
                          <Badge variant="secondary" className="mb-2">Major</Badge>
                          <p className="text-sm text-muted-foreground">
                            Mudanças incompatíveis<br />
                            <code className="text-xs">0.1.0 → 1.0.0</code>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-600">Automação Completa</h4>
                      <p className="text-muted-foreground mb-2">
                        O script executa automaticamente:
                      </p>
                      <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                        <li>📦 Build da biblioteca</li>
                        <li>🔢 Atualização da versão no package.json</li>
                        <li>📝 Commit com mensagem padronizada</li>
                        <li>🏷️ Criação de tag Git</li>
                        <li>🚀 Push para BitBucket</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Commands Tab */}
          <TabsContent value="commands" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Comandos Principais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">Configuração BitBucket</h4>
                    <code className="bg-muted px-2 py-1 rounded block text-sm">
                      npm run setup:bitbucket
                    </code>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-1">Export Completo</h4>
                    <code className="bg-muted px-2 py-1 rounded block text-sm">
                      npm run export
                    </code>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-1">Build Automático</h4>
                    <code className="bg-muted px-2 py-1 rounded block text-sm">
                      npm run build:auto
                    </code>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-1">Watch Mode</h4>
                    <code className="bg-muted px-2 py-1 rounded block text-sm">
                      npm run watch
                    </code>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Comandos Git Úteis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">Ver tags/versões</h4>
                    <code className="bg-muted px-2 py-1 rounded block text-sm">
                      git tag -l
                    </code>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-1">Histórico de commits</h4>
                    <code className="bg-muted px-2 py-1 rounded block text-sm">
                      git log --oneline -5
                    </code>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-1">Status do repositório</h4>
                    <code className="bg-muted px-2 py-1 rounded block text-sm">
                      git status
                    </code>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-1">Verificar remotes</h4>
                    <code className="bg-muted px-2 py-1 rounded block text-sm">
                      git remote -v
                    </code>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Troubleshooting Tab */}
          <TabsContent value="troubleshooting" className="space-y-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="h-5 w-5" />
                    Problemas Comuns e Soluções
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">❌ "Repository not configured"</h4>
                    <p className="text-muted-foreground mb-2">
                      <strong>Causa:</strong> Repositório BitBucket não foi configurado
                    </p>
                    <p className="text-muted-foreground mb-2">
                      <strong>Solução:</strong>
                    </p>
                    <div className="bg-slate-950 rounded p-3 font-mono text-sm">
                      <div className="text-slate-300">
                        <div><span className="text-blue-400">$</span> cd lib</div>
                        <div><span className="text-blue-400">$</span> node scripts/setup-bitbucket.js</div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">❌ "Authentication failed"</h4>
                    <p className="text-muted-foreground mb-2">
                      <strong>Causa:</strong> Problemas de autenticação com BitBucket
                    </p>
                    <p className="text-muted-foreground mb-2">
                      <strong>Soluções:</strong>
                    </p>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium mb-1">Para HTTPS com token:</p>
                        <code className="bg-muted px-2 py-1 rounded block text-sm">
                          git remote set-url origin https://TOKEN@bitbucket.org/usuario/projeto.git
                        </code>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Para SSH:</p>
                        <code className="bg-muted px-2 py-1 rounded block text-sm">
                          git remote set-url origin git@bitbucket.org:usuario/projeto.git
                        </code>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">❌ "Nothing to commit"</h4>
                    <p className="text-muted-foreground mb-2">
                      <strong>Causa:</strong> Não há mudanças para fazer commit
                    </p>
                    <p className="text-muted-foreground mb-2">
                      <strong>Solução:</strong>
                    </p>
                    <div className="bg-slate-950 rounded p-3 font-mono text-sm">
                      <div className="text-slate-300">
                        <div><span className="text-blue-400">$</span> cd lib</div>
                        <div><span className="text-blue-400">$</span> git add .</div>
                        <div><span className="text-blue-400">$</span> git status  # Verificar mudanças</div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-orange-600 mb-2">⚠️ "Tag already exists"</h4>
                    <p className="text-muted-foreground mb-2">
                      <strong>Causa:</strong> Tag da versão já existe
                    </p>
                    <p className="text-muted-foreground mb-2">
                      <strong>Solução:</strong>
                    </p>
                    <div className="bg-slate-950 rounded p-3 font-mono text-sm">
                      <div className="text-slate-300">
                        <div><span className="text-blue-400">$</span> git tag -d v0.2.0        # Remove tag local</div>
                        <div><span className="text-blue-400">$</span> git push origin :v0.2.0  # Remove tag remota</div>
                        <div><span className="text-blue-400">$</span> npm run export           # Tente novamente</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    Boas Práticas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Sempre teste localmente antes de fazer release</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Use versões semânticas (patch/minor/major) corretamente</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Mantenha commits descritivos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Faça backup antes de mudanças grandes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Use branches para features grandes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Documente mudanças no CHANGELOG.md</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Links úteis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Links Úteis e Recursos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Documentação</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• BitBucket Git Tutorial</li>
                  <li>• Semantic Versioning</li>
                  <li>• Conventional Commits</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Scripts Locais</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• lib/EXPORT_GUIDE.md</li>
                  <li>• lib/BITBUCKET_WORKFLOW.md</li>
                  <li>• lib/README_QUICK_START.md</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Biblioteca</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• NPM: @vitorandradecoelho/sd-components</li>
                  <li>• Componentes: 14 disponíveis</li>
                  <li>• TypeScript: Suporte completo</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BitBucketDocs;
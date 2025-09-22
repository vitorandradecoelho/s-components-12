import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Copy, Check, Palette, Code2, Zap, FileText, Settings, Eye, Package, Bus, Route } from 'lucide-react';
import { toast } from 'sonner';
import { LinhaTrajetoSelector, type Linha } from '@/components/library';

const LinhaTrajetoCssGuide = () => {
  const { t } = useLanguage();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyToClipboard = async (code: string, title: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(title);
      toast.success('Código copiado!');
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      toast.error('Erro ao copiar código');
    }
  };

  // Dados de exemplo para demonstração
  const sampleLinhas: Linha[] = [
    {
      "_id": "5e8e3bbf4be5542e43e539eb",
      "clienteId": 1314,
      "id_migracao": 3210,
      "descr": "01 - Esperança / Taboão",
      "numero": "01",
      "trajetos": [
        {
          "_id": "5e8e3bbf4be5542e43e539e9",
          "id_migracao": 8639,
          "externalId": "0",
          "nome": "01 - Esperança / Sentido Taboão",
          "colorIdx": 7,
          "qtdTransmisoesInicial": 1,
          "qtdTransmisoesFinal": 1,
          "percentConclusao": 90,
          "toleranciaArrasto": 5,
          "kmTrajeto": 17.51,
          "tempoMedioViagem": 80,
          "sentidoTipo": "P",
          "headwayCopiloto": 0,
          "orientacao": "N",
          "consorcioSinoticoUnificado": [],
          "garagem": [],
          "despachoSemCor": true,
          "ativo": true,
          "sentido": "ida",
          "codigosIntegracao": ["1"],
          "raioTrajeto": 100,
          "id": "5e8e3bbf4be5542e43e539e9"
        }
      ],
      "id": "5e8e3bbf4be5542e43e539eb"
    }
  ];

  const steps = [
    {
      title: "1. Definir Variáveis CSS do Tema",
      description: "Criar as variáveis de cor específicas para o LinhaTrajetoSelector no design system",
      file: "lib/src/styles/index.css & src/index.css",
      code: `/* Tema claro (:root) */
:root {
  /* LinhaTrajetoSelector Custom Theme */
  --linhatrajeto-primary: 160 100% 35%;        /* Verde transport */
  --linhatrajeto-primary-light: 160 85% 45%;   /* Verde claro */
  --linhatrajeto-background: 160 25% 98%;      /* Fundo sutil */
  --linhatrajeto-border: 160 30% 85%;          /* Bordas suaves */
  --linhatrajeto-accent: 200 100% 50%;         /* Azul trajetos */
}

/* Tema escuro (.dark) */
.dark {
  /* LinhaTrajetoSelector Custom Theme */
  --linhatrajeto-primary: 160 85% 45%;         /* Verde adaptado */
  --linhatrajeto-primary-light: 160 75% 55%;   /* Verde mais claro */
  --linhatrajeto-background: 160 15% 92%;      /* Fundo escuro */
  --linhatrajeto-border: 160 20% 75%;          /* Bordas escuras */
  --linhatrajeto-accent: 200 85% 60%;          /* Azul adaptado */
}`,
      icon: Palette
    },
    {
      title: "2. Classes CSS com Animações",
      description: "Implementar classes CSS com animações e transições suaves usando o design system",
      file: "lib/src/styles/index.css & src/index.css",
      code: `/* LinhaTrajetoSelector Custom Styles com Animações */
.linhatrajeto-container {
  @apply p-4 rounded-xl border;
  background: linear-gradient(135deg, 
    hsl(var(--linhatrajeto-background)), 
    hsl(var(--background)));
  border-color: hsl(var(--linhatrajeto-border));
  box-shadow: 0 4px 12px -2px hsl(var(--linhatrajeto-primary) / 0.1);
  animation: fade-in 0.3s ease-out;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.linhatrajeto-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px -4px hsl(var(--linhatrajeto-primary) / 0.15);
}

/* Ícones emoji animados */
.linhatrajeto-linha-container::before {
  content: "🚌";
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  font-size: 1.2em;
  transition: all 0.3s ease;
}

.linhatrajeto-linha-container:hover::before {
  transform: translateY(-50%) scale(1.1);
}

/* Estados interativos com animações */
.linhatrajeto-linha-select [data-radix-select-trigger]:hover {
  border-color: hsl(var(--linhatrajeto-primary) / 0.6);
  box-shadow: 0 0 0 2px hsl(var(--linhatrajeto-primary) / 0.1);
  transform: scale(1.02);
}

.linhatrajeto-linha-select [data-radix-select-trigger]:focus-visible {
  outline: none;
  border-color: hsl(var(--linhatrajeto-primary));
  box-shadow: 0 0 0 3px hsl(var(--linhatrajeto-primary) / 0.2);
  animation: scale-in 0.2s ease-out;
}

/* Estados de loading e erro */
.linhatrajeto-loading {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.linhatrajeto-error {
  animation: fade-in 0.3s ease-out;
  border-left: 4px solid hsl(var(--destructive));
}`,
      icon: Code2
    },
    {
      title: "3. Keyframes de Animação",
      description: "Configurar as animações no tailwind.config.ts usando as keyframes disponíveis",
      file: "tailwind.config.ts",
      code: `// tailwind.config.ts - Animações já configuradas no projeto
export default {
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        }
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out"
      }
    }
  }
}

// Uso das animações:
// - fade-in: Para entradas suaves
// - scale-in: Para efeitos de foco
// - pulse: Para loading states (já incluído no Tailwind)`,
      icon: Zap
    },
    {
      title: "4. Aplicar Classes no Componente",
      description: "Modificar o componente LinhaTrajetoSelector para usar as classes CSS personalizadas",
      file: "lib/src/components/LinhaTrajetoSelector.tsx",
      code: `return (
  <div ref={ref} className={cn("linhatrajeto-container", className)} {...props}>
    <div className="space-y-4">
      <div className="linhatrajeto-linha-container">
        <ComboBox
          options={linhaOptions}
          value={selectedLinhaId ? [selectedLinhaId] : []}
          onValueChange={(values) => {
            const linhaId = values[0];
            if (linhaId) {
              handleLinhaChange(linhaId);
            } else {
              handleLinhaClear();
            }
          }}
          placeholder={linhaPlaceholder}
          label={linhaLabel}
          disabled={disabled}
          size={size}
          clearable
          searchable
          aria-label="Seleção de linha de transporte"
          className="linhatrajeto-linha-select"
        />
      </div>

      <div className="linhatrajeto-trajeto-container">
        <ComboBox
          options={trajetoOptions}
          value={selectedTrajetoIds}
          onValueChange={(values) => {
            if (values.length > 0) {
              handleTrajetoChange(values);
            } else {
              handleTrajetoClear();
            }
          }}
          placeholder={trajetoPlaceholder}
          label={trajetoLabel}
          disabled={disabled || !selectedLinha}
          size={size}
          multiple={multiSelectTrajeto}
          clearable
          searchable
          aria-label="Seleção de trajetos"
          className="linhatrajeto-trajeto-select"
        />
      </div>
    </div>
  </div>
);`,
      icon: Settings
    },
    {
      title: "5. Importar Utilitário cn",
      description: "Garantir que a função cn (className merge) esteja disponível para combinar classes",
      file: "lib/src/components/LinhaTrajetoSelector.tsx",
      code: `import React, { useState, useEffect, useMemo } from "react";
import { ComboBox, type ComboOption } from "./ComboBox";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";
import { useLinhaTrajetoData } from "../hooks/useLinhaTrajetoData";
import { cn } from "../lib/utils"; // ← Importar função cn
import type { 
  Linha, 
  Trajeto, 
  LinhaTrajetoSelectorProps 
} from "../types/LinhaTrajetoTypes";
import '../styles/index.css';`,
      icon: Package
    },
    {
      title: "6. Sincronização de Estilos",
      description: "Garantir que os estilos sejam aplicados tanto na biblioteca quanto na aplicação de demonstração",
      file: "Múltiplos arquivos",
      code: `// 1. Copiar variáveis CSS para ambos os arquivos:
// - lib/src/styles/index.css
// - src/index.css

// 2. Aplicar as mesmas classes CSS em ambos:
// - lib/src/styles/index.css (@layer components)
// - src/index.css (@layer components)

// 3. Atualizar componente na biblioteca:
// - lib/src/components/LinhaTrajetoSelector.tsx

// 4. Sincronizar componente na demo:
// - src/components/library/LinhaTrajetoSelector.tsx

// Isso garante consistência visual entre desenvolvimento e produção`,
      icon: Zap
    },
    {
      title: "7. Testar Responsividade",
      description: "Verificar se o componente funciona corretamente em diferentes tamanhos de tela",
      file: "CSS Media Queries",
      code: `/* Adicionar responsividade se necessário */
@media (max-width: 640px) {
  .linhatrajeto-container {
    @apply p-3;
  }
  
  .linhatrajeto-linha-container::before,
  .linhatrajeto-trajeto-container::before {
    font-size: 1em;
  }
}

/* Para telas maiores */
@media (min-width: 1024px) {
  .linhatrajeto-container {
    @apply p-6;
  }
}`,
      icon: Eye
    }
  ];

  const usage = `// Usando o LinhaTrajetoSelector com estilo customizado aplicado
import { LinhaTrajetoSelector, type Linha } from '@vitorandradecoelho/sd-components';

const linhas: Linha[] = [
  {
    _id: "1",
    descr: "Linha Exemplo",
    numero: "001",
    trajetos: [
      {
        _id: "t1",
        nome: "Trajeto Exemplo",
        sentido: "ida",
        kmTrajeto: 15.5
      }
    ]
  }
];

function App() {
  const [selectedLinhaId, setSelectedLinhaId] = useState<string>("");
  const [selectedTrajetoIds, setSelectedTrajetoIds] = useState<string[]>([]);

  return (
    <LinhaTrajetoSelector
      linhas={linhas}
      selectedLinhaId={selectedLinhaId}
      selectedTrajetoIds={selectedTrajetoIds}
      onLinhaChange={(linha) => setSelectedLinhaId(linha?._id || '')}
      onTrajetoChange={(trajetos) => setSelectedTrajetoIds(trajetos.map(t => t._id))}
      linhaLabel="Linha de Transporte"
      trajetoLabel="Trajetos"
      // O estilo já é aplicado automaticamente através das classes CSS
    />
  );
}`;

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link to="/docs">
                <ArrowLeft className="h-4 w-4" />
                {t('nav.docs')}
              </Link>
            </Button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-3xl font-bold">CSS - LinhaTrajetoSelector</h1>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Hero */}
        <div className="space-y-6 mb-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Customização CSS com Animações
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Guia completo de implementação de estilos customizados para o componente LinhaTrajetoSelector, 
              incluindo variáveis CSS, classes personalizadas, animações e aplicação prática.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full">
              <Bus className="h-4 w-4" />
              LinhaTrajetoSelector
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full">
              <Palette className="h-4 w-4" />
              Design System
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full">
              <Route className="h-4 w-4" />
              Animações
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {/* Demonstração com Animações */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-primary" />
                LinhaTrajetoSelector com Animações
              </CardTitle>
              <CardDescription>
                Veja o componente com todas as animações e transições aplicadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Demo interativo */}
              <div className="p-6 bg-background border border-border rounded-lg">
                <div className="max-w-md mx-auto">
                  <LinhaTrajetoSelector
                    linhas={sampleLinhas}
                    selectedLinhaId=""
                    selectedTrajetoIds={[]}
                    onLinhaChange={() => {}}
                    onTrajetoChange={() => {}}
                    linhaLabel="🚌 Linha de Transporte"
                    trajetoLabel="🛣️ Trajetos da Viagem"
                    linhaPlaceholder="Passe o mouse e clique para testar..."
                    trajetoPlaceholder="Selecione trajetos..."
                  />
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    💡 <strong>Teste as animações:</strong> Passe o mouse sobre o container, 
                    foque nos campos e observe as transições suaves!
                  </p>
                </div>
              </div>
              
              {/* Lista de animações */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg space-y-3">
                  <h4 className="font-semibold text-primary mb-2">🎭 Animações de Container</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <span><strong>Fade-in:</strong> Entrada suave (0.3s)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <span><strong>Hover lift:</strong> TranslateY(-2px)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <span><strong>Sombra:</strong> Box-shadow animada</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-accent/10 rounded-lg space-y-3">
                  <h4 className="font-semibold text-accent mb-2">⚡ Animações de Interação</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      <span><strong>Hover scale:</strong> Scale(1.02) nos selects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      <span><strong>Focus ring:</strong> Scale-in animation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      <span><strong>Emoji bounce:</strong> Ícones animados</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resultado Final */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-primary" />
                Resultado Final com CSS Aplicado
              </CardTitle>
              <CardDescription>
                Componente completo com design system integrado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Demo do componente com estilo aplicado */}
              <div className="p-6 bg-background border border-border rounded-lg">
                <div className="max-w-md mx-auto">
                  <LinhaTrajetoSelector
                    linhas={sampleLinhas}
                    selectedLinhaId=""
                    selectedTrajetoIds={[]}
                    onLinhaChange={() => {}}
                    onTrajetoChange={() => {}}
                    linhaLabel="🚌 Linha de Transporte"
                    trajetoLabel="🛣️ Trajetos da Viagem"
                    linhaPlaceholder="Selecione uma linha..."
                    trajetoPlaceholder="Selecione trajetos..."
                  />
                </div>
              </div>
              
              {/* Características do estilo */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">🎨 Visual</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Gradiente sutil no container</li>
                    <li>• Ícones emojis contextuais</li>
                    <li>• Bordas coloridas temáticas</li>
                    <li>• Sombras suaves</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-accent/10 rounded-lg">
                  <h4 className="font-semibold text-accent mb-2">⚡ Animações</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Fade-in na entrada (0.3s)</li>
                    <li>• Scale effects no hover</li>
                    <li>• Transform no container</li>
                    <li>• Ícones emoji animados</li>
                    <li>• Pulse no loading</li>
                    <li>• Focus com scale-in</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-success/10 rounded-lg">
                  <h4 className="font-semibold text-success mb-2">🔧 Técnico</h4>
                  <ul className="text-sm space-y-1">
                    <li>• CSS Variables (HSL)</li>
                    <li>• Design system integrado</li>
                    <li>• Dark mode compatível</li>
                    <li>• Responsivo nativo</li>
                  </ul>
                </div>
              </div>
              
              {/* Código de uso */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Como usar:</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(usage, 'usage')}
                  >
                    {copiedCode === 'usage' ? (
                      <>
                        <Check className="h-4 w-4 mr-2 text-success" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="relative">
                  <pre className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm whitespace-pre-wrap">{usage}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Passo a passo implementação */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-primary" />
                Implementação Passo-a-Passo
              </CardTitle>
              <CardDescription>
                Tutorial completo para aplicar os estilos customizados no LinhaTrajetoSelector
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                
                return (
                  <div key={index} className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="text-lg font-semibold">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                        <Badge variant="outline" className="text-xs font-mono">
                          {step.file}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(step.code, step.title)}
                      >
                        {copiedCode === step.title ? (
                          <>
                            <Check className="h-4 w-4 mr-2 text-success" />
                            Copiado!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copiar
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <div className="ml-14 space-y-2">
                      <div className="relative">
                        <pre className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto text-sm">
                          <code className="text-sm whitespace-pre-wrap">{step.code}</code>
                        </pre>
                      </div>
                    </div>
                    
                    {index < steps.length - 1 && <Separator className="ml-14" />}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Vantagens da Abordagem */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-warning" />
                Vantagens desta Implementação
              </CardTitle>
              <CardDescription>
                Por que esta abordagem é a melhor para customizar o LinhaTrajetoSelector
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">🎨 Design System</h4>
                    <p className="text-sm text-primary-foreground">
                      Utiliza variáveis CSS semânticas que se adaptam automaticamente 
                      aos temas claro e escuro, garantindo consistência visual.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                    <h4 className="font-semibold text-accent mb-2">⚡ Performance</h4>
                    <p className="text-sm text-accent-foreground">
                      CSS puro com animações nativas garantem performance máxima 
                      sem dependências JavaScript extras.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <h4 className="font-semibold text-success mb-2">🔄 Manutenível</h4>
                    <p className="text-sm text-success-foreground">
                      Separação clara entre lógica e apresentação facilita 
                      manutenção e atualizações futuras do componente.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                    <h4 className="font-semibold text-warning mb-2">📦 Exportável</h4>
                    <p className="text-sm text-warning-foreground">
                      Estilos são empacotados junto com a biblioteca, 
                      garantindo que funcionem em qualquer projeto que importe o componente.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LinhaTrajetoCssGuide;
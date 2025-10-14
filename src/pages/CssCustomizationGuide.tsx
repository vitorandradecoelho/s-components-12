import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Copy, Check, Palette, Code2, Zap, FileText, Settings, Eye, Package } from 'lucide-react';
import { toast } from 'sonner';
import { Select } from '@/components/library';

const CssCustomizationGuide = () => {
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

  const steps = [
    {
      title: "1. Adicionar Variáveis CSS ao Design System",
      description: "Primeiro, adicionamos as variáveis de cor ao arquivo de estilos da biblioteca",
      file: "lib/src/styles/index.css",
      code: `/* Adicionar no tema claro (:root) */
:root {
  /* ... outras variáveis existentes ... */
  
  /* Sindiobus Theme */
  --sindiobus-green: 75 100% 45%;
  --sindiobus-green-light: 75 90% 55%;
  --sindiobus-background: 210 20% 98%;
  --sindiobus-foreground: 220 15% 25%;
}

/* Adicionar no tema escuro (.dark) */
.dark {
  /* ... outras variáveis existentes ... */
  
  /* Sindiobus Theme */
  --sindiobus-green: 75 85% 55%;
  --sindiobus-green-light: 75 75% 65%;
  --sindiobus-background: 210 15% 95%;
  --sindiobus-foreground: 220 20% 30%;
}`,
      icon: Palette
    },
    {
      title: "2. Expandir Interface TypeScript",
      description: "Atualizar a interface do componente para aceitar o novo variant",
      file: "lib/src/components/Select.tsx",
      code: `interface SelectProps {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  success?: string;
  helper?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filled" | "ghost" | "sindiobus"; // ← Novo variant adicionado
  className?: string;
}`,
      icon: Code2
    },
    {
      title: "3. Implementar Variant Classes",
      description: "Adicionar as classes CSS específicas para o novo variant",
      file: "lib/src/components/Select.tsx",
      code: `const variantClasses = {
  default: "bg-background border-border hover:border-border-strong focus:border-input-focus focus:ring-2 focus:ring-input-focus/20",
  filled: "bg-surface border-transparent hover:bg-surface-elevated focus:bg-background focus:border-input-focus focus:ring-2 focus:ring-input-focus/20",
  ghost: "bg-transparent border-transparent hover:bg-muted/50 focus:bg-background focus:border-input-focus focus:ring-2 focus:ring-input-focus/20",
  sindiobus: "bg-[hsl(var(--sindiobus-background))] border-border/50 hover:border-border-strong focus:border-input-focus focus:ring-2 focus:ring-input-focus/20" // ← Novo variant
};`,
      icon: Settings
    },
    {
      title: "4. Customizar Cores Condicionalmente",
      description: "Aplicar cores específicas baseadas no variant selecionado",
      file: "lib/src/components/Select.tsx",
      code: `{/* Texto condicional baseado no variant */}
<span className={cn(
  selectedOption 
    ? (variant === "sindiobus" 
        ? "text-[hsl(var(--sindiobus-foreground))]" 
        : "text-foreground"
      ) 
    : "text-muted-foreground"
)}>
  {selectedOption?.label || placeholder}
</span>

{/* Ícone com cor condicional */}
<ChevronDown className={cn(
  "h-4 w-4 transition-transform duration-200",
  variant === "sindiobus" 
    ? "text-[hsl(var(--sindiobus-green))]" 
    : "text-muted-foreground",
  isOpen && "rotate-180"
)} />`,
      icon: Eye
    },
    {
      title: "5. Sincronizar com Aplicação Principal",
      description: "Garantir que os estilos sejam aplicados também na aplicação de demonstração",
      file: "src/index.css",
      code: `/* Copiar as mesmas variáveis do passo 1 para src/index.css */
:root {
  /* ... outras variáveis ... */
  
  /* Sindiobus Theme */
  --sindiobus-green: 75 100% 45%;
  --sindiobus-green-light: 75 90% 55%;
  --sindiobus-background: 210 20% 98%;
  --sindiobus-foreground: 220 15% 25%;
}

.dark {
  /* ... outras variáveis ... */
  
  /* Sindiobus Theme */
  --sindiobus-green: 75 85% 55%;
  --sindiobus-green-light: 75 75% 65%;
  --sindiobus-background: 210 15% 95%;
  --sindiobus-foreground: 220 20% 30%;
}`,
      icon: Package
    },
    {
      title: "6. Atualizar Documentação",
      description: "Adicionar exemplo prático do novo variant na documentação",
      file: "src/pages/SelectDocs.tsx",
      code: `{
  title: 'Estilo Sindiobus',
  code: \`import { Select } from '@/components/library';

const options = [
  { label: "SINDIOMDBUS", value: "sindiomdbus" },
  { label: "SINDICATO URBANO", value: "urbano" },
  { label: "TRANSPORTE PÚBLICO", value: "publico" }
];

function SindiobusSelect() {
  const [value, setValue] = useState("sindiomdbus");
  
  return (
    <Select
      variant="sindiobus"
      options={options}
      value={value}
      onValueChange={setValue}
      placeholder="Selecione..."
    />
  );
}\`,
  component: (
    <Select
      variant="sindiobus"
      options={sindiobusOptions}
      value="sindiomdbus"
      onValueChange={() => {}}
      placeholder="Selecione..."
    />
  )
}`,
      icon: FileText
    }
  ];

  const usage = `// Usar o novo variant sindiobus
import { Select } from '@vitorandradecoelho/sd-components';

const options = [
  { label: "SINDIOMDBUS", value: "sindiomdbus" },
  { label: "SINDICATO URBANO", value: "urbano" },
  { label: "TRANSPORTE PÚBLICO", value: "publico" }
];

function App() {
  const [selectedValue, setSelectedValue] = useState("sindiomdbus");

  return (
    <Select
      variant="sindiobus"
      options={options}
      value={selectedValue}
      onValueChange={setSelectedValue}
      placeholder="Selecione uma opção..."
    />
  );
}`;

  const sindiobusOptions = [
    { label: "SINDIOMDBUS", value: "sindiomdbus" },
    { label: "SINDICATO URBANO", value: "urbano" },
    { label: "TRANSPORTE PÚBLICO", value: "publico" }
  ];

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
            <h1 className="text-3xl font-bold">Guia de Customização CSS</h1>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Hero */}
        <div className="space-y-6 mb-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Customização CSS
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Passo-a-passo completo para criar variants customizados de componentes e garantir que os estilos sejam mantidos ao exportar para outros projetos.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full">
              <Code2 className="h-4 w-4" />
              CSS Variables
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full">
              <Palette className="h-4 w-4" />
              Design System
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full">
              <Zap className="h-4 w-4" />
              Export Ready
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {/* Exemplo Final */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-primary" />
                Resultado Final
              </CardTitle>
              <CardDescription>
                Veja como ficou o Select com o variant "sindiobus" aplicado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Demo do componente */}
              <div className="p-6 bg-background border border-border rounded-lg">
                <div className="max-w-md mx-auto">
                  <Select
                    variant="sindiobus"
                    options={sindiobusOptions}
                    value="sindiomdbus"
                    onValueChange={() => {}}
                    placeholder="Selecione uma opção..."
                  />
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

          {/* Passo a passo */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-primary" />
                Passo-a-Passo Detalhado
              </CardTitle>
              <CardDescription>
                Guia completo para implementar variants customizados
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
                    
                    {/* Código */}
                    <div className="ml-14">
                      <div className="relative">
                        <pre className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto">
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

          {/* Pontos Importantes */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-warning" />
                Pontos Importantes
              </CardTitle>
              <CardDescription>
                Considerações essenciais para garantir que tudo funcione perfeitamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <h4 className="font-semibold text-warning mb-2">🎨 Design System</h4>
                  <p className="text-sm text-warning-foreground">
                    Sempre use variáveis CSS (HSL) no design system ao invés de cores hardcoded. 
                    Isso garante consistência e facilita a manutenção.
                  </p>
                </div>
                
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">📦 Exportação</h4>
                  <p className="text-sm">
                    Sincronize os estilos entre <code>lib/src/styles/index.css</code> e <code>src/index.css</code> 
                    para garantir que os estilos sejam mantidos ao exportar para outros projetos.
                  </p>
                </div>
                
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <h4 className="font-semibold text-success mb-2">🔧 TypeScript</h4>
                  <p className="text-sm text-success-foreground">
                    Sempre atualize as interfaces TypeScript para manter a tipagem correta 
                    e o autocomplete funcionando.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CssCustomizationGuide;
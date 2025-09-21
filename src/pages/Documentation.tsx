import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Type, 
  ChevronDown, 
  PenTool, 
  CheckSquare, 
  ToggleLeft, 
  Table, 
  Upload, 
  Image, 
  FileText,
  ArrowLeft,
  BookOpen,
  AlertTriangle,
  Bell,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Navigation,
  Cloud,
  Shield,
  Palette,
  Bus,
  ChevronRight
} from 'lucide-react';

const components = [
  {
    name: 'input',
    icon: Type,
    category: 'basic',
    complexity: 'basic'
  },
  {
    name: 'select',
    icon: ChevronDown,
    category: 'basic',
    complexity: 'basic'
  },
  {
    name: 'textfield',
    icon: PenTool,
    category: 'basic',
    complexity: 'basic'
  },
  {
    name: 'radiobutton',
    icon: ToggleLeft,
    category: 'selection',
    complexity: 'basic'
  },
  {
    name: 'checkbox',
    icon: CheckSquare,
    category: 'selection',
    complexity: 'basic'
  },
  {
    name: 'combobox',
    icon: ChevronDown,
    category: 'selection',
    complexity: 'advanced'
  },
  {
    name: 'datatable',
    icon: Table,
    category: 'data',
    complexity: 'advanced'
  },
  {
    name: 'fileupload',
    icon: Upload,
    category: 'media',
    complexity: 'intermediate'
  },
  {
    name: 'lightbox',
    icon: Image,
    category: 'media',
    complexity: 'intermediate'
  },
  {
    name: 'formmodal',
    icon: FileText,
    category: 'overlay',
    complexity: 'advanced'
  },
  {
    name: 'alert',
    icon: AlertTriangle,
    category: 'feedback',
    complexity: 'basic'
  },
  {
    name: 'toast',
    icon: Bell,
    category: 'feedback', 
    complexity: 'intermediate'
  },
  {
    name: 'sweetalert',
    icon: Sparkles,
    category: 'feedback',
    complexity: 'advanced'
  },
  {
    name: 'datepicker',
    icon: Calendar,
    category: 'input',
    complexity: 'intermediate'
  },
  {
    name: 'timepicker',
    icon: Clock,
    category: 'input',
    complexity: 'basic'
  },
  {
    name: 'linhatrajeto',
    icon: ChevronDown,
    category: 'selection',
    complexity: 'advanced'
  },
  {
    name: 'map',
    icon: MapPin,
    category: 'media',
    complexity: 'intermediate'
  }
];

const complexityColors = {
  basic: 'default',
  intermediate: 'secondary',
  advanced: 'destructive'
} as const;

const Documentation = () => {
  const { t } = useLanguage();

  const groupedComponents = components.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {} as Record<string, typeof components>);

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                {t('nav.home')}
              </Link>
            </Button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-3xl font-bold">{t('nav.docs')}</h1>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Hero */}
        <div className="text-center space-y-6 mb-12">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {t('nav.components')}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('home.subtitle')}
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-12">
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-primary" />
                Guias Especializados
              </CardTitle>
              <CardDescription>
                Documentação avançada para casos específicos
              </CardDescription>
            </CardHeader>
            <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Button asChild variant="outline" className="h-auto p-4 justify-start">
              <Link to="/docs/deployment">
                <div className="flex items-center gap-3">
                  <Cloud className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Deployment & Repositórios</div>
                    <div className="text-sm text-muted-foreground">AWS S3, CodeArtifact, CI/CD</div>
                  </div>
                </div>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4 justify-start">
              <Link to="/docs/css-customization">
                <div className="flex items-center gap-3">
                  <Palette className="h-5 w-5 text-accent" />
                  <div className="text-left">
                    <div className="font-medium">Customização CSS</div>
                    <div className="text-sm text-muted-foreground">Criar variants personalizados</div>
                  </div>
                </div>
              </Link>
            </Button>
          </div>
          
          {/* LinhaTrajetoSelector Guides */}
          <div className="mt-6 space-y-4">
            <h4 className="font-semibold text-foreground">LinhaTrajetoSelector - Guias Específicos</h4>
            
            <Link 
              to="/docs/linhatrajeto" 
              className="block group p-6 bg-card border border-card-border rounded-xl hover:shadow-lg transition-all duration-300 hover:border-primary/50"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Bus className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-card-foreground group-hover:text-primary transition-colors">
                    LinhaTrajetoSelector
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Seletor avançado de linhas e trajetos de transporte público com suporte a API, 
                    internacionalização e múltiplas opções de configuração.
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">API Integration</Badge>
                    <Badge variant="secondary">i18n</Badge>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>

            <Link 
              to="/docs/linhatrajeto-css" 
              className="block group p-6 bg-card border border-card-border rounded-xl hover:shadow-lg transition-all duration-300 hover:border-success/50"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-success/10 text-success rounded-lg flex items-center justify-center group-hover:bg-success/20 transition-colors">
                    <Palette className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-card-foreground group-hover:text-success transition-colors">
                    CSS - LinhaTrajetoSelector
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Guia completo de implementação de estilos customizados para o LinhaTrajetoSelector, 
                    incluindo variáveis CSS, classes personalizadas e aplicação prática.
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="secondary">CSS Variables</Badge>
                    <Badge variant="secondary">Design System</Badge>
                    <Badge variant="secondary">Styling</Badge>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-success transition-colors" />
              </div>
            </Link>
          </div>
            </CardContent>
          </Card>
        </div>

        {/* Components Grid */}
        <div className="space-y-8">
          {Object.entries(groupedComponents).map(([category, categoryComponents]) => (
            <div key={category} className="space-y-4">
              <h2 className="text-2xl font-semibold capitalize text-foreground">
                {category} Components
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryComponents.map((component) => {
                  const Icon = component.icon;
                  
                  return (
                    <Card key={component.name} className="gradient-card border-card-border shadow-medium hover:shadow-large transition-all duration-300 group">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary/20 transition-colors">
                              <Icon className="h-5 w-5" />
                            </div>
                            {t(`component.${component.name}.title`)}
                          </div>
                          <Badge variant={complexityColors[component.complexity]}>
                            {t(`common.${component.complexity}`)}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          {t(`component.${component.name}.description`)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button asChild className="w-full">
                          <Link to={`/docs/${component.name}`}>
                            {t('home.viewDocs')}
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documentation;
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { SweetAlert, useSweetAlert } from "@vitorandradecoelho/sd-components";
import { Code, Palette, Zap, BookOpen, GitBranch, Package, Settings, Users } from "lucide-react";
import { Link } from "react-router-dom";


// Import demo components
import {
  InputDemo,
  SelectDemo,
  TextFieldDemo,
  RadioButtonDemo,
  CheckBoxDemo,
  AccordionDemo,
  ComboBoxDemo,
  AlertDemo,
  ToastDemo,
  SweetAlertDemo,
} from "@/components/demos";


const Index = () => {
  const { t } = useLanguage();
  const { SweetAlert: SweetAlertComponent } = useSweetAlert();

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container max-w-7xl mx-auto px-6 py-12 space-y-12">
        
        {/* Header */}
        <div className="flex items-center justify-end mb-8">
          <LanguageSwitcher />
        </div>

        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {t('home.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.subtitle')}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full">
              <Code className="h-4 w-4" />
              {t('home.typescript')}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full">
              <Palette className="h-4 w-4" />
              {t('home.design')}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full">
              <Zap className="h-4 w-4" />
              {t('home.performance')}
            </div>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/docs">
                <BookOpen className="h-4 w-4" />
                {t('home.viewDocs')}
              </Link>
            </Button>
            <Button asChild variant="default" size="lg" className="gap-2">
              <Link to="/teste">
                <Zap className="h-4 w-4" />
                Teste NPM
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/bitbucket-docs">
                <GitBranch className="h-4 w-4" />
                BitBucket Docs
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/bitbucket-test" className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Teste v0.0.2
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <Link to="/architecture-docs" className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Manual de Arquitetura
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <Link to="/component-guide" className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Guia de Criação
              </Link>
            </Button>
          </div>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputDemo />
          <SelectDemo />
          <TextFieldDemo />
          <RadioButtonDemo />
          <CheckBoxDemo />          
          <ComboBoxDemo />
          <AccordionDemo />
          <AlertDemo />
          <ToastDemo />
          <SweetAlertDemo />
        </div>

        {/* Additional Info */}
        <Card className="gradient-card border-card-border shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Explore Mais Componentes
              <Badge>Biblioteca Completa</Badge>
            </CardTitle>
            <CardDescription>
              Acesse a documentação completa para ver todos os componentes disponíveis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link to="/docs/datatable">
                  <span className="font-semibold">DataTable</span>
                  <span className="text-xs text-muted-foreground">Tabelas avançadas</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link to="/docs/fileupload">
                  <span className="font-semibold">FileUpload</span>
                  <span className="text-xs text-muted-foreground">Upload de arquivos</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link to="/docs/datepicker">
                  <span className="font-semibold">DatePicker</span>
                  <span className="text-xs text-muted-foreground">Seleção de datas</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link to="/docs/map">
                  <span className="font-semibold">Map</span>
                  <span className="text-xs text-muted-foreground">Mapas interativos</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link to="/docs/linhatrajeto">
                  <span className="font-semibold">LinhaTrajetoSelector</span>
                  <span className="text-xs text-muted-foreground">Seleção complexa</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link to="/docs/formmodal">
                  <span className="font-semibold">FormModal</span>
                  <span className="text-xs text-muted-foreground">Modais corporativos</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link to="/docs/lightbox">
                  <span className="font-semibold">LightBox</span>
                  <span className="text-xs text-muted-foreground">Galeria de imagens</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link to="/docs">
                  <span className="font-semibold">Ver Todos</span>
                  <span className="text-xs text-muted-foreground">Documentação</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* SweetAlert Component - Required for useSweetAlert hook */}
        <SweetAlertComponent />
      </div>
    </div>
  );
};

export default Index;

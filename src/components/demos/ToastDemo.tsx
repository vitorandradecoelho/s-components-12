import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToastHelper } from "@/components/library";
import { useLanguage } from "@/contexts/LanguageContext";

export const ToastDemo = () => {
  const { t } = useLanguage();
  const { success, error, warning, info } = useToastHelper();

  return (
    <Card className="gradient-card border-card-border shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {t('component.toast.title')}
          <Badge>{t('common.intermediate')}</Badge>
        </CardTitle>
        <CardDescription>
          {t('component.toast.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-4">
            Clique nos botões abaixo para testar as diferentes variantes de toast:
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => success("Dados salvos com sucesso!")}
              className="text-green-600 border-green-200 hover:bg-green-50"
            >
              Sucesso
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => error("Erro ao processar dados!")}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Erro
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => warning("Atenção aos campos obrigatórios!")}
              className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
            >
              Aviso
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => info("Nova versão disponível")}
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              Info
            </Button>
          </div>

          <div className="mt-4 p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground">
              💡 Toast personalizado também disponível usando Toast.show() com opções avançadas
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@vitorandradecoelho/sd-components";
import { useLanguage } from "@/contexts/LanguageContext";

export const AlertDemo = () => {
  const { t } = useLanguage();

  return (
    <Card className="gradient-card border-card-border shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {t('component.alert.title')}
          <Badge>{t('common.basic')}</Badge>
        </CardTitle>
        <CardDescription>
          {t('component.alert.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="default" title="Informação">
          Este é um alerta informativo padrão para comunicar informações importantes.
        </Alert>
        
        <Alert variant="success" title="Sucesso">
          Operação realizada com sucesso! Seus dados foram salvos.
        </Alert>
        
        <Alert variant="warning" title="Atenção">
          Verifique as informações antes de continuar com o processo.
        </Alert>
        
        <Alert variant="destructive" title="Erro">
          Ocorreu um erro ao processar sua solicitação. Tente novamente.
        </Alert>
      </CardContent>
    </Card>
  );
};

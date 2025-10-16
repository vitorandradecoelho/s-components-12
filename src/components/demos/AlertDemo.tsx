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
        <Alert variant="default" title={t('demo.alert.info.title')}>
          {t('demo.alert.info.message')}
        </Alert>
        
        <Alert variant="success" title={t('demo.alert.success.title')}>
          {t('demo.alert.success.message')}
        </Alert>
        
        <Alert variant="warning" title={t('demo.alert.warning.title')}>
          {t('demo.alert.warning.message')}
        </Alert>
        
        <Alert variant="destructive" title={t('demo.alert.error.title')}>
          {t('demo.alert.error.message')}
        </Alert>
      </CardContent>
    </Card>
  );
};

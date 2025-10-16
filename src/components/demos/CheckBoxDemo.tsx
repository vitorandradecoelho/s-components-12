import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckBox } from "@vitorandradecoelho/sd-components";
import { useLanguage } from "@/contexts/LanguageContext";

export const CheckBoxDemo = () => {
  const { t } = useLanguage();
  const [checkboxValue, setCheckboxValue] = React.useState(false);

  return (
    <Card className="gradient-card border-card-border shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {t('component.checkbox.title')}
          <Badge>{t('common.basic')}</Badge>
        </CardTitle>
        <CardDescription>
          {t('component.checkbox.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <CheckBox
          label="Aceito os termos e condições"
          description="Leia os termos completos antes de aceitar"
          checked={checkboxValue}
          onChange={(e) => setCheckboxValue(e.target.checked)}
        />
        
        <CheckBox
          label="Receber notificações"
          variant="card"
          description="Receba updates sobre novos recursos"
        />
        
        <CheckBox
          label="Estado indeterminado"
          indeterminate={true}
          description="Exemplo de estado indeterminado"
        />
      </CardContent>
    </Card>
  );
};

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
          label={t('demo.checkbox.label.terms')}
          description={t('demo.checkbox.desc.terms')}
          checked={checkboxValue}
          onChange={(e) => setCheckboxValue(e.target.checked)}
        />
        
        <CheckBox
          label={t('demo.checkbox.label.notifications')}
          variant="card"
          description={t('demo.checkbox.desc.notifications')}
        />
        
        <CheckBox
          label={t('demo.checkbox.label.indeterminate')}
          indeterminate={true}
          description={t('demo.checkbox.desc.indeterminate')}
        />
      </CardContent>
    </Card>
  );
};

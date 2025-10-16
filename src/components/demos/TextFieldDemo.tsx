import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TextField } from "@vitorandradecoelho/sd-components";
import { useLanguage } from "@/contexts/LanguageContext";

export const TextFieldDemo = () => {
  const { t } = useLanguage();
  const [textValue, setTextValue] = React.useState("");

  return (
    <Card className="gradient-card border-card-border shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {t('component.textfield.title')}
          <Badge>{t('common.basic')}</Badge>
        </CardTitle>
        <CardDescription>
          {t('component.textfield.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <TextField
          label={t('demo.textfield.label.description')}
          placeholder={t('demo.textfield.placeholder.description')}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          helper={t('demo.textfield.helper.description')}
          rows={4}
        />
        
        <TextField
          label={t('demo.textfield.label.comment')}
          placeholder={t('demo.textfield.placeholder.comment')}
          variant="filled"
          success={t('demo.textfield.success.valid')}
          rows={3}
        />
      </CardContent>
    </Card>
  );
};

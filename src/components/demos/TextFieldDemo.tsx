import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TextField } from "@/components/library";
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
          label="Descrição"
          placeholder="Escreva uma descrição detalhada..."
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          helper="Mínimo de 50 caracteres"
          rows={4}
        />
        
        <TextField
          label="Comentário"
          placeholder="Seu comentário..."
          variant="filled"
          success="Formato válido"
          rows={3}
        />
      </CardContent>
    </Card>
  );
};

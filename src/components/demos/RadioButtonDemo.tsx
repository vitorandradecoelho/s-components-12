import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioButton, type RadioOption } from "@vitorandradecoelho/sd-components";
import { useLanguage } from "@/contexts/LanguageContext";

const radioOptions: RadioOption[] = [
  { label: "Opção 1", value: "option1", description: "Primeira opção disponível" },
  { label: "Opção 2", value: "option2", description: "Segunda opção disponível" },
  { label: "Opção 3", value: "option3", description: "Terceira opção disponível" }
];

export const RadioButtonDemo = () => {
  const { t } = useLanguage();
  const [radioValue, setRadioValue] = React.useState("");

  return (
    <Card className="gradient-card border-card-border shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {t('component.radiobutton.title')}
          <Badge>{t('common.basic')}</Badge>
        </CardTitle>
        <CardDescription>
          {t('component.radiobutton.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioButton
          label="Escolha uma opção"
          name="demo-radio"
          options={radioOptions}
          value={radioValue}
          onValueChange={setRadioValue}
          helper="Selecione apenas uma opção"
        />
        
        <RadioButton
          label="Variante Card"
          name="demo-radio-card"
          options={radioOptions.slice(0, 2)}
          variant="card"
        />
      </CardContent>
    </Card>
  );
};

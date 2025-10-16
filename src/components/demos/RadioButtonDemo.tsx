import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioButton, type RadioOption } from "@vitorandradecoelho/sd-components";
import { useLanguage } from "@/contexts/LanguageContext";

export const RadioButtonDemo = () => {
  const { t } = useLanguage();
  const [radioValue, setRadioValue] = React.useState("");

  const radioOptions: RadioOption[] = [
    { label: t('demo.radio.option1.label'), value: "option1", description: t('demo.radio.option1.desc') },
    { label: t('demo.radio.option2.label'), value: "option2", description: t('demo.radio.option2.desc') },
    { label: t('demo.radio.option3.label'), value: "option3", description: t('demo.radio.option3.desc') }
  ];

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
          label={t('demo.radio.label.choose')}
          name="demo-radio"
          options={radioOptions}
          value={radioValue}
          onValueChange={setRadioValue}
          helper={t('demo.radio.helper.choose')}
        />
        
        <RadioButton
          label={t('demo.radio.label.card')}
          name="demo-radio-card"
          options={radioOptions.slice(0, 2)}
          variant="card"
        />
      </CardContent>
    </Card>
  );
};

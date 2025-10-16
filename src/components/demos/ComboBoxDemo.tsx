import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ComboBox, type ComboOption } from "@vitorandradecoelho/sd-components";
import { useLanguage } from "@/contexts/LanguageContext";

export const ComboBoxDemo = () => {
  const { t } = useLanguage();
  const [comboValue, setComboValue] = React.useState<string[]>([]);

  const comboOptions: ComboOption[] = [
    { label: t('demo.combo.option.js.label'), value: "js", description: t('demo.combo.option.js.desc') },
    { label: t('demo.combo.option.ts.label'), value: "ts", description: t('demo.combo.option.ts.desc') },
    { label: t('demo.combo.option.py.label'), value: "py", description: t('demo.combo.option.py.desc') },
    { label: t('demo.combo.option.java.label'), value: "java", description: t('demo.combo.option.java.desc') },
    { label: t('demo.combo.option.csharp.label'), value: "csharp", description: t('demo.combo.option.csharp.desc') },
    { label: t('demo.combo.option.go.label'), value: "go", description: t('demo.combo.option.go.desc') }
  ];

  return (
    <Card className="gradient-card border-card-border shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {t('component.combobox.title')}
          <Badge>{t('common.advanced')}</Badge>
        </CardTitle>
        <CardDescription>
          {t('component.combobox.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ComboBox
          label={t('demo.combo.label.languages')}
          options={comboOptions}
          value={comboValue}
          onValueChange={setComboValue}
          multiple={true}
          searchable={true}
          clearable={true}
          placeholder={t('demo.combo.placeholder.languages')}
          helper={t('demo.combo.helper.languages')}
        />
      </CardContent>
    </Card>
  );
};

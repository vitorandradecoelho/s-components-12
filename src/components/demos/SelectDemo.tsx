import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, type SelectOption } from "@vitorandradecoelho/sd-components";
import { useLanguage } from "@/contexts/LanguageContext";

export const SelectDemo = () => {
  const { t } = useLanguage();
  const [selectValue, setSelectValue] = React.useState("");

  const selectOptions: SelectOption[] = [
    { label: t('demo.select.option.react'), value: "react" },
    { label: t('demo.select.option.vue'), value: "vue" },
    { label: t('demo.select.option.angular'), value: "angular" },
    { label: t('demo.select.option.svelte'), value: "svelte" }
  ];

  return (
    <Card className="gradient-card border-card-border shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {t('component.select.title')}
          <Badge>{t('common.basic')}</Badge>
        </CardTitle>
        <CardDescription>
          {t('component.select.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select
          label={t('demo.select.label.framework')}
          options={selectOptions}
          value={selectValue}
          onValueChange={setSelectValue}
          placeholder={t('demo.select.placeholder.framework')}
          helper={t('demo.select.helper.framework')}
        />
        
        <Select
          label={t('demo.select.label.disabled')}
          options={selectOptions}
          disabled
          placeholder={t('demo.select.placeholder.disabled')}
        />
      </CardContent>
    </Card>
  );
};

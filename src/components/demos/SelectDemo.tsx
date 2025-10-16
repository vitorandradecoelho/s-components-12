import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, type SelectOption } from "@vitorandradecoelho/sd-components";
import { useLanguage } from "@/contexts/LanguageContext";

const selectOptions: SelectOption[] = [
  { label: "React", value: "react" },
  { label: "Vue.js", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" }
];

export const SelectDemo = () => {
  const { t } = useLanguage();
  const [selectValue, setSelectValue] = React.useState("");

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
          label="Framework Favorito"
          options={selectOptions}
          value={selectValue}
          onValueChange={setSelectValue}
          placeholder="Escolha um framework"
          helper="Selecione sua opção preferida"
        />
        
        <Select
          label="Desabilitado"
          options={selectOptions}
          disabled
          placeholder="Seleção desabilitada"
        />
      </CardContent>
    </Card>
  );
};

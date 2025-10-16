import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ComboBox, type ComboOption } from "@/components/library";
import { useLanguage } from "@/contexts/LanguageContext";

const comboOptions: ComboOption[] = [
  { label: "JavaScript", value: "js", description: "Linguagem de programação web" },
  { label: "TypeScript", value: "ts", description: "JavaScript com tipagem estática" },
  { label: "Python", value: "py", description: "Linguagem versátil e poderosa" },
  { label: "Java", value: "java", description: "Linguagem orientada a objetos" },
  { label: "C#", value: "csharp", description: "Linguagem da Microsoft" },
  { label: "Go", value: "go", description: "Linguagem moderna do Google" }
];

export const ComboBoxDemo = () => {
  const { t } = useLanguage();
  const [comboValue, setComboValue] = React.useState<string[]>([]);

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
          label="Linguagens de Programação"
          options={comboOptions}
          value={comboValue}
          onValueChange={setComboValue}
          multiple={true}
          searchable={true}
          clearable={true}
          placeholder="Selecione linguagens..."
          helper="Você pode selecionar múltiplas opções"
        />
        
        <ComboBox
          label="Usuários da API"
          fetchUrl="https://jsonplaceholder.typicode.com/users"
          labelKey="name"
          valueKey="id"
          descriptionKey="email"
          placeholder="Buscar usuários..."
          helper="Dados carregados automaticamente da API"
        />
      </CardContent>
    </Card>
  );
};

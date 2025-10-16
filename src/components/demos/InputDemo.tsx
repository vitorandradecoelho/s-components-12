import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/library";
import { Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const InputDemo = () => {
  const { t } = useLanguage();
  const [inputValue, setInputValue] = React.useState("");

  return (
    <Card className="gradient-card border-card-border shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {t('component.input.title')}
          <Badge>{t('common.basic')}</Badge>
        </CardTitle>
        <CardDescription>
          {t('component.input.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          label="Input Padrão"
          placeholder="Digite algo..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          helper="Texto de ajuda opcional"
        />
        
        <Input
          label="Com Ícone"
          placeholder="Buscar..."
          leftIcon={<Search className="h-4 w-4" />}
          variant="filled"
        />
        
        <Input
          label="Com Erro"
          placeholder="Campo obrigatório"
          error="Este campo é obrigatório"
        />
      </CardContent>
    </Card>
  );
};

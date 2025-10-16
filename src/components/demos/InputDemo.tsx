import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@vitorandradecoelho/sd-components";
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
          label={t('demo.input.label.standard')}
          placeholder={t('demo.input.placeholder.standard')}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          helper={t('demo.input.helper.standard')}
        />
        
        <Input
          label={t('demo.input.label.icon')}
          placeholder={t('demo.input.placeholder.icon')}
          leftIcon={<Search className="h-4 w-4" />}
          variant="filled"
        />
        
        <Input
          label={t('demo.input.label.error')}
          placeholder={t('demo.input.placeholder.error')}
          error={t('demo.input.error.required')}
        />
      </CardContent>
    </Card>
  );
};

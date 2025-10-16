import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSweetAlert } from "@vitorandradecoelho/sd-components";
import { useLanguage } from "@/contexts/LanguageContext";

export const SweetAlertDemo = () => {
  const { t } = useLanguage();
  const { fire } = useSweetAlert();

  return (
    <Card className="gradient-card border-card-border shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {t('component.sweetalert.title')}
          <Badge>{t('common.advanced')}</Badge>
        </CardTitle>
        <CardDescription>
          {t('component.sweetalert.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-4">
            Clique nos botões abaixo para testar os diferentes tipos de SweetAlert:
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => fire({
                title: t('sweetalert.example.success.title'),
                text: t('sweetalert.example.success.text'),
                type: 'success',
                showCancelButton: false,
                confirmButtonText: 'OK'
              })}
              className="text-green-600 border-green-200 hover:bg-green-50"
            >
              Sucesso
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => fire({
                title: t('sweetalert.example.error.title'),
                text: t('sweetalert.example.error.text'),
                type: 'error',
                showCancelButton: false,
                confirmButtonText: 'OK'
              })}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Erro
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => fire({
                title: t('sweetalert.example.warning.title'),
                text: t('sweetalert.example.warning.text'),
                type: 'warning',
                showCancelButton: false,
                confirmButtonText: 'OK'
              })}
              className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
            >
              Aviso
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => fire({
                title: t('sweetalert.example.info.title'),
                text: t('sweetalert.example.info.text'),
                type: 'info',
                showCancelButton: false,
                confirmButtonText: 'OK'
              })}
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              Info
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => fire({
                title: t('sweetalert.example.basic.title'),
                text: t('sweetalert.example.basic.text'),
                type: 'question',
                onConfirm: () => {
                  fire({
                    title: t('sweetalert.example.confirmed.title'),
                    type: 'success',
                    showCancelButton: false
                  });
                }
              })}
              className="text-purple-600 border-purple-200 hover:bg-purple-50"
            >
              Confirmação
            </Button>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => fire({
                title: t('sweetalert.example.input.title'),
                text: t('sweetalert.example.input.text'),
                showInput: true,
                inputPlaceholder: t('sweetalert.example.input.placeholder'),
                onConfirm: (inputValue) => {
                  if (inputValue) {
                    fire({
                      title: t('sweetalert.example.input.success'),
                      text: `${t('sweetalert.example.input.entered')}: ${inputValue}`,
                      type: 'success',
                      showCancelButton: false
                    });
                  }
                }
              })}
              className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
            >
              Com Input
            </Button>
          </div>

          <div className="mt-4 p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground">
              ✨ SweetAlert suporta operações assíncronas, diferentes tipos visuais e entradas personalizadas
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

import React, { useState } from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import { TimePicker } from '@/components/library/TimePicker';

const TimePickerDocs = () => {
  const { t } = useLanguage();
  const [time24, setTime24] = useState<string | null>(null);
  const [time12, setTime12] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);

  const basicExample = `import { TimePicker } from '@/components/library/TimePicker';

function MyForm() {
  const [time, setTime] = useState<string | null>(null);
  
  return (
    <TimePicker
      label="Horário de início"
      value={time}
      onChange={setTime}
      placeholder="Selecione um horário..."
      timeFormat="24"
      allowDirectInput={false} // Apenas picker
    />
  );
}`;

  const directInputExample = `import { TimePicker } from '@/components/library/TimePicker';

function QuickTimeForm() {
  const [time, setTime] = useState<string | null>(null);
  
  return (
    <TimePicker
      label="Horário (digitação rápida)"
      value={time}
      onChange={setTime}
      placeholder="Digite HH:mm ou use o picker..."
      timeFormat="24"
      allowDirectInput={true} // Permite digitação + picker
      helper="Digite: 14:30 ou clique no ícone do relógio"
    />
  );
}`;

  const formatExample = `import { TimePicker } from '@/components/library/TimePicker';

function TimeFormats() {
  const [time24, setTime24] = useState<string | null>(null);
  const [time12, setTime12] = useState<string | null>(null);
  
  return (
    <div className="space-y-4">
      <TimePicker
        label="Formato 24h"
        value={time24}
        onChange={setTime24}
        timeFormat="24"
        placeholder="HH:mm"
      />
      
      <TimePicker
        label="Formato 12h"
        value={time12}
        onChange={setTime12}
        timeFormat="12"
        placeholder="HH:mm AM/PM"
      />
    </div>
  );
}`;

  const combinedExample = `import { DatePicker, TimePicker } from '@/components/library';

function EventForm() {
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [eventTime, setEventTime] = useState<string | null>(null);
  
  // Combine date and time
  const getFullDateTime = () => {
    if (eventDate && eventTime) {
      const [hours, minutes] = eventTime.split(':');
      const dateTime = new Date(eventDate);
      dateTime.setHours(parseInt(hours), parseInt(minutes));
      return dateTime;
    }
    return null;
  };
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <DatePicker
        label="Data do evento"
        value={eventDate}
        onChange={setEventDate}
      />
      <TimePicker
        label="Horário do evento"
        value={eventTime}
        onChange={setEventTime}
        timeFormat="24"
      />
    </div>
  );
}`;

  const propsData = [
    { prop: 'label', type: 'string', default: '-', description: 'Rótulo do campo' },
    { prop: 'placeholder', type: 'string', default: '"Selecione um horário..."', description: 'Texto placeholder' },
    { prop: 'value', type: 'string | null', default: 'null', description: 'Valor do horário (HH:mm ou HH:mm AM/PM)' },
    { prop: 'onChange', type: '(time: string | null) => void', default: '-', description: 'Callback quando horário muda' },
    { prop: 'disabled', type: 'boolean', default: 'false', description: 'Campo desabilitado' },
    { prop: 'error', type: 'string', default: '-', description: 'Mensagem de erro' },
    { prop: 'success', type: 'string', default: '-', description: 'Mensagem de sucesso' },
    { prop: 'helper', type: 'string', default: '-', description: 'Texto de ajuda' },
    { prop: 'required', type: 'boolean', default: 'false', description: 'Campo obrigatório' },
    { prop: 'timeFormat', type: '"12" | "24"', default: '"24"', description: 'Formato do horário' },
    { prop: 'allowDirectInput', type: 'boolean', default: 'false', description: 'Permite digitação direta no campo' },
    { prop: 'className', type: 'string', default: '-', description: 'Classes CSS adicionais' }
  ];

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link to="/docs">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
          </Button>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">TimePicker</h1>
            <Badge>Basic</Badge>
          </div>
        </div>

        {/* Description */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Componente de Seleção de Horário</CardTitle>
            <CardDescription className="text-base">
              Componente independente para seleção de horários com suporte aos formatos 12h (AM/PM) e 24h. 
              <strong>Nova funcionalidade:</strong> permite digitação direta no campo além do picker tradicional.
              Ideal para uso separado do DatePicker quando você precisa de campos distintos para data e hora.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Live Examples */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Exemplos Interativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Básico</TabsTrigger>
                  <TabsTrigger value="formats">Formatos</TabsTrigger>
                  <TabsTrigger value="combined">Com Data</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">TimePicker Básico</h3>
                      <TimePicker
                        label="Horário de início (picker)"
                        value={time24}
                        onChange={setTime24}
                        placeholder="Selecione um horário..."
                        helper="Formato 24 horas - apenas picker"
                        timeFormat="24"
                        allowDirectInput={false}
                      />
                      
                      <TimePicker
                        label="Horário com input direto"
                        placeholder="Digite HH:mm ou use picker..."
                        helper="Digite diretamente ou clique no ícone"
                        timeFormat="24"
                        allowDirectInput={true}
                      />
                      
                      <TimePicker
                        label="Com erro"
                        error="Horário é obrigatório"
                        placeholder="Campo obrigatório"
                        timeFormat="24"
                        allowDirectInput={true}
                      />
                      
                      <TimePicker
                        label="Campo desabilitado"
                        disabled
                        placeholder="Campo desabilitado"
                        timeFormat="24"
                      />
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Valor Selecionado:</h4>
                      <pre className="text-sm">
                        {time24 || 'null'}
                      </pre>
                      <div className="mt-4 p-3 bg-primary/5 rounded border">
                        <h5 className="font-medium text-sm mb-2">💡 Input Direto</h5>
                        <ul className="text-xs space-y-1">
                          <li>• <code>allowDirectInput={`{true}`}</code> para ativar</li>
                          <li>• Digite: "14:30" (24h) ou "02:30 PM" (12h)</li>
                          <li>• Híbrido: digitação + picker no mesmo campo</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="formats" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Diferentes Formatos</h3>
                      <TimePicker
                        label="Formato 24h (só picker)"
                        value={time24}
                        onChange={setTime24}
                        placeholder="HH:mm (24h)"
                        helper="Formato militar (00:00 - 23:59)"
                        timeFormat="24"
                        allowDirectInput={false}
                      />
                      <TimePicker
                        label="Formato 12h (input direto)"
                        value={time12}
                        onChange={setTime12}
                        placeholder="Digite HH:mm AM/PM"
                        helper="Digite diretamente: Ex: 02:30 PM"
                        timeFormat="12"
                        allowDirectInput={true}
                      />
                      <TimePicker
                        label="Híbrido (input + picker)"
                        success="Horário válido selecionado"
                        placeholder="Digite ou use picker"
                        timeFormat="12"
                        allowDirectInput={true}
                      />
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Valores Selecionados:</h4>
                      <div className="space-y-2 text-sm">
                        <div><strong>24h:</strong> {time24 || 'null'}</div>
                        <div><strong>12h:</strong> {time12 || 'null'}</div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-accent/5 rounded border">
                        <h5 className="font-medium text-sm mb-2">🎯 Casos de Uso</h5>
                        <ul className="text-xs space-y-1">
                          <li><strong>Só picker:</strong> UX mais controlado</li>
                          <li><strong>Input direto:</strong> Digitação rápida</li>
                          <li><strong>Híbrido:</strong> Máxima flexibilidade</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="combined" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Período com Horários</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <TimePicker
                          label="Hora início"
                          value={startTime}
                          onChange={setStartTime}
                          placeholder="Início..."
                          timeFormat="12"
                        />
                        <TimePicker
                          label="Hora fim"
                          value={endTime}
                          onChange={setEndTime}
                          placeholder="Fim..."
                          timeFormat="12"
                        />
                      </div>
                      <Alert>
                        <AlertDescription>
                          <strong>Dica:</strong> Use TimePicker separado quando precisar de mais controle sobre data e hora individualmente.
                        </AlertDescription>
                      </Alert>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Período Selecionado:</h4>
                      <div className="space-y-2 text-sm">
                        <div><strong>Início:</strong> {startTime || 'null'}</div>
                        <div><strong>Fim:</strong> {endTime || 'null'}</div>
                        {startTime && endTime && (
                          <div className="mt-2 p-2 bg-primary/10 rounded">
                            <strong>Período completo:</strong> {startTime} - {endTime}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Code Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Exemplos de Código</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList>
                  <TabsTrigger value="basic">Básico</TabsTrigger>
                  <TabsTrigger value="direct">Input Direto</TabsTrigger>
                  <TabsTrigger value="formats">Formatos</TabsTrigger>
                  <TabsTrigger value="combined">Combinado</TabsTrigger>
                </TabsList>

                <TabsContent value="basic">
                  <div className="space-y-4">
                    <h4 className="font-medium">TimePicker Básico</h4>
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{basicExample}</code>
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="direct">
                  <div className="space-y-4">
                    <h4 className="font-medium">Input Direto</h4>
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{directInputExample}</code>
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="formats">
                  <div className="space-y-4">
                    <h4 className="font-medium">Diferentes Formatos</h4>
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{formatExample}</code>
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="combined">
                  <div className="space-y-4">
                    <h4 className="font-medium">Combinado com DatePicker</h4>
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{combinedExample}</code>
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Props Documentation */}
          <Card>
            <CardHeader>
              <CardTitle>Propriedades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Propriedade</th>
                      <th className="text-left p-2 font-medium">Tipo</th>
                      <th className="text-left p-2 font-medium">Padrão</th>
                      <th className="text-left p-2 font-medium">Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    {propsData.map((prop, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-mono text-sm">{prop.prop}</td>
                        <td className="p-2 font-mono text-sm text-muted-foreground">{prop.type}</td>
                        <td className="p-2 font-mono text-sm">{prop.default}</td>
                        <td className="p-2 text-sm">{prop.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Usage Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Notas de Uso
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  <strong>Formato de Valor:</strong> O TimePicker sempre retorna strings no formato "HH:mm" (24h) ou "HH:mm AM/PM" (12h).
                </AlertDescription>
              </Alert>
              
              <Alert>
                <AlertDescription>
                  <strong>Input Direto:</strong> Com <code>allowDirectInput={`{true}`}</code>, o usuário pode digitar diretamente no campo ou usar o picker.
                </AlertDescription>
              </Alert>
              
              <Alert>
                <AlertDescription>
                  <strong>Validação Automática:</strong> A digitação direta é validada automaticamente contra o formato esperado.
                </AlertDescription>
              </Alert>

              <Alert>
                <AlertDescription>
                  <strong>Uso Independente:</strong> Use quando precisar de controle separado sobre data e hora, diferente do DatePicker com modo datetime.
                </AlertDescription>
              </Alert>

              <Alert>
                <AlertDescription>
                  <strong>Combinação com DatePicker:</strong> Ideal para formulários onde data e hora são campos distintos no layout.
                </AlertDescription>
              </Alert>

              <Alert>
                <AlertDescription>
                  <strong>Acessibilidade:</strong> Totalmente acessível com suporte a navegação por teclado e leitores de tela.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TimePickerDocs;
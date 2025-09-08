import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import { DatePicker } from '@/components/library/DatePicker';

const DatePickerDocs = () => {
  const { t } = useLanguage();
  const [singleDate, setSingleDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | null>(null);
  const [datetime, setDatetime] = useState<Date | null>(null);
  const [datetimeRange, setDatetimeRange] = useState<{ from?: Date; to?: Date } | null>(null);

  const basicExample = `import { DatePicker } from '@/components/library/DatePicker';

function MyForm() {
  const [date, setDate] = useState<Date | null>(null);
  
  return (
    <DatePicker
      label="Data de nascimento"
      value={date}
      onChange={setDate}
      placeholder="Selecione sua data de nascimento"
    />
  );
}`;

  const rangeExample = `import { DatePicker } from '@/components/library/DatePicker';

function DateRangeForm() {
  const [dateRange, setDateRange] = useState<{from?: Date; to?: Date} | null>(null);
  
  return (
    <DatePicker
      label="Período de férias"
      mode="range"
      value={dateRange}
      onChange={setDateRange}
      placeholder="Selecione o período..."
    />
  );
}`;

  const datetimeExample = `import { DatePicker } from '@/components/library/DatePicker';

function EventForm() {
  const [eventDate, setEventDate] = useState<Date | null>(null);
  
  return (
    <DatePicker
      label="Data e horário do evento"
      mode="datetime"
      showTime={true}
      timeFormat="24"
      value={eventDate}
      onChange={setEventDate}
      placeholder="Selecione data e horário..."
    />
  );
}`;

  const propsData = [
    { prop: 'label', type: 'string', default: '-', description: 'Rótulo do campo' },
    { prop: 'placeholder', type: 'string', default: '"Selecione uma data..."', description: 'Texto placeholder' },
    { prop: 'value', type: 'Date | {from?: Date; to?: Date} | null', default: 'null', description: 'Valor selecionado' },
    { prop: 'onChange', type: 'function', default: '-', description: 'Callback quando valor muda' },
    { prop: 'mode', type: '"single" | "range" | "datetime" | "datetime-range"', default: '"single"', description: 'Tipo de seleção' },
    { prop: 'disabled', type: 'boolean', default: 'false', description: 'Campo desabilitado' },
    { prop: 'error', type: 'string', default: '-', description: 'Mensagem de erro' },
    { prop: 'success', type: 'string', default: '-', description: 'Mensagem de sucesso' },
    { prop: 'helper', type: 'string', default: '-', description: 'Texto de ajuda' },
    { prop: 'required', type: 'boolean', default: 'false', description: 'Campo obrigatório' },
    { prop: 'timeFormat', type: '"12" | "24"', default: '"24"', description: 'Formato do horário' },
    { prop: 'showTime', type: 'boolean', default: 'false', description: 'Exibir seleção de horário' },
    { prop: 'minDate', type: 'Date', default: '-', description: 'Data mínima permitida' },
    { prop: 'maxDate', type: 'Date', default: '-', description: 'Data máxima permitida' },
    { prop: 'locale', type: 'Locale', default: 'ptBR', description: 'Localização do calendário' }
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
            <Calendar className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">DatePicker</h1>
            <Badge>Intermediate</Badge>
          </div>
        </div>

        {/* Description */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Componente de Seleção de Data</CardTitle>
            <CardDescription className="text-base">
              Componente flexível para seleção de datas com suporte a data única, intervalo de datas, 
              data com horário e intervalos com horário. Totalmente parametrizável e acessível.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Live Examples */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Exemplos Interativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="single" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="single">Data Única</TabsTrigger>
                  <TabsTrigger value="range">Intervalo</TabsTrigger>
                  <TabsTrigger value="datetime">Data/Hora</TabsTrigger>
                  <TabsTrigger value="datetime-range">Intervalo com Hora</TabsTrigger>
                </TabsList>

                <TabsContent value="single" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Data Única</h3>
                      <DatePicker
                        label="Data de nascimento"
                        value={singleDate}
                        onChange={(date) => setSingleDate(date as Date | null)}
                        placeholder="Selecione sua data de nascimento"
                        helper="Formato: dd/mm/aaaa"
                      />
                      <DatePicker
                        label="Data com erro"
                        error="Este campo é obrigatório"
                        placeholder="Campo obrigatório"
                      />
                      <DatePicker
                        label="Campo desabilitado"
                        disabled
                        placeholder="Campo desabilitado"
                      />
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Valor Selecionado:</h4>
                      <pre className="text-sm">
                        {singleDate ? singleDate.toLocaleString('pt-BR') : 'null'}
                      </pre>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="range" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Intervalo de Datas</h3>
                      <DatePicker
                        label="Período de férias"
                        mode="range"
                        value={dateRange}
                        onChange={(date) => setDateRange(date as { from?: Date; to?: Date } | null)}
                        placeholder="Selecione o período..."
                        helper="Selecione data de início e fim"
                      />
                      <DatePicker
                        label="Com sucesso"
                        mode="range"
                        success="Período válido selecionado"
                        placeholder="Período válido"
                      />
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Valor Selecionado:</h4>
                      <pre className="text-sm">
                        {dateRange ? JSON.stringify({
                          from: dateRange.from?.toLocaleDateString('pt-BR'),
                          to: dateRange.to?.toLocaleDateString('pt-BR')
                        }, null, 2) : 'null'}
                      </pre>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="datetime" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Data e Horário</h3>
                      <DatePicker
                        label="Data e horário do evento"
                        mode="datetime"
                        showTime={true}
                        timeFormat="24"
                        value={datetime}
                        onChange={(date) => setDatetime(date as Date | null)}
                        placeholder="Selecione data e horário..."
                        helper="Formato 24h"
                      />
                      <DatePicker
                        label="Formato 12h"
                        mode="datetime"
                        showTime={true}
                        timeFormat="12"
                        placeholder="Com AM/PM"
                      />
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Valor Selecionado:</h4>
                      <pre className="text-sm">
                        {datetime ? datetime.toLocaleString('pt-BR') : 'null'}
                      </pre>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="datetime-range" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Intervalo com Horário</h3>
                      <DatePicker
                        label="Período do evento"
                        mode="datetime-range"
                        showTime={true}
                        timeFormat="24"
                        value={datetimeRange}
                        onChange={(date) => setDatetimeRange(date as { from?: Date; to?: Date } | null)}
                        placeholder="Período completo..."
                        helper="Data e horário de início e fim"
                        required
                      />
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Valor Selecionado:</h4>
                      <pre className="text-sm">
                        {datetimeRange ? JSON.stringify({
                          from: datetimeRange.from?.toLocaleString('pt-BR'),
                          to: datetimeRange.to?.toLocaleString('pt-BR')
                        }, null, 2) : 'null'}
                      </pre>
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
                  <TabsTrigger value="range">Intervalo</TabsTrigger>
                  <TabsTrigger value="datetime">Data/Hora</TabsTrigger>
                </TabsList>

                <TabsContent value="basic">
                  <div className="space-y-4">
                    <h4 className="font-medium">Data Única</h4>
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{basicExample}</code>
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="range">
                  <div className="space-y-4">
                    <h4 className="font-medium">Intervalo de Datas</h4>
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{rangeExample}</code>
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="datetime">
                  <div className="space-y-4">
                    <h4 className="font-medium">Data e Horário</h4>
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{datetimeExample}</code>
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
                  <strong>Modo Single:</strong> Use para campos de data única como data de nascimento, vencimento, etc.
                </AlertDescription>
              </Alert>
              
              <Alert>
                <AlertDescription>
                  <strong>Modo Range:</strong> Ideal para períodos como férias, campanhas, relatórios de intervalo de datas.
                </AlertDescription>
              </Alert>

              <Alert>
                <AlertDescription>
                  <strong>Modo DateTime:</strong> Para eventos, agendamentos e qualquer situação que precise de data e hora específicas.
                </AlertDescription>
              </Alert>

              <Alert>
                <AlertDescription>
                  <strong>Acessibilidade:</strong> O componente suporta navegação por teclado e leitores de tela.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DatePickerDocs;
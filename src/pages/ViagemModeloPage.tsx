import React, { useState } from 'react';
import { 
  Input, 
  Select, 
  DataTable, 
  ComboBox,
  Alert,
  Toast,
  SweetAlert,
  useSweetAlert,
  type SelectOption,
  type ComboOption,
  type TableColumn
} from '@vitorandradecoelho/sd-components';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, FileSpreadsheet } from 'lucide-react';

interface ViagemData {
  id: string;
  empresa: string;
  linha: string;
  trajeto: string;
  inicioViagem: string;
  terminoViagem: string;
  duracaoViagem: string;
  veiculo: string;
  motivo: string;
  informacoesAdicionais: string;
  tarefa: string;
}

export const ViagemModeloPage: React.FC = () => {
  const [filtros, setFiltros] = useState({
    empresa: '',
    linha: '',
    veiculo: '',
    trajeto: '',
    dataPartida: '',
    horaPartida: '',
    dataChegada: '',
    horaChegada: '',
    excluir: false,
    cancelados: false
  });

  const { fire: showAlert, SweetAlert: SweetAlertComponent } = useSweetAlert();

  // Dados de exemplo para a tabela
  const viagensData: ViagemData[] = [
    {
      id: '1',
      empresa: 'BR7 Mobilidade',
      linha: '03 - Tiradentes / Taboão',
      trajeto: 'ida',
      inicioViagem: '04:20 04:29',
      terminoViagem: '05:20 05:17',
      duracaoViagem: '0:47:59',
      veiculo: '1701 1601',
      motivo: '',
      informacoesAdicionais: '',
      tarefa: '1A'
    },
    {
      id: '2',
      empresa: 'BR7 Mobilidade',
      linha: '03 - Tiradentes / Taboão',
      trajeto: 'ida',
      inicioViagem: '04:50 04:45',
      terminoViagem: '05:17 05:43',
      duracaoViagem: '0:53:31',
      veiculo: '1605 1605',
      motivo: '',
      informacoesAdicionais: '',
      tarefa: '3A'
    },
    {
      id: '3',
      empresa: 'BR7 Mobilidade',
      linha: '03 - Tiradentes / Taboão',
      trajeto: 'ida',
      inicioViagem: '05:10 05:11',
      terminoViagem: '06:10 06:12',
      duracaoViagem: '1:01:32',
      veiculo: '601 601',
      motivo: '',
      informacoesAdicionais: '',
      tarefa: '6A'
    },
    {
      id: '4',
      empresa: 'BR7 Mobilidade',
      linha: '03 - Tiradentes / Taboão',
      trajeto: 'volta',
      inicioViagem: '05:25 05:22',
      terminoViagem: '06:20 06:19',
      duracaoViagem: '0:56:59',
      veiculo: '1601 1601',
      motivo: '',
      informacoesAdicionais: '',
      tarefa: '1A'
    }
  ];

  // Opções para os selects
  const empresaOptions: SelectOption[] = [
    { label: 'BR7 Mobilidade', value: 'br7' },
    { label: 'Empresa A', value: 'empresa_a' },
    { label: 'Empresa B', value: 'empresa_b' }
  ];

  const linhaOptions: ComboOption[] = [
    { label: '03 - Tiradentes / Taboão', value: '03' },
    { label: '05 - Centro / Bairro', value: '05' },
    { label: '07 - Terminal / Shopping', value: '07' }
  ];

  const veiculoOptions: SelectOption[] = [
    { label: '1601', value: '1601' },
    { label: '1605', value: '1605' },
    { label: '601', value: '601' },
    { label: '1701', value: '1701' }
  ];

  const trajetoOptions: SelectOption[] = [
    { label: 'Ida', value: 'ida' },
    { label: 'Volta', value: 'volta' },
    { label: 'Circular', value: 'circular' }
  ];

  // Colunas da tabela
  const colunas: TableColumn<ViagemData>[] = [
    {
      key: 'empresa',
      title: 'EMPRESA',
      sortable: true,
      render: (value) => <span className="font-medium">{value}</span>
    },
    {
      key: 'linha',
      title: 'LINHA',
      sortable: true
    },
    {
      key: 'trajeto',
      title: 'TRAJETO',
      sortable: true,
      render: (value) => (
        <Badge variant={value === 'ida' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'inicioViagem',
      title: 'INÍCIO VIAGEM',
      sortable: true,
      render: (value) => (
        <div className="text-sm">
          {value.split(' ').map((time, index) => (
            <div key={index}>{time}</div>
          ))}
        </div>
      )
    },
    {
      key: 'terminoViagem',
      title: 'TÉRMINO VIAGEM',
      sortable: true,
      render: (value) => (
        <div className="text-sm">
          {value.split(' ').map((time, index) => (
            <div key={index}>{time}</div>
          ))}
        </div>
      )
    },
    {
      key: 'duracaoViagem',
      title: 'DURAÇÃO DA VIAGEM',
      sortable: true,
      render: (value) => <span className="font-mono text-sm">{value}</span>
    },
    {
      key: 'veiculo',
      title: 'VEÍCULO',
      sortable: true,
      render: (value) => (
        <div className="text-sm">
          {value.split(' ').map((veiculo, index) => (
            <div key={index}>{veiculo}</div>
          ))}
        </div>
      )
    },
    {
      key: 'motivo',
      title: 'MOTIVO',
      sortable: true,
      render: (value) => value || '-'
    },
    {
      key: 'informacoesAdicionais',
      title: 'INFORMAÇÕES ADICIONAIS',
      sortable: true,
      render: (value) => value || '-'
    },
    {
      key: 'tarefa',
      title: 'TAREFA',
      sortable: true,
      render: (value) => (
        <Badge variant="outline">{value}</Badge>
      )
    },
    {
      key: 'id',
      title: 'AÇÃO',
      render: (_, row) => (
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleEdit(row.id)}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleView(row.id)}
            className="h-8 w-8 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  const handleIncluirViagem = () => {
    Toast.success('Viagem incluída com sucesso!');
  };

  const handleLimpar = () => {
    setFiltros({
      empresa: '',
      linha: '',
      veiculo: '',
      trajeto: '',
      dataPartida: '',
      horaPartida: '',
      dataChegada: '',
      horaChegada: '',
      excluir: false,
      cancelados: false
    });
    Toast.info('Filtros limpos');
  };

  const handleConsultar = () => {
    showAlert({
      type: 'success',
      title: 'Consulta realizada!',
      text: `Encontradas ${viagensData.length} viagens`,
      confirmButtonText: 'OK'
    });
  };

  const handleEdit = (id: string) => {
    Toast.info(`Editando viagem ${id}`);
  };

  const handleView = (id: string) => {
    Toast.info(`Visualizando viagem ${id}`);
  };

  const handleGerarExcel = () => {
    Toast.success('Planilha Excel gerada com sucesso!');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">SONDA</h1>
            <p className="text-muted-foreground">GDV | EDIÇÃO DE VIAGEM</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
              4
            </div>
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
              6
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtro</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <Select
                label="Empresa"
                placeholder="Empresa"
                options={empresaOptions}
                value={filtros.empresa}
                onValueChange={(value) => setFiltros(prev => ({ ...prev, empresa: value }))}
              />
            </div>
            
            <div>
              <ComboBox
                label="Linha*"
                placeholder="03 - Tirade..."
                options={linhaOptions}
                value={[filtros.linha]}
                onValueChange={(value) => setFiltros(prev => ({ ...prev, linha: value[0] || '' }))}
              />
            </div>

            <div>
              <Select
                label="Veículo *"
                placeholder="Selecione..."
                options={veiculoOptions}
                value={filtros.veiculo}
                onValueChange={(value) => setFiltros(prev => ({ ...prev, veiculo: value }))}
              />
            </div>

            <div>
              <Select
                label="Trajeto"
                placeholder="Selecione por..."
                options={trajetoOptions}
                value={filtros.trajeto}
                onValueChange={(value) => setFiltros(prev => ({ ...prev, trajeto: value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <Input
                label="Partida"
                type="date"
                value={filtros.dataPartida}
                onChange={(e) => setFiltros(prev => ({ ...prev, dataPartida: e.target.value }))}
              />
            </div>

            <div>
              <Input
                label="Hora Partida"
                type="time"
                value={filtros.horaPartida}
                onChange={(e) => setFiltros(prev => ({ ...prev, horaPartida: e.target.value }))}
              />
            </div>

            <div>
              <Input
                label="Chegada"
                type="date"
                value={filtros.dataChegada}
                onChange={(e) => setFiltros(prev => ({ ...prev, dataChegada: e.target.value }))}
              />
            </div>

            <div>
              <Input
                label="Hora Chegada"
                type="time"
                value={filtros.horaChegada}
                onChange={(e) => setFiltros(prev => ({ ...prev, horaChegada: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Filtrar por:</label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={filtros.excluir}
                  onChange={(e) => setFiltros(prev => ({ ...prev, excluir: e.target.checked }))}
                />
                Excluir
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={filtros.cancelados}
                  onChange={(e) => setFiltros(prev => ({ ...prev, cancelados: e.target.checked }))}
                />
                Cancelados
              </label>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleIncluirViagem} className="bg-blue-600 hover:bg-blue-700">
                + INCLUIR VIAGEM
              </Button>
              <Button onClick={handleLimpar} variant="secondary">
                LIMPAR
              </Button>
              <Button onClick={handleConsultar} className="bg-green-600 hover:bg-green-700">
                CONSULTAR
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultado */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              Resultado
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                Viagens Encontradas (105)
              </span>
            </CardTitle>
            <Button
              onClick={handleGerarExcel}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Gerar Excel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={viagensData}
            columns={colunas}
            pagination={{
              pageSize: 10,
              showSizeChanger: true
            }}
            loading={false}
            onRowClick={(row) => console.log('Row clicked:', row)}
          />
        </CardContent>
      </Card>

      {/* Alert de exemplo */}
      <div className="mt-6">
        <Alert variant="success" title="Sistema Operacional">
          Todos os componentes foram carregados com sucesso da biblioteca npm @vitorandradecoelho/sd-components
        </Alert>
      </div>

      {/* SweetAlert Component */}
      <SweetAlertComponent />
    </div>
  );
};
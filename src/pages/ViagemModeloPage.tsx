import React, { useState } from 'react';
/**
 * PÁGINA MODELO - GESTÃO DE VIAGENS
 * 
 * Esta página foi criada como um modelo completo baseado na imagem fornecida,
 * demonstrando o uso exclusivo dos componentes da biblioteca npm:
 * @vitorandradecoelho/sd-components
 * 
 * IMPORTANTE: Não utilizamos componentes locais do projeto, apenas os
 * componentes distribuídos via npm para garantir consistência e reutilização.
 */
import { 
  Input,        // Campo de entrada básico para datas e horários
  Select,       // Dropdown para seleção única (Empresa, Veículo, Trajeto)
  DataTable,    // Tabela completa com paginação, ordenação e ações
  ComboBox,     // Dropdown com busca e múltipla seleção (Linha)
  Alert,        // Componente de alerta/notificação
  Toast,        // Sistema de notificações temporárias
  SweetAlert,   // Modal de confirmação e alertas avançados
  useSweetAlert,// Hook para gerenciar SweetAlert
  type SelectOption,    // Tipagem para opções do Select
  type ComboOption,     // Tipagem para opções do ComboBox
  type TableColumn      // Tipagem para colunas da DataTable
} from '@vitorandradecoelho/sd-components';

// Componentes locais do shadcn/ui para estrutura visual
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, FileSpreadsheet } from 'lucide-react';

/**
 * INTERFACE DE DADOS
 * 
 * Define a estrutura dos dados de viagem que serão exibidos na tabela.
 * Esta interface corresponde exatamente às colunas mostradas na imagem de referência.
 */
interface ViagemData {
  id: string;                    // Identificador único da viagem
  empresa: string;               // Nome da empresa de transporte
  linha: string;                 // Nome/código da linha de ônibus
  trajeto: string;               // Direção: ida, volta ou circular
  inicioViagem: string;          // Horários de início (planejado e real)
  terminoViagem: string;         // Horários de término (planejado e real)
  duracaoViagem: string;         // Duração total da viagem
  veiculo: string;               // Código(s) do(s) veículo(s) utilizado(s)
  motivo: string;                // Motivo de alterações (se houver)
  informacoesAdicionais: string; // Observações adicionais
  tarefa: string;                // Código da tarefa/turno
}

export const ViagemModeloPage: React.FC = () => {
  /**
   * ESTADO DOS FILTROS
   * 
   * Gerencia todos os filtros da interface conforme mostrado na imagem.
   * Utilizamos strings para datas/horários para compatibilidade com inputs HTML.
   */
  const [filtros, setFiltros] = useState({
    empresa: '',           // Filtro por empresa (Select)
    linha: '',             // Filtro por linha (ComboBox)
    veiculo: '',           // Filtro por veículo (Select)
    trajeto: '',           // Filtro por trajeto (Select)
    dataPartida: '',       // Data de partida (Input date)
    horaPartida: '',       // Hora de partida (Input time)
    dataChegada: '',       // Data de chegada (Input date)
    horaChegada: '',       // Hora de chegada (Input time)
    excluir: false,        // Checkbox para incluir excluídos
    cancelados: false      // Checkbox para incluir cancelados
  });

  /**
   * HOOK DO SWEETALERT
   * 
   * Utilizamos o hook da biblioteca para gerenciar alertas avançados.
   * 'fire' é a função para disparar alertas, 'SweetAlertComponent' é o componente.
   */
  const { fire: showAlert, SweetAlert: SweetAlertComponent } = useSweetAlert();

  /**
   * DADOS DE EXEMPLO
   * 
   * Simulam os dados reais que viriam de uma API.
   * Baseados exatamente na estrutura mostrada na imagem de referência.
   */
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

  /**
   * OPÇÕES PARA OS COMPONENTES DE SELEÇÃO
   * 
   * Definimos as opções disponíveis para cada filtro.
   * Utilizamos os tipos específicos de cada componente da biblioteca.
   */
  
  // Opções para o componente Select (Empresa)
  const empresaOptions: SelectOption[] = [
    { label: 'BR7 Mobilidade', value: 'br7' },      // Baseado na imagem
    { label: 'Empresa A', value: 'empresa_a' },
    { label: 'Empresa B', value: 'empresa_b' }
  ];

  // Opções para o componente ComboBox (Linha) - permite busca
  const linhaOptions: ComboOption[] = [
    { label: '03 - Tiradentes / Taboão', value: '03' }, // Linha da imagem
    { label: '05 - Centro / Bairro', value: '05' },
    { label: '07 - Terminal / Shopping', value: '07' }
  ];

  // Opções para o componente Select (Veículo)
  const veiculoOptions: SelectOption[] = [
    { label: '1601', value: '1601' },  // Códigos da imagem
    { label: '1605', value: '1605' },
    { label: '601', value: '601' },
    { label: '1701', value: '1701' }
  ];

  // Opções para o componente Select (Trajeto)
  const trajetoOptions: SelectOption[] = [
    { label: 'Ida', value: 'ida' },
    { label: 'Volta', value: 'volta' },
    { label: 'Circular', value: 'circular' }
  ];

  /**
   * CONFIGURAÇÃO DAS COLUNAS DA TABELA
   * 
   * Definimos as colunas da DataTable seguindo exatamente a estrutura da imagem.
   * Cada coluna possui configurações específicas de renderização e ordenação.
   */
  const colunas: TableColumn<ViagemData>[] = [
    {
      key: 'empresa',
      title: 'EMPRESA',
      sortable: true,  // Permite ordenação por empresa
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
        // Usa Badge do shadcn/ui para destacar o tipo de trajeto
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
        // Divide os horários (planejado e real) em linhas separadas
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
        // Botões de ação para cada linha da tabela
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleEdit(row.id)}
            className="h-8 w-8 p-0"
            title="Editar viagem"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleView(row.id)}
            className="h-8 w-8 p-0"
            title="Visualizar viagem"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  /**
   * HANDLERS DE AÇÃO
   * 
   * Funções que gerenciam as interações do usuário.
   * Por enquanto são demonstrativas, mas em um sistema real
   * fariam chamadas para APIs e atualizariam o estado.
   */
  
  const handleIncluirViagem = () => {
    // Utiliza o Toast da biblioteca para feedback ao usuário
    Toast.success('Viagem incluída com sucesso!');
  };

  const handleLimpar = () => {
    // Reset completo dos filtros para valores iniciais
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
    // Utiliza SweetAlert para mostrar resultado da consulta
    showAlert({
      type: 'success',
      title: 'Consulta realizada!',
      text: `Encontradas ${viagensData.length} viagens`,
      confirmButtonText: 'OK'
    });
  };

  const handleEdit = (id: string) => {
    // Ação de edição - Toast para demonstrar funcionalidade
    Toast.info(`Editando viagem ${id}`);
  };

  const handleView = (id: string) => {
    // Ação de visualização - Toast para demonstrar funcionalidade
    Toast.info(`Visualizando viagem ${id}`);
  };

  const handleGerarExcel = () => {
    // Simula exportação para Excel
    Toast.success('Planilha Excel gerada com sucesso!');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* 
        HEADER DA APLICAÇÃO
        Replica exatamente o cabeçalho mostrado na imagem de referência
      */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">SONDA</h1>
            <p className="text-muted-foreground">GDV | EDIÇÃO DE VIAGEM</p>
          </div>
          {/* Badges de notificação do canto superior direito */}
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

      {/* 
        SEÇÃO DE FILTROS
        Utiliza Card do shadcn/ui para estrutura e componentes da biblioteca npm para funcionalidade
      */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtro</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Primeira linha de filtros: Empresa, Linha, Veículo, Trajeto */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              {/* Componente Select da biblioteca npm para seleção de empresa */}
              <Select
                label="Empresa"
                placeholder="Empresa"
                options={empresaOptions}
                value={filtros.empresa}
                onValueChange={(value) => setFiltros(prev => ({ ...prev, empresa: value }))}
              />
            </div>
            
            <div>
              {/* Componente ComboBox da biblioteca npm - permite busca e é obrigatório (*) */}
              <ComboBox
                label="Linha*"
                placeholder="03 - Tirade..."
                options={linhaOptions}
                value={[filtros.linha]}
                onValueChange={(value) => setFiltros(prev => ({ ...prev, linha: value[0] || '' }))}
              />
            </div>

            <div>
              {/* Componente Select da biblioteca npm para veículo - também obrigatório (*) */}
              <Select
                label="Veículo *"
                placeholder="Selecione..."
                options={veiculoOptions}
                value={filtros.veiculo}
                onValueChange={(value) => setFiltros(prev => ({ ...prev, veiculo: value }))}
              />
            </div>

            <div>
              {/* Componente Select da biblioteca npm para tipo de trajeto */}
              <Select
                label="Trajeto"
                placeholder="Selecione por..."
                options={trajetoOptions}
                value={filtros.trajeto}
                onValueChange={(value) => setFiltros(prev => ({ ...prev, trajeto: value }))}
              />
            </div>
          </div>

          {/* Segunda linha de filtros: Datas e Horários */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              {/* Componente Input da biblioteca npm configurado como date picker nativo */}
              <Input
                label="Partida"
                type="date"
                value={filtros.dataPartida}
                onChange={(e) => setFiltros(prev => ({ ...prev, dataPartida: e.target.value }))}
              />
            </div>

            <div>
              {/* Componente Input da biblioteca npm configurado como time picker nativo */}
              <Input
                label="Hora Partida"
                type="time"
                value={filtros.horaPartida}
                onChange={(e) => setFiltros(prev => ({ ...prev, horaPartida: e.target.value }))}
              />
            </div>

            <div>
              {/* Componente Input da biblioteca npm para data de chegada */}
              <Input
                label="Chegada"
                type="date"
                value={filtros.dataChegada}
                onChange={(e) => setFiltros(prev => ({ ...prev, dataChegada: e.target.value }))}
              />
            </div>

            <div>
              {/* Componente Input da biblioteca npm para hora de chegada */}
              <Input
                label="Hora Chegada"
                type="time"
                value={filtros.horaChegada}
                onChange={(e) => setFiltros(prev => ({ ...prev, horaChegada: e.target.value }))}
              />
            </div>
          </div>

          {/* Linha de ações: Checkboxes e Botões */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Filtrar por:</label>
              {/* Checkboxes nativos para filtros booleanos */}
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

            {/* Botões de ação principais */}
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

      {/* 
        SEÇÃO DE RESULTADOS
        Utiliza o componente DataTable da biblioteca npm com todas as funcionalidades
      */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              Resultado
              {/* Contador de resultados conforme mostrado na imagem */}
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                Viagens Encontradas (105)
              </span>
            </CardTitle>
            {/* Botão para exportar dados */}
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
          {/* 
            COMPONENTE DATATABLE DA BIBLIOTECA NPM
            
            Principais funcionalidades demonstradas:
            - Exibição de dados em tabela
            - Paginação com opções de tamanho
            - Ordenação por colunas
            - Renderização customizada de células
            - Ações por linha (editar, visualizar)
            - Click em linha para seleção
          */}
          <DataTable
            data={viagensData}           // Dados a serem exibidos
            columns={colunas}            // Configuração das colunas
            pagination={{               // Configuração da paginação
              pageSize: 10,
              showSizeChanger: true
            }}
            loading={false}              // Estado de carregamento
            onRowClick={(row) => console.log('Row clicked:', row)}  // Handler de click na linha
          />
        </CardContent>
      </Card>

      {/* 
        COMPONENTE ALERT DA BIBLIOTECA NPM
        Demonstra o uso do Alert com variante de sucesso
      */}
      <div className="mt-6">
        <Alert variant="success" title="Sistema Operacional">
          Todos os componentes foram carregados com sucesso da biblioteca npm @vitorandradecoelho/sd-components
        </Alert>
      </div>

      {/* 
        COMPONENTE SWEETALERT
        Necessário renderizar o componente no DOM para que os alertas funcionem
      */}
      <SweetAlertComponent />
    </div>
  );
};

/**
 * RESUMO DA IMPLEMENTAÇÃO
 * 
 * Esta página demonstra o uso completo dos componentes da biblioteca npm:
 * 
 * 1. COMPONENTES UTILIZADOS:
 *    - Input: Para campos de data e hora
 *    - Select: Para dropdowns simples (Empresa, Veículo, Trajeto)  
 *    - ComboBox: Para dropdown com busca (Linha)
 *    - DataTable: Para exibição tabular com paginação e ordenação
 *    - Alert: Para notificações visuais
 *    - Toast: Para feedback temporário de ações
 *    - SweetAlert: Para confirmações e alertas avançados
 * 
 * 2. FUNCIONALIDADES IMPLEMENTADAS:
 *    - Sistema completo de filtros
 *    - Tabela responsiva com dados mockados
 *    - Paginação e ordenação
 *    - Ações por linha (editar, visualizar)
 *    - Exportação simulada para Excel
 *    - Feedback visual para todas as ações
 *    - Interface fiel à imagem de referência
 * 
 * 3. ESTRUTURA DO CÓDIGO:
 *    - Tipagem completa com TypeScript
 *    - Estado reativo com useState
 *    - Handlers organizados por funcionalidade
 *    - Comentários explicativos em todo o código
 *    - Separação clara entre lógica e apresentação
 * 
 * 4. DESIGN SYSTEM:
 *    - Uso exclusivo de componentes da biblioteca npm
 *    - Estrutura visual com shadcn/ui (Card, Button, Badge)
 *    - Layout responsivo com Tailwind CSS
 *    - Cores e estilos consistentes
 * 
 * Esta implementação serve como modelo para outras páginas do sistema,
 * demonstrando as melhores práticas de uso da biblioteca de componentes.
 */
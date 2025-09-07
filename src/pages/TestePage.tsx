import React, { useState } from 'react';
import { LinhaTrajetoSelector, type Linha, type Trajeto } from '@/components/library/LinhaTrajetoSelector';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Code, Package, Download, FileText, CheckCircle } from 'lucide-react';

const TestePage = () => {
  const [selectedLinhaId, setSelectedLinhaId] = useState<string>();
  const [selectedTrajetoIds, setSelectedTrajetoIds] = useState<string[]>([]);

  // Dados de exemplo
  const linhas: Linha[] = [
    {
      _id: "1",
      clienteId: 1,
      id_migracao: 1,
      descr: "Linha Centro - Bairro A",
      numero: "001",
      id: "1",
      trajetos: [
        {
          _id: "t1",
          id_migracao: 1,
          externalId: "ext1",
          nome: "Centro → Bairro A",
          colorIdx: 1,
          qtdTransmisoesInicial: 10,
          qtdTransmisoesFinal: 8,
          percentConclusao: 85,
          toleranciaArrasto: 5,
          kmTrajeto: 12.5,
          tempoMedioViagem: 45,
          sentidoTipo: "IDA",
          headwayCopiloto: 15,
          orientacao: "Norte",
          consorcioSinoticoUnificado: [],
          garagem: [],
          despachoSemCor: false,
          ativo: true,
          sentido: "IDA",
          codigosIntegracao: ["001A"],
          raioTrajeto: 2.5,
          id: "t1"
        },
        {
          _id: "t2",
          id_migracao: 2,
          externalId: "ext2",
          nome: "Bairro A → Centro",
          colorIdx: 2,
          qtdTransmisoesInicial: 8,
          qtdTransmisoesFinal: 10,
          percentConclusao: 90,
          toleranciaArrasto: 3,
          kmTrajeto: 11.8,
          tempoMedioViagem: 42,
          sentidoTipo: "VOLTA",
          headwayCopiloto: 12,
          orientacao: "Sul",
          consorcioSinoticoUnificado: [],
          garagem: [],
          despachoSemCor: false,
          ativo: true,
          sentido: "VOLTA",
          codigosIntegracao: ["001B"],
          raioTrajeto: 2.3,
          id: "t2"
        }
      ]
    },
    {
      _id: "2",
      clienteId: 1,
      id_migracao: 2,
      descr: "Linha Shopping - Universidade",
      numero: "102",
      id: "2",
      trajetos: [
        {
          _id: "t3",
          id_migracao: 3,
          externalId: "ext3",
          nome: "Shopping → Universidade",
          colorIdx: 3,
          qtdTransmisoesInicial: 15,
          qtdTransmisoesFinal: 12,
          percentConclusao: 78,
          toleranciaArrasto: 7,
          kmTrajeto: 18.2,
          tempoMedioViagem: 55,
          sentidoTipo: "IDA",
          headwayCopiloto: 20,
          orientacao: "Leste",
          consorcioSinoticoUnificado: [],
          garagem: [],
          despachoSemCor: false,
          ativo: true,
          sentido: "IDA",
          codigosIntegracao: ["102A"],
          raioTrajeto: 3.1,
          id: "t3"
        }
      ]
    }
  ];

  const handleLinhaChange = (linha: Linha | null) => {
    console.log('Linha selecionada:', linha);
    setSelectedLinhaId(linha?._id);
  };

  const handleTrajetoChange = (trajetos: Trajeto[]) => {
    console.log('Trajetos selecionados:', trajetos);
    setSelectedTrajetoIds(trajetos.map(t => t._id));
  };

    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Guia de Importação - SD Components
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Aprenda como instalar, importar e usar a biblioteca @vitorandradecoelho/sd-components em seus projetos React
            </p>
          </header>

          {/* Installation Guide */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Package className="h-6 w-6 text-primary" />
                Passo 1: Instalação
              </CardTitle>
              <CardDescription>
                Primeiro, instale a biblioteca em seu projeto React
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Download className="h-4 w-4" />
                  <span className="font-semibold">NPM</span>
                </div>
                <code className="text-primary">npm install @vitorandradecoelho/sd-components</code>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Download className="h-4 w-4" />
                  <span className="font-semibold">Yarn</span>
                </div>
                <code className="text-primary">yarn add @vitorandradecoelho/sd-components</code>
              </div>
            </CardContent>
          </Card>

          {/* CSS Import Guide */}
          <Card className="border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FileText className="h-6 w-6 text-accent" />
                Passo 2: Importação do CSS
              </CardTitle>
              <CardDescription>
                Existem 4 maneiras diferentes de importar os estilos CSS
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="default">Recomendado</Badge>
                  <h3 className="font-semibold">Método 1: Importação Automática</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Os estilos são carregados automaticamente quando você importa os componentes
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm">
{`import { LinhaTrajetoSelector } from '@vitorandradecoelho/sd-components';
// CSS é carregado automaticamente!`}
                  </code>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Alternativa</Badge>
                  <h3 className="font-semibold">Método 2: StyleProvider</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use o StyleProvider quando quiser controlar manualmente o carregamento dos estilos
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm">
{`import { StyleProvider, LinhaTrajetoSelector } from '@vitorandradecoelho/sd-components';

function App() {
  return (
    <StyleProvider>
      <LinhaTrajetoSelector />
    </StyleProvider>
  );
}`}
                  </code>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Manual</Badge>
                  <h3 className="font-semibold">Método 3: Importação Manual do CSS</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Importe o arquivo CSS diretamente no seu arquivo principal (main.tsx ou index.js)
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm">
{`// No seu main.tsx ou index.js
import '@vitorandradecoelho/sd-components/dist/styles.css';`}
                  </code>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Debug</Badge>
                  <h3 className="font-semibold">Método 4: Hook useStyles</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use para verificar se os estilos foram carregados corretamente
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm">
{`import { useStyles } from '@vitorandradecoelho/sd-components';

function MyComponent() {
  const stylesLoaded = useStyles();
  
  if (!stylesLoaded) {
    return <div>Carregando estilos...</div>;
  }
  
  return <div>Componente pronto!</div>;
}`}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Component Import Guide */}
          <Card className="border-success/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Code className="h-6 w-6 text-success" />
                Passo 3: Importação de Componentes
              </CardTitle>
              <CardDescription>
                Como importar e usar os componentes da biblioteca
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="space-y-3">
                <h3 className="font-semibold">Importação Individual</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm">
{`// Importando apenas o que você precisa
import { LinhaTrajetoSelector, type Linha, type Trajeto } from '@vitorandradecoelho/sd-components';`}
                  </code>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Importação Múltipla</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm">
{`// Importando vários componentes
import { 
  Input, 
  Select, 
  ComboBox, 
  LinhaTrajetoSelector,
  type SelectOption,
  type Linha 
} from '@vitorandradecoelho/sd-components';`}
                  </code>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Exemplo Completo de Uso</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-xs">
{`import React, { useState } from 'react';
import { LinhaTrajetoSelector, type Linha, type Trajeto } from '@vitorandradecoelho/sd-components';

const MyApp = () => {
  const [selectedLinhaId, setSelectedLinhaId] = useState<string>();
  const [selectedTrajetoIds, setSelectedTrajetoIds] = useState<string[]>([]);

  const linhas: Linha[] = [
    // seus dados aqui...
  ];

  const handleLinhaChange = (linha: Linha | null) => {
    setSelectedLinhaId(linha?._id);
  };

  const handleTrajetoChange = (trajetos: Trajeto[]) => {
    setSelectedTrajetoIds(trajetos.map(t => t._id));
  };

  return (
    <LinhaTrajetoSelector
      linhas={linhas}
      selectedLinhaId={selectedLinhaId}
      selectedTrajetoIds={selectedTrajetoIds}
      onLinhaChange={handleLinhaChange}
      onTrajetoChange={handleTrajetoChange}
    />
  );
};`}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Demo */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <CheckCircle className="h-6 w-6 text-primary" />
                Demonstração ao Vivo
              </CardTitle>
              <CardDescription>
                Veja o componente LinhaTrajetoSelector funcionando
              </CardDescription>
            </CardHeader>
            <CardContent>

              <LinhaTrajetoSelector
                linhas={linhas}
                selectedLinhaId={selectedLinhaId}
                selectedTrajetoIds={selectedTrajetoIds}
                onLinhaChange={handleLinhaChange}
                onTrajetoChange={handleTrajetoChange}
                linhaPlaceholder="Escolha uma linha de ônibus"
                trajetoPlaceholder="Selecione os trajetos"
                linhaLabel="Linha de Ônibus"
                trajetoLabel="Trajetos Disponíveis"
                size="md"
                multiSelectTrajeto={true}
              />
            </CardContent>
          </Card>

          {/* Current State */}
          <Card>
            <CardHeader>
              <CardTitle>Estado Atual</CardTitle>
              <CardDescription>
                Valores selecionados no componente acima
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <strong>Linha selecionada:</strong> {selectedLinhaId || 'Nenhuma'}
              </p>
              <p>
                <strong>Trajetos selecionados:</strong> {selectedTrajetoIds.length > 0 ? selectedTrajetoIds.join(', ') : 'Nenhum'}
              </p>
            </CardContent>
          </Card>

          {/* Library Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informações da Biblioteca</CardTitle>
              <CardDescription>
                Links úteis e comandos para uso da biblioteca
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span><strong>Pacote:</strong> @vitorandradecoelho/sd-components</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span><strong>NPM:</strong> 
                  <a 
                    href="https://www.npmjs.com/package/@vitorandradecoelho/sd-components" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline ml-1"
                  >
                    Ver no NPM
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Download className="h-4 w-4 text-muted-foreground" />
                <span><strong>Instalação:</strong> npm i @vitorandradecoelho/sd-components</span>
              </div>
            </CardContent>
          </Card>
      </div>
    </div>
  );
};

export default TestePage;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, GitBranch, Code, Terminal, CheckCircle, AlertCircle, Copy, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Import the component from BitBucket version 0.0.2
import { LinhaTrajetoSelector, type Linha, type Trajeto } from '@vitorandradecoelho/sd-components';

// Sample data for LinhaTrajetoSelector - Version 0.0.2 compatible
const sampleLinhas: Linha[] = [
  {
    "_id": "5e8e3bbf4be5542e43e539eb",
    "clienteId": 1314,
    "id_migracao": 3210,
    "descr": "01 - Terminal Centro / Vila Esperança",
    "numero": "01",
    "trajetos": [
      {
        "_id": "5e8e3bbf4be5542e43e539e9",
        "id_migracao": 8639,
        "externalId": "0",
        "nome": "01 - Centro → Esperança",
        "colorIdx": 7,
        "qtdTransmisoesInicial": 1,
        "qtdTransmisoesFinal": 1,
        "percentConclusao": 95,
        "toleranciaArrasto": 3,
        "kmTrajeto": 18.2,
        "tempoMedioViagem": 85,
        "sentidoTipo": "P",
        "headwayCopiloto": 0,
        "orientacao": "N",
        "consorcioSinoticoUnificado": [],
        "garagem": [],
        "despachoSemCor": true,
        "ativo": true,
        "sentido": "ida",
        "codigosIntegracao": ["1"],
        "raioTrajeto": 120,
        "id": "5e8e3bbf4be5542e43e539e9"
      },
      {
        "_id": "5e8e3bbf4be5542e43e539ea",
        "id_migracao": 8640,
        "externalId": "0",
        "nome": "01 - Esperança → Centro",
        "colorIdx": 3,
        "qtdTransmisoesInicial": 1,
        "qtdTransmisoesFinal": 1,
        "percentConclusao": 88,
        "toleranciaArrasto": 4,
        "kmTrajeto": 17.8,
        "tempoMedioViagem": 82,
        "sentidoTipo": "P",
        "headwayCopiloto": 0,
        "orientacao": "S",
        "consorcioSinoticoUnificado": [],
        "garagem": [],
        "despachoSemCor": true,
        "ativo": true,
        "sentido": "volta",
        "codigosIntegracao": ["1"],
        "raioTrajeto": 95,
        "id": "5e8e3bbf4be5542e43e539ea"
      }
    ],
    "id": "5e8e3bbf4be5542e43e539eb"
  },
  {
    "_id": "5e8e3bbf4be5542e43e539ec",
    "clienteId": 1314,
    "id_migracao": 3211,
    "descr": "02 - Shopping / Universidade",
    "numero": "02",
    "trajetos": [
      {
        "_id": "5e8e3bbf4be5542e43e539ed",
        "id_migracao": 8641,
        "externalId": "0",
        "nome": "02 - Shopping → Universidade",
        "colorIdx": 2,
        "qtdTransmisoesInicial": 1,
        "qtdTransmisoesFinal": 1,
        "percentConclusao": 92,
        "toleranciaArrasto": 2,
        "kmTrajeto": 14.5,
        "tempoMedioViagem": 68,
        "sentidoTipo": "P",
        "headwayCopiloto": 0,
        "orientacao": "N",
        "consorcioSinoticoUnificado": [],
        "garagem": [],
        "despachoSemCor": false,
        "ativo": true,
        "sentido": "ida",
        "codigosIntegracao": ["2"],
        "raioTrajeto": 110,
        "id": "5e8e3bbf4be5542e43e539ed"
      },
      {
        "_id": "5e8e3bbf4be5542e43e539ee",
        "id_migracao": 8642,
        "externalId": "0",
        "nome": "02 - Universidade → Shopping",
        "colorIdx": 5,
        "qtdTransmisoesInicial": 1,
        "qtdTransmisoesFinal": 1,
        "percentConclusao": 85,
        "toleranciaArrasto": 3,
        "kmTrajeto": 15.1,
        "tempoMedioViagem": 72,
        "sentidoTipo": "P",
        "headwayCopiloto": 0,
        "orientacao": "S",
        "consorcioSinoticoUnificado": [],
        "garagem": [],
        "despachoSemCor": false,
        "ativo": true,
        "sentido": "volta",
        "codigosIntegracao": ["2"],
        "raioTrajeto": 105,
        "id": "5e8e3bbf4be5542e43e539ee"
      }
    ],
    "id": "5e8e3bbf4be5542e43e539ec"
  }
];

const BitBucketTestPage = () => {
  const { toast } = useToast();
  const [selectedLinhaId, setSelectedLinhaId] = useState<string>("");
  const [selectedTrajetoIds, setSelectedTrajetoIds] = useState<string[]>([]);
  const [showInstallCommand, setShowInstallCommand] = useState(false);
  const [showImportCode, setShowImportCode] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Código copiado para a área de transferência",
    });
  };

  const handleLinhaChange = (linha: Linha | null) => {
    setSelectedLinhaId(linha?._id || "");
    console.log("Linha selecionada:", linha);
  };

  const handleTrajetoChange = (trajetos: Trajeto[]) => {
    const trajetoIds = trajetos.map(t => t._id);
    setSelectedTrajetoIds(trajetoIds);
    console.log("Trajetos selecionados:", trajetos);
  };

  const installCommand = "npm install @vitorandradecoelho/sd-components@0.0.2";
  const yarnCommand = "yarn add @vitorandradecoelho/sd-components@0.0.2";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Início
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <GitBranch className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">BitBucket Test v0.0.2</h1>
              <Badge variant="secondary">@vitorandradecoelho/sd-components</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Teste BitBucket v0.0.2
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Esta página demonstra como importar e usar o componente LinhaTrajetoSelector 
            da versão 0.0.2 da biblioteca sd_components publicada via BitBucket.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Badge variant="outline" className="px-4 py-2">
              <Package className="h-4 w-4 mr-2" />
              Versão 0.0.2
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <GitBranch className="h-4 w-4 mr-2" />
              Via BitBucket
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              LinhaTrajetoSelector
            </Badge>
          </div>
        </div>

        {/* Installation and Import Guide */}
        <Tabs defaultValue="installation" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="installation">Instalação</TabsTrigger>
            <TabsTrigger value="import">Importação</TabsTrigger>
            <TabsTrigger value="demo">Demo Ao Vivo</TabsTrigger>
          </TabsList>

          {/* Installation Tab */}
          <TabsContent value="installation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  1. Instalar a Biblioteca v0.0.2
                </CardTitle>
                <CardDescription>
                  Instale a versão específica 0.0.2 da biblioteca sd_components
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">NPM</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowInstallCommand(!showInstallCommand)}
                    >
                      {showInstallCommand ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  <div className="relative">
                    <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <div className="flex items-center justify-between">
                        <span className="text-green-400">$</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(installCommand)}
                          className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-slate-300 mt-1">{installCommand}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">YARN</h4>
                  <div className="relative">
                    <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <div className="flex items-center justify-between">
                        <span className="text-green-400">$</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(yarnCommand)}
                          className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-slate-300 mt-1">{yarnCommand}</div>
                    </div>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Importante:</strong> Esta versão específica (0.0.2) pode ter diferenças de API 
                    em relação às versões mais recentes. Consulte a documentação para detalhes.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Import Tab */}
          <TabsContent value="import" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  2. Importar os Componentes
                </CardTitle>
                <CardDescription>
                  Como importar o LinhaTrajetoSelector da versão 0.0.2
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Importação dos Componentes</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowImportCode(!showImportCode)}
                    >
                      {showImportCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-yellow-400">// TypeScript</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(`import { LinhaTrajetoSelector, type Linha, type Trajeto } from '@vitorandradecoelho/sd-components';`)}
                        className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-slate-300">
                      <div><span className="text-blue-400">import</span> <span className="text-yellow-300">{'{ LinhaTrajetoSelector, type Linha, type Trajeto }'}</span></div>
                      <div><span className="text-blue-400">from</span> <span className="text-green-400">'@vitorandradecoelho/sd-components'</span>;</div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Exemplo de Uso Básico</h4>
                  <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <div className="text-slate-300 space-y-1">
                      <div><span className="text-blue-400">const</span> <span className="text-yellow-300">[selectedLinhaId, setSelectedLinhaId]</span> = <span className="text-blue-400">useState</span><span className="text-gray-400">&lt;</span><span className="text-green-400">string</span><span className="text-gray-400">&gt;</span>(<span className="text-green-400">""</span>);</div>
                      <div><span className="text-blue-400">const</span> <span className="text-yellow-300">[selectedTrajetoIds, setSelectedTrajetoIds]</span> = <span className="text-blue-400">useState</span><span className="text-gray-400">&lt;</span><span className="text-green-400">string[]</span><span className="text-gray-400">&gt;</span>([]);</div>
                      <div className="mt-3"></div>
                      <div><span className="text-gray-400">&lt;</span><span className="text-red-400">LinhaTrajetoSelector</span></div>
                      <div className="ml-4"><span className="text-yellow-300">linhas</span>=<span className="text-gray-400">{'{'}</span><span className="text-yellow-300">sampleLinhas</span><span className="text-gray-400">{'}'}</span></div>
                      <div className="ml-4"><span className="text-yellow-300">selectedLinhaId</span>=<span className="text-gray-400">{'{'}</span><span className="text-yellow-300">selectedLinhaId</span><span className="text-gray-400">{'}'}</span></div>
                      <div className="ml-4"><span className="text-yellow-300">selectedTrajetoIds</span>=<span className="text-gray-400">{'{'}</span><span className="text-yellow-300">selectedTrajetoIds</span><span className="text-gray-400">{'}'}</span></div>
                      <div className="ml-4"><span className="text-yellow-300">onLinhaChange</span>=<span className="text-gray-400">{'{'}</span><span className="text-yellow-300">handleLinhaChange</span><span className="text-gray-400">{'}'}</span></div>
                      <div className="ml-4"><span className="text-yellow-300">onTrajetoChange</span>=<span className="text-gray-400">{'{'}</span><span className="text-yellow-300">handleTrajetoChange</span><span className="text-gray-400">{'}'}</span></div>
                      <div><span className="text-gray-400">/&gt;</span></div>
                    </div>
                  </div>
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>v0.0.2 Features:</strong> Esta versão inclui suporte completo a TypeScript, 
                    seleção múltipla de trajetos e dados de performance dos trajetos.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Demo Tab */}
          <TabsContent value="demo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  3. Demonstração Ao Vivo - v0.0.2
                </CardTitle>
                <CardDescription>
                  LinhaTrajetoSelector funcionando com dados de exemplo da versão BitBucket 0.0.2
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Live Demo */}
                <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 bg-primary/5">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <GitBranch className="h-4 w-4" />
                    Componente Importado da v0.0.2
                  </h4>
                  
                  <LinhaTrajetoSelector
                    linhas={sampleLinhas}
                    selectedLinhaId={selectedLinhaId}
                    selectedTrajetoIds={selectedTrajetoIds}
                    onLinhaChange={handleLinhaChange}
                    onTrajetoChange={handleTrajetoChange}
                    linhaPlaceholder="Selecione uma linha de transporte..."
                    trajetoPlaceholder="Selecione os trajetos..."
                  />
                </div>

                {/* Selection Info */}
                {(selectedLinhaId || selectedTrajetoIds.length > 0) && (
                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-sm">Seleção Atual</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {selectedLinhaId && (
                        <div>
                          <strong>Linha ID:</strong> <code className="bg-muted px-1 rounded">{selectedLinhaId}</code>
                        </div>
                      )}
                      {selectedTrajetoIds.length > 0 && (
                        <div>
                          <strong>Trajetos IDs:</strong> 
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedTrajetoIds.map(id => (
                              <code key={id} className="bg-muted px-1 rounded text-xs">{id}</code>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Version Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Versão</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary">0.0.2</Badge>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Fonte</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="outline">BitBucket</Badge>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Linhas de Teste</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="default">{sampleLinhas.length}</Badge>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5" />
              Informações da Versão v0.0.2
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Melhorias da v0.0.2</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Performance otimizada para grandes listas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Suporte aprimorado ao TypeScript</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Interface de seleção mais intuitiva</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Dados de performance dos trajetos</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Links Úteis</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <Link to="/bitbucket-docs" className="text-primary hover:underline">Documentação BitBucket</Link></li>
                  <li>• <Link to="/docs/linhatrajeto" className="text-primary hover:underline">LinhaTrajetoSelector Docs</Link></li>
                  <li>• <Link to="/teste" className="text-primary hover:underline">Teste NPM (versão atual)</Link></li>
                  <li>• <Link to="/docs" className="text-primary hover:underline">Documentação Completa</Link></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BitBucketTestPage;
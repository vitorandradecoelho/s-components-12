import React, { useState } from 'react';
import { LinhaTrajetoSelector, type Linha } from '../LinhaTrajetoSelector';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert } from '../Alert';
import { useToastHelper } from '../Toast';

// Dados de exemplo para demonstração
const sampleLinhas: Linha[] = [
  {
    "_id": "5e8e3bbf4be5542e43e539eb",
    "clienteId": 1314,
    "id_migracao": 3210,
    "descr": "01 - Esperança / Taboão",
    "numero": "01",
    "trajetos": [
      {
        "_id": "5e8e3bbf4be5542e43e539e9",
        "id_migracao": 8639,
        "externalId": "0",
        "nome": "01 - Esperança / Sentido Taboão",
        "colorIdx": 7,
        "qtdTransmisoesInicial": 1,
        "qtdTransmisoesFinal": 1,
        "percentConclusao": 90,
        "toleranciaArrasto": 5,
        "kmTrajeto": 17.51,
        "tempoMedioViagem": 80,
        "sentidoTipo": "P",
        "headwayCopiloto": 0,
        "orientacao": "N",
        "consorcioSinoticoUnificado": [],
        "garagem": [],
        "despachoSemCor": true,
        "ativo": true,
        "sentido": "ida",
        "codigosIntegracao": ["1"],
        "raioTrajeto": 100,
        "id": "5e8e3bbf4be5542e43e539e9"
      },
      {
        "_id": "5e8e3bbf4be5542e43e539ea",
        "id_migracao": 8640,
        "externalId": "0",
        "nome": "01 - Taboão / Sentido Esperança",
        "colorIdx": 3,
        "qtdTransmisoesInicial": 1,
        "qtdTransmisoesFinal": 1,
        "percentConclusao": 70,
        "toleranciaArrasto": 5,
        "kmTrajeto": 17.99,
        "tempoMedioViagem": 80,
        "sentidoTipo": "P",
        "headwayCopiloto": 0,
        "orientacao": "S",
        "consorcioSinoticoUnificado": [],
        "garagem": [],
        "despachoSemCor": true,
        "ativo": true,
        "sentido": "volta",
        "codigosIntegracao": ["1"],
        "raioTrajeto": 80,
        "id": "5e8e3bbf4be5542e43e539ea"
      }
    ],
    "id": "5e8e3bbf4be5542e43e539eb"
  },
  {
    "_id": "5e8e3bbf4be5542e43e539ec",
    "clienteId": 1314,
    "id_migracao": 3211,
    "descr": "02 - Centro / Vila Nova",
    "numero": "02",
    "trajetos": [
      {
        "_id": "5e8e3bbf4be5542e43e539ed",
        "id_migracao": 8641,
        "externalId": "0",
        "nome": "02 - Centro / Sentido Vila Nova",
        "colorIdx": 2,
        "qtdTransmisoesInicial": 1,
        "qtdTransmisoesFinal": 1,
        "percentConclusao": 85,
        "toleranciaArrasto": 3,
        "kmTrajeto": 12.8,
        "tempoMedioViagem": 65,
        "sentidoTipo": "P",
        "headwayCopiloto": 0,
        "orientacao": "N",
        "consorcioSinoticoUnificado": [],
        "garagem": [],
        "despachoSemCor": false,
        "ativo": true,
        "sentido": "ida",
        "codigosIntegracao": ["2"],
        "raioTrajeto": 90,
        "id": "5e8e3bbf4be5542e43e539ed"
      }
    ],
    "id": "5e8e3bbf4be5542e43e539ec"
  },
  {
    "_id": "5e8e3bbf4be5542e43e539ee",
    "clienteId": 1314,
    "id_migracao": 3212,
    "descr": "03 - Terminal / Shopping",
    "numero": "03",
    "trajetos": [
      {
        "_id": "5e8e3bbf4be5542e43e539ef",
        "id_migracao": 8642,
        "externalId": "0",
        "nome": "03 - Terminal / Sentido Shopping",
        "colorIdx": 1,
        "qtdTransmisoesInicial": 2,
        "qtdTransmisoesFinal": 2,
        "percentConclusao": 95,
        "toleranciaArrasto": 2,
        "kmTrajeto": 8.5,
        "tempoMedioViagem": 45,
        "sentidoTipo": "P",
        "headwayCopiloto": 0,
        "orientacao": "E",
        "consorcioSinoticoUnificado": [],
        "garagem": [],
        "despachoSemCor": false,
        "ativo": true,
        "sentido": "ida",
        "codigosIntegracao": ["3A"],
        "raioTrajeto": 75,
        "id": "5e8e3bbf4be5542e43e539ef"
      },
      {
        "_id": "5e8e3bbf4be5542e43e539f0",
        "id_migracao": 8643,
        "externalId": "0",
        "nome": "03 - Shopping / Sentido Terminal",
        "colorIdx": 1,
        "qtdTransmisoesInicial": 2,
        "qtdTransmisoesFinal": 2,
        "percentConclusao": 92,
        "toleranciaArrasto": 2,
        "kmTrajeto": 8.2,
        "tempoMedioViagem": 40,
        "sentidoTipo": "P",
        "headwayCopiloto": 0,
        "orientacao": "W",
        "consorcioSinoticoUnificado": [],
        "garagem": [],
        "despachoSemCor": false,
        "ativo": true,
        "sentido": "volta",
        "codigosIntegracao": ["3B"],
        "raioTrajeto": 75,
        "id": "5e8e3bbf4be5542e43e539f0"
      }
    ],
    "id": "5e8e3bbf4be5542e43e539ee"
  }
];

const LinhaTrajetoSelectorDocs: React.FC = () => {
  const { success } = useToastHelper();
  const [selectedLinhaId, setSelectedLinhaId] = useState<string>("");
  const [selectedTrajetoIds, setSelectedTrajetoIds] = useState<string[]>([]);
  const [selectedLinhaId2, setSelectedLinhaId2] = useState<string>("");
  const [selectedTrajetoIds2, setSelectedTrajetoIds2] = useState<string[]>([]);
  const [selectedLinhaId3, setSelectedLinhaId3] = useState<string>("");
  const [selectedTrajetoIds3, setSelectedTrajetoIds3] = useState<string[]>([]);
  const [selectedLinhaId4, setSelectedLinhaId4] = useState<string>("");
  const [selectedTrajetoIds4, setSelectedTrajetoIds4] = useState<string[]>([]);
  
  return (
    <div className="space-y-8">
      {/* Exemplo Básico */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Exemplo Básico
            <Badge>Interativo</Badge>
          </CardTitle>
          <CardDescription>
            Seleção simples de linha e trajeto com feedback visual
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <LinhaTrajetoSelector
            linhas={sampleLinhas}
            selectedLinhaId={selectedLinhaId}
            selectedTrajetoIds={selectedTrajetoIds}
            onLinhaChange={(linha) => {
              setSelectedLinhaId(linha?._id || '');
              success(`Linha selecionada: ${linha?.descr || 'Nenhuma'}`);
            }}
            onTrajetoChange={(trajetos) => {
              setSelectedTrajetoIds(trajetos.map(t => t._id));
              success(`${trajetos.length} trajeto(s) selecionado(s)`);
            }}
            linhaPlaceholder="Escolha uma linha de ônibus..."
            trajetoPlaceholder="Escolha trajetos..."
            linhaLabel="Linha de Ônibus"
            trajetoLabel="Trajetos"
          />
          
          {selectedLinhaId && selectedTrajetoIds.length > 0 && (
            <Alert variant="success" title="Seleção Completa">
              Linha "{sampleLinhas.find(l => l._id === selectedLinhaId)?.descr}" e {selectedTrajetoIds.length} trajeto(s) selecionados!
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Exemplo Personalizado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Exemplo Personalizado
            <Badge variant="secondary">Avançado</Badge>
          </CardTitle>
          <CardDescription>
            Componente com tamanho maior e labels personalizados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <LinhaTrajetoSelector
            linhas={sampleLinhas}
            selectedLinhaId={selectedLinhaId2}
            selectedTrajetoIds={selectedTrajetoIds2}
            onLinhaChange={(linha) => {
              setSelectedLinhaId2(linha?._id || '');
            }}
            onTrajetoChange={(trajetos) => {
              setSelectedTrajetoIds2(trajetos.map(t => t._id));
            }}
            linhaPlaceholder="Selecione a linha do transporte público..."
            trajetoPlaceholder="Selecione os trajetos desejados..."
            linhaLabel="🚌 Linha do Ônibus"
            trajetoLabel="🛣️ Trajetos da Viagem"
            size="lg"
            className="space-y-6"
            multiSelectTrajeto={true}
          />
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-sm">
              <div className="font-medium text-muted-foreground mb-1">Linha Selecionada:</div>
              <div className="text-foreground">
                {selectedLinhaId2 ? sampleLinhas.find(l => l._id === selectedLinhaId2)?.descr : "Nenhuma"}
              </div>
            </div>
            <div className="text-sm">
              <div className="font-medium text-muted-foreground mb-1">Trajetos Selecionados:</div>
              <div className="text-foreground">
                {selectedTrajetoIds2.length > 0 ? 
                  selectedTrajetoIds2
                    .map(id => sampleLinhas
                      .find(l => l._id === selectedLinhaId2)?.trajetos
                      .find(t => t._id === id)?.nome)
                    .filter(Boolean)
                    .join(", ")
                : "Nenhum"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exemplo com API */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Integração com API
            <Badge variant="outline">Novo</Badge>
          </CardTitle>
          <CardDescription>
            Carregamento automático de dados via API REST
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <LinhaTrajetoSelector
            clienteId="1314"
            apiBaseUrl="https://sua-api.com"
            selectedLinhaId={selectedLinhaId3}
            selectedTrajetoIds={selectedTrajetoIds3}
            onLinhaChange={(linha) => {
              setSelectedLinhaId3(linha?._id || '');
              success(`Linha da API: ${linha?.descr || 'Nenhuma'}`);
            }}
            onTrajetoChange={(trajetos) => {
              setSelectedTrajetoIds3(trajetos.map(t => t._id));
              success(`${trajetos.length} trajeto(s) da API selecionado(s)`);
            }}
            linhaPlaceholder="Carregando linhas da API..."
            trajetoPlaceholder="Selecione trajetos..."
          />
          
          <Alert variant="default" title="Configuração da API">
            <div className="space-y-2 text-sm">
              <p><strong>URL:</strong> {`{apiBaseUrl}/service-api/linhasTrajetos/{clienteId}`}</p>
              <p><strong>Método:</strong> GET</p>
              <p><strong>Formato:</strong> JSON Array com estrutura Linha[]</p>
            </div>
          </Alert>
        </CardContent>
      </Card>

      {/* Exemplo com internacionalização */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Internacionalização
            <Badge variant="outline">i18n</Badge>
          </CardTitle>
          <CardDescription>
            Placeholders e labels automaticamente traduzidos usando contexto de linguagem
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <LinhaTrajetoSelector
            linhas={sampleLinhas}
            selectedLinhaId={selectedLinhaId4}
            selectedTrajetoIds={selectedTrajetoIds4}
            onLinhaChange={(linha) => {
              setSelectedLinhaId4(linha?._id || '');
            }}
            onTrajetoChange={(trajetos) => {
              setSelectedTrajetoIds4(trajetos.map(t => t._id));
            }}
            // Não especificar placeholders para usar os traduzidos automaticamente
          />
          
          <Alert variant="default" title="Internacionalização Automática">
            Quando não especificados, os placeholders e labels são automaticamente traduzidos baseados 
            no contexto de linguagem da aplicação (PT, EN, ES).
          </Alert>
        </CardContent>
      </Card>

      {/* Exemplo com manutenção de trajetos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Manutenção de Trajetos
            <Badge variant="outline">Novo</Badge>
          </CardTitle>
          <CardDescription>
            Manter trajetos selecionados ao trocar de linha
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <LinhaTrajetoSelector
            linhas={sampleLinhas}
            selectedLinhaId={selectedLinhaId4}
            selectedTrajetoIds={selectedTrajetoIds4}
            keepTrajetosOnLinhaChange={true}
            onLinhaChange={(linha) => {
              setSelectedLinhaId4(linha?._id || '');
              success(`Linha alterada mantendo trajetos: ${linha?.descr || 'Nenhuma'}`);
            }}
            onTrajetoChange={(trajetos) => {
              setSelectedTrajetoIds4(trajetos.map(t => t._id));
            }}
            linhaPlaceholder="Selecione uma linha..."
            trajetoPlaceholder="Trajetos mantidos ao trocar linha"
          />
          
          <Alert variant="default" title="Comportamento">
            Com <code>keepTrajetosOnLinhaChange=true</code>, os trajetos selecionados não são limpos 
            automaticamente ao trocar de linha. Útil para manter seleções durante navegação.
          </Alert>
          
          <div className="text-sm space-y-2">
            <div className="font-medium text-muted-foreground">Status:</div>
            <div>Linha: {selectedLinhaId4 ? sampleLinhas.find(l => l._id === selectedLinhaId4)?.descr : "Nenhuma"}</div>
            <div>Trajetos: {selectedTrajetoIds4.length} selecionados</div>
          </div>
        </CardContent>
      </Card>

      {/* Propriedades do Componente */}
      <Card>
        <CardHeader>
          <CardTitle>Propriedades do Componente</CardTitle>
          <CardDescription>
            Todas as props disponíveis do LinhaTrajetoSelector
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Propriedade</th>
                  <th className="border border-border p-2 text-left">Tipo</th>
                  <th className="border border-border p-2 text-left">Padrão</th>
                  <th className="border border-border p-2 text-left">Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2"><code>linhas</code></td>
                  <td className="border border-border p-2">Linha[]?</td>
                  <td className="border border-border p-2">-</td>
                  <td className="border border-border p-2">Array de linhas (opcional se usar API)</td>
                </tr>
                <tr>
                  <td className="border border-border p-2"><code>clienteId</code></td>
                  <td className="border border-border p-2">string?</td>
                  <td className="border border-border p-2">-</td>
                  <td className="border border-border p-2">ID do cliente para busca via API</td>
                </tr>
                <tr>
                  <td className="border border-border p-2"><code>apiBaseUrl</code></td>
                  <td className="border border-border p-2">string?</td>
                  <td className="border border-border p-2">""</td>
                  <td className="border border-border p-2">URL base da API</td>
                </tr>
                <tr>
                  <td className="border border-border p-2"><code>selectedLinhaId</code></td>
                  <td className="border border-border p-2">string?</td>
                  <td className="border border-border p-2">-</td>
                  <td className="border border-border p-2">ID da linha selecionada</td>
                </tr>
                <tr>
                  <td className="border border-border p-2"><code>selectedTrajetoIds</code></td>
                  <td className="border border-border p-2">string[]?</td>
                  <td className="border border-border p-2">[]</td>
                  <td className="border border-border p-2">IDs dos trajetos selecionados</td>
                </tr>
                <tr>
                  <td className="border border-border p-2"><code>keepTrajetosOnLinhaChange</code></td>
                  <td className="border border-border p-2">boolean?</td>
                  <td className="border border-border p-2">false</td>
                  <td className="border border-border p-2">Manter trajetos ao trocar linha</td>
                </tr>
                <tr>
                  <td className="border border-border p-2"><code>linhaPlaceholder</code></td>
                  <td className="border border-border p-2">string?</td>
                  <td className="border border-border p-2">traduzido</td>
                  <td className="border border-border p-2">Placeholder da linha (traduzido automaticamente)</td>
                </tr>
                <tr>
                  <td className="border border-border p-2"><code>trajetoPlaceholder</code></td>
                  <td className="border border-border p-2">string?</td>
                  <td className="border border-border p-2">traduzido</td>
                  <td className="border border-border p-2">Placeholder dos trajetos (traduzido automaticamente)</td>
                </tr>
                <tr>
                  <td className="border border-border p-2"><code>linhaLabel</code></td>
                  <td className="border border-border p-2">string?</td>
                  <td className="border border-border p-2">traduzido</td>
                  <td className="border border-border p-2">Label da linha (traduzido automaticamente)</td>
                </tr>
                <tr>
                  <td className="border border-border p-2"><code>trajetoLabel</code></td>
                  <td className="border border-border p-2">string?</td>
                  <td className="border border-border p-2">traduzido</td>
                  <td className="border border-border p-2">Label dos trajetos (traduzido automaticamente)</td>
                </tr>
                <tr>
                  <td className="border border-border p-2"><code>multiSelectTrajeto</code></td>
                  <td className="border border-border p-2">boolean?</td>
                  <td className="border border-border p-2">true</td>
                  <td className="border border-border p-2">Permitir múltiplos trajetos</td>
                </tr>
                <tr>
                  <td className="border border-border p-2"><code>size</code></td>
                  <td className="border border-border p-2">"sm"|"md"|"lg"</td>
                  <td className="border border-border p-2">"md"</td>
                  <td className="border border-border p-2">Tamanho dos campos</td>
                </tr>
                <tr>
                  <td className="border border-border p-2"><code>disabled</code></td>
                  <td className="border border-border p-2">boolean?</td>
                  <td className="border border-border p-2">false</td>
                  <td className="border border-border p-2">Desabilitar componente</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Informações dos Dados */}
      <Card>
        <CardHeader>
          <CardTitle>Estrutura dos Dados</CardTitle>
          <CardDescription>
            Exemplo da estrutura JSON esperada pelo componente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <pre className="text-sm overflow-x-auto">
{`interface Linha {
  _id: string;
  clienteId: number;
  id_migracao: number;
  descr: string;
  numero: string;
  trajetos: Trajeto[];
  id: string;
}

interface Trajeto {
  _id: string;
  nome: string;
  sentido: string;
  kmTrajeto: number;
  // ... outras propriedades
}`}
            </pre>
          </div>
          
          <Alert variant="default" title="Estrutura Flexível">
            O componente utiliza apenas as propriedades essenciais (_id, descr, nome, trajetos) 
            mas aceita objetos com propriedades adicionais como mostrado no exemplo.
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinhaTrajetoSelectorDocs;
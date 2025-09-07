import React, { useState } from 'react';
import { LinhaTrajetoSelector, type Linha, type Trajeto } from '@vitorandradecoelho/sd-components';

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
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Teste da Biblioteca SD Components
          </h1>
          <p className="text-muted-foreground">
            Testando o componente LinhaTrajetoSelector importado do NPM
          </p>
        </header>

        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold text-card-foreground mb-6">
            LinhaTrajetoSelector
          </h2>
          
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
        </div>

        <div className="mt-8 bg-card rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Estado Atual
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Linha selecionada:</strong> {selectedLinhaId || 'Nenhuma'}
            </p>
            <p>
              <strong>Trajetos selecionados:</strong> {selectedTrajetoIds.length > 0 ? selectedTrajetoIds.join(', ') : 'Nenhum'}
            </p>
          </div>
        </div>

        <div className="mt-8 bg-card rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Informações da Biblioteca
          </h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>📦 Pacote: @vitorandradecoelho/sd-components</p>
            <p>🔗 NPM: https://www.npmjs.com/package/@vitorandradecoelho/sd-components</p>
            <p>⚡ Comando de instalação: npm i @vitorandradecoelho/sd-components</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestePage;
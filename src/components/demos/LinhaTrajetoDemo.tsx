import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinhaTrajetoSelector, type Linha, type Trajeto } from "@vitorandradecoelho/sd-components";
import { useLanguage } from "@/contexts/LanguageContext";

export const LinhaTrajetoDemo = () => {
  const { t } = useLanguage();
  const [selectedLinhaId, setSelectedLinhaId] = React.useState<string>("");
  const [selectedTrajetoIds, setSelectedTrajetoIds] = React.useState<string[]>([]);

  // Dados de exemplo
  const mockLinhas: Linha[] = [
    {
      _id: "1",
      id: "1",
      clienteId: 1,
      id_migracao: 1,
      numero: "100",
      descr: "Centro - Terminal",
      trajetos: [
        {
          _id: "1-1",
          id: "1-1",
          id_migracao: 1,
          externalId: "ext-1-1",
          nome: "Ida",
          colorIdx: 1,
          qtdTransmisoesInicial: 0,
          qtdTransmisoesFinal: 0,
          percentConclusao: 100,
          toleranciaArrasto: 0,
          kmTrajeto: 12.5,
          tempoMedioViagem: 45,
          sentidoTipo: "ida",
          headwayCopiloto: 15,
          orientacao: "norte",
          consorcioSinoticoUnificado: [],
          garagem: [],
          despachoSemCor: false,
          ativo: true,
          sentido: "Centro → Terminal",
          codigosIntegracao: [],
          raioTrajeto: 100
        },
        {
          _id: "1-2",
          id: "1-2",
          id_migracao: 2,
          externalId: "ext-1-2",
          nome: "Volta",
          colorIdx: 2,
          qtdTransmisoesInicial: 0,
          qtdTransmisoesFinal: 0,
          percentConclusao: 100,
          toleranciaArrasto: 0,
          kmTrajeto: 12.5,
          tempoMedioViagem: 45,
          sentidoTipo: "volta",
          headwayCopiloto: 15,
          orientacao: "sul",
          consorcioSinoticoUnificado: [],
          garagem: [],
          despachoSemCor: false,
          ativo: true,
          sentido: "Terminal → Centro",
          codigosIntegracao: [],
          raioTrajeto: 100
        }
      ]
    },
    {
      _id: "2",
      id: "2",
      clienteId: 1,
      id_migracao: 2,
      numero: "200",
      descr: "Shopping - Aeroporto",
      trajetos: [
        {
          _id: "2-1",
          id: "2-1",
          id_migracao: 3,
          externalId: "ext-2-1",
          nome: "Ida",
          colorIdx: 3,
          qtdTransmisoesInicial: 0,
          qtdTransmisoesFinal: 0,
          percentConclusao: 100,
          toleranciaArrasto: 0,
          kmTrajeto: 18.3,
          tempoMedioViagem: 60,
          sentidoTipo: "ida",
          headwayCopiloto: 20,
          orientacao: "leste",
          consorcioSinoticoUnificado: [],
          garagem: [],
          despachoSemCor: false,
          ativo: true,
          sentido: "Shopping → Aeroporto",
          codigosIntegracao: [],
          raioTrajeto: 150
        },
        {
          _id: "2-2",
          id: "2-2",
          id_migracao: 4,
          externalId: "ext-2-2",
          nome: "Volta",
          colorIdx: 4,
          qtdTransmisoesInicial: 0,
          qtdTransmisoesFinal: 0,
          percentConclusao: 100,
          toleranciaArrasto: 0,
          kmTrajeto: 18.3,
          tempoMedioViagem: 60,
          sentidoTipo: "volta",
          headwayCopiloto: 20,
          orientacao: "oeste",
          consorcioSinoticoUnificado: [],
          garagem: [],
          despachoSemCor: false,
          ativo: true,
          sentido: "Aeroporto → Shopping",
          codigosIntegracao: [],
          raioTrajeto: 150
        }
      ]
    },
    {
      _id: "3",
      id: "3",
      clienteId: 1,
      id_migracao: 3,
      numero: "300",
      descr: "Universidade - Praia",
      trajetos: [
        {
          _id: "3-1",
          id: "3-1",
          id_migracao: 5,
          externalId: "ext-3-1",
          nome: "Circular",
          colorIdx: 5,
          qtdTransmisoesInicial: 0,
          qtdTransmisoesFinal: 0,
          percentConclusao: 100,
          toleranciaArrasto: 0,
          kmTrajeto: 25.7,
          tempoMedioViagem: 90,
          sentidoTipo: "circular",
          headwayCopiloto: 25,
          orientacao: "circular",
          consorcioSinoticoUnificado: [],
          garagem: [],
          despachoSemCor: false,
          ativo: true,
          sentido: "Circular",
          codigosIntegracao: [],
          raioTrajeto: 200
        }
      ]
    }
  ];

  const handleLinhaChange = (linha: Linha | null) => {
    setSelectedLinhaId(linha?._id || "");
    console.log("Linha selecionada:", linha);
  };

  const handleTrajetoChange = (trajetos: Trajeto[]) => {
    setSelectedTrajetoIds(trajetos.map(t => t._id));
    console.log("Trajetos selecionados:", trajetos);
  };

  return (
    <Card className="gradient-card border-card-border shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {t('component.linhatrajeto.title')}
          <Badge>{t('common.advanced')}</Badge>
        </CardTitle>
        <CardDescription>
          {t('component.linhatrajeto.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3">{t('demo.linhatrajeto.basic')}</h3>
          <LinhaTrajetoSelector
            linhas={mockLinhas}
            selectedLinhaId={selectedLinhaId}
            selectedTrajetoIds={selectedTrajetoIds}
            onLinhaChange={handleLinhaChange}
            onTrajetoChange={handleTrajetoChange}
            linhaLabel={t('component.linhatrajeto.linha')}
            trajetoLabel={t('component.linhatrajeto.trajeto')}
            linhaPlaceholder={t('component.linhatrajeto.selectLinha')}
            trajetoPlaceholder={t('component.linhatrajeto.selectTrajeto')}
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">{t('demo.linhatrajeto.single')}</h3>
          <LinhaTrajetoSelector
            linhas={mockLinhas}
            multiSelectTrajeto={false}
            linhaLabel={t('component.linhatrajeto.linha')}
            trajetoLabel={t('component.linhatrajeto.trajeto')}
            linhaPlaceholder={t('component.linhatrajeto.selectLinha')}
            trajetoPlaceholder={t('demo.linhatrajeto.selectSingleTrajeto')}
          />
        </div>

        {selectedLinhaId && (
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <p className="text-sm font-medium">
              {t('demo.linhatrajeto.selected')}: {mockLinhas.find(l => l._id === selectedLinhaId)?.descr}
            </p>
            {selectedTrajetoIds.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {t('demo.linhatrajeto.trajetos')}: {selectedTrajetoIds.length}
              </p>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-sm font-semibold mb-2 text-blue-900 dark:text-blue-100">
            💡 {t('common.usage')} com i18n
          </h3>
          <p className="text-xs text-blue-800 dark:text-blue-200 mb-3">
            Use o hook <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded">useLanguage()</code> para internacionalização:
          </p>
          <div className="bg-white dark:bg-gray-900 p-3 rounded border border-blue-200 dark:border-blue-800">
            <pre className="text-xs overflow-x-auto">
              <code>{`const { t } = useLanguage();

<LinhaTrajetoSelector
  linhaLabel={t('component.linhatrajeto.linha')}
  trajetoLabel={t('component.linhatrajeto.trajeto')}
  linhaPlaceholder={t('component.linhatrajeto.selectLinha')}
  trajetoPlaceholder={t('component.linhatrajeto.selectTrajeto')}
/>`}</code>
            </pre>
          </div>
          <div className="mt-3 text-xs text-blue-700 dark:text-blue-300">
            <p className="font-medium mb-1">Chaves disponíveis:</p>
            <ul className="list-disc list-inside space-y-0.5 ml-2">
              <li><code>component.linhatrajeto.linha</code></li>
              <li><code>component.linhatrajeto.trajeto</code></li>
              <li><code>component.linhatrajeto.selectLinha</code></li>
              <li><code>component.linhatrajeto.selectTrajeto</code></li>
              <li><code>component.linhatrajeto.loading</code></li>
              <li><code>component.linhatrajeto.noData</code></li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

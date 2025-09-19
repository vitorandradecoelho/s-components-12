import React, { useState, useEffect } from "react";
import { ComboBox, type ComboOption } from "./ComboBox";

interface Trajeto {
  _id: string;
  id_migracao: number;
  externalId: string;
  nome: string;
  colorIdx: number;
  qtdTransmisoesInicial: number;
  qtdTransmisoesFinal: number;
  percentConclusao: number;
  toleranciaArrasto: number;
  kmTrajeto: number;
  tempoMedioViagem: number;
  sentidoTipo: string;
  headwayCopiloto: number;
  orientacao: string;
  consorcioSinoticoUnificado: any[];
  garagem: any[];
  despachoSemCor: boolean;
  ativo: boolean;
  sentido: string;
  codigosIntegracao: string[];
  raioTrajeto: number;
  id: string;
}

interface Linha {
  _id: string;
  clienteId: number;
  id_migracao: number;
  descr: string;
  numero: string;
  trajetos: Trajeto[];
  id: string;
}

interface LinhaTrajetoSelectorProps {
  linhas?: Linha[];
  clienteId?: string;
  apiBaseUrl?: string;
  selectedLinhaId?: string;
  selectedTrajetoIds?: string[];
  onLinhaChange?: (linha: Linha | null) => void;
  onTrajetoChange?: (trajetos: Trajeto[]) => void;
  linhaPlaceholder?: string;
  trajetoPlaceholder?: string;
  linhaLabel?: string;
  trajetoLabel?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  multiSelectTrajeto?: boolean;
  keepTrajetosOnLinhaChange?: boolean;
}

const LinhaTrajetoSelector = React.forwardRef<HTMLDivElement, LinhaTrajetoSelectorProps>(
  ({
    linhas: propLinhas,
    clienteId,
    apiBaseUrl = "",
    selectedLinhaId,
    selectedTrajetoIds = [],
    onLinhaChange,
    onTrajetoChange,
    linhaPlaceholder = "Selecione uma linha",
    trajetoPlaceholder = "Selecione trajetos",
    linhaLabel = "Linha",
    trajetoLabel = "Trajeto",
    disabled = false,
    size = "md",
    className,
    multiSelectTrajeto = true,
    keepTrajetosOnLinhaChange = false,
    ...props
  }, ref) => {
    const [selectedLinha, setSelectedLinha] = useState<Linha | null>(null);
    const [trajetoOptions, setTrajetoOptions] = useState<ComboOption[]>([]);
    const [apiLinhas, setApiLinhas] = useState<Linha[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Determina qual fonte de dados usar (props ou API)
    const linhas = propLinhas || apiLinhas;

    // Busca dados da API quando clienteId e apiBaseUrl estão presentes
    useEffect(() => {
      const fetchLinhas = async () => {
        if (!clienteId || !apiBaseUrl || propLinhas) return;
        
        setLoading(true);
        setError(null);
        
        try {
          const url = `${apiBaseUrl}/service-api/linhasTrajetos/${clienteId}`;
          const response = await fetch(url);
          
          if (!response.ok) {
            throw new Error(`Erro ao buscar linhas: ${response.status}`);
          }
          
          const data = await response.json();
          setApiLinhas(Array.isArray(data) ? data : []);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Erro desconhecido');
          setApiLinhas([]);
        } finally {
          setLoading(false);
        }
      };
      
      fetchLinhas();
    }, [clienteId, apiBaseUrl, propLinhas]);

    // Converte linhas para options do ComboBox
    const linhaOptions: ComboOption[] = linhas.map(linha => ({
      label: linha.descr,
      value: linha._id,
      description: `Número: ${linha.numero}`
    }));

    // Atualiza linha selecionada quando selectedLinhaId muda
    useEffect(() => {
      if (selectedLinhaId) {
        const linha = linhas.find(l => l._id === selectedLinhaId);
        setSelectedLinha(linha || null);
      } else {
        setSelectedLinha(null);
      }
    }, [selectedLinhaId, linhas]);

    // Atualiza trajetos quando linha selecionada muda
    useEffect(() => {
      if (selectedLinha) {
        const options: ComboOption[] = selectedLinha.trajetos.map(trajeto => ({
          label: trajeto.nome,
          value: trajeto._id,
          description: `${trajeto.sentido} - ${trajeto.kmTrajeto}km`
        }));
        setTrajetoOptions(options);
      } else {
        setTrajetoOptions([]);
      }
    }, [selectedLinha]);

    const handleLinhaChange = (linhaId: string) => {
      const linha = linhas.find(l => l._id === linhaId) || null;
      setSelectedLinha(linha);
      onLinhaChange?.(linha);
      
      // Limpa trajetos selecionados quando linha muda (apenas se keepTrajetosOnLinhaChange for false)
      if (!keepTrajetosOnLinhaChange) {
        onTrajetoChange?.([]);
      }
    };

    const handleTrajetoChange = (trajetoIds: string[]) => {
      if (selectedLinha) {
        const trajetos = trajetoIds
          .map(id => selectedLinha.trajetos.find(t => t._id === id))
          .filter(Boolean) as Trajeto[];
        onTrajetoChange?.(trajetos);
      }
    };

    const handleLinhaClear = () => {
      setSelectedLinha(null);
      onLinhaChange?.(null);
      onTrajetoChange?.([]);
    };

    const handleTrajetoClear = () => {
      onTrajetoChange?.([]);
    };

    return (
      <div ref={ref} className={className} {...props}>
        <div className="space-y-4">
          <ComboBox
            options={linhaOptions}
            value={selectedLinhaId ? [selectedLinhaId] : []}
            onValueChange={(values) => {
              const linhaId = values[0];
              if (linhaId) {
                handleLinhaChange(linhaId);
              } else {
                handleLinhaClear();
              }
            }}
            placeholder={linhaPlaceholder}
            label={linhaLabel}
            disabled={disabled}
            size={size}
            clearable
            searchable
          />

          <ComboBox
            options={trajetoOptions}
            value={selectedTrajetoIds}
            onValueChange={(values) => {
              if (values.length > 0) {
                handleTrajetoChange(values);
              } else {
                handleTrajetoClear();
              }
            }}
            placeholder={trajetoPlaceholder}
            label={trajetoLabel}
            disabled={disabled || !selectedLinha}
            size={size}
            multiple={multiSelectTrajeto}
            clearable
            searchable
          />
        </div>
      </div>
    );
  }
);

LinhaTrajetoSelector.displayName = "LinhaTrajetoSelector";

export { LinhaTrajetoSelector, type Linha, type Trajeto, type LinhaTrajetoSelectorProps };
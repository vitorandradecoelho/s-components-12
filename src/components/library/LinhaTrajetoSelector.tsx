import React, { useState, useEffect, useMemo } from "react";
import { ComboBox, type ComboOption } from "./ComboBox";
import { useLanguage } from "@/contexts/LanguageContext";

// Estados e componentes auxiliares
const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' };
  return (
    <div 
      className={`animate-spin rounded-full border-2 border-gray-300 border-t-primary ${sizeClasses[size]}`}
      role="status"
      aria-label="Carregando"
    />
  );
};

const ErrorMessage: React.FC<{ message: string; size?: 'sm' | 'md' | 'lg' }> = ({ 
  message, 
  size = 'md' 
}) => {
  const sizeClasses = { sm: 'text-sm', md: 'text-base', lg: 'text-lg' };
  return (
    <div 
      className={`text-destructive ${sizeClasses[size]}`}
      role="alert"
      aria-live="polite"
    >
      {message}
    </div>
  );
};

// Hook para gerenciar dados da API
const useLinhaTrajetoData = (clienteId?: string, apiBaseUrl = "", propLinhas?: Linha[]) => {
  const [apiLinhas, setApiLinhas] = useState<Linha[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return { 
    linhas: propLinhas || apiLinhas, 
    loading, 
    error 
  };
};

// Interfaces
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
    linhaPlaceholder,
    trajetoPlaceholder,
    linhaLabel,
    trajetoLabel,
    disabled = false,
    size = "md",
    className,
    multiSelectTrajeto = true,
    keepTrajetosOnLinhaChange = false,
    ...props
  }, ref) => {
    const { t } = useLanguage();
    const [selectedLinha, setSelectedLinha] = useState<Linha | null>(null);

    // Hook personalizado para gerenciar dados
    const { linhas, loading, error } = useLinhaTrajetoData(clienteId, apiBaseUrl, propLinhas);

    // Usa traduções como valores padrão se não fornecido nas props
    const defaultLinhaPlaceholder = linhaPlaceholder ?? t('linhatrajeto.linha.placeholder');
    const defaultTrajetoPlaceholder = trajetoPlaceholder ?? t('linhatrajeto.trajeto.placeholder');
    const defaultLinhaLabel = linhaLabel ?? t('linhatrajeto.linha.label');
    const defaultTrajetoLabel = trajetoLabel ?? t('linhatrajeto.trajeto.label');

    // Memoização das opções de linha para otimização
    const linhaOptions = useMemo((): ComboOption[] => 
      linhas.map(linha => ({
        label: linha.descr,
        value: linha._id,
        description: `Número: ${linha.numero}`
      })), [linhas]
    );

    // Memoização das opções de trajeto
    const trajetoOptions = useMemo((): ComboOption[] => {
      if (!selectedLinha) return [];
      
      return selectedLinha.trajetos.map(trajeto => ({
        label: trajeto.nome,
        value: trajeto._id,
        description: `${trajeto.sentido} - ${trajeto.kmTrajeto}km`
      }));
    }, [selectedLinha]);

    // Atualiza linha selecionada quando selectedLinhaId muda
    useEffect(() => {
      if (selectedLinhaId) {
        const linha = linhas.find(l => l._id === selectedLinhaId);
        setSelectedLinha(linha || null);
      } else {
        setSelectedLinha(null);
      }
    }, [selectedLinhaId, linhas]);

    const handleLinhaChange = (linhaId: string) => {
      const linha = linhas.find(l => l._id === linhaId) || null;
      setSelectedLinha(linha);
      onLinhaChange?.(linha);
      
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

    // Estado de loading
    if (loading) {
      return (
        <div ref={ref} className={className} {...props}>
          <div className="flex items-center justify-center p-4" role="status">
            <LoadingSpinner size={size} />
            <span className="ml-2 text-muted-foreground">Carregando linhas...</span>
          </div>
        </div>
      );
    }

    // Estado de erro
    if (error) {
      return (
        <div ref={ref} className={className} {...props}>
          <ErrorMessage 
            message={error} 
            size={size}
          />
        </div>
      );
    }

    // Estado vazio
    if (linhas.length === 0) {
      return (
        <div ref={ref} className={className} {...props}>
          <div className="text-center p-4 text-muted-foreground">
            Nenhuma linha disponível
          </div>
        </div>
      );
    }

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
            placeholder={defaultLinhaPlaceholder}
            label={defaultLinhaLabel}
            disabled={disabled}
            size={size}
            clearable
            searchable
            aria-label="Seleção de linha de transporte"
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
            placeholder={defaultTrajetoPlaceholder}
            label={defaultTrajetoLabel}
            disabled={disabled || !selectedLinha}
            size={size}
            multiple={multiSelectTrajeto}
            clearable
            searchable
            aria-label="Seleção de trajetos"
          />
        </div>
      </div>
    );
  }
);

LinhaTrajetoSelector.displayName = "LinhaTrajetoSelector";

export { LinhaTrajetoSelector, type Linha, type Trajeto, type LinhaTrajetoSelectorProps };
import React, { useState, useEffect, useMemo } from "react";
import { ComboBox, type ComboOption } from "@vitorandradecoelho/sd-components";
import type { 
  Linha, 
  Trajeto
} from "@vitorandradecoelho/sd-components";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LinhaTrajetoSelectorProps {
  linhas?: Linha[];
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
}

const LinhaTrajetoSelector = React.forwardRef<HTMLDivElement, LinhaTrajetoSelectorProps>(
  ({
    linhas = [],
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
    ...props
  }, ref) => {
    const [selectedLinha, setSelectedLinha] = useState<Linha | null>(null);


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
      onTrajetoChange?.([]);
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


    // Estado vazio (sem dados)
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
      <div ref={ref} className={cn("linhatrajeto-container", className)} {...props}>
        <div className="space-y-4">
          <div className="linhatrajeto-linha-container">
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
              aria-label="Seleção de linha de transporte"
              className="linhatrajeto-linha-select"
            />
          </div>

          <div className="linhatrajeto-trajeto-container">
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
              aria-label="Seleção de trajetos"
              className="linhatrajeto-trajeto-select"
            />
          </div>
        </div>
      </div>
    );
  }
);

LinhaTrajetoSelector.displayName = "LinhaTrajetoSelector";

export { LinhaTrajetoSelector };

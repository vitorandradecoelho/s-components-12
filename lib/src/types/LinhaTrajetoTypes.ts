export interface Trajeto {
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

export interface Linha {
  _id: string;
  clienteId: number;
  id_migracao: number;
  descr: string;
  numero: string;
  trajetos: Trajeto[];
  id: string;
}

export interface LinhaTrajetoSelectorProps {
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
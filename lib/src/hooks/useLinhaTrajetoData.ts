import { useState, useEffect } from 'react';
import type { Linha } from '../types/LinhaTrajetoTypes';

interface UseLinhaTrajetoDataProps {
  clienteId?: string;
  apiBaseUrl?: string;
  propLinhas?: Linha[];
}

interface UseLinhaTrajetoDataReturn {
  linhas: Linha[];
  loading: boolean;
  error: string | null;
}

export const useLinhaTrajetoData = ({
  clienteId,
  apiBaseUrl = "",
  propLinhas
}: UseLinhaTrajetoDataProps): UseLinhaTrajetoDataReturn => {
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

  return { linhas, loading, error };
};
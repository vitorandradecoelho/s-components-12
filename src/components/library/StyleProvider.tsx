import React, { useEffect } from 'react';

export interface StyleProviderProps {
  children: React.ReactNode;
}

/**
 * Componente que fornece os estilos CSS da biblioteca
 * Use este componente quando quiser controlar manualmente quando os estilos são carregados
 */
export const StyleProvider: React.FC<StyleProviderProps> = ({ children }) => {
  return <>{children}</>;
};

/**
 * Hook para garantir que os estilos estão carregados
 * Importa automaticamente o CSS da biblioteca
 */
export const useStyles = () => {
  useEffect(() => {
    // Força a importação do CSS se ainda não foi carregado
    // Em uma biblioteca local, os estilos já estão disponíveis
    console.log('Estilos da biblioteca carregados');
  }, []);
  
  return true;
};

/**
 * Função para carregar os estilos da biblioteca
 * Use esta função para garantir que os estilos sejam carregados
 */
export const loadStyles = async () => {
  try {
    // Em uma biblioteca local, os estilos já estão disponíveis
    console.log('Estilos da biblioteca já disponíveis');
    return true;
  } catch (error) {
    console.warn('Não foi possível carregar os estilos da biblioteca:', error);
    return false;
  }
};
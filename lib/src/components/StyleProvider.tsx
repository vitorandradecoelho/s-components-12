import React from 'react';

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
 */
export const useStyles = () => {
  // Os estilos são carregados automaticamente pela importação do CSS
  return true;
};
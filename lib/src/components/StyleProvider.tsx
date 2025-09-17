import React, { useEffect } from 'react';
import '../styles/index.css';

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
    import('../styles/index.css').catch(() => {
      console.warn('Não foi possível carregar os estilos da biblioteca');
    });
  }, []);
  
  return true;
};

/**
 * Função para carregar os estilos da biblioteca
 * Use esta função para garantir que os estilos sejam carregados
 */
export const loadStyles = async () => {
  try {
    await import('../styles/index.css');
    return true;
  } catch (error) {
    console.warn('Não foi possível carregar os estilos da biblioteca:', error);
    return false;
  }
};
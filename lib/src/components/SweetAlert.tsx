import React, { useState, useCallback } from 'react';
import { cn } from '../lib/utils';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  HelpCircle,
  X
} from 'lucide-react';

export type SweetAlertType = 'success' | 'error' | 'warning' | 'info' | 'question';

export interface SweetAlertOptions {
  title?: string;
  text?: string;
  type?: SweetAlertType;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCloseButton?: boolean;
  allowOutsideClick?: boolean;
  showInput?: boolean;
  inputPlaceholder?: string;
  inputValue?: string;
  reverseButtons?: boolean;
  customClass?: string;
  width?: string;
  onConfirm?: (inputValue?: string) => void | Promise<void>;
  onCancel?: () => void;
  onClose?: () => void;
}

export interface SweetAlertProps extends SweetAlertOptions {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const typeIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
  question: HelpCircle,
};

const typeColors = {
  success: 'text-green-500',
  error: 'text-red-500', 
  warning: 'text-yellow-500',
  info: 'text-blue-500',
  question: 'text-purple-500',
};

const typeBgColors = {
  success: 'bg-green-50 dark:bg-green-950/20',
  error: 'bg-red-50 dark:bg-red-950/20',
  warning: 'bg-yellow-50 dark:bg-yellow-950/20', 
  info: 'bg-blue-50 dark:bg-blue-950/20',
  question: 'bg-purple-50 dark:bg-purple-950/20',
};

export const SweetAlert: React.FC<SweetAlertProps> = ({
  isOpen,
  onOpenChange,
  title = 'Are you sure?',
  text,
  type = 'question',
  showCancelButton = true,
  confirmButtonText = 'OK',
  cancelButtonText = 'Cancel',
  showCloseButton = true,
  allowOutsideClick = true,
  showInput = false,
  inputPlaceholder = '',
  inputValue = '',
  reverseButtons = false,
  customClass = '',
  width = 'max-w-md',
  onConfirm,
  onCancel,
  onClose,
}) => {
  const [inputVal, setInputVal] = useState(inputValue);
  const [isLoading, setIsLoading] = useState(false);

  const Icon = typeIcons[type];

  const handleConfirm = useCallback(async () => {
    if (onConfirm) {
      try {
        setIsLoading(true);
        await onConfirm(showInput ? inputVal : undefined);
        onOpenChange(false);
      } catch (error) {
        console.error('SweetAlert confirm error:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      onOpenChange(false);
    }
  }, [onConfirm, inputVal, showInput, onOpenChange]);

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
    onOpenChange(false);
  }, [onCancel, onOpenChange]);

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
    onOpenChange(false);
  }, [onClose, onOpenChange]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (allowOutsideClick && e.target === e.currentTarget) {
      handleClose();
    }
  }, [allowOutsideClick, handleClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />
      
      <div className={cn(
        'relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl w-full',
        width,
        typeBgColors[type],
        customClass
      )}>
        {showCloseButton && (
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        )}

        <div className="p-6 text-center space-y-4">
          <div className="flex justify-center">
            <div className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center',
              'bg-white dark:bg-gray-700 shadow-md'
            )}>
              <Icon className={cn('w-8 h-8', typeColors[type])} />
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          
          {text && (
            <p className="text-gray-600 dark:text-gray-400">
              {text}
            </p>
          )}

          {showInput && (
            <div className="pt-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={inputPlaceholder}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-center bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          )}
        </div>

        <div className={cn(
          'flex gap-3 px-6 pb-6',
          reverseButtons ? 'flex-row-reverse' : 'flex-row',
          showCancelButton ? 'justify-center' : 'justify-center'
        )}>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className={cn(
              'min-w-[100px] px-4 py-2 rounded-lg font-medium text-white transition-colors disabled:opacity-50',
              type === 'error' && 'bg-red-500 hover:bg-red-600',
              type === 'success' && 'bg-green-500 hover:bg-green-600',
              type === 'warning' && 'bg-yellow-500 hover:bg-yellow-600',
              type === 'info' && 'bg-blue-500 hover:bg-blue-600',
              type === 'question' && 'bg-purple-500 hover:bg-purple-600'
            )}
          >
            {isLoading ? 'Loading...' : confirmButtonText}
          </button>
          
          {showCancelButton && (
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="min-w-[100px] px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {cancelButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Hook para facilitar o uso
export const useSweetAlert = () => {
  const [alert, setAlert] = useState<{
    isOpen: boolean;
    options: SweetAlertOptions;
  }>({
    isOpen: false,
    options: {}
  });

  const fire = useCallback((options: SweetAlertOptions) => {
    setAlert({
      isOpen: true,
      options
    });
  }, []);

  const close = useCallback(() => {
    setAlert(prev => ({ ...prev, isOpen: false }));
  }, []);

  const SweetAlertComponent = useCallback(() => (
    <SweetAlert
      isOpen={alert.isOpen}
      onOpenChange={(open) => setAlert(prev => ({ ...prev, isOpen: open }))}
      {...alert.options}
    />
  ), [alert]);

  return {
    fire,
    close,
    SweetAlert: SweetAlertComponent
  };
};

export default SweetAlert;
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

export interface ToastOptions {
  /** Toast variant */
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  /** Toast title */
  title?: string;
  /** Toast description */
  description?: string;
  /** Duration in milliseconds (0 = never auto-close) */
  duration?: number;
}

const variantConfig = {
  default: {
    icon: Info,
    className: "",
  },
  destructive: {
    icon: XCircle,
    className: "destructive",
  },
  success: {
    icon: CheckCircle,
    className: "border-green-500/50 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-yellow-500/50 bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",
  },
};

// Simple toast implementation for library
let toastContainer: HTMLElement | null = null;

const createToastContainer = () => {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'fixed top-4 right-4 z-[100] space-y-2';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
};

const createToastElement = (options: ToastOptions) => {
  const { variant = 'default', title, description, duration = 5000 } = options;
  const config = variantConfig[variant];
  const IconComponent = config.icon;

  const toast = document.createElement('div');
  toast.className = `
    flex items-start gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
    rounded-lg shadow-lg min-w-[300px] max-w-[400px] animate-in slide-in-from-right-full
    ${config.className}
  `;

  toast.innerHTML = `
    <div class="flex-shrink-0 mt-0.5">
      <svg class="w-5 h-5 ${variant === 'success' ? 'text-green-500' : variant === 'destructive' ? 'text-red-500' : variant === 'warning' ? 'text-yellow-500' : 'text-blue-500'}" fill="currentColor" viewBox="0 0 20 20">
        ${variant === 'success' ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>' :
          variant === 'destructive' ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>' :
          variant === 'warning' ? '<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>' :
          '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>'}
      </svg>
    </div>
    <div class="flex-1">
      ${title ? `<div class="font-medium text-sm text-gray-900 dark:text-gray-100">${title}</div>` : ''}
      ${description ? `<div class="text-sm text-gray-700 dark:text-gray-300 ${title ? 'mt-1' : ''}">${description}</div>` : ''}
    </div>
    <button class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
      </svg>
    </button>
  `;

  // Add close button functionality
  const closeButton = toast.querySelector('button');
  closeButton?.addEventListener('click', () => {
    toast.remove();
  });

  return toast;
};

export class Toast {
  /** Show a default toast */
  static show(options: ToastOptions) {
    const container = createToastContainer();
    const toast = createToastElement(options);
    
    container.appendChild(toast);

    // Auto remove after duration
    if (options.duration && options.duration > 0) {
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, options.duration);
    }

    return toast;
  }

  /** Show a success toast */
  static success(message: string, title?: string) {
    return this.show({
      variant: 'success',
      title: title || 'Success',
      description: message,
    });
  }

  /** Show an error toast */
  static error(message: string, title?: string) {
    return this.show({
      variant: 'destructive',
      title: title || 'Error',
      description: message,
    });
  }

  /** Show a warning toast */
  static warning(message: string, title?: string) {
    return this.show({
      variant: 'warning',
      title: title || 'Warning',
      description: message,
    });
  }

  /** Show an info toast */
  static info(message: string, title?: string) {
    return this.show({
      variant: 'default',
      title: title || 'Info',
      description: message,
    });
  }
}

export const useToastHelper = () => {
  return {
    showToast: Toast.show,
    success: Toast.success,
    error: Toast.error,
    warning: Toast.warning,
    info: Toast.info,
  };
};
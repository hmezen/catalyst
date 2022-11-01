import Toastify, { Options } from 'toastify-js';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';

interface ToastRef {
  toast?: {
    showToast: () => void;
    hideToast: () => void;
  };
}

export interface ToastOptions {
  mode: 'dark' | 'light';
  icon: string;
  position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  autoClose: boolean;
  duration: number;
  action: string;
  escapeMarkup: boolean;
  onAction: (toast: ToastRef) => void;
  onClick: (toast: ToastRef) => void;
  onDismiss: (toast: ToastRef) => void;
}

export class CatNotificationService {
  private static instance: CatNotificationService;
  private static duration = 3000;

  private constructor() {
    // hide constructor
  }

  static getInstance(): CatNotificationService {
    if (!CatNotificationService.instance) {
      CatNotificationService.instance = new CatNotificationService();
    }
    return CatNotificationService.instance;
  }

  show(content: string | Node, options?: Partial<ToastOptions>): () => void {
    const ref: ToastRef = {};
    const toastContent = this.getNode(content, ref, options);
    const toastOptions = this.getOptions(toastContent, ref, options);
    const toast = Toastify(toastOptions);
    ref.toast = toast;
    toast.showToast();
    return () => toast.hideToast();
  }

  private getNode(content: string | Node, ref: ToastRef, options?: Partial<ToastOptions>): HTMLElement {
    const template = document.createElement('template');
    template.innerHTML = `<div class="cat-toastify-wrapper">
      ${options?.icon ? `<cat-icon class="cat-toastify-icon" icon="${options.icon}" size="l"></cat-icon>` : ''}
      <div class="cat-toastify-content">
        <div class="cat-toastify-inner">${content}</div>
        ${
          options?.action
            ? `<cat-button class="cat-toastify-action cat-button-pull" size="s" variant="text" color="primary">${options.action}</cat-button>`
            : ''
        }
      </div>
      ${
        options?.autoClose === false
          ? `<cat-button class="cat-toastify-close cat-button-pull" size="s" icon="cross-outlined" variant="text" icon-only="true" class="close" a11y-label="${i18n.t(
              'notification.dismiss'
            )}"></cat-button>`
          : ''
      }
    </div>`;

    const node = template.content.firstElementChild as HTMLElement;
    node.querySelector('.cat-toastify-close')?.addEventListener('click', () => ref.toast?.hideToast());
    node.querySelector('.cat-toastify-action')?.addEventListener('click', () => options?.onAction?.(ref));
    const inner = node.querySelector<HTMLDivElement>('.cat-toastify-inner');
    if (inner) {
      if (typeof content !== 'string') {
        inner.replaceChildren(content);
      } else if (options?.escapeMarkup === false) {
        inner.innerHTML = content;
      } else {
        inner.innerText = content;
      }
    }

    return node;
  }

  private getOptions(node: Node, ref: ToastRef, options?: Partial<ToastOptions>): Options {
    const [gravity, position] = (options?.position?.split('-') ?? ['bottom', 'left']) as [
      Options['gravity'],
      Options['position']
    ];
    const duration = options?.duration ?? (options?.autoClose === false ? -1 : CatNotificationService.duration);
    return {
      gravity,
      position,
      node,
      duration,
      close: false,
      className: options?.mode === 'light' ? 'cat-toastify' : 'cat-toastify cat-toastify-dark',
      stopOnFocus: true,
      onClick: () => options?.onClick?.(ref),
      callback: () => options?.onDismiss?.(ref),
      offset: {
        x: '1rem',
        y: '1rem'
      }
    };
  }
}

export const catNotificationService = CatNotificationService.getInstance();
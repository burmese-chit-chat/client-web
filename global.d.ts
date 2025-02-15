import 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    'data-ad-client'?: string;
    'data-ad-slot'?: string;
    'data-ad-format'?: string;
    'data-full-width-responsive'?: string;
    'class'? : string;
  }
}
import { InjectionToken } from '@angular/core';

export const RECAPTCHA_HEADER_NAME = new InjectionToken<string>('reCAPTCHA Header Name', {
  providedIn: 'root',
  factory: () => 'X-Recaptcha-Token', // Default value
});


export const RECAPTCHA_V3_KEY = new InjectionToken<string>('RECAPTCHA_V3_KEY', {
  providedIn: 'root',  // You can provide it in the root or any other module depending on your need
  factory: () => {
    return 'your-site-key'; // Default value or fallback (can be overridden later)
  },
});

import { InjectionToken } from '@angular/core';

export const RECAPTCHA_HEADER_NAME = new InjectionToken<string>('reCAPTCHA Header Name', {
  providedIn: 'root',
  factory: () => 'X-Recaptcha-Token', // Default value
});

import {Inject, InjectionToken, NgModule} from '@angular/core';
import {RecaptchaV3Module, ReCaptchaV3Service} from 'ng-recaptcha';
import {HttpClientWithRecaptcha} from "./http-client-with-recaptcha.service";

export const RECAPTCHA_V3_SITE_KEY = new InjectionToken<string>('RECAPTCHA_V3_SITE_KEY');

@NgModule({
  imports: [RecaptchaV3Module],
  providers:[
    HttpClientWithRecaptcha,
    ReCaptchaV3Service,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useFactory: () => {
        const siteKey = ''; // In a real scenario, you could fetch from an environment variable
        if (!siteKey) {
          throw new Error('RECAPTCHA site key is not configured!');
        }
        return siteKey;
      }
    },
  ],
})
export class HttpClientWithRecaptchaModule {
  constructor(@Inject(RECAPTCHA_V3_SITE_KEY) private siteKey: string) {
    if (!this.siteKey) {
      console.error('No reCAPTCHA site key provided. Please configure the RECAPTCHA_V3_SITE_KEY.');
    }
  }
}

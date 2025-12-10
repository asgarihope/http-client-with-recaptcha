import {Inject, NgModule} from '@angular/core';
import {HttpClientWithRecaptchaService} from "./http-client-with-recaptcha.service";
import {RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service} from "ng-recaptcha";
import {RECAPTCHA_HEADER_NAME, RECAPTCHA_V3_KEY} from "./app-config.tokens";

@NgModule({
  imports: [RecaptchaV3Module],
  exports: [],
  providers: [
    HttpClientWithRecaptchaService,
    ReCaptchaV3Service,
    {
      provide: RECAPTCHA_V3_SITE_KEY,  // This injects the site key into ng-recaptcha
      useExisting: RECAPTCHA_V3_KEY,  // Pass the value of your custom token to ng-recaptcha
    }
  ]
})
export class HttpClientWithRecaptchaModule {

  constructor(@Inject(RECAPTCHA_V3_KEY) private siteKey: string) {
    if (!this.siteKey) {
      console.error('No reCAPTCHA site key provided. Please configure the RECAPTCHA_V3_KEY.');
    }
  }
}

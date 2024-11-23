import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ReCaptchaV3Service} from 'ng-recaptcha';
import {Observable} from "rxjs";
import {RECAPTCHA_HEADER_NAME} from "./app-config.tokens";

@Injectable({
  providedIn: 'root'
})
export class HttpClientWithRecaptcha {
  private recaptchaHeaders: HttpHeaders | null = null;

  constructor(
    private http: HttpClient,
    private recaptchaV3Service: ReCaptchaV3Service,
    @Inject(RECAPTCHA_HEADER_NAME) private headerName: string // Inject the header name

  ) {
  }

  // Chainable `withRecaptcha` method
  withRecaptcha(action: string): HttpClientWithRecaptcha {
    this.recaptchaV3Service.execute(action).subscribe((recaptchaToken: string) => {
      this.recaptchaHeaders = new HttpHeaders({
        [this.headerName]: recaptchaToken,  // Use injected header name
      });
    });
    return this;
  }

  // GET request
  get<T>(url: string, options = {}): Observable<T> {
    const headers = this.recaptchaHeaders || new HttpHeaders();
    return this.http.get<T>(url, {headers, ...options});
  }

  // POST request
  post<T>(url: string, body: any, options = {}): Observable<T> {
    const headers = this.recaptchaHeaders || new HttpHeaders();
    return this.http.post<T>(url, body, {headers, ...options});
  }
}

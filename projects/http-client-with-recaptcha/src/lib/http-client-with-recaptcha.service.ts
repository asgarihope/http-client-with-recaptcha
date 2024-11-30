import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { RECAPTCHA_HEADER_NAME } from './app-config.tokens';

@Injectable({
  providedIn: 'root', // Provides the service at the root level
})
export class HttpClientWithRecaptchaService {
  constructor(
    private http: HttpClient,
    private recaptchaV3Service: ReCaptchaV3Service,
    @Inject(RECAPTCHA_HEADER_NAME) private readonly headerName: string
  ) {}

  /**
   * Prepares headers for HTTP requests, optionally including a reCAPTCHA token.
   * @param action - Optional reCAPTCHA action.
   * @returns An Observable with the prepared HttpHeaders.
   */
  private prepareHeaders(action?: string): Observable<HttpHeaders> {
    if (!action) {
      return of(new HttpHeaders());
    }

    return this.recaptchaV3Service.execute(action).pipe(
      map((recaptchaToken) =>
        new HttpHeaders({
          [this.headerName]: recaptchaToken,
        })
      )
    );
  }

  /**
   * Performs a GET request with optional reCAPTCHA verification.
   * @param url - The endpoint URL.
   * @param action - Optional reCAPTCHA action.
   * @param options - Additional request options.
   * @returns An Observable of the response.
   */
  get<T>(url: string, action?: string, options = {}): Observable<T> {
    return this.prepareHeaders(action).pipe(
      switchMap((headers) =>
        this.http.get<T>(url, { ...options, headers })
      )
    );
  }

  /**
   * Performs a POST request with optional reCAPTCHA verification.
   * @param url - The endpoint URL.
   * @param action - Optional reCAPTCHA action.
   * @param body - The payload to send in the POST request.
   * @param options - Additional request options.
   * @returns An Observable of the response.
   */
  post<T>(url: string,  body: any,action?: string, options = {}): Observable<T> {
    return this.prepareHeaders(action).pipe(
      switchMap((headers) =>
        this.http.post<T>(url, body, { ...options, headers })
      )
    );
  }
}

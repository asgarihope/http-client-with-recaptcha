
# `http-client-with-recaptcha` - Angular Service for HTTP Requests with reCAPTCHA v3 Integration

## 🚀 Introduction

Welcome to `http-client-with-recaptcha`, an Angular service designed to seamlessly integrate Google's reCAPTCHA v3 into your HTTP requests. This service allows you to attach reCAPTCHA tokens to headers in your HTTP requests, ensuring secure interactions with your API endpoints.

With this package, you can easily incorporate reCAPTCHA protection without worrying about manual token management, all while keeping your code clean and maintainable.

---

## 📦 Features

- **Easy Integration**: Add reCAPTCHA protection to HTTP requests in Angular effortlessly.
- **Customizable Header Name**: Set the reCAPTCHA token header name globally for your application.
- **Flexible HTTP Methods**: Supports `GET`, `POST`, and any other HTTP method, while automatically including reCAPTCHA tokens in headers.
- **Seamless reCAPTCHA v3 Integration**: Works directly with Google's invisible reCAPTCHA v3.
- **Configurable**: Easily customize token handling and header names via Angular's dependency injection.

---

## 🔧 Installation

### 1. Install Dependencies

Add this library (`http-client-with-recaptcha`) to your project:

```bash
npm install http-client-with-recaptcha --save
```

### 2. Import the Module

In your Angular module (`app.module.ts`), import the `HttpClientWithRecaptchaModule` and include it in the `imports` array.

```typescript
import { HttpClientWithRecaptchaModule } from 'http-client-with-recaptcha';

@NgModule({
  imports: [
    importProvidersFrom(HttpClientWithRecaptchaModule),
    {
      provide:  RECAPTCHA_V3_KEY,
      useValue: environment.reCaptchaV3Token,  // Replace with an actual site key or inject dynamically
    },

    {
      provide:  RECAPTCHA_HEADER_NAME,
      useValue: 'recaptchaaaaaa',  // Replace with an actual site key or inject dynamically
    },
    // other imports...
  ],
  // other properties...
})
export class AppModule {}
```

---

## 🧩 Usage

### Step 1: Inject the Service

Inject the `HttpClientWithRecaptcha` service into your component or service:

```typescript
import { HttpClientWithRecaptcha } from 'http-client-with-recaptcha';

@Injectable({
  providedIn: 'root',
})
export class MyService {
  constructor(private httpClientWithRecaptcha: HttpClientWithRecaptcha) {}

  fetchData() {
    return this.http.post<YOUR_INTERFACE>(
      'https://example.com/api',
      {__BODY__},
      'login' // 'login' is a reCAPTCHA v3 action
    );
  }
}
```

### Step 2: Customize the Header (Optional)

You can customize the reCAPTCHA token header globally in your `AppModule`:

```typescript
import { RECAPTCHA_HEADER_NAME } from 'http-client-with-recaptcha';

@NgModule({
  providers: [
    {
      provide: RECAPTCHA_HEADER_NAME,
      useValue: 'X-YOUR-Recaptcha-V3-Token', // Customize header name
    },
  ],
})
export class AppModule {}
```

---

## 🌍 Configuration

### Dynamic Header Name

By default, the service uses `X-Recaptcha-Token` as the header name, but you can configure it globally through Angular's dependency injection system.

```typescript
import { RECAPTCHA_HEADER_NAME } from 'http-client-with-recaptcha';

@NgModule({
  providers: [
    {
      provide: RECAPTCHA_HEADER_NAME,
      useValue: 'X-Your-Recaptcha-Token', // Set dynamic header name
    },
  ],
})
export class AppModule {}
```

---

## ⚙️ Methods

### `withRecaptcha(action: string): HttpClientWithRecaptcha`

- **Description**: Attach a reCAPTCHA token to the HTTP request header.
- **Parameters**:
  - `action`: The action string for reCAPTCHA v3 (e.g., `login`, `signup`).
- **Returns**: An instance of `HttpClientWithRecaptcha` for chaining.

### `get<T>(url: string, options: any): Observable<T>`

- **Description**: Perform a `GET` request with reCAPTCHA protection.
- **Parameters**:
  - `url`: The API endpoint to send the GET request.
  - `options`: Optional additional HTTP options.
- **Returns**: An observable of the HTTP response.

### `post<T>(url: string, body: any, options: any): Observable<T>`

- **Description**: Perform a `POST` request with reCAPTCHA protection.
- **Parameters**:
  - `url`: The API endpoint to send the POST request.
  - `body`: The body data for the POST request.
  - `options`: Optional additional HTTP options.
- **Returns**: An observable of the HTTP response.

---

## 📌 Why Use This Service?

- **Security First**: reCAPTCHA ensures that requests are coming from human users and helps prevent bot attacks.
- **Seamless Integration**: Automatically handles reCAPTCHA token inclusion for every HTTP request, so you don’t have to manage tokens manually.
- **Customizable**: Easily change header names and reCAPTCHA action types according to your needs.
- **Angular 15+ Compatible**: This package supports Angular version 15 and above, ensuring that your app stays up to date with the latest Angular features.

---

## 🎨 Contributing

We welcome contributions from the community! If you have a bug fix, feature request, or improvement, please fork the repository and submit a pull request. Here’s how:

1. Fork the repository.
2. Clone your fork and create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am '[FEATURE] Add new feature'`).
4. Push to your branch (`git push origin feature-branch`).
5. Open a pull request with a detailed explanation of your changes.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Get in Touch

For questions, support, or feedback, feel free to contact us at [asgarihope@gmail.com](mailto:asgarihope@gmail.com).

---

**Thank you for using `http-client-with-recaptcha`!** 😊

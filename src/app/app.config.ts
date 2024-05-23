import { provideAnimations } from "@angular/platform-browser/animations";
import { TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import {yandexApiInterceptor} from "./base/interceptors/yandex-api.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideRouter(routes), importProvidersFrom(TuiRootModule), provideHttpClient(withInterceptors([yandexApiInterceptor]))]
};

import {ApplicationConfig} from '@angular/core';
import {
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  provideRouter,
  withInMemoryScrolling
} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import {loadingInterceptor} from "./services/loading.interceptor";

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
    inMemoryScrollingFeature),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),//this reduces the size of the bundle
      withInterceptors([
        loadingInterceptor,
      ])
    )
  ]
};


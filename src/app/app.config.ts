import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  RouteConfigLoadStart,
  RouterLink,
  provideRouter,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { AnimationBuilder } from '@angular/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),

    importProvidersFrom(AnimationEvent),
    provideHttpClient(),
  ],
};

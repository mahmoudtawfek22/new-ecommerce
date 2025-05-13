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
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideStore } from '@ngrx/store';
import { langReducer } from './store/language/lang.reducer';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),

    importProvidersFrom(AnimationEvent),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    provideHttpClient(),
    provideStore({ lang: langReducer }),
  ],
};

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { MatNativeDateModule } from '@angular/material/core'; // Importação necessária

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({
      eventCoalescing: true, // Melhora o desempenho com eventos agrupados
    }),
    provideRouter(routes), // Configura as rotas
    provideClientHydration(), // Suporte à SSR com hidratação
    provideAnimationsAsync(), // Suporte a animações
    provideHttpClient(withFetch()), // Configura o HttpClient para usar fetch API
    importProvidersFrom(MatNativeDateModule), // Configura o MatNativeDateModule
  ],
};

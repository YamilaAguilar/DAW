import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import { authInterceptor } from './auth/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
      translation: {
        apply: 'Aplicar',
        clear: 'Limpiar',
        matchAll: 'Coincidir todo',
        matchAny: 'Coincidir alguno',
        addRule: 'Agregar regla',
        removeRule: 'Quitar regla',
        contains: 'Contiene',
        notContains: 'No contiene',
        startsWith: 'Empieza con',
        endsWith: 'Termina con',
        equals: 'Igual a',
        notEquals: 'Distinto de',
        noFilter: 'Sin filtro',
        lt: 'Menor que',
        lte: 'Menor o igual',
        gt: 'Mayor que',
        gte: 'Mayor o igual',
        is: 'Es',
        isNot: 'No es',
        before: 'Antes de',
        after: 'Después de',
      }
    }),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
import { ApplicationConfig } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { ErrorInterceptor } from './_interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),RouterModule, provideClientHydration(), provideHttpClient(), 
  provideToastr(
    {
    closeButton: true, positionClass: 'toast-bottom-right',
    timeOut: 1000, preventDuplicates:true
    }

  ),
  {
    provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true
  }
]
};

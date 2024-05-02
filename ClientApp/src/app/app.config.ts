import { ApplicationConfig } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { loadingInterceptor } from './_interceptors/loading.interceptor';


export const config = {
  apiUrl: 'http://localhost:5231/api/'
};

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch()),provideRouter(routes),RouterModule, provideClientHydration(), provideHttpClient(), 
  provideToastr(
    {
    closeButton: true, positionClass: 'toast-bottom-right',
    timeOut: 1500, preventDuplicates:true,
    
    }

  ),{
    provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true
    
  },{
    provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true
  },
  {
    provide: HTTP_INTERCEPTORS, useClass: loadingInterceptor, multi:true
  },
   
]

};

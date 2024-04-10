import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { enableProdMode } from '@angular/core';
import { provideHttpClient,withFetch } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';



bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

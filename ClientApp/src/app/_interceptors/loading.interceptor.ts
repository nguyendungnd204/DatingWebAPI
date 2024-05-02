import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { take, switchMap, delay, finalize } from 'rxjs/operators';
import { Handler } from 'express';
import { BusyService } from '../_services/busy.service';

@Injectable()

export class loadingInterceptor implements HttpInterceptor {
  constructor( private busyService: BusyService){}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>{
    this.busyService.busy()
    return next.handle(request).pipe(
      delay(1000),
      finalize(()=>{
        this.busyService.idle()
      })
    )
  }
}

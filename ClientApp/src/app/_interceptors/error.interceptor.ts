import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router : Router, private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: any) => {
        if (error) {
          switch(error.status){
            case 400:
              if(error.error.errors)
            {
              const modalStateErrors = []
              for (const key in error.error.errors)
              {
                if(error.error.errors[key])
                {
                  modalStateErrors.push(error.error.errors[key])
                }
              }
              throw modalStateErrors.flat()
            }else{
              this.toastr.error(error.statusText, error.status)
            }
              break
            
            case 401:
              this.toastr.error(error.statusText, error.status)
              break
            case 404:
              this.router.navigateByUrl('/not-found')
              break
            case 500:
              const navigationExtras: NavigationExtras = {state:{error:error.error}}
              this.router.navigateByUrl('/server-error', navigationExtras)
              break
            default:
              this.toastr.error('Something unexpected went wrong')
              console.log(error)
              break
          }
        }
        return throwError(()=>error);
      })
    );
  }
}

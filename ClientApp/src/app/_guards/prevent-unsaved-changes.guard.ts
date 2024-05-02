import { ActivatedRouteSnapshot, CanDeactivate, CanDeactivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class preventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: MemberEditComponent):boolean{
    if(component.editForm?.dirty)
      {
        return confirm('Are you sure you want to continue? Any unsaved changes will be lost')
      }
      return true
  }
}
  
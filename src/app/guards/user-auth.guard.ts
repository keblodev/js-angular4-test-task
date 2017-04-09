import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RemoteStateService } from '../service/remote-state.service'; 

@Injectable()
export class UserAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private remoteState: RemoteStateService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
        
    return this.remoteState.IsUserLoggedIn.map(logged => {
          if (logged) {
            return true;
          } else {
            this.router.navigate(['/login']);
            return Observable.of(false);
          }
        }).catch(() => {
            this.router.navigate(['/login']);
            return Observable.of(false);
        }).first();
  }
}

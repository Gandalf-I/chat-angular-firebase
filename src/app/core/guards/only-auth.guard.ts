import {Injectable} from '@angular/core';
import {CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyAuthGuard implements CanActivateChild {
  constructor(private auth: AuthService,
              private router: Router) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.isLoggedIn().then(
      value => {
        console.log(value);
        if (value) {
          return true;
        } else {
          return this.router.navigate(['auth']);
        }
      }
    );
  }
}

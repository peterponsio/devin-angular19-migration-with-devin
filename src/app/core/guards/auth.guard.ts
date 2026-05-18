import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * AuthGuard — Angular 19 (patrón a MIGRAR en Angular 21)
 *
 * PROBLEMA:
 *   Implementa la interfaz CanActivate mediante una clase con @Injectable.
 *   Angular 15+ deprecó este patrón en favor de guards funcionales.
 *
 * OBJETIVO DE MIGRACIÓN (Angular 21):
 *   Reemplazar por una función guard:
 *
 *   export const authGuard: CanActivateFn = (route, state) => {
 *     const auth   = inject(AuthService);
 *     const router = inject(Router);
 *     return auth.isLoggedIn
 *       ? true
 *       : router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
 *   };
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn) {
      return true;
    }

    // Redirige al login guardando la URL de retorno
    return this.router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url },
    });
  }
}

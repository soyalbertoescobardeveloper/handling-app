import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean {
      if (this.authService.isAuthenticatedUser()) {
        return true;
      } else {
        // Si el usuario no está autenticado, redirige a la página de inicio de sesión.
        this.router.navigate(['/login']);
        return false;
      }
    }
  
}

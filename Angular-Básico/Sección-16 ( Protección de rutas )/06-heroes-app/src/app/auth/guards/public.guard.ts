import { Observable, map, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";

const checkAuthStatus = (): Observable<boolean> => {
    //se inyectan el AuthService y el Router
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
  
    return authService.checkAuthentication().pipe(
      tap((isAuthenticated) => {
        if (isAuthenticated) {
          router.navigate(['./']);
        }
      }),
      map( isAuthenticated => !isAuthenticated )
    );
  };
  
  //No hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing
  export const canActivatePublicGuard: CanActivateFn = (
    //Hay que tener en cuenta el tipado CanActiveFn
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    console.log('CanActivate public');
    console.log({ route, state });
  
    return checkAuthStatus();
  };
  
  export const canMatchPublicGuard: CanMatchFn = (
    //Tipado CanMatchFN
    route: Route,
    segments: UrlSegment[]
  ) => {
    console.log('CanMatch public');
    console.log({ route, segments });
  
    return checkAuthStatus();
  };
  
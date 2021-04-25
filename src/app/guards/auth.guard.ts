import {Injectable} from '@angular/core';
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';



@Injectable({
  providedIn: 'any'
})
export class AuthGuard extends KeycloakAuthGuard {

   constructor(protected router: Router, protected keycloackAngular: KeycloakService) {
     super(router , keycloackAngular);
  }


  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return new Promise(async (resolve, reject) => {
        if (!this.authenticated)
        {
          this.keycloackAngular.login();
          resolve(false);
          return;
        }
        const requiredRoles = route.data.roles;
        let granted = false;

        if (!requiredRoles || requiredRoles.length === 0)
        {
          granted = true;
        }else {
          for (const requiredRole of requiredRoles)
          {
            if (this.roles.indexOf(requiredRole) > -1)
            {
              granted = true;
              break;
            }
          }
        }

        if (granted === false){
          this.router.navigate(['403-Forbidden']) ;
        }

        resolve(granted);
    });
  }


}

import {KeycloakService} from 'keycloak-angular';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable(
  {providedIn: 'any'}
)
export class AuthService {

  constructor(private keycloakservice: KeycloakService) { }
   getLoggedUser(): any {
    try {
      const userDetails = this.keycloakservice.getKeycloakInstance().idTokenParsed;
      console.log('userDetails', userDetails);
      return userDetails;
    } catch (e) {
      console.log('getLoggedUser Exception', e);
      return undefined;
    }
  }

  // tslint:disable-next-line:typedef
 async getUserProfile()
  {
    const userDetails = await this.keycloakservice.loadUserProfile();

    return userDetails;
  }

  logout(url: string): void{
    this.keycloakservice.logout(url);
  }

  getRoles(): string[]{
    console.log(this.keycloakservice.getUserRoles());
    return this.keycloakservice.getUserRoles();
  }

  AccountManagment(): void
  {
    this.keycloakservice.getKeycloakInstance().accountManagement().catch((e) => {
      console.log(e); });
  }
}

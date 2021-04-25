import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../Entities/User';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getEntreprises(): Observable<User[]>
  {
    return this.http.get<User[]>(`${environment.baseUrl}:8081/users/Entreprises/`);
  }

  getUser(id: string): Observable<User>
  {
    return this.http.get<User>(`${environment.baseUrl}:8081/users/user/${id}`);
  }

  VerifMail(mail: string = ''): Observable<boolean>
  {
    return this.http.get<boolean>(`${environment.baseUrl}:8081/users/Email/${mail}`);
  }

  VerifUsername(username: string = ''): Observable<boolean>
  {
    return this.http.get<boolean>(`${environment.baseUrl}:8081/users/Username/${username}`);
  }

  getCoaches(): Observable<User[]>
  {
    return this.http.get<User[]>(`${environment.baseUrl}:8081/users/Coaches/`);
  }

  addUser(user: User): Observable<any>
  {
     return this.http.post(`${environment.baseUrl}:8081/users/`, user);
  }

  updateUser(user: User): Observable<any>
  {
    return this.http.put(`${environment.baseUrl}:8081/users/`, user);
  }

  enableUser(user: User): Observable<any>
  {
     return this.http.put(`${environment.baseUrl}:8081/users/Enabled/`, user);
  }

  disableUser(user: User): Observable<any>
  {
     return this.http.put(`${environment.baseUrl}:8081/users/Disabled/`, user);
  }
}

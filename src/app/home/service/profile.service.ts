import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Profile} from '../Entities/profile';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(userId: string ): Observable<Profile>
  {
    return this.http.get<Profile>(`${environment.baseUrl}:8082/profiles/${userId}`);
  }


}

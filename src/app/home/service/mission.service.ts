import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Mission} from '../Entities/mission';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private http: HttpClient) { }

  public addMission(mission: Mission): Observable<Mission>
  {
    return this.http.post<Mission>(`${environment.baseUrl}:8083/missions/`, mission);
  }

  public upMission(mission: Mission): Observable<Mission>
  {
    return this.http.put<Mission>(`${environment.baseUrl}:8083/missions/${mission.id}`, mission);
  }

  public getMission(id: bigint): Observable<Mission>
  {
    return this.http.get<Mission>(`${environment.baseUrl}:8083/missions/${id}`);
  }

  public AllAccepted(): Observable<Mission[]>
  {
    return this.http.get<Mission[]>(`${environment.baseUrl}:8083/missions/Accepted/`);
  }

  public AllPrototype(): Observable<Mission[]>
  {
    return this.http.get<Mission[]>(`${environment.baseUrl}:8083/missions/Prototype/`);
  }

  public AllByEntrepriseId(id: string): Observable<Mission[]>
  {
    return this.http.get<Mission[]>(`${environment.baseUrl}:8083/missions/Entreprise/${id}`);
  }

  public AllInviation(): Observable<Mission[]>
  {
    return this.http.get<Mission[]>(`${environment.baseUrl}:8083/missions/Invitation/`);
  }
}

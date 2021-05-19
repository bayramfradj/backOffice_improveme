import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Demande} from '../Entities/demande';


@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private http: HttpClient) { }


  public AllCandidaturesByMission(missionId: bigint | undefined): Observable<Demande[]>
  {
    return this.http.get<Demande[]>(`${environment.baseUrl}:8083/demandes/Pending/Mission/${missionId}`);
  }

  public update(demande: Demande): Observable<Demande>
  {
    return this.http.put<Demande>(`${environment.baseUrl}:8083/demandes/`, demande);
  }

}

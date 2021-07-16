import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Groupe} from '../Entities/groupe';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Membre} from '../Entities/membre';
import {Evaluation} from '../Entities/evaluation';
import {Response} from '../Entities/response';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private http: HttpClient) {}

  public AddGroup(group: Groupe): Observable<Groupe>
  {
    return this.http.post<Groupe>(`${environment.baseUrl}:8084/Groupes/`, group);
  }

  public UpGroup(group: Groupe): Observable<Groupe>
  {
    return this.http.put<Groupe>(`${environment.baseUrl}:8084/Groupes/`, group);
  }

  public ArchiveGroup(groupe: Groupe): Observable<Groupe>
  {
    return this.http.put<Groupe>(`${environment.baseUrl}:8084/Groupes/${groupe.id}`, null);
  }

  public AddMemberToGroup(groupeId: bigint, m: Membre): Observable<Membre>
  {
    return this.http.post<Membre>(`${environment.baseUrl}:8084/Groupes/${groupeId}/Members/`, m);
  }

  public DeleteMember(membreId: bigint): Observable<boolean>
  {
    return this.http.delete<boolean>(`${environment.baseUrl}:8084/Groupes/Members/${membreId}`);
  }

  public AllByMission(missionId: bigint): Observable<Groupe[]>
  {
    return this.http.get<Groupe[]>(`${environment.baseUrl}:8084/Groupes/${missionId}`);
  }

  public AddEvalution(evaluation: Evaluation): Observable<Evaluation>
  {
    return this.http.post<Evaluation>(`${environment.baseUrl}:8084/Evaluation/`, evaluation);
  }

  public UpEvalution(evaluation: Evaluation): Observable<Evaluation>
  {
    return this.http.put<Evaluation>(`${environment.baseUrl}:8084/Evaluation/`, evaluation);
  }

  public RemoveEvalution(responseId: bigint): Observable<boolean>
  {
    return this.http.delete<boolean>(`${environment.baseUrl}:8084/Evaluation/${responseId}`);
  }

  public GetEvalutionById(responseId: bigint): Observable<Evaluation>
  {
    return this.http.get<Evaluation>(`${environment.baseUrl}:8084/Evaluation/${responseId}`);
  }

  public GetEvalutionByMissionId(responseId: bigint): Observable<Evaluation[]>
  {
    return this.http.get<Evaluation[]>(`${environment.baseUrl}:8084/Evaluation/Mission/${responseId}`);
  }

  public AddResponse(response: Response): Observable<Response>
  {
    return this.http.post<Response>(`${environment.baseUrl}:8084/Evaluation/Response/`, response);
  }

  public UpResponse(response: Response, repId: bigint | undefined): Observable<Response>
  {
    return this.http.put<Response>(`${environment.baseUrl}:8084/Evaluation/Response/${repId}`, response);
  }

  public GetResponseById(responseId: bigint): Observable<Response>
  {
    return this.http.get<Response>(`${environment.baseUrl}:8084/Evaluation/Response/${responseId}`);
  }

  public RemoveResponseById(responseId: bigint): Observable<boolean>
  {
    return this.http.delete<boolean>(`${environment.baseUrl}:8084/Evaluation/Response/${responseId}`);
  }

  public GetResponseByGroupeIdAndEval(groupeId: bigint, evalId: bigint): Observable<Response>
  {
    return this.http.get<Response>(`${environment.baseUrl}:8084/Evaluation/Response/Groupe/${groupeId}/${evalId}`);
  }

}

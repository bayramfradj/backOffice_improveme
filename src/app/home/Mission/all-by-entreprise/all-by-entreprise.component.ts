import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {AppState, DataStateEnum} from '../../state/app.state';
import {Mission} from '../../Entities/mission';
import {MissionService} from '../../service/mission.service';
import {catchError, map, startWith} from 'rxjs/operators';
import {AuthService} from '../../../Services/auth.service';
import {StateMission} from '../../Entities/state-mission.enum';

@Component({
  selector: 'app-all-by-entreprise',
  templateUrl: './all-by-entreprise.component.html',
  styleUrls: ['./all-by-entreprise.component.css']
})
export class AllByEntrepriseComponent implements OnInit {
  missions$: Observable<AppState<Mission[]>> |null = null ;
  mission = new Mission();
  readonly DataStateEnum = DataStateEnum;
  readonly StateMission = StateMission;
  entrepriseId: string;
  constructor(private msService: MissionService, private auth: AuthService) {
   this.entrepriseId =  this.auth.getLoggedUser()?.sub;
  }

  ngOnInit(): void {
    this.loadMission();
  }

  loadMission(): void
  {
    this.missions$ = this.msService.AllByEntrepriseId(this.entrepriseId).pipe(
      map(value => ({dataState: DataStateEnum.LOADED , data: value})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of( { dataState: DataStateEnum.ERROR , errorMessage: err.message }))
    );
  }

}

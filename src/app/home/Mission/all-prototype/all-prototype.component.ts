import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {AppState, DataStateEnum} from '../../state/app.state';
import {Mission} from '../../Entities/mission';
import {MissionService} from '../../service/mission.service';
import {catchError, map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-all-prototype',
  templateUrl: './all-prototype.component.html',
  styleUrls: ['./all-prototype.component.css']
})
export class AllPrototypeComponent implements OnInit {
  missions$: Observable<AppState<Mission[]>> |null = null ;
  readonly DataStateEnum = DataStateEnum;
  selectedMission = new Mission();
  constructor(private msService: MissionService) { }

  ngOnInit(): void {
    this.missions$ = this.msService.AllPrototype().pipe(
      map(value => ({dataState: DataStateEnum.LOADED , data: value})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of( { dataState: DataStateEnum.ERROR , errorMessage: err.message }))
    );
  }

  loadSelctedMission(m: Mission): void
  {
    this.selectedMission = m;
  }

}

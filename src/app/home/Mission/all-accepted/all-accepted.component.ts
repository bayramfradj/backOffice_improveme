import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AppState, DataStateEnum} from '../../state/app.state';
import {Mission} from '../../Entities/mission';
import {MissionService} from '../../service/mission.service';
import {catchError, map, startWith} from 'rxjs/operators';
import {StateMission} from '../../Entities/state-mission.enum';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-all-accepted',
  templateUrl: './all-accepted.component.html',
  styleUrls: ['./all-accepted.component.css']
})
export class AllAcceptedComponent implements OnInit {
  missions$: Observable<AppState<Mission[]>> |null = null ;
  mission = new Mission();
  readonly DataStateEnum = DataStateEnum;

  constructor(private msService: MissionService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadMission();
  }

  loadMission(): void
  {
    this.missions$ = this.msService.AllAccepted().pipe(
      map(value => ({dataState: DataStateEnum.LOADED , data: value})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of( { dataState: DataStateEnum.ERROR , errorMessage: err.message }))
    );
  }

  loadMissionToModal(m: Mission): void{
    this.mission = m;
  }

  Archiver(): void {
    this.mission.stateMission = StateMission.ARCHIVED;
    this.msService.upMission(this.mission).subscribe(
      mission => {
        this.loadMission();
        this.toastr.success( ' Mission archivé avec succès' , 'SUCCÈS' );
      }, error => {
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
        console.log(error.message);
      }
    );
  }
}

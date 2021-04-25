import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AppState, DataStateEnum} from '../../state/app.state';
import {Mission} from '../../Entities/mission';
import {MissionService} from '../../service/mission.service';
import {catchError, map, startWith} from 'rxjs/operators';
import {StateMission} from '../../Entities/state-mission.enum';
import {UsersService} from '../../service/users.service';
import {User} from '../../Entities/User';

@Component({
  selector: 'app-all-invitation',
  templateUrl: './all-invitation.component.html',
  styleUrls: ['./all-invitation.component.css']
})
export class AllInvitationComponent implements OnInit {
  missions$: Observable<AppState<Mission[]>> |null = null ;
  readonly DataStateEnum = DataStateEnum;
  selectedMission = new Mission();
  coaches: User[] = [];

  constructor(private msService: MissionService, private usService: UsersService) { }

  ngOnInit(): void {
    this.loadMission();
    this.usService.getCoaches().subscribe(
      coaches => {
        this.coaches = coaches.filter(value =>  value.enabled === true);
      });
  }

  loadMission(): void
  {
    this.missions$ = this.msService.AllInviation().pipe(
      map(value => ({dataState: DataStateEnum.LOADED , data: value})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of( { dataState: DataStateEnum.ERROR , errorMessage: err.message }))
    );
  }

  loadSelctedMission(m: Mission): void
  {
    this.selectedMission = m;
  }

  onCahngeCoach(index: number): void
  {
    this.selectedMission.coachId = this.coaches[index - 1].id;
    // @ts-ignore
    this.selectedMission.coachName = `${this.coaches[index  - 1].firstName} ${this.coaches[index  - 1].lastName.toUpperCase()}`;
  }

  update(): void
  {
    this.msService.upMission(this.selectedMission).subscribe(mission => {
      console.log(mission);
    }, error => {
      console.log(error);
    });
  }

  approver(): void
  {
    this.selectedMission.stateMission = StateMission.ACCEPTED;
  }

  Rejecter(): void
  {
    this.selectedMission.stateMission = StateMission.REJECTED;
    this.msService.upMission(this.selectedMission).subscribe(mission => {
      console.log(mission);
    }, error => {
      console.log(error);
    });
  }

}

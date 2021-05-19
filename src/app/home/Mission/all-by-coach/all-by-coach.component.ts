import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AppState, DataStateEnum} from '../../state/app.state';
import {Mission} from '../../Entities/mission';
import {MissionService} from '../../service/mission.service';
import {AuthService} from '../../../Services/auth.service';
import {catchError, map, startWith} from 'rxjs/operators';
import {TypeMission} from '../../Entities/type-mission.enum';
import {Demande} from '../../Entities/demande';
import {DemandeService} from '../../service/demande.service';
import {Profile} from '../../Entities/profile';
import {ProfileService} from '../../service/profile.service';
import {StateCandidature} from '../../Entities/state-candidature.enum';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-all-by-coach',
  templateUrl: './all-by-coach.component.html',
  styleUrls: ['./all-by-coach.component.css']
})
export class AllByCoachComponent implements OnInit {
  missions$: Observable<AppState<Mission[]>> |null = null ;
  demandes$: Observable<AppState<Demande[]>> | null = null;
  profile$: Observable<AppState<Profile>> | null = null;
  readonly DataStateEnum = DataStateEnum;
  CoachId: string;
  selectedMission = new Mission();
  selectedDemande: Demande | undefined = new Demande();
  readonly TypeMission = TypeMission ;


  constructor(private msService: MissionService, private auth: AuthService,
              private dmService: DemandeService, private prService: ProfileService,
              private toastr: ToastrService) {
    this.CoachId = this.auth.getLoggedUser()?.sub;
  }

  ngOnInit(): void {
    this.loadMission();
  }

  loadMission(): void
  {
    this.missions$ = this.msService.AllByCoach(this.CoachId).pipe(
      map(value => ({dataState: DataStateEnum.LOADED , data: value})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of( { dataState: DataStateEnum.ERROR , errorMessage: err.message }))
    );
  }

  LoadCandidatures(): void
  {
      this.demandes$ = this.dmService.AllCandidaturesByMission(this.selectedMission.id).pipe(
        map(value => ({dataState: DataStateEnum.LOADED, data: value})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
      );
  }

  loadSelectedMission(m: Mission): void {
   this.selectedMission = m;
  }

  loadProfile(d?: Demande): void {
    this.selectedDemande = d;
    if (d?.userId != null) {
      this.profile$ = this.prService.getProfile(d.userId).pipe(
        map(value => ({dataState: DataStateEnum.LOADED, data: value})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
      );
    }
  }

  Accepter(): void
  {
    if (this.selectedDemande) {
      this.demandes$ = of({dataState: DataStateEnum.LOADING});
      this.selectedDemande.stateCandidature = StateCandidature.ACCEPTED;
      this.dmService.update(this.selectedDemande).subscribe(value => {
        this.toastr.success( `Candidature acceptée avec succès` , 'SUCCÈS' );
        console.log(value);
        this.LoadCandidatures();
      }, error => {
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
      });
    }
  }

  Refuser(): void
  {

    if (this.selectedDemande) {
      this.demandes$ = of({dataState: DataStateEnum.LOADING});
      this.selectedDemande.stateCandidature = StateCandidature.REJECTED;
      this.dmService.update(this.selectedDemande).subscribe(value => {
        this.toastr.success( `Candidature refusée avec succès` , 'SUCCÈS' );
        console.log(value);
        this.LoadCandidatures();
      }, error => {
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
      });
    }
  }

}

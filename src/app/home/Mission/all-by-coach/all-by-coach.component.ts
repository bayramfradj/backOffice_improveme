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
import {Groupe} from '../../Entities/groupe';
import {EvaluationService} from '../../service/evaluation.service';
import {Membre} from '../../Entities/membre';
import {Room} from '../../Entities/room';
import {ChatService} from '../../service/chat.service';

@Component({
  selector: 'app-all-by-coach',
  templateUrl: './all-by-coach.component.html',
  styleUrls: ['./all-by-coach.component.css']
})
export class AllByCoachComponent implements OnInit {
  missions$: Observable<AppState<Mission[]>> |null = null ;
  demandes$: Observable<AppState<Demande[]>> | null = null;
  groupes$: Observable<AppState<Groupe[]>> | null = null;
  profile$: Observable<AppState<Profile>> | null = null;
  readonly DataStateEnum = DataStateEnum;
  CoachId: string;
  selectedMission = new Mission();
  selectedDemande: Demande | undefined = new Demande();
  readonly TypeMission = TypeMission ;
  view = 'GROUPES';
  SelectedGroupe = new Groupe();
  groupeButtonText = 'Ajouter';
  selectedMember = new Membre();
  candidatures: Demande[] = [];
  loadingCan = false;
  Affected: Demande[] = [];
  itemsProcessed = 0;



  constructor(private msService: MissionService, private auth: AuthService,
              private dmService: DemandeService, private prService: ProfileService,
              private toastr: ToastrService, private evService: EvaluationService,
              private chatService: ChatService) {
    this.CoachId = this.auth.getLoggedUser()?.sub;
  }

  ngOnInit(): void {
    this.loadMission();
  }

  loadMission(): void
  {
    this.missions$ = this.msService.AllByCoach(this.CoachId).pipe(
      map(value => ({dataState: DataStateEnum.LOADED , data: value.filter(m => m.typeMission !== this.TypeMission.FORMATION)})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of( { dataState: DataStateEnum.ERROR , errorMessage: err.message }))
    );
  }

  LoadCandidatures(m?: Mission): void
  { if (m)
      {
        this.selectedMission = m;
      }
    if (this.selectedMission.id != null) {
      this.demandes$ = this.dmService.AllCandidaturesByMission(this.selectedMission.id).pipe(
        map(value => ({dataState: DataStateEnum.LOADED, data: value})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
      );
    }
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
    if (this.selectedDemande?.id != null) {
      this.demandes$ = of({dataState: DataStateEnum.LOADING});
      this.dmService.Accepter(this.selectedDemande.id).subscribe(value => {
        this.toastr.success( `Candidature acceptée avec succès` , 'SUCCÈS' );
        console.log(value);
        this.LoadCandidatures();
      }, error => {
        console.log(error);
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
      });
    }
  }

  Refuser(): void
  {

    if (this.selectedDemande?.id != null) {
      this.demandes$ = of({dataState: DataStateEnum.LOADING});
      this.dmService.Refuser(this.selectedDemande.id).subscribe(value => {
        this.toastr.success( `Candidature refusée avec succès` , 'SUCCÈS' );
        console.log(value);
        this.LoadCandidatures();
      }, error => {
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
      });
    }
  }

  loadGroupes(m?: Mission): void {
    if (m)
    {
      this.selectedMission = m;
    }
    this.view = 'GROUPES';
    if (this.selectedMission.id != null) {
      this.groupes$ = this.evService.AllByMission(this.selectedMission.id).pipe(
        map(value => ({dataState: DataStateEnum.LOADED, data: value})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
      );
    }
  }

  loadFormAdd(): void {
    this.SelectedGroupe = new Groupe();
    this.view = 'ADD';
    this.groupeButtonText = 'Ajouter';

  }

  loadViewGroupes(): void {
    this.view = 'GROUPES';
  }

  AddGroupe(): void {
    this.groupes$ =  of({dataState: DataStateEnum.LOADING});

    if (this.groupeButtonText === 'Ajouter')
    {
      this.SelectedGroupe.missionId = this.selectedMission.id;
      this.evService.AddGroup(this.SelectedGroupe).subscribe(async groupe => {
       await this.chatService.SaveRoom({groupeId: groupe.id}).subscribe(room => {
            this.toastr.success( `Groupe ajouté avec succès` , 'SUCCÈS' );
            this.loadGroupes();
          }, error => {
           this.loadGroupes();
           this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
         });
      }, error => {
        this.loadGroupes();
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR');


      });
    }else {
      this.evService.UpGroup(this.SelectedGroupe).subscribe(value => {
        console.log(value);
        this.toastr.success( `Groupe modifié avec succès` , 'SUCCÈS' );
        this.loadGroupes();
      }, error => {
        this.loadGroupes();
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
      });
    }
  }

  loadUpGroupe(g: Groupe): void {
    this.SelectedGroupe = g;
    this.groupeButtonText = 'Modifier';
    this.view = 'ADD';
  }

  loadSelectedGroupe(g: Groupe, n: number): void {
    this.SelectedGroupe = g;
    if (n === 1)
    {
      this.loadingCan = true;
      this.dmService.NotAffectedByMission(this.selectedMission.id).subscribe(value => {
        this.loadingCan = false;
        this.Affected = [];
        this.candidatures = value;
      });
    }
  }

  ArchiverGroupe(): void {
    this.groupes$ =  of({dataState: DataStateEnum.LOADING});
    this.evService.ArchiveGroup(this.SelectedGroupe).subscribe(async value => {
      if (this.SelectedGroupe.id != null) {
        await this.chatService.RemoveRoomByGrupeId(this.SelectedGroupe.id).subscribe(v => {
          // @ts-ignore
          if ( this.SelectedGroupe.membres?.length > 0 )
          {
            let itemProssesed = 0;
            this.SelectedGroupe.membres?.forEach(async m => {
              await this.dmService.switchAffectedByMissionAndUser(m.userId, this.selectedMission.id).subscribe(res => {
                console.log(res);
                itemProssesed++;
                if (itemProssesed === this.SelectedGroupe.membres?.length)
                {
                  this.toastr.success(`Groupe archivé avec succès`, 'SUCCÈS');
                  this.loadGroupes();
                }
              });
            });
          }
          else
          {
            this.toastr.success(`Groupe archivé avec succès`, 'SUCCÈS');
            this.loadGroupes();
          }
        }, error => {
          this.loadGroupes();
          this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
        });
      }
    }, error => {
      this.loadGroupes();
      this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
    });
  }

  loadSelectedMember(m: Membre): void {
    this.selectedMember = m;
  }

  RemoveMember(): void {
    this.groupes$ =  of({dataState: DataStateEnum.LOADING});
    if (this.selectedMember.id != null) {
      this.evService.DeleteMember(this.selectedMember.id).subscribe(async value => {
        await this.dmService.switchAffectedByMissionAndUser(this.selectedMember.userId, this.selectedMission.id).subscribe( value1 => {
          this.toastr.success( `Membre supprimé avec succès` , 'SUCCÈS' );
          this.loadGroupes();
        });
      }, error => {
        this.loadGroupes();
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
      });
    }
  }

  loadCandidature(c: Demande): void {
    this.Affected.push(c);
    this.candidatures = this.candidatures.filter(d => d.id !== c.id);
  }

  removeCandidature(c: Demande): void {
    this.candidatures.push(c);
    this.Affected = this.Affected.filter(d => d.id !== c.id);
  }

   SaveGroupe(): void {
    this.groupes$ =  of({dataState: DataStateEnum.LOADING});
    this.itemsProcessed = 0;
    this.Affected.forEach(async d => {
      console.log(d);
      if (this.SelectedGroupe.id != null) {
        await this.evService.AddMemberToGroup(this.SelectedGroupe.id, {userId: d.userId, userName: d.userName}).subscribe(async value => {
          d.affected = true;
          if (d.id != null) {
            await this.dmService.switchAffected(d.id).subscribe(dm => {
              this.itemsProcessed++;
              console.log(this.itemsProcessed);
              if (this.itemsProcessed === this.Affected.length) {
                this.toastr.success(`Membres affectés avec succès`, 'SUCCÈS');
                this.loadGroupes();
              }
            }, error => {
              this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
              this.loadGroupes();

            });
          }
         }, error => {
           this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
           this.loadGroupes();
         });
      }
    });

  }
}

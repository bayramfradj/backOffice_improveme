import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppState, DataStateEnum} from '../../state/app.state';
import {Mission} from '../../Entities/mission';
import {MissionService} from '../../service/mission.service';
import {AuthService} from '../../../Services/auth.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TypeMission } from '../../Entities/type-mission.enum';
import {UsersService} from '../../service/users.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-mission',
  templateUrl: './edit-mission.component.html',
  styleUrls: ['./edit-mission.component.css']
})
export class EditMissionComponent implements OnInit {
  missionId: bigint;
  role: string | undefined;
  appState: AppState<Mission> |null = null;
  readonly DataStateEnum = DataStateEnum;
  mission = new Mission();
  readonly TypeMission = TypeMission;
  type: any;
  tmission: any;
  public Editor = ClassicEditor;
  coaches: any;
  constructor(private route: ActivatedRoute, private msService: MissionService,
              private auth: AuthService, private usService: UsersService,
              private toastr: ToastrService) {
    this.missionId = route.snapshot.params.id;
  }

  ngOnInit(): void {
    if (this.auth.getRoles().indexOf('ADMIN') > -1) {
      this.role = 'ADMIN';
      this.type = [
        TypeMission.FORMATION,
        TypeMission.PAYEE,
        TypeMission.RECRUTEMENT,
        TypeMission.PROTOTYPE
      ];
      this.usService.getCoaches().subscribe(
        coaches => {
          this.coaches = coaches.filter(value =>  value.enabled === true);
        });
    }else if (this.auth.getRoles().indexOf('ENTREPRISE') > -1){
      this.role = 'ENTREPRISE';
      this.type = [
        TypeMission.PAYEE,
        TypeMission.RECRUTEMENT
      ];
    }
    this.loadMission();
  }

  loadMission(): void
  {
    this.appState = {dataState: DataStateEnum.LOADING};

    this.msService.getMission(this.missionId).subscribe(value => {
      this.mission = value;
      console.log(this.mission);
      this.appState = {dataState: DataStateEnum.LOADED };
    }, error => {
      this.appState = {dataState: DataStateEnum.ERROR , errorMessage: error.message};
    });
  }

  reset(): void {
    this.loadMission();
  }

  submite(): void {
    this.appState = {dataState: DataStateEnum.LOADING};
    console.log(this.mission);
    this.msService.upMission(this.mission).subscribe(
      data => {
        this.toastr.success('Mission modifié avec succès' , 'SUCCÉS' );
        this.appState = {dataState: DataStateEnum.LOADED};
      }, error => {
        this.appState = {dataState: DataStateEnum.LOADED};
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR !');
      }
    );
  }
}

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
import {AngularFireStorage} from '@angular/fire/storage';

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
  file: any ;
  changedImage = false;
  constructor(private route: ActivatedRoute, private msService: MissionService,
              private auth: AuthService, private usService: UsersService,
              private toastr: ToastrService, private af: AngularFireStorage) {
    this.missionId = route.snapshot.params.id;
  }

  ngOnInit(): void {
    if (this.auth.getRoles().indexOf('ADMIN') > -1) {
      this.role = 'ADMIN';
      this.type = [
        TypeMission.FORMATION,
        TypeMission.PAYANTE,
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
        TypeMission.PAYANTE,
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
    if (this.changedImage)
    {
      this.UploadImage();
    }
    else
    {
      this.updateMission();
    }

  }

  updateMission(): void
  {
    this.msService.upMission(this.mission).subscribe(
      data => {
        this.toastr.success('Mission modifiée avec succès' , 'SUCCÉS' );
        this.appState = {dataState: DataStateEnum.LOADED};
      }, error => {
        this.appState = {dataState: DataStateEnum.LOADED};
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR !');
      }
    );
  }

  loadImage($event: any): void
  {
    this.file = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.mission.img = reader.result;
      this.changedImage = true;
    };
  }

  UploadImage(): void
  {
    const randomId = Math.random().toString(36).substring(2);
    const ref = this.af.ref(randomId);
    const task = ref.put(this.file);
    task.then(a => {
      a.ref.getDownloadURL().then(value => {
        this.mission.img = value;
        this.updateMission();
      });
    });
  }
}

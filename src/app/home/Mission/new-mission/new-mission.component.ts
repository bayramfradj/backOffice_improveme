import {Component, OnInit} from '@angular/core';
import {Mission} from '../../Entities/mission';
import {AuthService} from '../../../Services/auth.service';
import {TypeMission} from '../../Entities/type-mission.enum';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {UsersService} from '../../service/users.service';
import {MissionService} from '../../service/mission.service';
import {StateMission} from '../../Entities/state-mission.enum';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../Entities/User';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-new-mission',
  templateUrl: './new-mission.component.html',
  styleUrls: ['./new-mission.component.css']
})
export class NewMissionComponent implements OnInit {

  mission = new Mission();
  role: string | undefined;
  loader = false;
  readonly TypeMission = TypeMission;
  type: any;
  public Editor = ClassicEditor;
  coaches: User[] = [];
  file: any ;

  constructor(private auth: AuthService, private usService: UsersService,
              private mservice: MissionService, private toastr: ToastrService,
              private af: AngularFireStorage ) { }

  ngOnInit(): void {
    if (this.auth.getRoles().indexOf('ADMIN') > -1) {
      this.role = 'ADMIN';
      this.type = [
        {v: TypeMission.FORMATION, label: 'FORMATION'},
        {v: TypeMission.PAYANTE, label: 'PAYANTE'},
        {v: TypeMission.RECRUTEMENT, label: 'RECRUTEMENT'},
        {v: TypeMission.PROTOTYPE, label: 'PROTOTYPE'},
      ];
      this.usService.getCoaches().subscribe(
        coaches => {
          this.coaches = coaches.filter(value =>  value.enabled === true);
        });
      this.mission.entrepriseName = 'ImproveMe';
    }else if (this.auth.getRoles().indexOf('ENTREPRISE') > -1){
      this.role = 'ENTREPRISE';
      this.type = [
        {v: TypeMission.PAYANTE, label: 'PAYANTE'},
        {v: TypeMission.RECRUTEMENT, label: 'RECRUTEMENT'}
      ];
      this.auth.getUserProfile().then(value => {
        this.mission.entrepriseId = this.auth.getLoggedUser()?.sub;
        // @ts-ignore
        this.mission.entrepriseName = value.attributes.name[0];
        console.log(this.mission);
      });
    }
    this.mission.content = '';

  }

  onCahngeCoach(index: number): void
  {
      this.mission.coachId = this.coaches[index - 1].id;
      // @ts-ignore
      this.mission.coachName = `${this.coaches[index  - 1].firstName} ${this.coaches[index  - 1].lastName.toUpperCase()}`;
      console.log(this.mission);
  }

  submite(): void {
    this.loader = true;

    if (this.file)
    {
      this.UploadImage();
    }
    else {
      this.createMission();
    }

  }

  createMission(): void
  {
    if (this.role === 'ADMIN')
    {
      this.mission.stateMission = StateMission.ACCEPTED;
    }else
    {
      this.mission.stateMission = StateMission.PENDING;
    }

    this.mservice.addMission(this.mission).subscribe(data => {
      this.loader = false;
      this.mission = new Mission();
      this.toastr.success('Mission ajoutée avec succès' , 'SUCCÈS' );
      console.log(data);
    }, error => {
      this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
    });
  }

  loadImage($event: any): void
  {
    this.file = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.mission.img = reader.result;
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
        this.createMission();
      });
    });
  }
}

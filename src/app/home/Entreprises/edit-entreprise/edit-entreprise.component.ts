import {Component, OnInit} from '@angular/core';
import {User} from '../../Entities/User';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../../service/users.service';
import {AppState, DataStateEnum} from '../../state/app.state';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-entreprise',
  templateUrl: './edit-entreprise.component.html',
  styleUrls: ['./edit-entreprise.component.css']
})
export class EditEntrepriseComponent implements OnInit {
  appState: AppState<User> |null = null;
  user = new User();
  userId: string;
  initmail: string | undefined = '';
  initUsername: string | undefined = '';
  vmail = false;
  vusername = false;
  readonly DataStateEnum = DataStateEnum;
  constructor(private route: ActivatedRoute, private usService: UsersService, private toastr: ToastrService) {
    this.userId = route.snapshot.params.id;
  }

  ngOnInit(): void {
   this.loadUser();
  }

  verifMail(): void{
    if (this.user.email === this.initmail) {
      return;
    }
    this.usService.VerifMail(this.user.email).subscribe(
      data => {
        this.vmail = data;
      }
    );
  }

  verifUsername(): void{
    if (this.user.username === this.initUsername) {
      return;
    }
    this.usService.VerifUsername(this.user.username).subscribe(
      data => {
        this.vusername = data;
      }
    );
  }

  loadUser(): void{
    this.appState = {dataState: DataStateEnum.LOADING};

    this.usService.getUser(this.userId).subscribe(user => {
      this.user = user;
      this.initmail = user.email;
      this.initUsername = user.username;
      this.appState = {dataState: DataStateEnum.LOADED };
    }, error => {
      this.appState = {dataState: DataStateEnum.ERROR , errorMessage: error.message};
    });
  }

  submite(): void {
    this.appState = {dataState: DataStateEnum.LOADING};
    this.usService.updateUser(this.user).subscribe(
      data => {
        this.toastr.success(this.user.entrepriseName + ' Modifié avec succès' , 'SUCCÈS' );
        this.appState = {dataState: DataStateEnum.LOADED};
      }, error => {
        this.appState = {dataState: DataStateEnum.LOADED};
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
      }
    );
  }

  reset(): void {
    this.loadUser();
  }
}

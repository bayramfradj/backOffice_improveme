import { Component, OnInit } from '@angular/core';
import {AppState, DataStateEnum} from '../../state/app.state';
import {User} from '../../Entities/User';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../../service/users.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-coach',
  templateUrl: './edit-coach.component.html',
  styleUrls: ['./edit-coach.component.css']
})
export class EditCoachComponent implements OnInit {
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
      this.appState = {dataState: DataStateEnum.LOADED };
    }, error => {
      this.appState = {dataState: DataStateEnum.ERROR , errorMessage: error.message};
    });
  }

  submite(): void {
    this.appState = {dataState: DataStateEnum.LOADING};
    this.usService.updateUser(this.user).subscribe(
      data => {
        this.toastr.success(this.user.lastName + ' ' + this.user.firstName
                                    + ' Modifié avec succès' , 'SUCCÉS' );
        this.appState = {dataState: DataStateEnum.LOADED};
      }, error => {
        this.appState = {dataState: DataStateEnum.LOADED};
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR !');
      }
    );
  }

  reset(): void {
    this.loadUser();
  }
}

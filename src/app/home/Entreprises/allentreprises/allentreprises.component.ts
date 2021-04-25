import { Component, OnInit } from '@angular/core';
import {User} from '../../Entities/User';
import {UsersService} from '../../service/users.service';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {AppState, DataStateEnum} from '../../state/app.state';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-allentreprises',
  templateUrl: './allentreprises.component.html',
  styleUrls: ['./allentreprises.component.css']
})
export class AllentreprisesComponent implements OnInit {
  users$: Observable<AppState<User[]>> |null = null ;
  readonly DataStateEnum = DataStateEnum;
  constructor(private uservice: UsersService, private toastr: ToastrService) { }

  ngOnInit(): void {

      this.loadUsers();

  }

  loadUsers(): void
  {
    this.users$ = this.uservice.getEntreprises().pipe(
        map(value => ({dataState: DataStateEnum.LOADED , data: value})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of( { dataState: DataStateEnum.ERROR , errorMessage: err.message }))
    );
  }

  // tslint:disable-next-line:typedef
  Active(user: User) {
    this.uservice.enableUser(user).subscribe(
      data => {
        this.toastr.success( user.entrepriseName +
          ' Modifié avec succès' , 'SUCCÈS' );
        this.loadUsers();
      },
      error => {
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
        console.log(error.message);
      }
    );
  }

  // tslint:disable-next-line:typedef
  Disactiver(user: User) {
    this.uservice.disableUser(user).subscribe(
      data => {
        this.toastr.success( user.entrepriseName +
          ' Modifié avec succès' , 'SUCCÈS' );
        this.loadUsers();
      },
      error => {
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
        console.log(error.message);
      }
    );
  }
}

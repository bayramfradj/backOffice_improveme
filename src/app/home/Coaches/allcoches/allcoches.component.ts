import { Component, OnInit } from '@angular/core';
import {User} from '../../Entities/User';
import {UsersService} from '../../service/users.service';
import {Observable, of} from 'rxjs';
import {AppState, DataStateEnum} from '../../state/app.state';
import {catchError, map, startWith} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-allcoches',
  templateUrl: './allcoches.component.html',
  styleUrls: ['./allcoches.component.css']
})
export class AllcochesComponent implements OnInit {

  users$: Observable<AppState<User[]>> |null = null ;
  readonly DataStateEnum = DataStateEnum;
  constructor(private uservice: UsersService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.loadUsers();

  }

  loadUsers(): void
  {
    this.users$ = this.uservice.getCoaches().pipe(
      map(value => ({dataState: DataStateEnum.LOADED , data: value})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of( { dataState: DataStateEnum.ERROR , errorMessage: err.message }))
    );
  }

  // tslint:disable-next-line:typedef
  Active(user: User) {
    this.uservice.enableUser(user).subscribe(
      data => {
        this.toastr.success( user.lastName + ' ' + user.firstName +
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
    console.log('yes');
    this.uservice.disableUser(user).subscribe(
      data => {
        this.toastr.success( user.lastName + ' ' + user.firstName +
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

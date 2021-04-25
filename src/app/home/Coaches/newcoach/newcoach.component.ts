import { Component, OnInit } from '@angular/core';
import {User} from '../../Entities/User';
import {UsersService} from '../../service/users.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-newcoach',
  templateUrl: './newcoach.component.html',
  styleUrls: ['./newcoach.component.css']
})
export class NewcoachComponent implements OnInit {
  user = new User();
  repeatPasword = '';
  vmail = false;
  vusername = false;
  loader = false;
  constructor(private usService: UsersService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  verifMail(): void{
    this.usService.VerifMail(this.user.email).subscribe(
      data => {
        this.vmail = data;
      }
    );
  }

  verifUsername(): void{
    this.usService.VerifUsername(this.user.username).subscribe(
      data => {
        this.vusername = data;
      }
    );
  }

  submite(): void {
    this.user.role = 'COACH';
    this.user.img = 'hello';
    this.loader = true;
    this.usService.addUser(this.user).subscribe(data => {

        this.toastr.success( this.user.lastName + ' ' + this.user.firstName +
                                ' ajouté avec succès' , 'SUCCÈS' );
        this.user = new User();
        this.loader = false;
      }, error1 => {
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
        this.loader = false;
      }
    );
  }

}

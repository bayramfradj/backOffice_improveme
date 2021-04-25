import { Component, OnInit } from '@angular/core';
import {User} from '../../Entities/User';
import {UsersService} from '../../service/users.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-newentrepris',
  templateUrl: './newentrepris.component.html',
  styleUrls: ['./newentrepris.component.css']
})
export class NewentreprisComponent implements OnInit {
  user = new User();
  repeatPasword = '';
  vmail = false;
  vusername = false;
  loader = false;
  constructor(private usService: UsersService , private toastr: ToastrService) { }

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
    this.user.role = 'ENTREPRISE';
    this.user.img = 'hello';
    this.loader = true;
    this.usService.addUser(this.user).subscribe(data => {
      this.loader = false;
      this.toastr.success(this.user.entrepriseName + ' ajouté avec succès' , 'SUCCÈS' );
      this.user = new User();
    }, error1 => {
      this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
      this.loader = false;
      }
    );
  }
}

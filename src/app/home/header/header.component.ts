import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  name?: string;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {

    this.auth.getUserProfile().then(value => {

      if (this.auth.getRoles().indexOf('ADMIN') > -1 || this.auth.getRoles().indexOf('COACH') > -1){
        this.name = value.firstName;
        this.name += ' ' + value.lastName;
      }
      else
      {
        // @ts-ignore
        this.name = value.attributes.name;
      }
    });
  }

  manageAccount(): void
  {
    this.auth.AccountManagment();
  }

  public logout(): void
  {
    this.auth.logout(document.baseURI);
  }

}

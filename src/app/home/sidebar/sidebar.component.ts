import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Services/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  role: string | undefined;
  constructor(private auth: AuthService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.auth.getRoles().indexOf('ADMIN') > -1) {
      this.role = 'ADMIN';
    }else if (this.auth.getRoles().indexOf('COACH') > -1){
      this.role = 'COACH';
    }else {
      this.role = 'ENTREPRISE';
    }


  }

}

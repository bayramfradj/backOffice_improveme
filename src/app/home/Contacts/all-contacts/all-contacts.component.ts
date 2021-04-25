import { Component, OnInit } from '@angular/core';
import {Observable, of, pipe} from 'rxjs';
import {AppState, DataStateEnum} from '../../state/app.state';
import {Contact} from '../../Entities/contact';
import {ContactService} from '../../service/contact.service';
import {catchError, map, startWith} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Mail} from '../../Entities/mail';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.css']
})
export class AllContactsComponent implements OnInit {
  mail: Mail = new Mail();
  contacts$: Observable<AppState<Contact[]>> |null = null ;
  readonly DataStateEnum = DataStateEnum;
  constructor(private conService: ContactService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadDataInForm(contact: Contact): void
  {
    this.mail.idContact = contact.id;
    this.mail.sendTo = contact.email;
  }

  loadContacts(): void
  {
    this.contacts$ = this.conService.getContacts().pipe(
      map(value => ({dataState: DataStateEnum.LOADED , data: value})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of( { dataState: DataStateEnum.ERROR , errorMessage: err.message }))
    );
  }

  delete(contact: Contact): void
  {
      this.conService.deleteContact(contact).toPromise().then(
        value => {
          this.loadContacts();
          this.toastr.success( ' Contact supprimé avec succès' , 'SUCCÉS' );
        }).catch(
        reason => {
          this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
          console.log(reason.message);
        });
  }

  sendMail(): void {
    this.conService.sendMail(this.mail).toPromise().then(value => {
      this.loadContacts();
      this.mail = new Mail();
      this.toastr.success( ' Email envoyé avec succès' , 'SUCCÉS' );
    }).catch(reason => {
      this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
      console.log(reason.message);
    });
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Contact} from '../Entities/contact';
import {Mail} from '../Entities/mail';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]>
  {
    return this.http.get<Contact[]>(`${environment.baseUrl}:8081/contacts/`);
  }

  sendMail(mail: Mail): Observable<boolean>
  {
    return this.http.post<boolean>(`${environment.baseUrl}:8081/contacts/mail`, mail);
  }

  deleteContact(contact: Contact): Observable<any>
  {
    return this.http.delete(`${environment.baseUrl}:8081/contacts/${contact.id}`);
  }
}

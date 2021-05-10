import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForbiddenComponent } from './Error/forbidden/forbidden.component';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {initializer} from '../AppInit';
import {AuthService} from './Services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';


@NgModule({
  declarations: [
    AppComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      progressAnimation: 'decreasing',
      progressBar: true
    }),
    AngularFireModule.initializeApp(environment.configFrireStore),
    AngularFireStorageModule,
    CKEditorModule


  ],
  providers: [
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

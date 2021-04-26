import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from './home.component';
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { AllentreprisesComponent } from './Entreprises/allentreprises/allentreprises.component';
import { NewentreprisComponent } from './Entreprises/newentrepris/newentrepris.component';
import { AllcochesComponent } from './Coaches/allcoches/allcoches.component';
import { NewcoachComponent } from './Coaches/newcoach/newcoach.component';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditCoachComponent } from './Coaches/edit-coach/edit-coach.component';
import { EditEntrepriseComponent } from './Entreprises/edit-entreprise/edit-entreprise.component';
import { AllContactsComponent } from './Contacts/all-contacts/all-contacts.component';
import { NewMissionComponent } from './Mission/new-mission/new-mission.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import { AllAcceptedComponent } from './Mission/all-accepted/all-accepted.component';
import { AllInvitationComponent } from './Mission/all-invitation/all-invitation.component';
import { EditMissionComponent } from './Mission/edit-mission/edit-mission.component';
import { AllByEntrepriseComponent } from './Mission/all-by-entreprise/all-by-entreprise.component';


@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    AllentreprisesComponent,
    NewentreprisComponent,
    AllcochesComponent,
    NewcoachComponent,
    EditCoachComponent,
    EditEntrepriseComponent,
    AllContactsComponent,
    NewMissionComponent,
    AllAcceptedComponent,
    AllInvitationComponent,
    EditMissionComponent,
    AllByEntrepriseComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ]
})
export class HomeModule { }

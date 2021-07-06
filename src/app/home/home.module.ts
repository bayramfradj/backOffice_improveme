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
import { AllPrototypeComponent } from './Mission/all-prototype/all-prototype.component';
import { AllByCoachComponent } from './Mission/all-by-coach/all-by-coach.component';
import { ChatComponent } from './Chat/chat/chat.component';
import { AllEvaluationComponent } from './Evaluation/all-evaluation/all-evaluation.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridWeek from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridWeek,
  interactionPlugin
]);

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
    AllByEntrepriseComponent,
    AllPrototypeComponent,
    AllByCoachComponent,
    ChatComponent,
    AllEvaluationComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    FullCalendarModule
  ]
})
export class HomeModule { }

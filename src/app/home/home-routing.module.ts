import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from '../guards/auth.guard';
import {AllentreprisesComponent} from './Entreprises/allentreprises/allentreprises.component';
import {NewentreprisComponent} from './Entreprises/newentrepris/newentrepris.component';
import {AllcochesComponent} from './Coaches/allcoches/allcoches.component';
import {NewcoachComponent} from './Coaches/newcoach/newcoach.component';
import {EditEntrepriseComponent} from './Entreprises/edit-entreprise/edit-entreprise.component';
import {EditCoachComponent} from './Coaches/edit-coach/edit-coach.component';
import {AllContactsComponent} from './Contacts/all-contacts/all-contacts.component';
import {NewMissionComponent} from './Mission/new-mission/new-mission.component';
import {AllAcceptedComponent} from './Mission/all-accepted/all-accepted.component';
import {AllInvitationComponent} from './Mission/all-invitation/all-invitation.component';
import {EditMissionComponent} from './Mission/edit-mission/edit-mission.component';
import { AllByEntrepriseComponent } from './Mission/all-by-entreprise/all-by-entreprise.component';
import {AllPrototypeComponent} from './Mission/all-prototype/all-prototype.component';
import {AllByCoachComponent} from './Mission/all-by-coach/all-by-coach.component';
import {ChatComponent} from './Chat/chat/chat.component';
import {AllEvaluationComponent} from './Evaluation/all-evaluation/all-evaluation.component';
import {AddEvaluationComponent} from './Evaluation/add-evaluation/add-evaluation.component';
import {ShowEvaluationComponent} from './Evaluation/show-evaluation/show-evaluation.component';
import {EditEvaluationComponent} from './Evaluation/edit-evaluation/edit-evaluation.component';

const routes: Routes = [
  {
    path: '' , component: HomeComponent, children: [
      {
        path: 'dashboard' , component: DashboardComponent
        , canActivate: [AuthGuard] , data: {roles: ['ADMIN', 'COACH', 'ENTREPRISE']}
      },
      {
        path: 'entreprises' , component: AllentreprisesComponent
        , canActivate: [AuthGuard] , data: {roles: ['ADMIN']}
      },
      {
        path: 'entreprises/Ajouter' , component: NewentreprisComponent
        , canActivate: [AuthGuard] , data: {roles: ['ADMIN']}
      },
      {
        path: 'entreprises/Modifier/:id' , component: EditEntrepriseComponent
        , canActivate: [AuthGuard] , data: {roles: ['ADMIN']}
      },
      {
        path: 'coaches' , component: AllcochesComponent
        , canActivate: [AuthGuard] , data: {roles: ['ADMIN']}
      },
      {
        path: 'coaches/Ajouter' , component: NewcoachComponent
        , canActivate: [AuthGuard] , data: {roles: ['ADMIN']}
      },
      {
        path: 'coaches/Modifier/:id' , component: EditCoachComponent
        , canActivate: [AuthGuard] , data: {roles: ['ADMIN']}
      },
      {
        path: 'contacts' , component: AllContactsComponent
        , canActivate: [AuthGuard] , data: {roles: ['ADMIN']}
      },
      {
        path: 'mission/Ajouter' , component: NewMissionComponent
        , canActivate: [AuthGuard] , data: {roles: ['ADMIN', 'ENTREPRISE']}
      },
      {
        path: 'mission/Modifier/:id' , component: EditMissionComponent
        , canActivate: [AuthGuard] , data: {roles: ['ADMIN', 'ENTREPRISE']}
      },
      {
        path: 'mission/Publier' , component: AllAcceptedComponent
        , canActivate: [AuthGuard] , data: {roles: ['ADMIN']}
      },
      {
        path: 'mission/Invitation' , component: AllInvitationComponent
        , canActivate: [AuthGuard] , data: {roles: ['ADMIN']}
      },
      {
        path: 'mission/Entreprise' , component: AllByEntrepriseComponent
        , canActivate: [AuthGuard] , data: {roles: ['ENTREPRISE']}
      },
      {
        path: 'mission/Exemple' , component: AllPrototypeComponent
        , canActivate: [AuthGuard] , data: {roles: ['ENTREPRISE']}
      },
      {
        path: 'mission/Coach' , component: AllByCoachComponent
        , canActivate: [AuthGuard] , data: {roles: ['COACH']}
      },
      {
        path: 'mission/Chat/:id' , component: ChatComponent
        , canActivate: [AuthGuard] , data: {roles: ['COACH']}
      },
      {
        path: 'mission/Evaluation/:id' , component: AllEvaluationComponent
        , canActivate: [AuthGuard] , data: {roles: ['COACH']}
      },
      {
        path: 'mission/Evaluation/New/:id/:SDate' , component: AddEvaluationComponent
        , canActivate: [AuthGuard] , data: {roles: ['COACH']}
      },
      {
        path: 'mission/Evaluation/show/:id' , component: ShowEvaluationComponent
        , canActivate: [AuthGuard] , data: {roles: ['COACH']}
      },
      {
        path: 'mission/Evaluation/Edit/:id' , component: EditEvaluationComponent
        , canActivate: [AuthGuard] , data: {roles: ['COACH']}
      },
      {
        path: '' , redirectTo: 'dashboard' , pathMatch: 'full'
      }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

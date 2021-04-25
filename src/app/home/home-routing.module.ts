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

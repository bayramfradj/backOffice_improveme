import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ForbiddenComponent} from './Error/forbidden/forbidden.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {
    path: '403-Forbidden' , component: ForbiddenComponent
  },
  {
    path: '' , loadChildren: () => import(`./home/home.module`).then(m => m.HomeModule),
    canActivate: [AuthGuard] , data: {roles: ['ADMIN', 'COACH', 'ENTREPRISE']}
  },
  {
    path: '**' , redirectTo: '403-Forbidden', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

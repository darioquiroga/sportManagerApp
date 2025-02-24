import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './../metronic/pages/login/login.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  //{ path: 'logout', component: LogoutComponent },
  //{ path: 'gestagro', component: DashboardComponent, canActivate: [AuthGuard] },
  //{ path: 'cuenta-corriente', component: CuentaCorrienteComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule] })
export class AppRoutingModule { }

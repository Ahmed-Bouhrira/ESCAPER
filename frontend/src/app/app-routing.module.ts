import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';



const routes: Routes = [
  {path: 'appointment_home',component:AppointmentComponent},
  {path: 'appointment_list',component: AppointmentListComponent},
  { path: '', component: HomeComponent },
  { path: 'test', component: TestComponent },
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

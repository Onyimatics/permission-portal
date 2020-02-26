import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionsComponent } from './permissions/permissions.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { CreatePermissionsComponent } from './create-permissions/create-permissions.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  { path:  '', component:  LoginComponent },
  { path:  'login', component:  LoginComponent },
  {
    path:  'get-permissions',
    component:  PermissionsComponent,
    canActivate: [AuthGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

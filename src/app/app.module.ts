import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { RadioButtonModule } from "primeng/radiobutton";
import { TableModule } from "primeng/table";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import {ConfirmationService} from 'primeng/api';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PermissionsComponent } from "./permissions/permissions.component";
import { AuthInterceptor } from "./interceptor/auth.interceptor";
import { CreatePermissionsComponent } from "./create-permissions/create-permissions.component";
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    PermissionsComponent,
    CreatePermissionsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    RadioButtonModule,
    TableModule,
    FormsModule,
    DialogModule,
    HttpClientModule,
    ConfirmDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ConfirmationService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

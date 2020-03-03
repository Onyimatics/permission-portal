import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.services";
import { interval, Subscription } from "rxjs";
import { mergeMap, map, tap, filter } from "rxjs/operators";
import { PermissionService } from "../services/permissions.services";
import { Auth } from "../models/auth";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  // loginForm = new FormGroup({
  //   grant_type: new FormControl(""),
  //   username: new FormControl(""),
  //   password: new FormControl("")
  // });

  readonly subscriptions = new Subscription();
  loginForm: FormGroup;

  constructor(
    public authService: AuthService,
    private _PermissionService: PermissionService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      grant_type: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onSubmit() {
    const rawValue = this.loginForm.getRawValue();
    const authLogin = <Auth>{
      grant_type: rawValue.grant_type,
      username: rawValue.username,
      password: rawValue.password
    };

    const subscription = this.authService
      .authenticate(authLogin)
      .subscribe(token => {
        this.authService.setAuthToken(token.access_token);
        this.router.navigate(["/get-permissions"]);
      });

    this.subscriptions.add(subscription);
    console.warn(this.loginForm.value);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

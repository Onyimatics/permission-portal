import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "./services/auth.services";
import { interval, Subscription } from "rxjs";
import { mergeMap, map, tap, filter } from "rxjs/operators";
import { PermissionService } from "./services/permissions.services";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title: string = "Permission Access Control";

  // readonly subscriptions = new Subscription();

  constructor() {}

  ngOnInit() {
    // const subscription = interval(2000)
    //   .pipe(
    //     // tap(data => console.log(data)),
    //     filter(_ => !this.authService.getAuthToken()),
    //     mergeMap(_ =>
    //       this.authService.authenticate({
    //         grant_type: "ADMIN",
    //         username: "ADMIN",
    //         password: "1234567"
    //       })
    //     ),
    //     map(({ access_token }) => access_token)
    //   )
    //   .subscribe(token => {
    //     console.log(`Setting token`, token);
    //     this.authService.setAuthToken(token);
    //   });
    // this.subscriptions.add(subscription);
  }

  // ngOnDestroy() {
  //   this.subscriptions.unsubscribe();
  // }
}

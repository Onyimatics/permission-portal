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
  }

}
